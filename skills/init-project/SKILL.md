---
name: init-project
description: "Iterative workflow kickoff — brief interview, research, scaffold TODOs, build foundation. Then use /next-feature for each feature."
level: 4
---

# Init Project: Iterative Workflow Kickoff

## Purpose

Alternative to `/build-all` for users who want to work **feature-by-feature** instead of planning everything upfront. This command handles the one-time project setup:

1. Brief interview (not the full deep interview — focused on overall vision and architecture)
2. Research the tech stack
3. Generate scaffold TODOs (project setup, base layout, auth foundation, config)
4. Build the scaffold
5. Hand off to the user — they use `/next-feature` to add features one at a time

```
┌─────────────────────────────────────────────────────────────────────┐
│ /init-project (ONE TIME)                                            │
│ Brief Interview → Research → Scaffold TODOs → Build Foundation      │
│                                                                     │
│ Then, for EACH feature:                                             │
│ /next-feature "feature description"                                 │
│ Short Plan → Checklist → UI Specs (optional) → TODOs → Build → QA  │
│                                                                     │
│ Repeat /next-feature until project is complete                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Usage

```
/aether-omcc:init-project "brief project description"
```

## Use When
- User wants to build iteratively, one feature at a time
- User has a general idea but wants to shape it as they go
- User prefers to see progress after each feature before planning the next
- Project is exploratory — requirements may evolve as features are built

## Do Not Use When
- User has a complete spec and wants everything built at once — use `/build-all`
- User already has a scaffold and wants to add a feature — use `/next-feature` directly
- User wants a quick single change — use executor or `/fix-bug`

## Steps

### Step 1: Brief Interview

A shorter version of deep-interview focused on the big picture, NOT exhaustive requirements:

Use AskUserQuestion to gather (3-5 questions max):
1. **What are you building?** (one-sentence description)
2. **Who is it for?** (target users)
3. **What's the tech stack?** (framework, database, styling — or let us recommend)
4. **What are the 3-5 main features?** (brief list — NOT detailed specs)
5. **Any constraints?** (auth method, deployment target, existing code)

This is NOT a full deep interview. We're getting just enough to scaffold intelligently. The detailed requirements for each feature come later via `/next-feature`.

Save the brief spec to `.omc/specs/init-project-spec.md`:

```markdown
# Project Brief

## Overview
{what it is, who it's for}

## Tech Stack
{framework, database, styling, etc.}

## Feature Roadmap
1. {Feature 1} — brief description
2. {Feature 2} — brief description
3. {Feature 3} — brief description
...

## Constraints
{auth, deployment, etc.}

## Status: scaffold
```

### Step 2: Research (Smart Detection)

Same as the deep-research skill but scoped to the tech stack, not individual features:
- If the tech stack involves 2+ technologies: run research
- If it's a single well-known stack (e.g., just Next.js): skip
- Focus on: project structure patterns, recommended libraries, configuration best practices
- Output: `.omc/research/` (reused by subsequent `/next-feature` calls)

### Step 3: Generate Scaffold TODOs

Create `.omc/todos/` with **only scaffold/foundation TODOs** (typically 3-5):

Examples:
- `TODO-001: Project setup and configuration` — package.json, tsconfig, eslint, env vars, git init
- `TODO-002: Base layout and navigation` — app shell, routing, shared components, design tokens
- `TODO-003: Authentication foundation` — user model, auth endpoints, session/JWT, protected routes (if auth is needed)
- `TODO-004: Database setup` — ORM config, initial migrations, seed data (if database is needed)

These are FOUNDATION TODOs — they set up the project skeleton so features can be added incrementally.

Each TODO follows the standard format with acceptance criteria and Playwright verification.

### Step 4: Build Scaffold

Run the per-TODO 3-step execution pipeline for each scaffold TODO:

```
For each scaffold TODO:
  1. Plan — Fresh planner creates focused implementation plan
  2. Execute — Executor implements complete, working scaffold
  3. Verify — Code-simplifier reviews + qa-tester verifies (if UI)
```

Mark each TODO as done when verified.

### Step 5: Initialize Feature Tracker

Create `.omc/features/tracker.md` to track iterative progress:

```markdown
# Feature Tracker

## Project
{project name from brief}

## Completed Features
(none yet — scaffold only)

## Current Feature
None — run /next-feature to start

## Feature Roadmap (from brief)
- [ ] {Feature 1}
- [ ] {Feature 2}
- [ ] {Feature 3}
...

## Tabled Ideas
See .omc/tabled-ideas.md
```

### Step 6: Hand Off to User

Present the completed scaffold:

```
## Project Scaffold Complete

### What's Built
- Project structure with {tech stack}
- Base layout with navigation
- Auth foundation (if applicable)
- Database setup (if applicable)

### Files Created
{list of key files}

### Next Steps
Run `/aether-omcc:next-feature "feature description"` to start building your first feature.

### Feature Roadmap (from your brief)
1. {Feature 1} — ready to build
2. {Feature 2}
3. {Feature 3}
```

## Key Behaviors
- Keep the interview SHORT (3-5 questions, not 10-20 rounds)
- Scaffold should be MINIMAL but WORKING — the app should start and show the base layout
- Don't plan features in detail — that happens in `/next-feature`
- Save the feature roadmap for reference but don't commit to it
