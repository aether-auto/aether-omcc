---
name: ui-specs
description: Generate visual UI specs with design tokens and interactive gallery for review
level: 3
---

# UI Specifications Generator

Generate self-contained HTML UI specifications with shared design tokens and an interactive gallery for review.

## Prerequisites

- A plan exists in `.omc/plans/`
- Optionally, a spec exists in `.omc/specs/`

## Workflow

Execute these 5 phases in order:

### Phase 1 — Extract UI Context

1. Read the plan from `.omc/plans/` to understand the project scope
2. Read the spec from `.omc/specs/` if available for additional detail
3. Build a **page list** with the following for each page:
   - Page name (kebab-case, used as filename)
   - Purpose (one-line description)
   - Key UI elements (buttons, forms, lists, cards, etc.)
   - Navigation flow (which pages link to/from this page)
4. Identify the **overall UI vision**:
   - Design direction (minimal, bold, playful, corporate, etc.)
   - Color mood (warm, cool, neutral, vibrant, etc.)
   - Typography style (modern sans-serif, classic serif, monospace-heavy, etc.)

Output: a structured page list and UI vision summary to use in subsequent phases.

### Phase 2 — Design Token Setup

Present the user with default design tokens and let them adjust via **AskUserQuestion**.

Show the user the following token categories with defaults, and ask them to confirm or customize:

**Colors (10 tokens):**
| Token | Default | Purpose |
|-------|---------|---------|
| `--color-primary` | `#2563eb` | Primary brand color |
| `--color-secondary` | `#7c3aed` | Secondary brand color |
| `--color-accent` | `#f59e0b` | Accent/highlight color |
| `--color-success` | `#10b981` | Success states |
| `--color-warning` | `#f59e0b` | Warning states |
| `--color-error` | `#ef4444` | Error states |
| `--color-background` | `#ffffff` | Page background |
| `--color-surface` | `#f8fafc` | Card/surface background |
| `--color-text-primary` | `#0f172a` | Primary text |
| `--color-text-secondary` | `#64748b` | Secondary/muted text |

**Typography (6 tokens):**
| Token | Default | Purpose |
|-------|---------|---------|
| `--font-display` | `Inter` | Headings (Google Font) |
| `--font-body` | `Inter` | Body text (Google Font) |
| `--font-mono` | `ui-monospace, monospace` | Code/mono text (system) |
| `--font-size-base` | `16px` | Base font size |
| `--font-size-sm` | `14px` | Small text |
| `--font-size-lg` | `20px` | Large text |

**Spacing (6 tokens):**
| Token | Default | Purpose |
|-------|---------|---------|
| `--space-xs` | `4px` | Extra small spacing |
| `--space-sm` | `8px` | Small spacing |
| `--space-md` | `16px` | Medium spacing |
| `--space-lg` | `24px` | Large spacing |
| `--space-xl` | `32px` | Extra large spacing |
| `--space-2xl` | `48px` | Double extra large spacing |

**Layout (4 tokens):**
| Token | Default | Purpose |
|-------|---------|---------|
| `--layout-max-width` | `1200px` | Max content width |
| `--layout-border-radius` | `8px` | Standard border radius |
| `--layout-border-radius-lg` | `16px` | Large border radius |
| `--layout-shadow` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | Standard box shadow |

After user confirms/adjusts, generate `.ui-specs/tokens.css`:

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-secondary: #7c3aed;
  /* ... all confirmed token values ... */
}
```

### Phase 3 — Page Generation

For each screen in the page list from Phase 1:

1. Generate a self-contained HTML file at `.ui-specs/pages/{page-name}.html`
2. **Invoke the `frontend-design` skill** for creative, high-quality page designs

Each HTML file MUST include:

**Required head section:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Page Name} — UI Spec</title>
  <link rel="stylesheet" href="../tokens.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family={display-font}:wght@400;500;600;700&family={body-font}:wght@400;500;600&display=swap" rel="stylesheet">
</head>
```

**Required constraints:**
- ALL CSS must be inline in a `<style>` tag (no external CSS files except tokens.css)
- ALL colors, fonts, spacing MUST reference tokens via `var(--token-name)`
- Responsive from 375px to 1440px using media queries
- Semantic HTML with proper heading hierarchy (h1 > h2 > h3)
- Realistic placeholder content (NOT lorem ipsum — use contextually appropriate text)
- No external JavaScript dependencies

**Required token listener script (before closing `</body>`):**
```html
<script>
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'token-update') {
    Object.entries(e.data.tokens).forEach(function([key, value]) {
      document.documentElement.style.setProperty(key, value);
    });
  }
});
</script>
```

### Phase 4 — Gallery Generation

Generate `.ui-specs/index.html` — the interactive gallery page.

The gallery must include:

1. **Left sidebar — Token Editor:**
   - Color pickers for all `--color-*` tokens
   - Font dropdowns for `--font-display` and `--font-body` (populated with common Google Fonts)
   - Sliders for spacing tokens (`--space-*`)
   - Sliders for border radius tokens
   - "Reset to defaults" button
   - "Export tokens.css" button that outputs current token values

2. **Main area — Page Grid:**
   - Grid of iframe cards, each loading a page from `pages/{page-name}.html`
   - Each card shows: page name label, iframe preview, "Open full" link
   - Responsive grid layout (1-3 columns based on viewport)

3. **Token propagation:**
   - When any token is changed in the sidebar, broadcast to ALL iframes via `postMessage`:
     ```javascript
     iframes.forEach(iframe => {
       iframe.contentWindow.postMessage({
         type: 'token-update',
         tokens: { [tokenName]: newValue }
       }, '*');
     });
     ```

4. **Search/filter:**
   - Text input to filter pages by name
   - Show/hide cards based on filter

5. **Layout:**
   - Responsive: sidebar collapses to top bar on mobile
   - Self-contained (all CSS inline, references tokens.css)

Refer to `references/gallery-template.md` for the full template structure.

### Phase 5 — Serve and Review Loop

1. Run the server: `bash scripts/serve-ui-specs.sh`
   - This serves `.ui-specs/` on port 8420
   - Tell the user to open `http://localhost:8420` in their browser

2. Use **AskUserQuestion** to collect feedback. Present these options:
   - **"Approve all specs"** — User is satisfied. Continue to the next pipeline stage.
   - **"Edit design tokens"** — Return to Phase 2 to adjust tokens.
   - **"Redesign a specific page"** — Ask which page, then regenerate just that page in Phase 3.
   - **"Add a new page"** — Ask for page details, then generate an additional page in Phase 3.

3. **Loop** until the user selects "Approve all specs".

4. When approved, confirm the final output:
   - `.ui-specs/tokens.css` — design tokens
   - `.ui-specs/pages/*.html` — individual page specs
   - `.ui-specs/index.html` — interactive gallery
