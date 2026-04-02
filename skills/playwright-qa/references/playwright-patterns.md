# Playwright MCP Testing Patterns

## Web Application Testing

### Page Load Verification
```
1. browser_navigate → http://localhost:{port}/{route}
2. browser_snapshot → verify page title, main content area, navigation
3. browser_console_messages → assert 0 errors
4. browser_take_screenshot → visual evidence
```

### Form Submission
```
1. browser_navigate → form page
2. browser_fill_form → fill all required fields
3. browser_click → submit button
4. browser_snapshot → verify success message or redirect
5. browser_console_messages → assert no errors during submission
```

### Navigation Flow
```
1. browser_navigate → starting page
2. browser_click → navigation link/button
3. browser_snapshot → verify new page content loaded
4. browser_navigate_back → verify back navigation works
```

### Modal/Dialog Interaction
```
1. browser_click → trigger element (button that opens modal)
2. browser_snapshot → verify modal content visible
3. browser_click → close button or overlay
4. browser_snapshot → verify modal dismissed
```

### Responsive Testing
```
1. browser_resize → width: 375, height: 812 (mobile)
2. browser_take_screenshot → mobile layout evidence
3. browser_resize → width: 768, height: 1024 (tablet)
4. browser_take_screenshot → tablet layout evidence
5. browser_resize → width: 1280, height: 800 (desktop)
6. browser_take_screenshot → desktop layout evidence
```

### Error State Verification
```
1. browser_navigate → page with form
2. browser_click → submit without filling required fields
3. browser_snapshot → verify validation error messages
4. browser_fill_form → fill with invalid data (wrong email format, etc.)
5. browser_click → submit
6. browser_snapshot → verify field-level error messages
```

### Authentication Flow
```
1. browser_navigate → protected route
2. browser_snapshot → verify redirect to login
3. browser_fill_form → enter credentials
4. browser_click → login button
5. browser_snapshot → verify redirect to originally requested page
6. browser_navigate → protected route again
7. browser_snapshot → verify content accessible
```

### API Integration (via Network)
```
1. browser_navigate → page that fetches data
2. browser_network_requests → verify API calls made to correct endpoints
3. browser_snapshot → verify data rendered from API response
```

### Loading States
```
1. browser_navigate → page with async data
2. browser_snapshot → verify loading indicator present (skeleton/spinner)
3. browser_wait_for → data loaded
4. browser_snapshot → verify data replaces loading state
```

## Electron App Testing

### Window Verification
- Launch app via test harness
- browser_snapshot → verify window content rendered
- browser_take_screenshot → visual evidence of main window

### Menu Interaction
- browser_click → menu bar items
- browser_snapshot → verify menu options
- browser_click → menu action
- Verify action executed

### Native Dialog Testing
- browser_handle_dialog → configure auto-accept/dismiss
- Trigger action that opens dialog
- Verify dialog appeared and was handled

## Common Assertions

### Element Presence
Use browser_snapshot output to verify:
- Element exists with expected role (button, link, heading, textbox)
- Element has expected text content
- Element has expected ARIA attributes

### Visual Regression
Use browser_take_screenshot at key states:
- Initial page load
- After interaction
- Error states
- Different viewport sizes

### Console Clean
browser_console_messages should show:
- 0 error-level messages
- No unhandled promise rejections
- No 404s for resources
