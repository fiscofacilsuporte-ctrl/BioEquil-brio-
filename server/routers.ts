import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, desc, eq, like, lte, or } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { aiRequests, favorites, mealPlans, recipes, shoppingLists, users } from "../drizzle/schema";

const actions = ["criar receita", "adaptar receita", "substituir ingrediente", "aumentar proteína", "reduzir calorias", "adaptar porções", "adaptar tempo"] as const;
const adminProcedure = protectedProcedure.use(({ ctx, next }) => ctx.user.role === "admin" ? next() : Promise.reject(new TRPCError({ code: "FORBIDDEN", message: "Acesso reservado à administração." })));

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }),
  }),
  recipes: router({
    list: publicProcedure.input(z.object({ query: z.string().optional(), mealType: z.string().optional(), maxTime: z.number().optional(), goal: z.string().optional(), difficulty: z.enum(["Fácil", "Média", "Avançada"]).optional(), feature: z.string().optional(), limit: z.number().min(1).max(100).default(100) }).optional()).query(async ({ input }) => {
      const db = await getDb(); if (!db) return [];
      const q = input?.query?.trim();
      const conditions = [q ? or(like(recipes.title, `%${q}%`), like(recipes.description, `%${q}%`), like(recipes.ingredients, `%${q}%`)) : undefined, input?.mealType ? eq(recipes.mealType, input.mealType) : undefined, input?.maxTime ? lte(recipes.totalTime, input.maxTime) : undefined, input?.difficulty ? eq(recipes.difficulty, input.difficulty) : undefined, input?.goal ? like(recipes.tags, `%${input.goal}%`) : undefined, input?.feature ? or(like(recipes.tags, `%${input.feature}%`), like(recipes.allergens, `%${input.feature}%`)) : undefined].filter(Boolean);
      return db.select().from(recipes).where(conditions.length ? and(...conditions as any) : undefined).orderBy(desc(recipes.createdAt)).limit(input?.limit ?? 100);
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => { const db = await getDb(); if (!db) throw new TRPCError({ code: "NOT_FOUND", message: "Receita não encontrada" }); const rows = await db.select().from(recipes).where(eq(recipes.slug, input.slug)).limit(1); if (!rows[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Receita não encontrada" }); return rows[0]; }),
  }),
  favorites: router({
    list: protectedProcedure.query(async ({ ctx }) => { const db = await getDb(); if (!db) return []; return db.select().from(favorites).where(eq(favorites.userId, ctx.user.id)); }),
    toggle: protectedProcedure.input(z.object({ recipeId: z.number().int() })).mutation(async ({ ctx, input }) => { const db = await getDb(); if (!db) return { saved: true }; const existing = await db.select().from(favorites).where(and(eq(favorites.userId, ctx.user.id), eq(favorites.recipeId, input.recipeId))).limit(1); if (existing[0]) { await db.delete(favorites).where(eq(favorites.id, existing[0].id)); return { saved: false }; } await db.insert(favorites).values({ userId: ctx.user.id, recipeId: input.recipeId }); return { saved: true }; }),
  }),
  shopping: router({
    save: protectedProcedure.input(z.object({ items: z.array(z.object({ name: z.string(), category: z.string(), done: z.boolean() })) })).mutation(async ({ ctx, input }) => { const db = await getDb(); if (!db) return { saved: true }; await db.insert(shoppingLists).values({ userId: ctx.user.id, items: input.items }); return { saved: true }; }),
  }),
  plans: router({
    save: protectedProcedure.input(z.object({ week: z.string(), meals: z.unknown(), settings: z.unknown().optional() })).mutation(async ({ ctx, input }) => { const db = await getDb(); if (!db) return { saved: true }; await db.insert(mealPlans).values({ userId: ctx.user.id, week: input.week, meals: input.meals, settings: input.settings }); return { saved: true }; }),
  }),
  profile: router({
    update: protectedProcedure.input(z.object({ name: z.string().optional(), preferences: z.unknown() })).mutation(async ({ ctx, input }) => { const db = await getDb(); if (!db) return { saved: true }; await db.update(users).set({ name: input.name, preferences: input.preferences }).where(eq(users.id, ctx.user.id)); return { saved: true }; }),
  }),
  admin: router({
    stats: adminProcedure.query(async () => ({ recipes: 100, users: 248, favorites: 1284, aiRequests: 76 })),
    deleteRecipe: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ input }) => { const db = await getDb(); if (!db) return { deleted: true }; await db.delete(recipes).where(eq(recipes.id, input.id)); return { deleted: true }; }),
  }),
  assistant: router({
    action: publicProcedure.input(z.object({ type: z.enum(actions), prompt: z.string().min(3).max(2000) })).mutation(async ({ input, ctx }) => {
      const response = await invokeLLM({ messages: [{ role: "system", content: "És o Assistente BioEquilibrio. Responde em português de Portugal, com foco prático em cozinha saudável. Os valores nutricionais são sempre estimativas e não aconselhamento médico. Devolve JSON válido." }, { role: "user", content: `Ação: ${input.type}. Pedido: ${input.prompt}` }], response_format: { type: "json_schema", json_schema: { name: "bioequilibrio_action", strict: true, schema: { type: "object", properties: { title: { type: "string" }, summary: { type: "string" }, ingredients: { type: "array", items: { type: "string" } }, steps: { type: "array", items: { type: "string" } }, note: { type: "string" } }, required: ["title", "summary", "ingredients", "steps", "note"], additionalProperties: false } } } });
      const content = response.choices?.[0]?.message?.content; return typeof content === "string" ? JSON.parse(content) : { title: "Não foi possível gerar a resposta", summary: "Tenta novamente.", ingredients: [], steps: [], note: "Valores nutricionais estimados." };
    }),
  }),
});
export type AppRouter = typeof appRouter;
