---
name: plan-all
description: "Phase 1: Planning — interview + plan + research + UI specs + checklist + TODOs with confirmation gate before building"
level: 4
---

# Plan-All: Phase 1 — Planning

## Purpose

This is **Phase 1** of a 2-phase pipeline: **Planning → Building**.

Run the complete planning pipeline: deep interview → consensus planning → deep research → UI specs → exhaustive test checklist → TODO generation. Each stage builds on the previous. A confirmation gate at the end ensures the user approves before Phase 2 (Building) begins.

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: PLANNING (/plan-all)                                   │
│ Interview → Plan → Research → UI Specs → Checklist → TODOs     │
│                                            ↓                     │
│                                   [CONFIRMATION GATE]            │
│                                            ↓                     │
│ PHASE 2: BUILDING (/autopilot or /build-all)                    │
│ Per-TODO: Plan → Execute → Verify → ... → Full Validation       │
└─────────────────────────────────────────────────────────────────┘
```

## Pipeline Stages

### Stage 1: Deep Interview (Spec Generation)

**Skip if:** `.omc/specs/deep-interview-*.md` already exists

1. Invoke `/aether-omcc:deep-interview` skill
2. Conduct Socratic interview with mathematical ambiguity gating (threshold = 0%)
3. Multiple questions per topic per round for comprehensive context
4. Output: `.omc/specs/deep-interview-{slug}.md`

### Stage 2: Consensus Planning (Ralplan)

**Skip if:** `.omc/plans/consensus-*.md` or `.omc/plans/ralplan-*.md` already exists

1. Invoke `/aether-omcc:ralplan` with `--consensus --direct` flags
2. Three-stage consensus: Planner → Architect → Critic
3. Output: `.omc/plans/consensus-{slug}.md`

### Stage 3: Deep Research (Smart Detection)

**Skip if:** `.omc/research/summary.md` already exists OR plan is simple

1. Apply smart detection heuristics (skip for simple projects, run for complex ones)
2. If running: invoke `/aether-omcc:deep-research` skill
3. Output: `.omc/research/summary.md` + per-topic files

### Stage 4: UI Specifications

**Skip if:** `.ui-specs/index.html` already exists OR plan has no UI components

1. Invoke `/aether-omcc:ui-specs` skill
2. Design tokens, per-page specs, interactive gallery
3. **USER GATE**: AskUserQuestion to approve specs before continuing
4. Output: `.ui-specs/` directory

### Stage 5: Test Checklist Generation

1. Invoke `/aether-omcc:checklist` skill
2. Read plan, UI specs, and spec to generate an EXHAUSTIVE test checklist
3. Covers every page, form, button, component, interaction, state, and responsive breakpoint
4. Output: `.omc/checklists/project-checklist.md`
5. This checklist is used by: per-TODO Playwright verification AND Phase 2 final validation

### Stage 6: TODO Generation

1. Invoke `/aether-omcc:todos` skill
2. Read ALL planning artifacts (spec, plan, research, UI specs, checklist)
3. Generate feature-sized TODOs (8-15 per project) with:
   - Complete acceptance criteria (not scaffolding — real, working features)
   - Playwright Verification section (drawn from the project checklist)
   - Reference implementations from popular codebases
4. Generate `.omc/todos/INDEX.md` with dependency DAG
5. **USER GATE**: AskUserQuestion to approve TODOs
6. Output: `.omc/todos/` directory

## Confirmation Gate

After all stages complete, present a summary and ask for confirmation:

```
## Phase 1: Planning Complete

### Artifacts Generated
- Spec: .omc/specs/deep-interview-{slug}.md
- Plan: .omc/plans/consensus-{slug}.md
- Research: .omc/research/summary.md (X topics)
- UI Specs: .ui-specs/ (Y pages, Z tokens)
- Test Checklist: .omc/checklists/project-checklist.md (N test items)
- TODOs: .omc/todos/ (M tasks)

### Ready for Phase 2: Building?
```

Use AskUserQuestion:
- **"Start building"** → Proceed to Phase 2 (invoke `/aether-omcc:autopilot`)
- **"Review artifacts"** → List all generated files for review
- **"Make changes"** → Return to modify specific stage outputs
- **"Stop here"** → End planning, build later manually

## Error Handling

- If any stage fails, report the error and ask user whether to retry or skip
- If artifacts already exist but are outdated, ask whether to regenerate or reuse
- If deep research times out, proceed with existing knowledge and note the gap

## Flags

- `--skip-research` — Skip deep research stage
- `--skip-ui` — Skip UI specs stage (backend-only projects)
- `--force` — Regenerate all artifacts even if they exist
