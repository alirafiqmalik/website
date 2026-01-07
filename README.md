# Personal Website

Next.js 15 + MDX academic portfolio. Al-folio inspired design.

## Quick Start

```bash
npm install
npm run dev      # localhost:3000
npm run build    # production build
```

## Structure

```
src/
  app/           # Routes (page.tsx per route)
  components/
    layout/      # Navigation, Footer, ThemeProvider
    ui/          # shadcn/ui primitives
    mdx/         # Callout, CodeBlock, YouTube
  content/       # Markdown/MDX content
    personal.md, cv.md, news.md
    posts/*.mdx, projects/*.mdx
    publications/*.md, history/*.md
  lib/content.ts # Content loader (gray-matter)
  types/index.ts # TypeScript interfaces
```

## Content

Edit files in `src/content/`. Frontmatter (YAML) for metadata, markdown body for content.

Projects and posts use `.mdx` for interactive components.
