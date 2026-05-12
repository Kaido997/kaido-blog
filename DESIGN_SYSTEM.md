# Design System — Vaporwave Dark Theme

> Paste this file (or relevant sections) into any Claude design prompt to keep new UI consistent with the existing site.

---

## Palette

| Token | Hex | Role |
|---|---|---|
| `bg-primary` | `#0a0a0f` | Page background |
| `bg-secondary` | `#1a1a2e` | Card / footer background |
| `bg-tertiary` | `#16213e` | Nested surfaces |
| `cyber-plum` | `#8207db` | Strong purple accent |
| `virtual-rose` | `#ed4bbc` | Pink / magenta |
| `peach-glitch` | `#eda381` | Warm peach (decorative) |
| `neon-aqua` | `#55efd5` | Bright cyan |
| `dreampink` | `#f5d8f2` | Soft pink (decorative) |
| `cyber-mist` | `#c6f5f2` | Soft cyan (decorative) |
| `purple-accent` | `#9e83cf` | Muted purple (borders, glows) |
| `green-accent` | `#33e6b8` | Mint green (highlights, CTAs) |

### Text scale
- Primary text: `#f3f4f6` (`gray-100`)
- Secondary text: `#d1d5db` (`gray-300`)
- Muted text: `#9ca3af` (`gray-400`)
- Subtle text: `#6b7280` (`gray-500`)

---

## Typography

| Usage | Stack |
|---|---|
| Body / UI | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| Monospace / retro labels | `'Courier New', monospace` |

Heading sizes follow Tailwind scale (`text-4xl` → `text-8xl`). Section titles are `text-4xl md:text-5xl font-bold`.

---

## Gradients

```
/* Hero / brand gradient */
linear-gradient(135deg, #8207db 0%, #ed4bbc 25%, #55efd5 75%, #33e6b8 100%)

/* Text gradient (purple → rose → mint) */
background: linear-gradient(to right, #9e83cf, #ed4bbc, #33e6b8)
-webkit-background-clip: text; color: transparent;

/* Subtle surface tint */
linear-gradient(135deg, rgba(158,131,207,0.05), rgba(51,230,184,0.05))

/* Interactive surface (hover state) */
linear-gradient(135deg, rgba(158,131,207,0.2), rgba(51,230,184,0.2))

/* Active / selected surface */
linear-gradient(135deg, rgba(158,131,207,0.4), rgba(51,230,184,0.4))

/* Hero background radial glow */
radial-gradient(ellipse at center, rgba(158,131,207,0.1) 0%, transparent 70%)
```

### Category badge gradients
| Category | Gradient |
|---|---|
| software | `from blue-500 to cyan-500` |
| web | `from green-500 to emerald-500` |
| cnc / hardware | `from purple-500 to pink-500` |
| mobile | `from orange-500 to red-500` |
| featured | `from yellow-500 to orange-500` |

---

## Borders & Surfaces

All glassmorphism surfaces share this recipe:

```css
border: 1px solid rgba(158, 131, 207, 0.3);   /* purple-accent/30 */
background: linear-gradient(135deg, rgba(158,131,207,0.05), rgba(51,230,184,0.05));
backdrop-filter: blur(10px);
```

Selected / active state raises opacity:
```css
border-color: rgba(158, 131, 207, 0.6);       /* purple-accent/60 */
background: linear-gradient(135deg, rgba(158,131,207,0.2), rgba(51,230,184,0.2));
box-shadow: 0 0 20px rgba(158, 131, 207, 0.3);
```

---

## Shadows & Glows

| Name | CSS |
|---|---|
| Card hover glow | `box-shadow: 0 0 30px rgba(158, 131, 207, 0.2)` |
| Button hover shadow | `box-shadow: 0 4px 12px rgba(158, 131, 207, 0.3)` |
| Filter button shadow | `box-shadow: 0 4px 12px rgba(158, 131, 207, 0.2)` |
| Tech badge hover glow | `box-shadow: 0 2px 8px rgba(51, 230, 184, 0.3)` |
| Icon hover glow | `filter: drop-shadow(0 0 8px rgba(51, 230, 184, 0.6))` |
| Pulse glow keyframe | `0→5px rgba(51,230,184,0.5)  50%→20px rgba(51,230,184,0.8)+30px rgba(158,131,207,0.6)` |
| Focus ring | `box-shadow: 0 0 0 2px rgba(158, 131, 207, 0.5)` |

---

## Border Radius

| Element | Value |
|---|---|
| Cards | `border-radius: 0.75rem` (`rounded-xl`) |
| Buttons / links | `border-radius: 0.5rem` (`rounded-lg`) |
| Pill buttons / badges | `border-radius: 9999px` (`rounded-full`) |
| Images in cards | `border-radius: 0.5rem` (`rounded-lg`) |
| Scrollbar thumb | `border-radius: 4px` |
| Social icon circles | `border-radius: 9999px` |

---

## Spacing & Layout

- Max content width: `max-w-6xl` (72rem)
- Horizontal page padding: `px-6 md:px-12 lg:px-24`
- Section vertical padding: `py-8` to `py-20`
- Card internal padding: `p-6`
- Gap between cards: `gap-6`
- Gap between buttons: `gap-4`
- Gap between badges: `gap-1` (tech badges) / `gap-2` (link buttons)

---

## Background Patterns

```css
/* Subtle page grid (50px cells, very faint) */
background-image:
  linear-gradient(rgba(158,131,207,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(158,131,207,0.03) 1px, transparent 1px);
background-size: 50px 50px;

/* Tech grid (20px cells, more visible) */
background-image:
  linear-gradient(rgba(158,131,207,0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(158,131,207,0.1) 1px, transparent 1px);
background-size: 20px 20px;

/* Scrollbar */
track:  bg-secondary  (#1a1a2e)
thumb:  gradient top-to-bottom purple-accent → green-accent, radius 4px
```

---

## Animations

| Name | Keyframe summary | Duration | Usage |
|---|---|---|---|
| `glitch` | translate ±1px in 5 steps | 0.3s infinite | Hover on interactive elements |
| `pulse-glow` | box-shadow breathes | 2s infinite | Social icons, glow accents |
| `float` | translateY 0 → -10px → 0 | 6s infinite | Hero headline |
| `shimmer` | `::before` slides left→right | 3s infinite | Loading shimmer effect |
| `loading-pulse` | opacity 0.6 → 1 → 0.6 | 1.5s infinite | Skeleton loaders |
| `bounce` (Tailwind) | — | — | Scroll indicator chevron |

All transitions: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` (or `duration-300`).

---

## Component Specs

### Vaporwave Card (`.project-card`)
```
surface:    vaporwave-border (see above)
radius:     rounded-xl
padding:    p-6
transition: all 0.3s
hover:      scale(1.02)  +  box-shadow 0 0 30px rgba(158,131,207,0.2)
layout:     flex column, full height
overflow:   hidden
```

### Link Button (`.link-button`)
```
layout:     inline-flex items-center gap
padding:    px-4 py-2  (small variant: px-3 py-1.5)
radius:     rounded-lg
font:       font-medium
surface:    subtle gradient + border rgba(158,131,207,0.3)
hover:      active gradient + translateY(-2px) + shadow 0 4px 12px rgba(158,131,207,0.3)
icon:       w-5 h-5 (w-3 h-3 small), scale-110 on hover
```

### Tech Badge (`.tech-badge`)
```
layout:     inline-block
padding:    px-3 py-1
radius:     rounded-full
font:       text-xs font-medium
surface:    20% gradient + border rgba(158,131,207,0.3)
hover:      translateY(-1px) + glow 0 2px 8px rgba(51,230,184,0.3)
```

### Filter Pill (`.category-button`)
```
padding:    px-4 py-2
radius:     rounded-full
surface:    5% gradient + border rgba(158,131,207,0.2) + blur(10px)
hover:      scale-105 + translateY(-1px) + shadow 0 4px 12px rgba(158,131,207,0.2)
selected:   20% gradient + border/60 + glow 0 0 20px rgba(158,131,207,0.3)
text:       gradient-clipped per category color
```

### Gradient Text (`.vaporwave-text`)
```
background: linear-gradient(to right, #9e83cf, #ed4bbc, #33e6b8)
-webkit-background-clip: text
color: transparent
```

### Social Icon Button
```
size:       w-10 h-10
radius:     rounded-full
surface:    from-purple-accent/20 to-green-accent/20 + border purple-accent/30
hover:      from/to /40 + scale-110 + pulse-glow animation
icon:       w-5 h-5 text-gray-300 → white on hover
```

### Hero Section
```
min-height: 100vh
layout:     flex items-center justify-center
padding:    px-6 md:px-12 lg:px-24, py-20 pb-24
background: radial-gradient(ellipse at center, rgba(158,131,207,0.1) 0%, transparent 70%)
overlay:    tech-grid at 20% opacity
headline:   text-5xl md:text-7xl lg:text-8xl font-bold, float animation
subtitle:   text-2xl md:text-3xl text-green-accent font-semibold
body:       text-lg text-gray-300 max-w-2xl leading-relaxed
```

### Footer
```
background: bg-secondary (#1a1a2e)
border-top: 1px solid rgba(158,131,207,0.2)
padding:    px-6 md:px-12 lg:px-24 py-12
grid:       3 columns md+ (contact / social / about)
section headings: vaporwave-text
links:      text-gray-300 hover:text-green-accent duration-200
bottom bar: border-t border-gray-700, flex col md:row, text-gray-400 text-sm
```

---

## Design Principles

1. **Dark-first** — all surfaces are near-black or deep navy; never use white backgrounds.
2. **Glassmorphism** — cards and interactive surfaces use low-opacity gradient fills + blur.
3. **Purple/green duality** — `purple-accent` (#9e83cf) and `green-accent` (#33e6b8) are the two primary accent colors; always use them together (gradient).
4. **Subtle over loud** — animations are gentle (glitch is only on hover, floats are slow). Avoid heavy particle effects.
5. **Grid texture** — the page background always carries a faint purple grid line pattern.
6. **Consistent glow** — hover states add a colored box-shadow, never a border-color change alone.
7. **Gradient text for headings** — all major section titles use the vaporwave gradient text treatment.
8. **Smooth transitions** — every interactive element uses `transition: all 0.3s`.
