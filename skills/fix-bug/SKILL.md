---
name: fix-bug
description: Structured bug fix workflow — reproduce, diagnose, plan fix, execute, verify with Playwright and tests
level: 3
---

# Fix Bug: Structured Bug Resolution Pipeline

## Purpose

Take a bug report and resolve it through a disciplined pipeline: reproduce the bug → diagnose the root cause → plan the fix → execute the fix → verify the fix with tests and Playwright. Each step uses specialized agents with fresh context to ensure thorough, regression-safe resolution.

## Usage

```
/aether-omcc:fix-bug <bug description or symptom>
```

## Use When
- User reports a bug, error, or unexpected behavior
- User says "fix bug", "something is broken", "this doesn't work", "there's an error"
- A test is failing and needs investigation
- UI behavior doesn't match expectations
- An API returns wrong data or status codes

## Do Not Use When
- User wants a new feature — use `/aether-omcc:autopilot` or `/aether-omcc:build-all`
- User wants to explore or plan — use `/aether-omcc:plan`
- User wants a trivial one-line fix they can describe exactly — just do it directly

## Pipeline

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ 1. REPRODUCE │───>│ 2. DIAGNOSE  │───>│ 3. PLAN FIX  │───>│ 4. EXECUTE   │───>│ 5. VERIFY    │
│              │    │              │    │              │    │              │    │              │
│ Confirm the  │    │ Find root    │    │ Plan minimal │    │ Implement    │    │ Prove fix    │
│ bug exists   │    │ cause with   │    │ surgical     │    │ the fix      │    │ works, no    │
│              │    │ evidence     │    │ changes      │    │              │    │ regressions  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

## Steps

### Step 1: Reproduce

**Goal:** Confirm the bug exists and capture evidence of the failure.

1. **Parse the bug report** from `{{ARGUMENTS}}`
2. **Determine bug type:**
   - **UI bug** (visual, interaction, layout): Use Playwright MCP to reproduce
   - **API bug** (wrong response, status code, error): Use Bash to curl/test endpoints
   - **Logic bug** (wrong calculation, missing data): Run existing tests
   - **Build/compile error**: Run build command
3. **Reproduce the bug:**

   For **UI bugs**:
   ```
   - Start dev server if not running
   - browser_navigate to the affected page
   - browser_snapshot to capture current state
   - browser_take_screenshot as evidence of the bug
   - browser_click / browser_fill_form to trigger the bug if interaction-dependent
   - browser_console_messages to capture JS errors
   ```

   For **API bugs**:
   ```
   - Run the failing request via Bash (curl or test runner)
   - Capture the actual response vs expected response
   ```

   For **logic/test bugs**:
   ```
   - Run the specific failing test: npm test -- --filter "test name"
   - Capture the test output with expected vs actual
   ```

4. **Document the reproduction:**
   ```
   Bug: {description}
   Type: UI | API | Logic | Build
   Reproduced: YES | NO
   Evidence: {screenshot path, test output, or error message}
   Expected: {what should happen}
   Actual: {what actually happens}
   ```

   If the bug cannot be reproduced, ask the user for more context via AskUserQuestion.

### Step 2: Diagnose

**Goal:** Find the root cause with evidence, not guesswork.

Spawn a **tracer agent** (model="sonnet") with fresh context:

```
Agent(
  subagent_type="aether-omcc:tracer",
  model="sonnet",
  prompt="ROOT CAUSE ANALYSIS

  Bug: {description}
  Reproduction evidence: {from Step 1}

  Investigate:
  1. Read the relevant source files (start from the component/route/handler mentioned in the bug)
  2. Trace the data flow from input to output
  3. Form 2-3 competing hypotheses for the root cause
  4. Gather evidence FOR and AGAINST each hypothesis
  5. Identify the single most likely root cause with file:line reference

  Report:
  - Root cause: {file:line — what's wrong and why}
  - Evidence: {what you found that confirms this}
  - Ruled out: {other hypotheses and why they're wrong}
  - Blast radius: {what else might be affected by this code path}
  "
)
```

If the tracer is uncertain (confidence < medium), spawn an **architect agent** for a second opinion:

```
Agent(
  subagent_type="aether-omcc:architect",
  model="sonnet",
  prompt="SECOND OPINION on root cause analysis for bug: {description}
  Tracer's hypothesis: {tracer findings}
  Do you agree? If not, what's your alternative hypothesis with evidence?"
)
```

### Step 3: Plan Fix

**Goal:** Plan the minimal, surgical changes needed to fix the bug without introducing regressions.

Spawn a fresh **planner subagent** (model="sonnet"):

```
Agent(
  subagent_type="Plan",
  model="sonnet",
  prompt="PLAN BUG FIX

  Bug: {description}
  Root cause: {from Step 2 — file:line, what's wrong}
  Blast radius: {what else might be affected}

  Create a minimal fix plan:
  1. List EXACT files to modify (with line numbers)
  2. Describe WHAT to change in each file (not how — the executor decides implementation)
  3. List what tests to add/modify to prevent regression
  4. List what Playwright checks to run after the fix (if UI-related)
  5. Flag any risky side effects

  CONSTRAINTS:
  - Minimal changes — fix the bug, don't refactor surrounding code
  - No scope creep — only fix THIS bug
  - If the fix touches shared code, note which other features might be affected
  "
)
```

Present the fix plan to the user via AskUserQuestion:

```
Bug: {description}
Root cause: {file:line — explanation}
Planned fix: {summary of changes}
Files to modify: {list}
Risk: {low/medium/high}

Proceed with fix?
  [Yes, fix it] [Modify plan] [Cancel]
```

### Step 4: Execute

**Goal:** Implement the fix with the executor agent.

Spawn an **executor agent** (model="sonnet"):

```
Agent(
  subagent_type="aether-omcc:executor",
  model="sonnet",
  prompt="IMPLEMENT BUG FIX

  Bug: {description}
  Root cause: {file:line}
  Fix plan: {from Step 3}

  Instructions:
  1. Make the MINIMAL changes described in the fix plan
  2. Add or update tests that cover the bug scenario
  3. Ensure the fix is COMPLETE — not a partial workaround
  4. Run tests after changes to verify they pass
  5. Do NOT refactor, clean up, or improve surrounding code — surgical fix only
  "
)
```

After the executor completes, spawn a **code-simplifier** (model="sonnet") to review the changes:

```
Agent(
  subagent_type="aether-omcc:code-simplifier",
  model="sonnet",
  prompt="Review the bug fix changes. Ensure:
  - Fix is minimal and surgical (no unnecessary changes)
  - New tests are well-written
  - No debug artifacts left behind
  - Fix doesn't introduce new issues
  Only clean up the fix itself — don't touch surrounding code."
)
```

### Step 5: Verify

**Goal:** Prove the bug is fixed AND no regressions were introduced.

Run these verification steps in parallel:

#### 5a. Test Suite Verification
```
- Run the full test suite: npm test
- Verify all tests pass (old AND new)
- If any test fails that passed before the fix: REGRESSION — go back to Step 4
```

#### 5b. Bug-Specific Verification
Re-run the exact reproduction steps from Step 1:

For **UI bugs** — Playwright verification:
```
Agent(
  subagent_type="aether-omcc:qa-tester",
  model="sonnet",
  prompt="VERIFY BUG FIX

  Original bug: {description}
  Reproduction steps from Step 1: {steps}

  1. Re-run the exact reproduction steps using Playwright MCP tools
  2. Verify the bug is GONE:
     - browser_navigate to the affected page
     - browser_snapshot to verify correct state
     - browser_take_screenshot as evidence the fix works
     - browser_click / browser_fill_form to verify the interaction works
     - browser_console_messages to verify no JS errors
  3. Test related pages/features for regressions:
     - Navigate to pages that share code with the fix
     - Verify they still work correctly
  4. Report PASS/FAIL with screenshot evidence
  "
)
```

For **API bugs**:
```
- Re-run the failing request — verify correct response
- Test related endpoints for regressions
```

For **logic bugs**:
```
- Re-run the specific test — verify it passes
- Run related test suites for regressions
```

#### 5c. Project Checklist Spot-Check (if exists)
If `.omc/checklists/project-checklist.md` exists, run a spot-check of items related to the affected area:
```
Agent(
  subagent_type="aether-omcc:qa-tester",
  model="haiku",
  prompt="Read .omc/checklists/project-checklist.md.
  Find items related to: {affected feature/page/component}.
  Test ONLY those items using Playwright MCP tools.
  Report PASS/FAIL for each."
)
```

### Step 6: Report

Present the final result:

```
## Bug Fix Complete

**Bug:** {description}
**Root Cause:** {file:line — explanation}
**Fix:** {what was changed}
**Files Modified:** {list with line counts}

### Verification
| Check | Result |
|-------|--------|
| Tests | {PASS: X passed, 0 failed} |
| Bug reproduction | {FIXED: screenshot/evidence} |
| Regression check | {PASS: no regressions} |
| Playwright verification | {PASS/N/A} |

### Changes Ready to Commit
{summary of staged changes}
```

If any verification fails, loop back to Step 4 (max 3 attempts). After 3 failures, report the issue to the user with findings.

## Escalation & Stop Conditions

- **Cannot reproduce:** Ask user for more details, try alternative reproduction approaches. Stop after 3 failed attempts.
- **Root cause unclear:** Use architect for second opinion. If still unclear, present competing hypotheses to user.
- **Fix causes regressions:** Roll back fix, re-diagnose. The root cause hypothesis may be wrong.
- **3 failed fix attempts:** Stop and present findings — the bug may require architectural changes beyond a surgical fix.
- **User says "stop" or "cancel":** Stop immediately, preserve diagnostic findings for future reference.

## Tool Usage

- **Playwright MCP**: `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_fill_form`, `browser_take_screenshot`, `browser_console_messages` for UI bug reproduction and verification
- **Playwright Electron MCP**: Use `electron_*` tools instead for Electron app bugs
- **Bash**: Run tests (`npm test`), build (`npm run build`), curl API endpoints
- **Tracer agent**: Root cause analysis with competing hypotheses
- **Executor agent**: Implement the fix (ONLY code-writing agent)
- **Code-simplifier**: Review fix quality
- **QA-tester**: Playwright verification of the fix
- **AskUserQuestion**: Present fix plan for approval, ask for reproduction details

## Final Checklist

- [ ] Bug reproduced with evidence (screenshot, test output, or error message)
- [ ] Root cause identified with file:line reference and evidence
- [ ] Fix plan approved by user
- [ ] Fix implemented by executor agent
- [ ] Fix reviewed by code-simplifier
- [ ] All tests pass (old AND new)
- [ ] Bug-specific reproduction confirms fix works
- [ ] No regressions detected
- [ ] Playwright verification passed (for UI bugs)
