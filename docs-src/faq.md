# FAQ

## Installation

### How do I install aether-omcc?

```bash
claude plugin marketplace add https://github.com/aether-auto/aether-omcc
claude plugin install aether-omcc@aether-omcc
```

See [Getting Started](getting-started.md) for full instructions.

### How do I update to the latest version?

Re-run the install command. The plugin manager will update to the latest version:

```bash
claude plugin install aether-omcc@aether-omcc
```

### How do I check if it's installed correctly?

Run the diagnostic command:

```
/aether-omcc:omc-doctor
```

This will check your configuration, dependencies, and state integrity, and suggest fixes for any issues found.

---

## Usage

### What's the difference between `/build-all` and `/autopilot`?

| | `/build-all` | `/autopilot` |
|---|---|---|
| **Planning** | Full planning phase (interview, research, specs, TODOs) | Quick internal planning only |
| **Confirmation gate** | Yes -- you review before building | No -- starts executing immediately |
| **Best for** | New projects, major features | Well-defined tasks, small features |
| **Duration** | Longer (full pipeline) | Shorter (execution only) |

Use `/build-all` when starting something new and you want thorough planning. Use `/autopilot` when you know exactly what to build.

### When should I use `/ralph` vs `/autopilot`?

- **`/autopilot`** runs a standard execution cycle and stops when it thinks it's done
- **`/ralph`** keeps looping until the task is verified complete -- it won't give up

Use `/ralph` for tasks that are complex, have many moving parts, or where you need guaranteed completion.

### Can I skip parts of the planning pipeline?

Yes. You can disable individual stages in your configuration:

```json
{
  "omc": {
    "planning": {
      "interview": { "enabled": false },
      "research": { "enabled": false },
      "uiSpecs": { "enabled": false }
    }
  }
}
```

Or use individual skills to run specific stages:

```
/aether-omcc:ralplan "task"     # Planning only
/aether-omcc:deep-research "topic"  # Research only
/aether-omcc:todos              # TODOs only
```

### How do I cancel a running pipeline?

```
/aether-omcc:cancel
```

This stops all active modes: autopilot, ralph, ultrawork, ultraqa, swarm, ultrapilot, pipeline, and team execution.

---

## Projects

### How do I use aether-omcc with an existing project?

1. Install the plugin (see above)
2. Navigate to your project directory
3. Run `/aether-omcc:deepinit` to analyze your codebase and generate documentation
4. Start using any skill -- the system will detect your project structure automatically

### Does it modify my project structure?

The plugin creates a `.omc/` directory for its own state (plans, research, logs). It does not modify your existing project files unless you explicitly ask it to (e.g., through `/build-all` or `/autopilot`).

### What about `.claude/settings.json`?

The plugin reads configuration from `.claude/settings.json` under the `omc` key. This file may already exist if you use Claude Code. The plugin only adds its own section and does not modify other settings.

---

## Pipeline

### How does the deep interview work?

The interview is a Socratic Q&A process:

1. The system analyzes your request and identifies ambiguous areas
2. It asks 3-5 questions per round, covering scope, behavior, edge cases, etc.
3. Your answers are incorporated and ambiguity is recalculated
4. The process repeats until the mathematical ambiguity score reaches 0%
5. A crystal-clear specification document is produced

### What is the confirmation gate?

The confirmation gate is a mandatory pause between Phase 1 (planning) and Phase 2 (building). After all planning artifacts are generated, you review them and explicitly approve before any code is written. This ensures you're in control and prevents the system from building something you didn't intend.

### How does auto-learning work?

During your sessions, the system monitors patterns in your debugging and problem-solving work. When a pattern scores above the threshold (default 85), the auto-writer agent extracts it into a reusable skill. A maximum of 3 skills are extracted per session to avoid noise. These skills are then available in future sessions.

### What are the research agents looking at?

The 5-10 parallel researcher agents are read-only -- they search documentation, explore code patterns, and investigate technologies. They do not modify any files. Their findings are synthesized into a research report that informs the planning and execution phases.

---

## Agents

### Why is executor the only code-writing agent?

Using a single executor agent ensures:

- **Consistent code style** across the entire project
- **No integration conflicts** between specialist agents
- **Simpler verification** -- one agent's output to review
- **Clearer accountability** -- executor is responsible for all code

The specialist agents (frontend-dev, backend-dev, db-dev) exist in the catalog but are intentionally not used during pipeline execution.

### What model does each agent use?

See the [Agents Reference](agents.md#agent-model-summary) for the complete model assignment table. In summary:

- **Opus:** Complex analysis agents (architect, planner, critic, code-reviewer, security-reviewer, analyst, code-simplifier)
- **Sonnet:** Standard work agents (executor, debugger, verifier, tracer, qa-tester, test-engineer, designer, researcher, document-specialist, scientist, git-master)
- **Haiku:** Lightweight agents (explorer, writer)

---

## Troubleshooting

### The pipeline seems stuck

1. Check if the system is waiting for your input (e.g., interview answers or gate approval)
2. Run `/aether-omcc:cancel` to stop the current execution
3. Run `/aether-omcc:omc-doctor` to check for configuration issues
4. Check `.omc/logs/` for error details

### Playwright tests are failing

1. Ensure Playwright is installed: run `/aether-omcc:mcp-setup` and configure Playwright
2. Check that the application is running and accessible
3. Verify that the test checklist matches the current UI state

### I'm running out of context

Long pipelines can consume significant context. Tips:

- Use `/aether-omcc:ralph` which handles context limits by maintaining state across iterations
- Break large projects into smaller `/autopilot` tasks
- Use `/plan-all` first, then execute TODOs individually

### How do I report issues?

File issues on the [GitHub repository](https://github.com/aether-auto/aether-omcc/issues).
