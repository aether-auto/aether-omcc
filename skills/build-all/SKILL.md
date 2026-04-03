---
name: build-all
description: "Full 2-phase pipeline: Phase 1 Planning (interview → plan → specs → checklist → TODOs) then Phase 2 Building (autopilot execution)"
level: 4
---

# Build-All: 2-Phase Pipeline (Planning → Building)

## Purpose

Run the complete development pipeline from idea to working code. Two distinct phases with a confirmation gate between them.

```
┌────────────────────────────────────────┐     ┌────────────────────────────────────┐
│ PHASE 1: PLANNING                      │     │ PHASE 2: BUILDING                  │
│ Interview → Plan → Research →          │     │ Per-TODO: Plan → Execute → Verify  │
│ UI Specs → Checklist → TODOs           │────>│ QA Cycling → Full Validation       │
│                                        │     │ Project Checklist Testing           │
└────────────────────────────────────────┘     └────────────────────────────────────┘
                                   ↑
                          [CONFIRMATION GATE]
```

## Phase 1: Planning

Invoke `/aether-omcc:plan-all` to run the complete planning pipeline:
1. Deep Interview → Spec (0% ambiguity threshold)
2. Consensus Planning → Plan (Planner/Architect/Critic)
3. Deep Research → Research findings (smart detection)
4. UI Specifications → Visual specs (user approval gate)
5. Test Checklist → Exhaustive project-wide test inventory
6. TODO Generation → Feature-sized task checklists with Playwright verification

The plan-all skill handles all user approval gates (UI specs, TODOs).

## Confirmation Gate

After planning completes, use AskUserQuestion:

**"Phase 1 complete. All planning artifacts generated and approved. Ready to start building?"**

- **"Start building"** → proceed to Phase 2
- **"Review artifacts"** → list all generated files
- **"Make changes"** → return to modify specific artifacts
- **"Stop here"** → end, build later manually

## Phase 2: Building

Invoke `/aether-omcc:autopilot` to start autonomous implementation.

Autopilot detects existing planning artifacts and skips expansion/planning:
- Existing spec → skip Phase 0
- Existing plan → skip Phase 1
- Starts at Phase 2 (Execution) with per-TODO 3-step pipeline

The autopilot handles:
- **Execution**: Per-TODO pipeline — Plan (fresh context) → Execute (executor agents) → Verify (code cleanup + Playwright testing)
- **QA**: Build/lint/test cycling
- **Validation**: Multi-perspective review + full project checklist Playwright testing
- **Cleanup**: Remove state files on success

## Completion Summary

```
## Build Complete

### What Was Built
- {N} TODOs completed
- {X} files created/modified
- {Y} tests passing

### Verification
- Functional review: APPROVED
- Security review: APPROVED
- Code quality: APPROVED
- Project checklist: {passed}/{total} items passing

### Next Steps
- Run `/aether-omcc:review` for a fresh-context code review
- Push to remote with `git push`
```

## Error Handling

- If a TODO fails 3 times during execution, mark as blocked and continue
- Present blocked TODOs at completion for manual resolution
- If user cancels during execution, preserve all completed work

## Flags

- `--skip-research` — Skip deep research stage
- `--skip-ui` — Skip UI specs (backend-only projects)
- `--team` — Use team mode for execution
- `--solo` — Use solo mode for execution
- `--force` — Regenerate all planning artifacts
