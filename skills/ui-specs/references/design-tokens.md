# Design Token System Reference

## Token Naming Convention

All tokens are CSS custom properties defined on `:root` in `.ui-specs/tokens.css`. They follow a strict prefix-based naming convention:

| Prefix | Category | Example |
|--------|----------|---------|
| `--color-*` | Colors | `--color-primary`, `--color-background` |
| `--font-*` | Typography | `--font-display`, `--font-size-base` |
| `--space-*` | Spacing | `--space-sm`, `--space-lg` |
| `--layout-*` | Layout | `--layout-max-width`, `--layout-border-radius` |

## Default Token Values

### Colors (10 tokens)

```css
--color-primary: #2563eb;        /* Blue — primary brand actions */
--color-secondary: #7c3aed;      /* Purple — secondary brand elements */
--color-accent: #f59e0b;         /* Amber — highlights, badges, accents */
--color-success: #10b981;        /* Emerald — success states, confirmations */
--color-warning: #f59e0b;        /* Amber — warning states, caution */
--color-error: #ef4444;          /* Red — error states, destructive actions */
--color-background: #ffffff;     /* White — page background */
--color-surface: #f8fafc;        /* Slate 50 — card/panel backgrounds */
--color-text-primary: #0f172a;   /* Slate 900 — headings, primary text */
--color-text-secondary: #64748b; /* Slate 500 — descriptions, muted text */
```

### Typography (6 tokens)

```css
--font-display: 'Inter', sans-serif;              /* Headings — Google Font */
--font-body: 'Inter', sans-serif;                  /* Body text — Google Font */
--font-mono: ui-monospace, 'Cascadia Code', 'Fira Code', monospace; /* Code — system stack */
--font-size-base: 16px;                            /* Base body text */
--font-size-sm: 14px;                              /* Small/caption text */
--font-size-lg: 20px;                              /* Large/intro text */
```

### Spacing (6 tokens)

```css
--space-xs: 4px;   /* Tight gaps, icon padding */
--space-sm: 8px;   /* Compact spacing, button padding */
--space-md: 16px;  /* Standard spacing, card padding */
--space-lg: 24px;  /* Section gaps, form spacing */
--space-xl: 32px;  /* Large section spacing */
--space-2xl: 48px; /* Hero spacing, major section breaks */
```

### Layout (4 tokens)

```css
--layout-max-width: 1200px;                                            /* Content max width */
--layout-border-radius: 8px;                                           /* Standard corners */
--layout-border-radius-lg: 16px;                                       /* Large card corners */
--layout-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06); /* Subtle elevation */
```

## How Tokens Cascade to Pages

The token system uses standard CSS custom property inheritance:

1. **tokens.css** defines all properties on `:root`
2. Each page HTML file includes `<link rel="stylesheet" href="../tokens.css">`
3. All page styles reference tokens via `var(--token-name)`:
   ```css
   .button-primary {
     background-color: var(--color-primary);
     border-radius: var(--layout-border-radius);
     padding: var(--space-sm) var(--space-md);
     font-family: var(--font-body);
   }
   ```
4. When viewed in the gallery, tokens can be overridden at runtime via the token listener script using `document.documentElement.style.setProperty()`
5. The gallery sidebar broadcasts token changes to all page iframes via `postMessage`, and each page's listener script applies the override

This means:
- **Static viewing**: Pages use values from `tokens.css`
- **Gallery viewing**: Pages use live values from the token editor, overriding `tokens.css` at runtime
- **Export**: The gallery "Export tokens.css" button captures the current runtime values

## Google Fonts Integration

Each page must import the selected Google Fonts via `<link>` tags in the `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

When the user selects different fonts:
- Update the `<link>` tag URL to reference the new font families
- Update `--font-display` and `--font-body` token values in `tokens.css`
- The font family value in the token should include the full stack: `'Font Name', sans-serif`

Common Google Font options to offer:
- **Sans-serif**: Inter, Roboto, Open Sans, Lato, Poppins, Nunito, Raleway, Montserrat, Source Sans 3, DM Sans
- **Serif**: Merriweather, Playfair Display, Lora, Noto Serif, Source Serif 4, Libre Baskerville
- **Monospace**: JetBrains Mono, Fira Code, Source Code Pro, IBM Plex Mono (for `--font-mono` override)
