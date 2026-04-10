---
name: checklist
description: Generate exhaustive project-wide test checklist covering every UI interaction, form, button, and component
level: 3
---

# Test Checklist Generation

Generate an exhaustive project-wide test checklist that covers every UI interaction, form, button, page, component, and data flow in the project. This runs AFTER planning and UI specs are done, BEFORE TODOs are created.

## Usage

```
/aether-omcc:checklist
```

## Inputs

The skill reads planning and spec artifacts in this priority order:

1. **Plan** (required): `.omc/plans/ralplan-*.md` or `.omc/plans/consensus-*.md`
2. **UI specs** (optional): `.ui-specs/` directory
3. **Spec** (optional): `.omc/specs/deep-interview-*.md`

If no plan is found, stop and instruct the user to run `/aether-omcc:ralplan` first.

## Outputs

- `.omc/checklists/project-checklist.md` — master test checklist

## Workflow

### Step 1: Read All Artifacts

1. Read the plan from `.omc/plans/ralplan-*.md` or `.omc/plans/consensus-*.md`.
2. Read UI specs from `.ui-specs/` if the directory exists.
3. Read the spec from `.omc/specs/deep-interview-*.md` if it exists.

### Step 2: Extract Every Interactive Element

From the plan and specs, extract:
- Every page/route in the application
- Every form and its fields (valid + invalid submissions)
- Every button, link, and clickable element
- Every interactive component (modals, dropdowns, toggles, tabs, accordions, etc.)
- Every loading, empty, and error state
- Every responsive breakpoint behavior
- Every data flow (create -> appears in list, delete -> removed from all views, edit -> updated everywhere)
- Every navigation path (forward, back, breadcrumbs, deep links)
- Every authentication/authorization gate

### Step 3: Generate the Exhaustive Checklist

Create `.omc/checklists/project-checklist.md` with the following structure:

```markdown
# Project Test Checklist

## Pages & Navigation
- [ ] Navigate to / (home page) — verify {expected content}
- [ ] Navigate to /dashboard — verify {expected content}
- [ ] Click "Login" link — verify redirect to /login
- [ ] Click browser back button — verify correct navigation
- [ ] Deep link to /settings/profile — verify page loads correctly
- [ ] Navigate to non-existent route — verify 404 page shown
...

## Forms & Inputs
- [ ] Login form: fill email + password, submit — verify redirect to dashboard
- [ ] Login form: submit empty — verify validation errors shown
- [ ] Login form: submit wrong password — verify error message
- [ ] Registration form: fill all fields, submit — verify account created
- [ ] Date picker on /events: select date — verify events filter
- [ ] Search input: type query — verify results update
- [ ] Form with required fields: skip required field — verify inline error
...

## Buttons & Interactions
- [ ] Click "Add Task" button — verify new task form appears
- [ ] Click "Delete" on task — verify confirmation dialog
- [ ] Click "Confirm Delete" — verify task removed from list
- [ ] Toggle dark mode switch — verify theme changes
- [ ] Click pagination "Next" — verify next page of results
- [ ] Click sort column header — verify data re-sorts
...

## Components & States
- [ ] Loading spinner shown while data fetches
- [ ] Empty state shown when no items exist
- [ ] Error state shown on API failure
- [ ] Toast notification appears on successful action
- [ ] Modal opens/closes correctly
- [ ] Dropdown menu items are clickable
- [ ] Tabs switch content correctly
- [ ] Accordion expands/collapses
- [ ] Tooltip appears on hover
...

## Responsive
- [ ] Mobile (375px): navigation collapses to hamburger
- [ ] Mobile (375px): forms stack vertically
- [ ] Tablet (768px): sidebar collapses
- [ ] Tablet (768px): grid switches to 2 columns
- [ ] Desktop (1280px): full layout displayed
- [ ] Desktop (1280px): sidebar visible
...

## Data & Integration
- [ ] Dashboard shows real data from API (not placeholder)
- [ ] Creating an item in form appears in the list immediately
- [ ] Deleting an item removes it from all views
- [ ] Editing an item updates it everywhere it appears
- [ ] Search filters results correctly
- [ ] Pagination shows correct total count
- [ ] Sorting persists across page navigation
...

## Authentication & Authorization
- [ ] Unauthenticated user redirected to login
- [ ] Authenticated user sees their name/avatar
- [ ] Admin user sees admin-only controls
- [ ] Non-admin user cannot access admin routes
- [ ] Session expiry redirects to login
...
```

### Step 4: Completeness Verification

Before finishing, verify:

- [ ] Every page/route from the plan has at least one navigation test
- [ ] Every form has valid submission AND at least one invalid submission test
- [ ] Every button mentioned in specs has a click + expected behavior test
- [ ] Every interactive component has open/close or toggle tests
- [ ] Loading, empty, and error states are covered for every data-driven page
- [ ] At least 3 responsive breakpoints are tested (mobile, tablet, desktop)
- [ ] Every CRUD operation has create, read, update, and delete tests
- [ ] Auth flows cover login, logout, and unauthorized access

If any check fails, go back and add the missing items.

## Purpose

This checklist serves as the EXHAUSTIVE master reference used by:
- **Per-TODO Playwright verification**: Each TODO gets the subset of checklist items relevant to its feature in the `## Playwright Verification` section.
- **Phase 4 full project validation**: The entire checklist is used for end-to-end project QA.
- **qa-tester agent**: Uses checklist items as concrete Playwright MCP test steps.

## Completion

When the checklist is generated and completeness verification passes, output:

```
PIPELINE_CHECKLIST_COMPLETE
```
