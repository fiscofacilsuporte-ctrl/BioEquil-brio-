# 🌿 BioEquilíbrio

> Alimentação consciente · Exercício regular · Mente tranquila

**Site:** [bioequilibrio.online](https://bioequilibrio.online)  
**Hospedagem:** GitHub Pages (gratuito)  
**Tecnologia:** HTML + CSS + JavaScript puro (sem dependências)

---

## 📁 Estrutura do Repositório

```
/
├── index.html          ← Homepage (este ficheiro)
├── CNAME               ← Domínio personalizado para GitHub Pages
├── logo.png            ← Colocar o logótipo aqui
├── favicon.ico         ← Ícone do browser (converter logo.png)
├── og-image.jpg        ← Imagem para partilha em redes sociais (1200×630px)
└── artigos/
    └── artigo-exemplo.html  ← Template de artigo (em breve)
```

---

## 🚀 Setup Inicial (GitHub Pages)

### 1. Criar repositório
- Criar repositório público no GitHub: `bioequilibrio` (ou `bioequilibrio.online`)
- Fazer upload de `index.html`, `CNAME`, `logo.png`

### 2. Ativar GitHub Pages
- Settings → Pages → Source: **Deploy from a branch** → `main` / `root`
- Aguardar ~2 minutos

### 3. Configurar DNS (no teu registador de domínio)
Criar os seguintes registos DNS:

| Tipo  | Nome | Valor                 |
|-------|------|-----------------------|
| A     | @    | 185.199.108.153       |
| A     | @    | 185.199.109.153       |
| A     | @    | 185.199.110.153       |
| A     | @    | 185.199.111.153       |
| CNAME | www  | bioequilibrio.online  |

Aguardar propagação DNS (até 24h, normalmente <1h).

### 4. Ativar HTTPS
- Settings → Pages → Enforce HTTPS ✓

---

## 📝 Como Adicionar Artigos (Workflow Mobile)

### Opção A — HTML simples (recomendado agora)
1. Pedir ao Claude o template de artigo
2. Descarregar o ficheiro HTML
3. Fazer upload para a pasta `artigos/` no GitHub

### Opção B — GitHub Actions com JSON (futuro)
Criar ficheiro `artigos.json` com lista de artigos → GitHub Actions regenera o HTML automaticamente.

---

## 💰 Plano de Monetização

### Fase 1 — Crescimento (meses 1-3)
- [ ] Publicar 2-3 artigos/semana com SEO
- [ ] Criar conta Instagram/TikTok BioEquilíbrio
- [ ] Configurar newsletter (Brevo — grátis até 300 emails/dia)
- [ ] Instalar Google Analytics 4

### Fase 2 — Primeiros Rendimentos (mês 3-6)
- [ ] **Google AdSense** — aplicar com 20+ artigos e tráfego consistente
  - Substituir `div.ad-zone` pelos snippets do AdSense
- [ ] **Programa Parceiros Amazon** — links afiliados em artigos de suplementos/equipamentos
  - Adicionar disclaimer no footer (obrigatório por lei)
- [ ] **Brevo/Mailchimp** — integrar o formulário de newsletter com o endpoint real

### Fase 3 — Escalar (mês 6+)
- [ ] **Artigos patrocinados** — marcas de saúde e nutrição portuguesas
- [ ] **E-books** (ex: "Plano 21 Dias de Alimentação Anti-inflamatória") — Gumroad grátis
- [ ] **Links de afiliados** da iHerb, NutriVerde, MyProtein PT
- [ ] Considerar **Substack** ou **Ghost** quando o volume de conteúdo crescer

---

## 🎨 Design System

| Token         | Valor     | Uso                        |
|---------------|-----------|----------------------------|
| `--green`     | `#3BA935` | Cor primária (Bio)         |
| `--blue`      | `#1B3A6B` | Cor secundária (Equilíbrio)|
| `--teal`      | `#29B5C5` | Destaques / tags           |
| `--bg`        | `#FAFBF8` | Fundo da página            |
| `--font-display` | Playfair Display | Títulos de artigos |
| `--font-body` | Inter     | Corpo de texto             |

**Elemento assinatura:** linha ECG animada com gradiente verde→teal→azul, referência direta ao logótipo.

---

## 📊 SEO — Keywords Alvo (PT)

- "alimentação saudável Portugal"
- "receitas anti-inflamatórias"
- "exercício em casa principiantes"
- "mindfulness português"
- "bem-estar holístico"
- "smoothies verdes benefícios"
- "pilates em casa"

---

## 📅 Roadmap

```
Semana 1   → Upload homepage + domínio ativo
Semana 2   → Primeiros 5 artigos reais
Semana 3   → Instagram + primeiros posts
Semana 4   → Newsletter configurada (Brevo)
Mês 2      → 20 artigos, candidatura AdSense
Mês 3      → Primeiros links Amazon Afiliados
Mês 6      → Primeiro e-book ou produto digital
```

---

*Projeto criado com assistência do Claude (Anthropic)*
