---
name: table
description: Table a new idea for later — stores enriched ideas in the background without stopping current work
level: 1
---

# Table Skill

Quick background capture of new project ideas without interrupting ongoing work. Like putting a sticky note on a board — enriched with project context so it's useful later.

## How It Works

1. **Capture**: Take the user's idea from `{{ARGUMENTS}}`
2. **Enrich**: Add contextual knowledge:
   - What project is being built (read from CLAUDE.md or .omc/specs/)
   - Current pipeline stage (if autopilot/ralph/etc is running via `state_list_active`)
   - Related features already planned (check .omc/todos/ and .omc/plans/)
   - Timestamp
3. **Clarify (optional)**: If the idea is very vague (< 5 words, no concrete nouns), ask 1-2 quick questions via AskUserQuestion:
   - "What problem does this solve?"
   - "Which part of the app would this affect?"
   Only ask if genuinely needed — don't slow the user down.
4. **Store**: Append to `.omc/tabled-ideas.md` in the format below.

## Storage Format

Append each idea as a new entry in `.omc/tabled-ideas.md`:

```markdown
---

### 💡 {Brief title derived from idea}
**Added:** {ISO timestamp}
**Context:** {What's currently being built / pipeline stage}
**Idea:** {User's original idea}
**Enrichment:** {How this relates to existing plan, which features it might affect, any dependencies}
**Status:** tabled

---
```

## File Header

If `.omc/tabled-ideas.md` does not exist, create it with this header before appending:

```markdown
# Tabled Ideas

Ideas captured during development for future consideration.
Review these during the next planning cycle or promote to TODOs with `/aether-omcc:todos`.

```

## Key Behaviors

- Does NOT interrupt current execution (level 1 = lightweight)
- Does NOT modify any existing plans, TODOs, or code
- ONLY appends to `.omc/tabled-ideas.md`
- Keep enrichment fast — a few seconds of context gathering, not deep research
- Ideas can be reviewed later and promoted to TODOs during the next planning cycle

## Example Usage

```
User (while autopilot is building): /table add a dark mode toggle
→ Stored: "Dark mode toggle" with context about current UI spec colors,
  related to the settings page TODO, flagged as UI enhancement
```

```
User: /table integrate with Stripe for payments
→ Asks: "Which features need payment? Just one-time purchases or subscriptions too?"
→ Stores enriched idea with payment context
```

```
User: /table caching layer for API responses
→ Stored immediately: "API Response Caching" with notes on current API structure,
  potential performance impact, and related endpoints from the plan
```
