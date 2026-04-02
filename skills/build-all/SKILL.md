---
name: build-all
description: Full end-to-end pipeline — planning (interview + plan + research + UI specs + TODOs) then autopilot execution
level: 4
---

# Build-All: Complete End-to-End Pipeline

## Purpose

Run the entire development pipeline from idea to working code: complete planning phase followed by autonomous execution via autopilot. This is the highest-level orchestration command.

## Pipeline

### Phase 1: Planning

Invoke `/aether-omcc:plan-all` to run the complete planning pipeline:
1. Deep Interview → Spec
2. Consensus Planning → Plan
3. Deep Research → Research findings
4. UI Specifications → Visual specs
5. Exhaustive TODOs → Task checklists

The plan-all skill handles all user approval gates (UI specs, TODOs).

### Phase 2: Build Confirmation

After planning completes, use AskUserQuestion to confirm:

**Question:** "Planning is complete. All artifacts are generated and approved. Ready to start building?"

**Options:**
- "Start building" → proceed to Phase 3
- "Review artifacts first" → present list of all planning artifacts for review
- "Make changes" → return to plan-all for modifications
- "Cancel" → stop pipeline

### Phase 3: Autopilot Execution

Invoke `/aether-omcc:autopilot` to start autonomous implementation.

The autopilot will detect existing planning artifacts and skip expansion/planning phases:
- Existing spec at `.omc/specs/` → skip Phase 0 (Expansion)
- Existing plan at `.omc/plans/` → skip Phase 1 (Planning)
- Starts directly at Phase 2 (Execution) with agent teams

The autopilot handles:
- **Execution**: Agent teams (frontend-dev, backend-dev, db-dev) implement TODOs in dependency order
- **Verification** (Ralph): Multi-perspective review by Architect, Security-reviewer, Code-reviewer
- **QA**: Build/lint/test cycling with Playwright browser testing for UI tasks
- **Cleanup**: Remove state files on success

### Phase 4: Completion Summary

When autopilot completes, present:

```
## Build Complete

### What Was Built
- {N} TODOs completed
- {X} files created/modified
- {Y} tests passing

### Verification Status
- Architect review: APPROVED
- Security review: APPROVED
- Code review: APPROVED
- QA: ALL CHECKS PASS

### Next Steps
- Run `/aether-omcc:review` for a fresh-context code review
- Push to remote with `git push`
```

## Error Handling

- If autopilot execution fails on a TODO, it will retry with debugger agent
- If a TODO fails 3 consecutive times, mark it as blocked and move to next
- Present blocked TODOs to user at completion for manual resolution
- If user cancels during execution, preserve all completed work

## Flags

- `--skip-research` — Pass through to plan-all: skip deep research
- `--skip-ui` — Pass through to plan-all: skip UI specs
- `--team` — Use team mode for execution (parallel agent teams)
- `--solo` — Use solo mode for execution (sequential)
- `--force` — Regenerate all planning artifacts even if they exist
