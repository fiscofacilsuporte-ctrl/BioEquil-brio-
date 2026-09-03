import { describe, expect, it } from "vitest";

type Recipe = { ingredients: string[] };
function compatibility(recipe: Recipe, available: string[]) {
  return Math.round(recipe.ingredients.filter(i => available.some(a => i.includes(a) || a.includes(i))).length / recipe.ingredients.length * 100);
}

describe("Tenho em casa", () => {
  it("calcula a percentagem de ingredientes disponíveis", () => {
    expect(compatibility({ ingredients: ["ovos", "tomate", "cebola", "alho"] }, ["ovos", "tomate"])).toBe(50);
  });
  it("prioriza a receita com maior compatibilidade", () => {
    const ranked = [{ name: "A", score: compatibility({ ingredients: ["ovos", "tomate"] }, ["ovos", "tomate"]) }, { name: "B", score: compatibility({ ingredients: ["ovos", "tomate", "cebola", "alho"] }, ["ovos", "tomate"]) }].sort((a, b) => b.score - a.score);
    expect(ranked[0]?.name).toBe("A");
  });
});
