"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/worktree-paths.ts
var import_crypto, import_child_process, import_fs, import_os, import_path, OmcPaths;
var init_worktree_paths = __esm({
  "src/lib/worktree-paths.ts"() {
    "use strict";
    import_crypto = require("crypto");
    import_child_process = require("child_process");
    import_fs = require("fs");
    import_os = require("os");
    import_path = require("path");
    OmcPaths = {
      ROOT: ".omc",
      STATE: ".omc/state",
      SESSIONS: ".omc/state/sessions",
      PLANS: ".omc/plans",
      RESEARCH: ".omc/research",
      NOTEPAD: ".omc/notepad.md",
      PROJECT_MEMORY: ".omc/project-memory.json",
      DRAFTS: ".omc/drafts",
      NOTEPADS: ".omc/notepads",
      LOGS: ".omc/logs",
      SCIENTIST: ".omc/scientist",
      AUTOPILOT: ".omc/autopilot",
      SKILLS: ".omc/skills",
      SHARED_MEMORY: ".omc/state/shared-memory",
      DEEPINIT_MANIFEST: ".omc/deepinit-manifest.json"
    };
  }
});

// src/utils/config-dir.ts
function getConfigDir() {
  return process.env.CLAUDE_CONFIG_DIR || (0, import_node_path.join)((0, import_node_os.homedir)(), ".claude");
}
var import_node_os, import_node_path;
var init_config_dir = __esm({
  "src/utils/config-dir.ts"() {
    "use strict";
    import_node_os = require("node:os");
    import_node_path = require("node:path");
  }
});

// src/utils/paths.ts
function getClaudeConfigDir() {
  return getConfigDir();
}
var import_path2, import_fs2, import_os2, STALE_THRESHOLD_MS;
var init_paths = __esm({
  "src/utils/paths.ts"() {
    "use strict";
    import_path2 = require("path");
    import_fs2 = require("fs");
    import_os2 = require("os");
    init_config_dir();
    STALE_THRESHOLD_MS = 24 * 60 * 60 * 1e3;
  }
});

// src/hooks/learner/constants.ts
var import_path3, import_os3, USER_SKILLS_DIR, GLOBAL_SKILLS_DIR, PROJECT_SKILLS_SUBDIR, PROJECT_AGENT_SKILLS_SUBDIR, DEBUG_ENABLED;
var init_constants = __esm({
  "src/hooks/learner/constants.ts"() {
    "use strict";
    import_path3 = require("path");
    import_os3 = require("os");
    init_paths();
    init_worktree_paths();
    USER_SKILLS_DIR = (0, import_path3.join)(getClaudeConfigDir(), "skills", "omc-learned");
    GLOBAL_SKILLS_DIR = (0, import_path3.join)((0, import_os3.homedir)(), ".omc", "skills");
    PROJECT_SKILLS_SUBDIR = OmcPaths.SKILLS;
    PROJECT_AGENT_SKILLS_SUBDIR = (0, import_path3.join)(".agents", "skills");
    DEBUG_ENABLED = process.env.OMC_DEBUG === "1";
  }
});

// src/hooks/learner/finder.ts
var import_fs3, import_path4;
var init_finder = __esm({
  "src/hooks/learner/finder.ts"() {
    "use strict";
    import_fs3 = require("fs");
    import_path4 = require("path");
    init_constants();
  }
});

// src/hooks/learner/parser.ts
var init_parser = __esm({
  "src/hooks/learner/parser.ts"() {
    "use strict";
  }
});

// src/hooks/learner/loader.ts
var import_fs5, import_crypto3, import_path6;
var init_loader = __esm({
  "src/hooks/learner/loader.ts"() {
    "use strict";
    import_fs5 = require("fs");
    import_crypto3 = require("crypto");
    import_path6 = require("path");
    init_finder();
    init_parser();
    init_constants();
  }
});

// src/hooks/learner/bridge.ts
var bridge_exports = {};
__export(bridge_exports, {
  GLOBAL_SKILLS_DIR: () => GLOBAL_SKILLS_DIR2,
  PROJECT_AGENT_SKILLS_SUBDIR: () => PROJECT_AGENT_SKILLS_SUBDIR2,
  PROJECT_SKILLS_SUBDIR: () => PROJECT_SKILLS_SUBDIR2,
  SKILL_EXTENSION: () => SKILL_EXTENSION2,
  USER_SKILLS_DIR: () => USER_SKILLS_DIR2,
  clearLevenshteinCache: () => clearLevenshteinCache,
  clearSkillMetadataCache: () => clearSkillMetadataCache,
  findSkillFiles: () => findSkillFiles2,
  getAutoLearningSummary: () => getAutoLearningSummary,
  getInjectedSkillPaths: () => getInjectedSkillPaths,
  markSkillsInjected: () => markSkillsInjected,
  matchSkillsForInjection: () => matchSkillsForInjection,
  notifyMessageCycle: () => notifyMessageCycle,
  parseSkillFile: () => parseSkillFile2,
  resetAutoLearningSession: () => resetAutoLearningSession
});
module.exports = __toCommonJS(bridge_exports);
var import_fs15 = require("fs");
var import_path14 = require("path");
var import_os5 = require("os");
init_worktree_paths();

// src/hooks/learner/transliteration-map.ts
var KOREAN_MAP = {
  // === deep-dive skill ===
  "deep dive": ["\uB525\uB2E4\uC774\uBE0C", "\uB525 \uB2E4\uC774\uBE0C"],
  "deep-dive": ["\uB525\uB2E4\uC774\uBE0C"],
  "trace and interview": ["\uD2B8\uB808\uC774\uC2A4 \uC564 \uC778\uD130\uBDF0"],
  // === deep-pipeline skill ===
  "deep-pipeline": ["\uB525\uD30C\uC774\uD504\uB77C\uC778", "\uB525 \uD30C\uC774\uD504\uB77C\uC778"],
  "deep-pipe": ["\uB525\uD30C\uC774\uD504"]
};
function expandTriggers(triggersLower) {
  const expanded = new Set(triggersLower);
  for (const trigger of triggersLower) {
    const koreanVariants = KOREAN_MAP[trigger];
    if (koreanVariants) {
      for (const variant of koreanVariants) {
        expanded.add(variant);
      }
    }
  }
  return Array.from(expanded);
}

// src/hooks/learner/auto-writer.ts
var import_crypto2 = require("crypto");

// src/hooks/learner/writer.ts
var import_fs4 = require("fs");
var import_path5 = require("path");
init_finder();
init_parser();

// src/hooks/learner/validator.ts
init_constants();

// src/hooks/learner/writer.ts
init_constants();

// src/hooks/learner/auto-writer.ts
init_constants();
var MAX_PER_SESSION = 3;
var sessionAutoCreationCount = 0;
var lastAutoCreationMessage = 0;
var currentMessageCount = 0;
var sessionContentHashes = /* @__PURE__ */ new Set();
function incrementMessageCount() {
  currentMessageCount++;
}
function resetSession() {
  sessionAutoCreationCount = 0;
  lastAutoCreationMessage = 0;
  currentMessageCount = 0;
  sessionContentHashes.clear();
}
function getAutoCreationStats() {
  return {
    count: sessionAutoCreationCount,
    max: MAX_PER_SESSION,
    remaining: MAX_PER_SESSION - sessionAutoCreationCount
  };
}

// src/features/context-injector/collector.ts
var PRIORITY_ORDER = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3
};
var CONTEXT_SEPARATOR = "\n\n---\n\n";
var ContextCollector = class {
  sessions = /* @__PURE__ */ new Map();
  /**
   * Register a context entry for a session.
   * If an entry with the same source:id already exists, it will be replaced.
   */
  register(sessionId, options) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, /* @__PURE__ */ new Map());
    }
    const sessionMap = this.sessions.get(sessionId);
    const key = `${options.source}:${options.id}`;
    const entry = {
      id: options.id,
      source: options.source,
      content: options.content,
      priority: options.priority ?? "normal",
      timestamp: Date.now(),
      metadata: options.metadata
    };
    sessionMap.set(key, entry);
  }
  /**
   * Get pending context for a session without consuming it.
   */
  getPending(sessionId) {
    const sessionMap = this.sessions.get(sessionId);
    if (!sessionMap || sessionMap.size === 0) {
      return {
        merged: "",
        entries: [],
        hasContent: false
      };
    }
    const entries = this.sortEntries([...sessionMap.values()]);
    const merged = entries.map((e) => e.content).join(CONTEXT_SEPARATOR);
    return {
      merged,
      entries,
      hasContent: entries.length > 0
    };
  }
  /**
   * Get and consume pending context for a session.
   * After consumption, the session's context is cleared.
   */
  consume(sessionId) {
    const pending = this.getPending(sessionId);
    this.clear(sessionId);
    return pending;
  }
  /**
   * Clear all context for a session.
   */
  clear(sessionId) {
    this.sessions.delete(sessionId);
  }
  /**
   * Check if a session has pending context.
   */
  hasPending(sessionId) {
    const sessionMap = this.sessions.get(sessionId);
    return sessionMap !== void 0 && sessionMap.size > 0;
  }
  /**
   * Get count of entries for a session.
   */
  getEntryCount(sessionId) {
    const sessionMap = this.sessions.get(sessionId);
    return sessionMap?.size ?? 0;
  }
  /**
   * Remove a specific entry from a session.
   */
  removeEntry(sessionId, source, id) {
    const sessionMap = this.sessions.get(sessionId);
    if (!sessionMap) return false;
    const key = `${source}:${id}`;
    return sessionMap.delete(key);
  }
  /**
   * Get all active session IDs.
   */
  getActiveSessions() {
    return [...this.sessions.keys()];
  }
  /**
   * Sort entries by priority (higher first) then by timestamp (earlier first).
   */
  sortEntries(entries) {
    return entries.sort((a, b) => {
      const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.timestamp - b.timestamp;
    });
  }
};
var contextCollector = new ContextCollector();

// src/hooks/learner/index.ts
init_loader();
init_constants();

// src/hooks/learner/config.ts
var import_fs6 = require("fs");
var import_path7 = require("path");
init_paths();
init_constants();
var CONFIG_PATH = (0, import_path7.join)(getClaudeConfigDir(), "omc", "learner.json");

// src/hooks/learner/index.ts
init_constants();
init_finder();
init_parser();
init_loader();

// src/hooks/ralph/loop.ts
var import_fs12 = require("fs");
var import_path11 = require("path");

// src/lib/mode-state-io.ts
var import_fs7 = require("fs");
var import_path8 = require("path");
init_worktree_paths();

// src/lib/atomic-write.ts
var fs = __toESM(require("fs/promises"), 1);
var fsSync = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);
var crypto = __toESM(require("crypto"), 1);

// src/hooks/ralph/prd.ts
var import_fs8 = require("fs");
var import_path9 = require("path");
init_worktree_paths();

// src/hooks/ralph/progress.ts
var import_fs9 = require("fs");
var import_path10 = require("path");
init_worktree_paths();

// src/hooks/ultrawork/index.ts
var import_fs10 = require("fs");
init_worktree_paths();

// src/hooks/ralph/loop.ts
init_worktree_paths();

// src/hooks/team-pipeline/state.ts
var import_fs11 = require("fs");
init_worktree_paths();

// src/hooks/ralph/verifier.ts
var import_fs13 = require("fs");
var import_path12 = require("path");
init_worktree_paths();

// src/utils/omc-cli-rendering.ts
var import_child_process2 = require("child_process");

// src/hooks/learner/auto-invoke.ts
var import_fs14 = __toESM(require("fs"), 1);
var import_path13 = __toESM(require("path"), 1);
var import_os4 = __toESM(require("os"), 1);
init_paths();

// src/hooks/learner/auto-learner.ts
var import_crypto4 = require("crypto");
init_constants();

// src/hooks/learner/detection-hook.ts
init_constants();
var sessionStates = /* @__PURE__ */ new Map();
function getAutoCreatedPaths(sessionId) {
  return sessionStates.get(sessionId)?.autoCreatedPaths ?? [];
}

// src/hooks/learner/bridge.ts
var USER_SKILLS_DIR2 = (0, import_path14.join)(
  (0, import_os5.homedir)(),
  ".claude",
  "skills",
  "omc-learned"
);
var GLOBAL_SKILLS_DIR2 = (0, import_path14.join)((0, import_os5.homedir)(), ".omc", "skills");
var PROJECT_SKILLS_SUBDIR2 = OmcPaths.SKILLS;
var PROJECT_AGENT_SKILLS_SUBDIR2 = (0, import_path14.join)(".agents", "skills");
var SKILL_EXTENSION2 = ".md";
var SESSION_TTL_MS = 60 * 60 * 1e3;
var MAX_RECURSION_DEPTH2 = 10;
var LEVENSHTEIN_CACHE_SIZE = 1e3;
var SKILL_CACHE_TTL_MS = 30 * 1e3;
var MAX_CACHE_ENTRIES = 50;
var levenshteinCache = /* @__PURE__ */ new Map();
function getCachedLevenshtein(str1, str2) {
  const key = str1 < str2 ? `${str1}|${str2}` : `${str2}|${str1}`;
  const cached = levenshteinCache.get(key);
  if (cached !== void 0) {
    levenshteinCache.delete(key);
    levenshteinCache.set(key, cached);
    return cached;
  }
  const result = levenshteinDistance(str1, str2);
  if (levenshteinCache.size >= LEVENSHTEIN_CACHE_SIZE) {
    const firstKey = levenshteinCache.keys().next().value;
    if (firstKey) levenshteinCache.delete(firstKey);
  }
  levenshteinCache.set(key, result);
  return result;
}
var skillMetadataCache = null;
function getSkillMetadataCache(projectRoot) {
  if (!skillMetadataCache) {
    skillMetadataCache = /* @__PURE__ */ new Map();
  }
  const cached = skillMetadataCache.get(projectRoot);
  const now = Date.now();
  if (cached && now - cached.timestamp < SKILL_CACHE_TTL_MS) {
    skillMetadataCache.delete(projectRoot);
    skillMetadataCache.set(projectRoot, cached);
    return cached.skills;
  }
  const candidates = findSkillFiles2(projectRoot);
  const skills = [];
  for (const candidate of candidates) {
    try {
      const content = (0, import_fs15.readFileSync)(candidate.path, "utf-8");
      const parsed = parseSkillFile2(content);
      if (!parsed) continue;
      const triggers = parsed.metadata.triggers ?? [];
      if (triggers.length === 0) continue;
      const name = parsed.metadata.name || (0, import_path14.basename)(candidate.path, SKILL_EXTENSION2);
      skills.push({
        path: candidate.path,
        name,
        triggers,
        triggersLower: expandTriggers(triggers.map((t) => t.toLowerCase())),
        matching: parsed.metadata.matching,
        content: parsed.content,
        scope: candidate.scope
      });
    } catch {
    }
  }
  if (skillMetadataCache.size >= MAX_CACHE_ENTRIES) {
    const firstKey = skillMetadataCache.keys().next().value;
    if (firstKey !== void 0) skillMetadataCache.delete(firstKey);
  }
  skillMetadataCache.set(projectRoot, { skills, timestamp: now });
  return skills;
}
function clearSkillMetadataCache() {
  skillMetadataCache = null;
}
function clearLevenshteinCache() {
  levenshteinCache.clear();
}
var STATE_FILE = `${OmcPaths.STATE}/skill-sessions.json`;
function getStateFilePath(projectRoot) {
  return (0, import_path14.join)(projectRoot, STATE_FILE);
}
function readSessionState(projectRoot) {
  const stateFile = getStateFilePath(projectRoot);
  try {
    if ((0, import_fs15.existsSync)(stateFile)) {
      const content = (0, import_fs15.readFileSync)(stateFile, "utf-8");
      return JSON.parse(content);
    }
  } catch {
  }
  return { sessions: {} };
}
function writeSessionState(projectRoot, state) {
  const stateFile = getStateFilePath(projectRoot);
  try {
    (0, import_fs15.mkdirSync)((0, import_path14.dirname)(stateFile), { recursive: true });
    (0, import_fs15.writeFileSync)(stateFile, JSON.stringify(state, null, 2), "utf-8");
  } catch {
  }
}
function getInjectedSkillPaths(sessionId, projectRoot) {
  const state = readSessionState(projectRoot);
  const session = state.sessions[sessionId];
  if (!session) return [];
  if (Date.now() - session.timestamp > SESSION_TTL_MS) {
    return [];
  }
  return session.injectedPaths;
}
function markSkillsInjected(sessionId, paths, projectRoot) {
  const state = readSessionState(projectRoot);
  const now = Date.now();
  for (const [id, session] of Object.entries(state.sessions)) {
    if (now - session.timestamp > SESSION_TTL_MS) {
      delete state.sessions[id];
    }
  }
  const existing = state.sessions[sessionId]?.injectedPaths ?? [];
  state.sessions[sessionId] = {
    injectedPaths: [.../* @__PURE__ */ new Set([...existing, ...paths])],
    timestamp: now
  };
  writeSessionState(projectRoot, state);
}
function findSkillFilesRecursive(dir, results, depth = 0) {
  if (!(0, import_fs15.existsSync)(dir)) return;
  if (depth > MAX_RECURSION_DEPTH2) return;
  try {
    const entries = (0, import_fs15.readdirSync)(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = (0, import_path14.join)(dir, entry.name);
      if (entry.isDirectory()) {
        findSkillFilesRecursive(fullPath, results, depth + 1);
      } else if (entry.isFile() && entry.name.endsWith(SKILL_EXTENSION2)) {
        results.push(fullPath);
      }
    }
  } catch {
  }
}
function safeRealpathSync(filePath) {
  try {
    return (0, import_fs15.realpathSync)(filePath);
  } catch {
    return filePath;
  }
}
function isWithinBoundary(realPath, boundary) {
  const normalizedReal = safeRealpathSync(realPath).replace(/\\/g, "/").replace(/\/+/g, "/");
  const normalizedBoundary = safeRealpathSync(boundary).replace(/\\/g, "/").replace(/\/+/g, "/");
  return normalizedReal === normalizedBoundary || normalizedReal.startsWith(normalizedBoundary + "/");
}
function findSkillFiles2(projectRoot, options) {
  const candidates = [];
  const seenRealPaths = /* @__PURE__ */ new Set();
  const scope = options?.scope ?? "all";
  if (scope === "project" || scope === "all") {
    const projectSkillDirs = [
      (0, import_path14.join)(projectRoot, PROJECT_SKILLS_SUBDIR2),
      (0, import_path14.join)(projectRoot, PROJECT_AGENT_SKILLS_SUBDIR2)
    ];
    for (const projectSkillsDir of projectSkillDirs) {
      const projectFiles = [];
      findSkillFilesRecursive(projectSkillsDir, projectFiles);
      for (const filePath of projectFiles) {
        const realPath = safeRealpathSync(filePath);
        if (seenRealPaths.has(realPath)) continue;
        if (!isWithinBoundary(realPath, projectSkillsDir)) continue;
        seenRealPaths.add(realPath);
        candidates.push({
          path: filePath,
          realPath,
          scope: "project",
          sourceDir: projectSkillsDir
        });
      }
    }
  }
  if (scope === "user" || scope === "all") {
    const userDirs = [GLOBAL_SKILLS_DIR2, USER_SKILLS_DIR2];
    for (const userDir of userDirs) {
      const userFiles = [];
      findSkillFilesRecursive(userDir, userFiles);
      for (const filePath of userFiles) {
        const realPath = safeRealpathSync(filePath);
        if (seenRealPaths.has(realPath)) continue;
        if (!isWithinBoundary(realPath, userDir)) continue;
        seenRealPaths.add(realPath);
        candidates.push({
          path: filePath,
          realPath,
          scope: "user",
          sourceDir: userDir
        });
      }
    }
  }
  return candidates;
}
function parseSkillFile2(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  if (!match) {
    return {
      metadata: {},
      content: content.trim(),
      valid: true,
      errors: []
    };
  }
  const yamlContent = match[1];
  const body = match[2].trim();
  const errors = [];
  try {
    const metadata = parseYamlMetadata(yamlContent);
    return {
      metadata,
      content: body,
      valid: true,
      errors
    };
  } catch (e) {
    return {
      metadata: {},
      content: body,
      valid: false,
      errors: [`YAML parse error: ${e}`]
    };
  }
}
function parseYamlMetadata(yamlContent) {
  const lines = yamlContent.split("\n");
  const metadata = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      i++;
      continue;
    }
    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();
    switch (key) {
      case "id":
        metadata.id = parseStringValue(rawValue);
        break;
      case "name":
        metadata.name = parseStringValue(rawValue);
        break;
      case "description":
        metadata.description = parseStringValue(rawValue);
        break;
      case "model":
        metadata.model = parseStringValue(rawValue);
        break;
      case "agent":
        metadata.agent = parseStringValue(rawValue);
        break;
      case "matching":
        metadata.matching = parseStringValue(rawValue);
        break;
      case "triggers":
      case "tags": {
        const { value, consumed } = parseArrayValue(rawValue, lines, i);
        if (key === "triggers") {
          metadata.triggers = Array.isArray(value) ? value : value ? [value] : [];
        } else {
          metadata.tags = Array.isArray(value) ? value : value ? [value] : [];
        }
        i += consumed - 1;
        break;
      }
    }
    i++;
  }
  return metadata;
}
function parseStringValue(value) {
  if (!value) return "";
  if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  return value;
}
function parseArrayValue(rawValue, lines, currentIndex) {
  if (rawValue.startsWith("[")) {
    const endIdx = rawValue.lastIndexOf("]");
    if (endIdx === -1) return { value: [], consumed: 1 };
    const content = rawValue.slice(1, endIdx).trim();
    if (!content) return { value: [], consumed: 1 };
    const items = content.split(",").map((s) => parseStringValue(s.trim())).filter(Boolean);
    return { value: items, consumed: 1 };
  }
  if (!rawValue || rawValue === "") {
    const items = [];
    let consumed = 1;
    for (let j = currentIndex + 1; j < lines.length; j++) {
      const nextLine = lines[j];
      const arrayMatch = nextLine.match(/^\s+-\s*(.*)$/);
      if (arrayMatch) {
        const itemValue = parseStringValue(arrayMatch[1].trim());
        if (itemValue) items.push(itemValue);
        consumed++;
      } else if (nextLine.trim() === "") {
        consumed++;
      } else {
        break;
      }
    }
    if (items.length > 0) {
      return { value: items, consumed };
    }
  }
  return { value: parseStringValue(rawValue), consumed: 1 };
}
function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  if (m < n) {
    return levenshteinDistance(str2, str1);
  }
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}
function fuzzyMatchTrigger(prompt, trigger) {
  const words = prompt.split(/\s+/).filter((w) => w.length > 0);
  for (const word of words) {
    if (word === trigger) return 100;
    if (word.includes(trigger) || trigger.includes(word)) {
      return 80;
    }
  }
  let bestScore = 0;
  for (const word of words) {
    const distance = getCachedLevenshtein(word, trigger);
    const maxLen = Math.max(word.length, trigger.length);
    const similarity = maxLen > 0 ? (maxLen - distance) / maxLen * 100 : 0;
    bestScore = Math.max(bestScore, similarity);
  }
  return Math.round(bestScore);
}
function matchSkillsForInjection(prompt, projectRoot, sessionId, options = {}) {
  const { fuzzyThreshold = 60, maxResults = 5 } = options;
  const promptLower = prompt.toLowerCase();
  const alreadyInjected = new Set(
    getInjectedSkillPaths(sessionId, projectRoot)
  );
  const cachedSkills = getSkillMetadataCache(projectRoot);
  const matches = [];
  for (const skill of cachedSkills) {
    if (alreadyInjected.has(skill.path)) continue;
    const useFuzzy = skill.matching === "fuzzy";
    let totalScore = 0;
    for (const triggerLower of skill.triggersLower) {
      if (promptLower.includes(triggerLower)) {
        totalScore += 10;
        continue;
      }
      if (useFuzzy) {
        const fuzzyScore = fuzzyMatchTrigger(promptLower, triggerLower);
        if (fuzzyScore >= fuzzyThreshold) {
          totalScore += Math.round(fuzzyScore / 10);
        }
      }
    }
    if (totalScore > 0) {
      matches.push({
        path: skill.path,
        name: skill.name,
        content: skill.content,
        score: totalScore,
        scope: skill.scope,
        triggers: skill.triggers,
        matching: skill.matching
      });
    }
  }
  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, maxResults);
}
function notifyMessageCycle() {
  incrementMessageCount();
}
function resetAutoLearningSession() {
  resetSession();
}
function getAutoLearningSummary(sessionId) {
  return {
    autoCreated: getAutoCreatedPaths(sessionId),
    stats: getAutoCreationStats()
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GLOBAL_SKILLS_DIR,
  PROJECT_AGENT_SKILLS_SUBDIR,
  PROJECT_SKILLS_SUBDIR,
  SKILL_EXTENSION,
  USER_SKILLS_DIR,
  clearLevenshteinCache,
  clearSkillMetadataCache,
  findSkillFiles,
  getAutoLearningSummary,
  getInjectedSkillPaths,
  markSkillsInjected,
  matchSkillsForInjection,
  notifyMessageCycle,
  parseSkillFile,
  resetAutoLearningSession
});
