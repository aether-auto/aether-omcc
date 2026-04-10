# Configuration

Aether OMCC is configured through `.claude/settings.json` under the `omc` key. This page covers all available settings.

---

## Settings File Location

Settings are stored in your project's `.claude/settings.json`:

```json
{
  "omc": {
    // All OMC settings go here
  }
}
```

---

## Pipeline Configuration

### Planning Phase

```json
{
  "omc": {
    "planning": {
      "interview": {
        "enabled": true,
        "ambiguityThreshold": 0,
        "maxRounds": 10,
        "questionsPerRound": 5
      },
      "ralplan": {
        "enabled": true,
        "maxIterations": 5
      },
      "research": {
        "enabled": true,
        "maxWorkers": 10,
        "minWorkers": 5
      },
      "uiSpecs": {
        "enabled": true,
        "galleryPort": 8420
      },
      "checklist": {
        "enabled": true
      },
      "todos": {
        "enabled": true,
        "minTodos": 8,
        "maxTodos": 15
      }
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `planning.interview.enabled` | `true` | Whether to run the deep interview |
| `planning.interview.ambiguityThreshold` | `0` | Target ambiguity score (0 = no ambiguity) |
| `planning.interview.maxRounds` | `10` | Maximum interview rounds |
| `planning.interview.questionsPerRound` | `5` | Questions per interview round |
| `planning.ralplan.enabled` | `true` | Whether to run consensus planning |
| `planning.ralplan.maxIterations` | `5` | Max planner-architect-critic iterations |
| `planning.research.enabled` | `true` | Whether to run deep research |
| `planning.research.maxWorkers` | `10` | Maximum parallel researcher agents |
| `planning.research.minWorkers` | `5` | Minimum parallel researcher agents |
| `planning.uiSpecs.enabled` | `true` | Whether to generate UI specs |
| `planning.uiSpecs.galleryPort` | `8420` | Port for the interactive spec gallery |
| `planning.checklist.enabled` | `true` | Whether to generate test checklist |
| `planning.todos.enabled` | `true` | Whether to generate TODOs |
| `planning.todos.minTodos` | `8` | Minimum TODOs to generate |
| `planning.todos.maxTodos` | `15` | Maximum TODOs to generate |

---

### Execution Phase

```json
{
  "omc": {
    "execution": {
      "qaCycling": {
        "enabled": true,
        "maxAttempts": 5
      },
      "verification": {
        "codeSimplifier": true,
        "playwrightQA": true
      }
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `execution.qaCycling.enabled` | `true` | Whether to cycle QA until passing |
| `execution.qaCycling.maxAttempts` | `5` | Maximum fix attempts per TODO |
| `execution.verification.codeSimplifier` | `true` | Run code simplifier during verification |
| `execution.verification.playwrightQA` | `true` | Run Playwright tests during verification |

---

### Final Validation

```json
{
  "omc": {
    "validation": {
      "architect": true,
      "securityReviewer": true,
      "codeReviewer": true,
      "checklistQA": true
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `validation.architect` | `true` | Architect review in final validation |
| `validation.securityReviewer` | `true` | Security review in final validation |
| `validation.codeReviewer` | `true` | Code review in final validation |
| `validation.checklistQA` | `true` | Checklist-based Playwright testing |

---

## Deep Interview Settings

```json
{
  "omc": {
    "deepInterview": {
      "ambiguityThreshold": 0,
      "maxRounds": 10,
      "questionsPerRound": 5,
      "dimensions": [
        "scope",
        "behavior",
        "edgeCases",
        "integrationPoints",
        "performance",
        "security"
      ]
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `ambiguityThreshold` | `0` | Target ambiguity percentage (0-100) |
| `maxRounds` | `10` | Maximum number of interview rounds |
| `questionsPerRound` | `5` | Number of questions per round |
| `dimensions` | (see above) | Ambiguity dimensions to track |

---

## Auto-Learning

```json
{
  "omc": {
    "autoLearning": {
      "enabled": true,
      "threshold": 85,
      "maxPerSession": 3
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Whether auto-learning is active |
| `threshold` | `85` | Minimum pattern score to trigger extraction |
| `maxPerSession` | `3` | Maximum skills extracted per session |

---

## Model Routing

Control which models are used for different tasks:

```json
{
  "omc": {
    "modelRouting": {
      "quick": "haiku",
      "standard": "sonnet",
      "complex": "opus"
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `quick` | `haiku` | Model for quick lookups and lightweight tasks |
| `standard` | `sonnet` | Model for standard implementation and testing |
| `complex` | `opus` | Model for architecture, deep analysis, and reviews |

---

## Notifications

```json
{
  "omc": {
    "notifications": {
      "telegram": {
        "enabled": false,
        "botToken": "",
        "chatId": ""
      },
      "discord": {
        "enabled": false,
        "webhookUrl": ""
      },
      "slack": {
        "enabled": false,
        "webhookUrl": ""
      }
    }
  }
}
```

Configure via natural language with:

```
/aether-omcc:configure-notifications
```

---

## HUD Settings

```json
{
  "omc": {
    "hud": {
      "layout": "compact",
      "showAgentActivity": true,
      "showPipelineProgress": true,
      "showTokenUsage": true
    }
  }
}
```

---

## Kill Switches

Environment variables that disable OMC features:

| Variable | Effect |
|----------|--------|
| `DISABLE_OMC` | Disables all OMC functionality |
| `OMC_SKIP_HOOKS` | Comma-separated list of hooks to skip |

```bash
# Disable all OMC
export DISABLE_OMC=1

# Skip specific hooks
export OMC_SKIP_HOOKS="pre-commit,auto-learn"
```

---

## State Directory

OMC maintains state in the `.omc/` directory:

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

!!! note "Git tracking"
    The `.omc/` directory contains session-specific state and should generally be added to `.gitignore`. Plans and research artifacts may be worth committing depending on your workflow.

---

## Commit Protocol

OMC uses structured git trailers in commit messages. This is configured automatically and does not require manual setup.

Trailers include:

| Trailer | Purpose |
|---------|---------|
| `Constraint:` | Active constraint that shaped the decision |
| `Rejected:` | Alternative considered and reason for rejection |
| `Directive:` | Warning or instruction for future modifiers |
| `Confidence:` | high, medium, or low |
| `Scope-risk:` | narrow, moderate, or broad |
| `Not-tested:` | Edge case or scenario not covered by tests |

Example:

```
fix(auth): prevent silent session drops during long-running ops

Auth service returns inconsistent status codes on token expiry,
so the interceptor catches all 4xx and triggers inline refresh.

Constraint: Auth service does not support token introspection
Rejected: Extend token TTL to 24h | security policy violation
Confidence: high
Scope-risk: narrow
```
