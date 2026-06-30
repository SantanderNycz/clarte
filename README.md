# Clarté

Protótipo de e-commerce de skincare de luxo para portfólio, moldado nos padrões do tema **Shopify Dawn**. Inclui três cenas Three.js, sistema de internacionalização FR/PT/EN, e SEO completo (Open Graph, Twitter Card, hreflang, JSON-LD).

## Estrutura de pastas

```
clarte/
├── index.html                  # Marcação semântica + SEO inline
├── assets/
│   ├── css/
│   │   ├── main.css            # Entry point — @import de todos os parciais
│   │   ├── tokens.css          # Variáveis :root (cores, tipografia, espaçamento)
│   │   ├── base.css            # Reset, body, scroll-behavior
│   │   ├── components.css      # Botões, eyebrow, section-title, reveal animation
│   │   ├── header.css          # Announcement bar, nav, logo, lang switcher
│   │   ├── hero.css            # Hero section + scroll indicator
│   │   ├── marquee.css         # Faixa de texto em loop contínuo
│   │   ├── sections.css        # rich-text, intermezzo, collections, products,
│   │   │                       # editorial, multicolumn, email-signup
│   │   ├── footer.css          # Footer grid, social links, payments
│   │   └── responsive.css      # Media queries ≤1024px e ≤640px
│   ├── js/
│   │   ├── main.js             # Entry point — importa e inicializa todos os módulos
│   │   ├── i18n.js             # Dicionário I18N, SEO_I18N, applyLanguage, buildMarquee
│   │   ├── scroll-tracker.js   # Objeto `scroll` compartilhado + updateScrollVelocity
│   │   ├── three-helpers.js    # makeRenderer (compartilhado pelas 3 cenas)
│   │   ├── scene-hero.js       # Objeto 3D #1 — frasco conta-gotas (hero, canto superior direito)
│   │   ├── scene-intermezzo.js # Objeto 3D #2 — rolo facial (faixa intermezzo, centro)
│   │   ├── scene-editorial.js  # Objeto 3D #3 — esponja de limpeza de silicone (seção editorial escura)
│   │   └── reveal.js           # IntersectionObserver para animação fade-up em .reveal
│   └── img/                    # Pasta reservada para fotos reais futuras
└── README.md
```

## Como abrir localmente

O projeto usa **ES modules** (`type="module"`), que requerem um servidor HTTP — não funcionam via `file://` diretamente no browser.

**Opção 1 — npx serve (recomendado, sem instalação):**
```bash
npx serve .
```

**Opção 2 — Python (nativo no macOS/Linux):**
```bash
python3 -m http.server 8080
```

**Opção 3 — VS Code Live Server:**
Instale a extensão *Live Server* (Ritwick Dey) e clique em **Go Live**.

Depois acesse `http://localhost:PORT` no browser.

## Internacionalização (i18n)

- **Idioma padrão:** Francês (FR)
- **Idiomas disponíveis:** FR · PT · EN
- Troca via botões no header (`data-lang="fr|pt|en"`)
- Ao trocar: todo o copy da página, o marquee, os meta tags (`<title>`, description, og:locale) e o atributo `lang` do `<html>` são atualizados
- A escolha é persistida em `sessionStorage` (chave: `clarte_lang`)

## Objetos 3D

Todos são animados por scroll: a velocidade e direção do scroll (`scroll.delta`) controlam a rotação de cada objeto em tempo real.

| # | Objeto | Localização na página |
|---|--------|----------------------|
| 1 | Frasco de sérum âmbar (vidro translúcido + conta-gotas preto + bolhas) | Hero — canto superior direito |
| 2 | Rolo facial (quartzo rosa + estrutura rosé gold) | Faixa intermezzo — entre Filosofia e Coleções |
| 3 | Esponja de limpeza de silicone (corpo mint em gota + nubs + botão) | Seção editorial escura — lado direito |

Three.js r128 é carregado via CDN como script global antes dos módulos ES6, ficando disponível como `window.THREE` em todas as cenas.
