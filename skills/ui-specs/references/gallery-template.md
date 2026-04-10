# Gallery Template Reference

This document provides the structural template for the `.ui-specs/index.html` gallery page. Use this as the foundation when generating the gallery in Phase 4.

## HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Specs Gallery</title>
  <link rel="stylesheet" href="tokens.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* === Reset & Base === */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-body);
      background: var(--color-background);
      color: var(--color-text-primary);
      display: flex;
      min-height: 100vh;
    }

    /* === Sidebar === */
    .sidebar {
      width: 320px;
      min-width: 320px;
      background: var(--color-surface);
      border-right: 1px solid #e2e8f0;
      padding: var(--space-lg);
      overflow-y: auto;
      max-height: 100vh;
      position: sticky;
      top: 0;
    }
    .sidebar h1 {
      font-family: var(--font-display);
      font-size: var(--font-size-lg);
      margin-bottom: var(--space-lg);
    }
    .token-section {
      margin-bottom: var(--space-lg);
    }
    .token-section h2 {
      font-family: var(--font-display);
      font-size: var(--font-size-base);
      font-weight: 600;
      margin-bottom: var(--space-sm);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 12px;
    }
    .token-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-xs);
      gap: var(--space-sm);
    }
    .token-row label {
      font-size: var(--font-size-sm);
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .token-row input[type="color"] {
      width: 36px;
      height: 28px;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      cursor: pointer;
      padding: 2px;
    }
    .token-row input[type="range"] {
      width: 100px;
    }
    .token-row select {
      width: 140px;
      padding: 4px 8px;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      font-size: var(--font-size-sm);
    }
    .token-row .value-display {
      font-size: 12px;
      color: var(--color-text-secondary);
      font-family: var(--font-mono);
      min-width: 40px;
      text-align: right;
    }
    .sidebar-actions {
      display: flex;
      gap: var(--space-sm);
      margin-top: var(--space-lg);
    }
    .sidebar-actions button {
      flex: 1;
      padding: var(--space-sm) var(--space-md);
      border: 1px solid #e2e8f0;
      border-radius: var(--layout-border-radius);
      cursor: pointer;
      font-size: var(--font-size-sm);
      font-family: var(--font-body);
      background: var(--color-background);
    }
    .sidebar-actions button:hover {
      background: var(--color-primary);
      color: white;
      border-color: var(--color-primary);
    }

    /* === Main Content === */
    .main {
      flex: 1;
      padding: var(--space-lg);
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }
    .toolbar input[type="text"] {
      flex: 1;
      max-width: 400px;
      padding: var(--space-sm) var(--space-md);
      border: 1px solid #e2e8f0;
      border-radius: var(--layout-border-radius);
      font-size: var(--font-size-base);
      font-family: var(--font-body);
    }
    .page-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
      gap: var(--space-lg);
    }
    .page-card {
      border: 1px solid #e2e8f0;
      border-radius: var(--layout-border-radius-lg);
      overflow: hidden;
      background: var(--color-background);
      box-shadow: var(--layout-shadow);
    }
    .page-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-sm) var(--space-md);
      background: var(--color-surface);
      border-bottom: 1px solid #e2e8f0;
    }
    .page-card-header h3 {
      font-family: var(--font-display);
      font-size: var(--font-size-sm);
      font-weight: 600;
    }
    .page-card-header a {
      font-size: var(--font-size-sm);
      color: var(--color-primary);
      text-decoration: none;
    }
    .page-card-header a:hover {
      text-decoration: underline;
    }
    .page-card iframe {
      width: 100%;
      height: 400px;
      border: none;
      display: block;
    }

    /* === Responsive === */
    @media (max-width: 768px) {
      body { flex-direction: column; }
      .sidebar {
        width: 100%;
        min-width: unset;
        max-height: unset;
        position: static;
        border-right: none;
        border-bottom: 1px solid #e2e8f0;
      }
      .page-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Sidebar: Token Editor -->
  <aside class="sidebar">
    <h1>Design Tokens</h1>

    <!-- Color Tokens -->
    <div class="token-section">
      <h2>Colors</h2>
      <!-- Repeat for each color token -->
      <div class="token-row">
        <label>Primary</label>
        <input type="color" data-token="--color-primary" value="#2563eb">
      </div>
      <div class="token-row">
        <label>Secondary</label>
        <input type="color" data-token="--color-secondary" value="#7c3aed">
      </div>
      <div class="token-row">
        <label>Accent</label>
        <input type="color" data-token="--color-accent" value="#f59e0b">
      </div>
      <div class="token-row">
        <label>Success</label>
        <input type="color" data-token="--color-success" value="#10b981">
      </div>
      <div class="token-row">
        <label>Warning</label>
        <input type="color" data-token="--color-warning" value="#f59e0b">
      </div>
      <div class="token-row">
        <label>Error</label>
        <input type="color" data-token="--color-error" value="#ef4444">
      </div>
      <div class="token-row">
        <label>Background</label>
        <input type="color" data-token="--color-background" value="#ffffff">
      </div>
      <div class="token-row">
        <label>Surface</label>
        <input type="color" data-token="--color-surface" value="#f8fafc">
      </div>
      <div class="token-row">
        <label>Text Primary</label>
        <input type="color" data-token="--color-text-primary" value="#0f172a">
      </div>
      <div class="token-row">
        <label>Text Secondary</label>
        <input type="color" data-token="--color-text-secondary" value="#64748b">
      </div>
    </div>

    <!-- Typography Tokens -->
    <div class="token-section">
      <h2>Typography</h2>
      <div class="token-row">
        <label>Display Font</label>
        <select data-token="--font-display">
          <option value="'Inter', sans-serif">Inter</option>
          <option value="'Roboto', sans-serif">Roboto</option>
          <option value="'Open Sans', sans-serif">Open Sans</option>
          <option value="'Lato', sans-serif">Lato</option>
          <option value="'Poppins', sans-serif">Poppins</option>
          <option value="'Nunito', sans-serif">Nunito</option>
          <option value="'Raleway', sans-serif">Raleway</option>
          <option value="'Montserrat', sans-serif">Montserrat</option>
          <option value="'DM Sans', sans-serif">DM Sans</option>
          <option value="'Merriweather', serif">Merriweather</option>
          <option value="'Playfair Display', serif">Playfair Display</option>
          <option value="'Lora', serif">Lora</option>
        </select>
      </div>
      <div class="token-row">
        <label>Body Font</label>
        <select data-token="--font-body">
          <option value="'Inter', sans-serif">Inter</option>
          <option value="'Roboto', sans-serif">Roboto</option>
          <option value="'Open Sans', sans-serif">Open Sans</option>
          <option value="'Lato', sans-serif">Lato</option>
          <option value="'Poppins', sans-serif">Poppins</option>
          <option value="'Nunito', sans-serif">Nunito</option>
          <option value="'Source Sans 3', sans-serif">Source Sans 3</option>
          <option value="'DM Sans', sans-serif">DM Sans</option>
          <option value="'Noto Serif', serif">Noto Serif</option>
          <option value="'Source Serif 4', serif">Source Serif 4</option>
        </select>
      </div>
    </div>

    <!-- Spacing Tokens -->
    <div class="token-section">
      <h2>Spacing</h2>
      <div class="token-row">
        <label>XS</label>
        <input type="range" data-token="--space-xs" min="0" max="16" value="4">
        <span class="value-display">4px</span>
      </div>
      <div class="token-row">
        <label>SM</label>
        <input type="range" data-token="--space-sm" min="2" max="24" value="8">
        <span class="value-display">8px</span>
      </div>
      <div class="token-row">
        <label>MD</label>
        <input type="range" data-token="--space-md" min="8" max="32" value="16">
        <span class="value-display">16px</span>
      </div>
      <div class="token-row">
        <label>LG</label>
        <input type="range" data-token="--space-lg" min="12" max="48" value="24">
        <span class="value-display">24px</span>
      </div>
      <div class="token-row">
        <label>XL</label>
        <input type="range" data-token="--space-xl" min="16" max="64" value="32">
        <span class="value-display">32px</span>
      </div>
      <div class="token-row">
        <label>2XL</label>
        <input type="range" data-token="--space-2xl" min="24" max="96" value="48">
        <span class="value-display">48px</span>
      </div>
    </div>

    <!-- Layout Tokens -->
    <div class="token-section">
      <h2>Layout</h2>
      <div class="token-row">
        <label>Border Radius</label>
        <input type="range" data-token="--layout-border-radius" min="0" max="24" value="8">
        <span class="value-display">8px</span>
      </div>
      <div class="token-row">
        <label>Radius LG</label>
        <input type="range" data-token="--layout-border-radius-lg" min="0" max="32" value="16">
        <span class="value-display">16px</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="sidebar-actions">
      <button onclick="resetTokens()">Reset</button>
      <button onclick="exportTokens()">Export CSS</button>
    </div>
  </aside>

  <!-- Main: Page Grid -->
  <main class="main">
    <div class="toolbar">
      <input type="text" id="search" placeholder="Filter pages..." oninput="filterPages(this.value)">
    </div>
    <div class="page-grid" id="pageGrid">
      <!-- Repeat for each page -->
      <div class="page-card" data-page-name="page-name">
        <div class="page-card-header">
          <h3>Page Name</h3>
          <a href="pages/page-name.html" target="_blank">Open full &rarr;</a>
        </div>
        <iframe src="pages/page-name.html"></iframe>
      </div>
      <!-- /Repeat -->
    </div>
  </main>

  <script>
    // =========================================================
    // Token State
    // =========================================================
    const DEFAULT_TOKENS = {
      '--color-primary': '#2563eb',
      '--color-secondary': '#7c3aed',
      '--color-accent': '#f59e0b',
      '--color-success': '#10b981',
      '--color-warning': '#f59e0b',
      '--color-error': '#ef4444',
      '--color-background': '#ffffff',
      '--color-surface': '#f8fafc',
      '--color-text-primary': '#0f172a',
      '--color-text-secondary': '#64748b',
      '--font-display': "'Inter', sans-serif",
      '--font-body': "'Inter', sans-serif",
      '--font-size-base': '16px',
      '--font-size-sm': '14px',
      '--font-size-lg': '20px',
      '--space-xs': '4px',
      '--space-sm': '8px',
      '--space-md': '16px',
      '--space-lg': '24px',
      '--space-xl': '32px',
      '--space-2xl': '48px',
      '--layout-max-width': '1200px',
      '--layout-border-radius': '8px',
      '--layout-border-radius-lg': '16px',
      '--layout-shadow': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)'
    };

    let currentTokens = { ...DEFAULT_TOKENS };

    // =========================================================
    // Token Propagation
    // =========================================================
    function broadcastToken(tokenName, value) {
      currentTokens[tokenName] = value;
      // Apply to gallery itself
      document.documentElement.style.setProperty(tokenName, value);
      // Broadcast to all iframes
      const iframes = document.querySelectorAll('.page-card iframe');
      iframes.forEach(function(iframe) {
        iframe.contentWindow.postMessage({
          type: 'token-update',
          tokens: { [tokenName]: value }
        }, '*');
      });
    }

    // =========================================================
    // Input Handlers
    // =========================================================
    // Color pickers
    document.querySelectorAll('input[type="color"][data-token]').forEach(function(input) {
      input.addEventListener('input', function() {
        broadcastToken(input.dataset.token, input.value);
      });
    });

    // Selects (fonts)
    document.querySelectorAll('select[data-token]').forEach(function(select) {
      select.addEventListener('change', function() {
        broadcastToken(select.dataset.token, select.value);
      });
    });

    // Range sliders (spacing, radius)
    document.querySelectorAll('input[type="range"][data-token]').forEach(function(input) {
      input.addEventListener('input', function() {
        var value = input.value + 'px';
        broadcastToken(input.dataset.token, value);
        var display = input.parentElement.querySelector('.value-display');
        if (display) display.textContent = value;
      });
    });

    // =========================================================
    // Search / Filter
    // =========================================================
    function filterPages(query) {
      var cards = document.querySelectorAll('.page-card');
      var q = query.toLowerCase();
      cards.forEach(function(card) {
        var name = card.dataset.pageName || '';
        card.style.display = name.toLowerCase().includes(q) ? '' : 'none';
      });
    }

    // =========================================================
    // Reset
    // =========================================================
    function resetTokens() {
      currentTokens = { ...DEFAULT_TOKENS };
      Object.entries(DEFAULT_TOKENS).forEach(function([key, value]) {
        document.documentElement.style.setProperty(key, value);
        // Reset input controls
        var input = document.querySelector('[data-token="' + key + '"]');
        if (!input) return;
        if (input.type === 'color') {
          input.value = value;
        } else if (input.type === 'range') {
          input.value = parseInt(value);
          var display = input.parentElement.querySelector('.value-display');
          if (display) display.textContent = value;
        } else if (input.tagName === 'SELECT') {
          input.value = value;
        }
      });
      // Broadcast all to iframes
      var iframes = document.querySelectorAll('.page-card iframe');
      iframes.forEach(function(iframe) {
        iframe.contentWindow.postMessage({
          type: 'token-update',
          tokens: DEFAULT_TOKENS
        }, '*');
      });
    }

    // =========================================================
    // Export
    // =========================================================
    function exportTokens() {
      var css = ':root {\n';
      Object.entries(currentTokens).forEach(function([key, value]) {
        css += '  ' + key + ': ' + value + ';\n';
      });
      css += '}\n';

      // Create a download
      var blob = new Blob([css], { type: 'text/css' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'tokens.css';
      a.click();
      URL.revokeObjectURL(url);
    }
  </script>
</body>
</html>
```

## Key Implementation Notes

1. **Page cards**: Generate one `.page-card` div per page in the page list. Set `data-page-name` to the kebab-case page name for search/filter.

2. **DEFAULT_TOKENS object**: Must match the tokens the user confirmed in Phase 2. Update the values in the script to reflect actual user choices.

3. **Font select options**: When the user chose non-default fonts, ensure those fonts appear as selected in the dropdowns.

4. **iframe sizing**: The default height of 400px works well for preview. Users can click "Open full" to see the page at natural size.

5. **postMessage security**: Using `'*'` as the target origin is acceptable here since all content is local. In production, restrict to the specific origin.

6. **Export**: The export function captures the live token state, not the original defaults, so users get their customized values.
