---
name: next-feature
description: "Iterative feature builder — short plan, checklist additions, optional UI specs, TODOs, build, verify, QA for one feature at a time"
level: 4
---

# Next Feature: Iterative Feature Builder

## Purpose

Build one feature at a time in an already-scaffolded project. This is the per-feature iteration command used after `/init-project`. Each invocation:

1. Short planning interview for THIS feature
2. Add to the project checklist
3. UI specs for this feature (optional — ask user)
4. Generate feature TODOs
5. Build all feature TODOs (per-TODO 3-step pipeline)
6. Verify against checklist items for this feature
7. Short QA pass

```
/next-feature "user dashboard with task list and analytics"
     │
     ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ SHORT PLAN  │──>│  CHECKLIST   │──>│  UI SPECS    │──>│   TODOs     │
│ 2-4 questions│  │ Add items   │   │ (optional)   │   │ For feature │
└─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
                                                              │
     ┌────────────────────────────────────────────────────────┘
     ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   BUILD     │──>│   VERIFY    │──>│   QA PASS   │
│ Per-TODO    │   │ Checklist   │   │ Quick tests │
│ Plan→Exec→V │   │ for feature │   │ + Playwright│
└─────────────┘   └─────────────┘   └─────────────┘
     │
     ▼
  "Feature complete! Run /next-feature for the next one."
```

## Usage

```
/aether-omcc:next-feature "feature description"
```

## Use When
- Project was scaffolded with `/init-project` (or manually)
- User wants to add ONE feature to an existing project
- User says "next feature", "add feature", "build the dashboard", "implement search"
- After completing a feature and ready for the next one

## Do Not Use When
- Project has no scaffold — run `/init-project` first
- User wants to build everything at once — use `/build-all`
- User wants to fix a bug in an existing feature — use `/fix-bug`

## Prerequisites

Before running, verify:
- Project has existing source code (at minimum, package.json and base layout)
- `.omc/specs/init-project-spec.md` OR `CLAUDE.md` exists (project context)
- If neither exists, ask user to run `/init-project` first OR provide a quick 2-question context (what's the project? what's the stack?)

## Steps

### Step 1: Short Planning Interview

This is NOT a full deep interview. Ask 2-4 focused questions via AskUserQuestion to understand THIS feature:

1. **What does this feature do?** (user-facing behavior)
2. **What data does it need?** (new models/fields, API endpoints, data sources)
3. **How should it look?** (page layout, key components — or "you decide")
4. **Any specific requirements?** (edge cases, permissions, integrations with existing features)

Read existing project context:
- `.omc/specs/init-project-spec.md` for the project brief
- `CLAUDE.md` for project conventions and stack
- `.omc/features/tracker.md` for what's already built
- `.omc/research/` for tech stack research (reuse from init-project)

Save the feature spec to `.omc/features/{feature-slug}.md`:

```markdown
# Feature: {Feature Name}

## Summary
{what it does, user-facing}

## Data
- {new models, fields, relationships}
- {new API endpoints}
- {data sources / integrations}

## UI
- {pages/components to create}
- {interactions and states}

## Requirements
- {edge cases}
- {permissions}
- {integration with existing features}

## Status: planning
```

### Step 2: Add to Project Checklist

Read the existing `.omc/checklists/project-checklist.md` (create if it doesn't exist).

Add NEW checklist items for this feature. Do NOT regenerate the entire checklist — append to it:

```markdown
## {Feature Name}
- [ ] Navigate to /{feature-route} — verify page loads with correct layout
- [ ] {specific interaction} — verify {expected behavior}
- [ ] {form submission} — verify {data persists and shows in UI}
- [ ] {error case} — verify {error message shown}
- [ ] {integration with existing feature} — verify {still works}
...
```

Each item must be a concrete Playwright-testable action + expected result.

### Step 3: UI Specs (Optional)

Ask user via AskUserQuestion:

**"Would you like to generate UI specs for this feature?"**
- **"Yes, generate specs"** → Run the ui-specs flow for just this feature's pages:
  - Reuse existing `.ui-specs/tokens.css` (don't regenerate tokens)
  - Generate new page specs in `.ui-specs/pages/{feature-page}.html`
  - Quick user review (approve/adjust)
- **"No, skip"** → Continue to TODOs. The executor will design the UI based on existing project patterns.
- **"I have a Figma design"** → Note the Figma reference for the executor

### Step 4: Generate Feature TODOs

Generate TODOs for THIS feature only (typically 1-3 TODOs per feature):

- Read the feature spec from Step 1
- Read the checklist additions from Step 2
- Read the UI specs from Step 3 (if generated)

Each TODO must:
- Be feature-sized (not micro-tasks)
- Include acceptance criteria that produce visible, verifiable changes
- Include a `## Playwright Verification` section drawn from the feature's checklist items
- Reference existing code that the feature integrates with

Append new TODOs to `.omc/todos/` (don't overwrite existing ones — use the next available number):
- Read existing `.omc/todos/INDEX.md` to find the next TODO number
- New TODOs can depend on existing completed TODOs
- Update INDEX.md with the new TODOs

### Step 5: Build Feature TODOs

Run the per-TODO 3-step execution pipeline for each new TODO:

```
For each feature TODO:
  Step 1 — Plan (fresh planner subagent):
    - Read the TODO + CLAUDE.md + feature spec
    - Create focused implementation plan
    - Include how this feature INTEGRATES with existing code

  Step 2 — Execute (executor agent):
    - Implement complete, working feature
    - Wire up ALL integrations (data flows, navigation, API connections)
    - Include real data, not placeholders
    - CRITICAL: Feature must be fully functional when done — not scaffolding

  Step 3 — Verify (parallel):
    - Code-simplifier: review code quality of new changes
    - QA-tester: run Playwright tests from TODO's verification section
```

Mark TODOs as done when verified.

### Step 6: Feature Checklist Verification

After all feature TODOs are built, run a focused verification against ONLY this feature's checklist items:

```
Agent(
  subagent_type="aether-omcc:qa-tester",
  model="sonnet",
  prompt="Read .omc/checklists/project-checklist.md.
  Find the section for '{Feature Name}'.
  Test EVERY item in that section using Playwright MCP tools.
  Also spot-check 3-5 items from OTHER sections to catch regressions.
  Report PASS/FAIL for each item."
)
```

If any items fail: fix and re-verify (max 2 attempts).

### Step 7: Short QA Pass

Quick quality checks:

1. **Build**: `npm run build` — must succeed
2. **Lint**: `npm run lint` — must pass
3. **Tests**: `npm test` — all tests must pass (old AND new)
4. **Playwright smoke**: Navigate to the new feature page, verify it loads, click through main interactions

### Step 8: Update Feature Tracker & Report

Update `.omc/features/tracker.md`:
- Move this feature from roadmap to completed
- Note what was built

Present the result:

```
## Feature Complete: {Feature Name}

### What Was Built
- {pages/components created}
- {API endpoints added}
- {data models added}

### Verification
| Check | Result |
|-------|--------|
| Feature checklist | {X}/{Y} items passing |
| Build | PASS |
| Tests | {N} passed, 0 failed |
| Playwright | PASS |

### Feature Tracker
- Completed: {list of all completed features}
- Remaining: {list from roadmap}

### Next Steps
Run `/aether-omcc:next-feature "next feature description"` to continue.
Or run `/aether-omcc:table "idea"` to save ideas for later.
```

## Key Behaviors

- **Short planning** — 2-4 questions, not 20 rounds. Feature details, not project vision.
- **Additive checklist** — Append to existing checklist, never regenerate from scratch.
- **Incremental TODOs** — Add new TODOs, don't overwrite existing completed ones.
- **Integration-aware** — Each feature must wire into existing code, not exist in isolation.
- **User controls the pace** — Feature is complete, user decides when to start the next one.
- **Reuse context** — Tech stack research, design tokens, project conventions carry forward.

## Escalation & Stop Conditions

- **No scaffold exists**: Ask user to run `/init-project` or provide quick project context
- **Feature too large** (would need 5+ TODOs): Suggest splitting into sub-features
- **Checklist verification fails after 2 attempts**: Report failing items to user
- **Build/tests break**: Spawn debugger agent, fix before reporting completion
- **User says "stop" or "cancel"**: Save progress, feature can be resumed later
