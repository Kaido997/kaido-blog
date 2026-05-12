# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle install

# Start dev server (live reload at http://localhost:4000)
bundle exec jekyll serve

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Build and serve production build locally
JEKYLL_ENV=production bundle exec jekyll serve
```

Google Analytics and the cookie consent banner only render when `JEKYLL_ENV=production`.

## Architecture

This is a **Jekyll 4.4.1** blog. The `minima` gem is still a dependency (its social-icon SVG sprite is reused), but the site ships its **own layouts, CSS, and JS** — minima's stylesheet is *not* loaded. Deployed via GitHub Pages (see `CNAME`).

### Key directories / files

- `_config.yml` — site-wide settings (title, GA tracking ID, plugins, theme)
- `_posts/` — blog posts as `.markdown` files; filename must follow `YYYY-MM-DD-title.markdown`
- `_layouts/` — `default.html` (HTML shell + loads filter.js), `home.html` (compact title block + tag filter bar + post list), `post.html` (article + optional Disqus), `page.html` (centered article)
- `_includes/` — reusable HTML partials (loaded via `{% include %}`)
- `assets/css/style.scss` — the site stylesheet (front-matter'd, compiled to `assets/css/style.css`)
- `assets/main.scss` — empty stub that overrides minima's `assets/main.scss` so its legacy `@import` (and Dart Sass deprecation warnings) don't run
- `assets/js/filter.js` — vanilla-JS client-side tag filter on the home page (single-select pills, `#tag=…` deep links)
- `index.markdown` / `about.markdown` — top-level pages. `index.markdown` carries the homepage header copy in front matter: `hero_title`, `hero_subtitle`, `hero_body`

### Includes wiring

`_includes/head.html` conditionally loads analytics only in production:

```liquid
{%- if jekyll.environment == 'production' and site.google_analytics -%}
  {%- include cookie-consent.html -%}
  {%- include google-analytics.html -%}
{%- endif -%}
```

### Post front matter

```yaml
---
layout: post
title:  "Post Title"
date:   YYYY-MM-DD HH:MM:SS -0400
tags: [some-tag, another-tag]
---
```

Posts are organized by `tags` (an array), **not** `categories`. Tag slugs drive the homepage filter pills — keep them short and kebab-case.

## Design

Minimal single-column layout (minima-style spacing/structure) on a dark vaporwave-derived palette. `DESIGN_SYSTEM.md` documents the *full* palette, but the live site deliberately uses a restrained subset — colors and the gradient text treatment, without the glassmorphism / glows / animations from that doc. Defined in `assets/css/style.scss`:

- **Background**: `#0a0a0f` (page), `#1a1a2e` (footer)
- **Accents**: purple `#9e83cf` + mint `#33e6b8`, used together as the `.vaporwave-text` gradient (`@mixin gradient-text`); links/hover use mint/aqua (`#33e6b8` / `#55efd5`)
- **Text**: `#f3f4f6` headings, `#d1d5db` body, `#9ca3af`/`#6b7280` muted
- Narrow content column (`.container`, ~46rem), thin `--rule` dividers, no cards, no blur, no box-shadow glows, minimal transitions (color only). Dark-first; never white backgrounds.
