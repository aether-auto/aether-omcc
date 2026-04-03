---
name: autopilot
description: Full autonomous execution from idea to working code
level: 4
---

<Purpose>
Autopilot takes a brief product idea and autonomously handles the full lifecycle: requirements analysis, technical design, planning, parallel implementation, QA cycling, and multi-perspective validation. It produces working, verified code from a 2-3 line description.
</Purpose>

<Use_When>
- User wants end-to-end autonomous execution from an idea to working code
- User says "autopilot", "auto pilot", "autonomous", "build me", "create me", "make me", "full auto", "handle it all", or "I want a/an..."
- Task requires multiple phases: planning, coding, testing, and validation
- User wants hands-off execution and is willing to let the system run to completion
</Use_When>

<Do_Not_Use_When>
- User wants to explore options or brainstorm -- use `plan` skill instead
- User says "just explain", "draft only", or "what would you suggest" -- respond conversationally
- User wants a single focused code change -- use `ralph` or delegate to an executor agent
- User wants to review or critique an existing plan -- use `plan --review`
- Task is a quick fix or small bug -- use direct executor delegation
</Do_Not_Use_When>

<Why_This_Exists>
Most non-trivial software tasks require coordinated phases: understanding requirements, designing a solution, implementing in parallel, testing, and validating quality. Autopilot orchestrates all of these phases automatically so the user can describe what they want and receive working code without managing each step.
</Why_This_Exists>

<Execution_Policy>
- Each phase must complete before the next begins
- Parallel execution is used within phases where possible (Phase 2 and Phase 4)
- QA cycles repeat up to 5 times; if the same error persists 3 times, stop and report the fundamental issue
- Validation requires approval from all reviewers; rejected items get fixed and re-validated
- Cancel with `/oh-my-claudecode:cancel` at any time; progress is preserved for resume
</Execution_Policy>

<Steps>
1. **Phase 0 - Expansion**: Turn the user's idea into a detailed spec
   - **If ralplan consensus plan exists** (`.omc/plans/ralplan-*.md` or `.omc/plans/consensus-*.md` from the 3-stage pipeline): Skip BOTH Phase 0 and Phase 1 — jump directly to Phase 2 (Execution). The plan has already been Planner/Architect/Critic validated.
   - **If deep-interview spec exists** (`.omc/specs/deep-interview-*.md`): Skip analyst+architect expansion, use the pre-validated spec directly as Phase 0 output. Continue to Phase 1 (Planning).
   - **If input is vague** (no file paths, function names, or concrete anchors): Offer redirect to `/deep-interview` for Socratic clarification before expanding
   - **Otherwise**: Analyst (Opus) extracts requirements, Architect (Opus) creates technical specification
   - Output: `.omc/autopilot/spec.md`

2. **Phase 1 - Planning**: Create an implementation plan from the spec
   - **If ralplan consensus plan exists**: Skip — already done in the 3-stage pipeline
   - Architect (Opus): Create plan (direct mode, no interview)
   - Critic (Opus): Validate plan
   - Output: `.omc/plans/autopilot-impl.md`

3. **Phase 2 - Execution**: Implement TODOs using 3-step pipeline per TODO (Plan → Execute → Verify)
   - **Read `.omc/todos/INDEX.md`** to get the full dependency DAG and TODO inventory
   - **Identify unblocked TODOs**: TODOs whose dependencies are all `status: done` (or have no dependencies)
   - **For EACH unblocked TODO, run the 3-step pipeline:**
     1. **Plan** — Spawn a fresh planner subagent with ONLY the TODO file and CLAUDE.md. Creates a focused implementation plan.
     2. **Execute** — Spawn `executor` agent(s) to implement the plan. Single executor for simple TODOs, team of 2-3 executors for complex TODOs. ALWAYS use `executor` — no specialist agents.
     3. **Verify** — Two parallel agents: code-simplifier reviews code quality, qa-tester runs Playwright tests from the TODO's `## Playwright Verification` section.
   - **Mark TODOs complete** when all acceptance criteria pass and Playwright verification passes: update frontmatter `status: done`
   - **Repeat**: After a batch completes, re-read INDEX.md to find newly unblocked TODOs
   - **Continue until all TODOs are `status: done`**
   - See **Per-TODO 3-Step Execution Pipeline** below

4. **Phase 3 - QA**: Cycle until all tests pass (UltraQA mode)
   - Build, lint, test, fix failures
   - Repeat up to 5 cycles
   - Stop early if the same error repeats 3 times (indicates a fundamental issue)

5. **Phase 4 - Validation**: Multi-perspective review + Playwright checklist in parallel
   - Architect (model="sonnet"): Functional completeness
   - Security-reviewer (model="sonnet"): Vulnerability check
   - Code-reviewer (model="sonnet"): Quality review
   - QA-tester (model="sonnet"): Project-wide Playwright checklist testing — reads `.omc/checklists/project-checklist.md` and tests EVERY item using Playwright MCP browser tools, reporting a complete PASS/FAIL list as the final quality gate
   - All must approve; fix and re-validate on rejection

6. **Phase 5 - Cleanup**: Delete all state files on successful completion
   - Remove `.omc/state/autopilot-state.json`, `ralph-state.json`, `ultrawork-state.json`, `ultraqa-state.json`
   - Run `/oh-my-claudecode:cancel` for clean exit
</Steps>

<Per_TODO_Execution_Pipeline>
### Per-TODO 3-Step Execution Pipeline

For EACH unblocked TODO, run these 3 steps in sequence:

#### Step 1: Plan (Fresh Context)
Spawn a planner subagent with ONLY the TODO file and CLAUDE.md. No prior conversation context.
- Agent reads TODO-NNN.md (acceptance criteria, description, references)
- Agent reads project CLAUDE.md for conventions
- Agent outputs a focused implementation plan: files to create/modify, approach, edge cases
- This ensures each TODO gets thoughtful planning, not just code generation

#### Step 2: Execute
Spawn executor agent(s) to implement the plan.
- ALWAYS use `executor` agent — no specialist agents (no frontend-dev, backend-dev, db-dev)
- For simple TODOs: single executor (model="sonnet")
- For complex TODOs: team of 2-3 executors working on different parts (model="sonnet")
- Executor receives: the plan from Step 1, the TODO's acceptance criteria, reference implementations
- CRITICAL: Executor must deliver COMPLETE, WORKING code — not scaffolding or stubs
  - All data must be real/realistic, not placeholder
  - All integrations must be wired up end-to-end
  - All UI must be functional and interactive
  - All API endpoints must return real data

#### Step 3: Verify (Parallel)
Two agents run in parallel with clean context:

a. **Code Cleanup** (code-simplifier, model="sonnet"):
   - Review all changes from Step 2
   - Improve code quality, consistency, naming
   - Remove dead code, debug artifacts
   - Ensure project conventions from CLAUDE.md are followed

b. **Playwright Testing** (qa-tester, model="sonnet"):
   - Read the TODO's `## Playwright Verification` section
   - Use Playwright MCP tools to test each item
   - For web apps: browser_navigate, browser_click, browser_fill_form, browser_snapshot, browser_take_screenshot
   - For Electron apps: use playwright-electron MCP tools
   - Report PASS/FAIL for each verification item
   - If FAIL: iterate — fix and retest (max 3 attempts)

**Overall Loop:**

```
1. READ .omc/todos/INDEX.md → parse dependency DAG and all TODO statuses
2. IDENTIFY unblocked TODOs:
   - status: pending
   - all entries in depends_on[] have status: done (or depends_on is empty)
3. If no unblocked TODOs remain AND some TODOs are still pending → ERROR: circular dependency or blocked chain
4. If all TODOs have status: done → EXIT loop, emit PIPELINE_EXECUTION_COMPLETE
5. For EACH unblocked TODO, run the 3-step pipeline (Step 1 → Step 2 → Step 3)
6. Update TODO frontmatter: status: done (or status: blocked after 3 failures)
7. UPDATE .omc/todos/INDEX.md with new statuses
8. GOTO step 1 (next iteration picks up newly unblocked TODOs)
```

**Failure Handling:**
- If a TODO fails 3 times: mark as `status: blocked`, log the error, continue with other TODOs
- If a blocked TODO is in the critical path (other TODOs depend on it): report to user via AskUserQuestion
- If all remaining TODOs are blocked: stop and present the blockers to the user

**Progress Reporting:**
After each iteration of the loop, report:
```
Execution Progress: {completed}/{total} TODOs
  Completed this round: TODO-003, TODO-005, TODO-007
  Now unblocked: TODO-008, TODO-009
  Blocked: TODO-004 (failed 3x: {error summary})
  Remaining: {count} TODOs
```
</Per_TODO_Execution_Pipeline>

<Tool_Usage>
- Use `Task(subagent_type="oh-my-claudecode:architect", ...)` for Phase 4 architecture validation
- Use `Task(subagent_type="oh-my-claudecode:security-reviewer", ...)` for Phase 4 security review
- Use `Task(subagent_type="oh-my-claudecode:code-reviewer", ...)` for Phase 4 quality review
- Agents form their own analysis first, then spawn Claude Task agents for cross-validation
- Never block on external tools; proceed with available agents if delegation fails
</Tool_Usage>

<Examples>
<Good>
User: "autopilot A REST API for a bookstore inventory with CRUD operations using TypeScript"
Why good: Specific domain (bookstore), clear features (CRUD), technology constraint (TypeScript). Autopilot has enough context to expand into a full spec.
</Good>

<Good>
User: "build me a CLI tool that tracks daily habits with streak counting"
Why good: Clear product concept with a specific feature. The "build me" trigger activates autopilot.
</Good>

<Bad>
User: "fix the bug in the login page"
Why bad: This is a single focused fix, not a multi-phase project. Use direct executor delegation or ralph instead.
</Bad>

<Bad>
User: "what are some good approaches for adding caching?"
Why bad: This is an exploration/brainstorming request. Respond conversationally or use the plan skill.
</Bad>
</Examples>

<Escalation_And_Stop_Conditions>
- Stop and report when the same QA error persists across 3 cycles (fundamental issue requiring human input)
- Stop and report when validation keeps failing after 3 re-validation rounds
- Stop when the user says "stop", "cancel", or "abort"
- If requirements were too vague and expansion produces an unclear spec, offer redirect to `/deep-interview` for Socratic clarification, or pause and ask the user for clarification before proceeding
</Escalation_And_Stop_Conditions>

<Final_Checklist>
- [ ] All 5 phases completed (Expansion, Planning, Execution, QA, Validation)
- [ ] All validators approved in Phase 4
- [ ] Playwright verification passed for each TODO (Step 3 of per-TODO pipeline)
- [ ] Project-wide checklist tested via Playwright (Phase 4 qa-tester)
- [ ] Tests pass (verified with fresh test run output)
- [ ] Build succeeds (verified with fresh build output)
- [ ] State files cleaned up
- [ ] User informed of completion with summary of what was built
</Final_Checklist>

<Advanced>
## Configuration

Optional settings in `.claude/settings.json`:

```json
{
  "omc": {
    "autopilot": {
      "maxIterations": 10,
      "maxQaCycles": 5,
      "maxValidationRounds": 3,
      "pauseAfterExpansion": false,
      "pauseAfterPlanning": false,
      "skipQa": false,
      "skipValidation": false
    }
  }
}
```

## Resume

If autopilot was cancelled or failed, run `/oh-my-claudecode:autopilot` again to resume from where it stopped.

## Best Practices for Input

1. Be specific about the domain -- "bookstore" not "store"
2. Mention key features -- "with CRUD", "with authentication"
3. Specify constraints -- "using TypeScript", "with PostgreSQL"
4. Let it run -- avoid interrupting unless truly needed

## Troubleshooting

**Stuck in a phase?** Check TODO list for blocked tasks, review `.omc/autopilot-state.json`, or cancel and resume.

**QA cycles exhausted?** The same error 3 times indicates a fundamental issue. Review the error pattern; manual intervention may be needed.

**Validation keeps failing?** Review the specific issues. Requirements may have been too vague -- cancel and provide more detail.

## Deep Interview Integration

When autopilot is invoked with a vague input, Phase 0 can redirect to `/deep-interview` for Socratic clarification:

```
User: "autopilot build me something cool"
Autopilot: "Your request is open-ended. Would you like to run a deep interview first?"
  [Yes, interview first (Recommended)] [No, expand directly]
```

If a deep-interview spec already exists at `.omc/specs/deep-interview-*.md`, autopilot uses it directly as Phase 0 output (the spec has already been mathematically validated for clarity).

### 3-Stage Pipeline: deep-interview → ralplan → autopilot

The recommended full pipeline chains three quality gates:

```
/deep-interview "vague idea"
  → Socratic Q&A → spec (ambiguity ≤ 20%)
  → /ralplan --direct → consensus plan (Planner/Architect/Critic approved)
  → /autopilot → skips Phase 0+1, starts at Phase 2 (Execution)
```

When autopilot detects a ralplan consensus plan (`.omc/plans/ralplan-*.md` or `.omc/plans/consensus-*.md`), it skips both Phase 0 (Expansion) and Phase 1 (Planning) because the plan has already been:
- Requirements-validated (deep-interview ambiguity gate)
- Architecture-reviewed (ralplan Architect agent)
- Quality-checked (ralplan Critic agent)

Autopilot starts directly at Phase 2 (Execution via Ralph + Ultrawork).
</Advanced>
