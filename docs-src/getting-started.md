# Getting Started

## Prerequisites

- **Claude Code CLI** installed and authenticated
- **Node.js 20+** (for plugin runtime)
- A terminal with standard Unix tools

## Installation

### From GitHub (recommended)

```bash
# Add the marketplace source
claude plugin marketplace add https://github.com/aether-auto/aether-omcc

# Install the plugin
claude plugin install aether-omcc@aether-omcc
```

### From Local Path

If you have cloned the repository locally:

```bash
# Add from local directory
claude plugin marketplace add /path/to/aether-omcc

# Install
claude plugin install aether-omcc@aether-omcc
```

### Verify Installation

After installation, start Claude Code and check that the plugin is loaded:

```bash
claude
# Then inside Claude Code:
/aether-omcc:omc-doctor
```

The doctor command will diagnose any issues with your installation and suggest fixes.

---

## Quick Start

### Full Build Pipeline

The fastest way to go from idea to working code:

```
/aether-omcc:build-all "Build a real-time chat application with rooms, user presence, and message history"
```

This runs the complete 2-phase pipeline:

1. **Phase 1 (Planning):** Deep interview, consensus planning, research, UI specs, checklist, and TODO generation
2. **Confirmation gate:** You review and approve the plan
3. **Phase 2 (Building):** Autonomous execution of each TODO with verification

### Planning Only

If you want to plan without building:

```
/aether-omcc:plan-all "your idea here"
```

### Quick Execution

When you already know what to build:

```
/aether-omcc:autopilot "Add dark mode toggle to the settings page"
```

### Option B: Iterative Workflow

If you prefer to build feature-by-feature:

```bash
# Scaffold the project
/aether-omcc:init-project "your idea here"

# Add features one at a time
/aether-omcc:next-feature "first feature"
/aether-omcc:next-feature "second feature"
```

### Fix a Bug

```
/aether-omcc:fix-bug "Users are getting logged out when they switch tabs"
```

---

## First-Time Setup

### OMC Setup Wizard

Run the setup wizard to configure your environment:

```
/aether-omcc:omc-setup
```

This will:

- Initialize the `.omc/` state directory
- Set up project memory
- Configure the notepad system
- Detect your project structure

### MCP Server Setup

For enhanced capabilities, configure MCP servers:

```
/aether-omcc:mcp-setup
```

This helps you set up integrations like Playwright (for browser testing), Figma, and other external services.

### Notification Setup

Get notified when long-running tasks complete:

```
/aether-omcc:configure-notifications
```

Supports Telegram, Discord, and Slack integrations.

---

## Project Structure

After setup, your project will have these OMC-specific paths:

```
.omc/
  state/              # Pipeline state tracking
    sessions/         # Per-session state
  notepad.md          # Working memory notepad
  project-memory.json # Persistent project context
  plans/              # Generated plans
  research/           # Research artifacts
  logs/               # Execution logs
```

---

## What's Next?

- **[Pipeline Architecture](pipeline.md)** -- Understand the 2-phase pipeline in detail
- **[Skills Reference](skills.md)** -- Browse all available slash commands
- **[Workflows](workflows.md)** -- Step-by-step guides for common tasks
- **[Configuration](configuration.md)** -- Customize pipeline behavior
