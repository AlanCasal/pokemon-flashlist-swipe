---
description: 'Agent expected behavior and core instructions'
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts'
---

## Session Bootstrap

- Always reply in english, unless user explicitly asks for replies in some other language.
- For every new chat session, before performing task work that involves editing or creating files in the repo, load and apply `docs/WORKSPACE_INSTRUCTIONS.md`. If the file doesn't exist, alert the developer before continuing.
- After reading `docs/WORKSPACE_INSTRUCTIONS.md`, load only the relevant topic files it points to under `docs/workspace-instructions/`; do not read every topic file by default.
- Treat `docs/WORKSPACE_INSTRUCTIONS.md` and the topic files under `docs/workspace-instructions/` as **non mandatory** current workspace preferences (improvement suggestions are always welcome).
- Update the affected file(s) in the same PR when architecture, conventions, or patterns change and alert the developer.
- Apply the loaded workspace-instruction files in every chat/task that changes code.

## File Purpose

- This file contains the agent's expected behavior.

## Workflow Orchestration

### 1. Plan Mode Default

- If not already in Plan Mode, enter Plan Mode for any non-trivial task (3+ steps or architectural decisions). If you can switch mode yourself, suggest developer to manually switch to Plan Mode before continue.
- Use Plan Mode for verification phases, not only implementation.
- Write detailed but also concise specs up front to reduce ambiguity.

### 2. Subagent Strategy

- Use subagents liberally to keep the main context window focused.
- Offload research, exploration, and parallel analysis to subagents.
- For complex problems, increase compute with parallel subagent tracks.
- Keep one focused tactic per subagent.

### 3. Self-Improvement Loop

- After any correction from the user, record/add the lesson in the relevant file under `docs/workspace-instructions/`. Update `docs/WORKSPACE_INSTRUCTIONS.md` too if the loading workflow itself needs to change.
- Convert corrections into explicit rules that prevent common mistakes and confusion points for agents as they work in this project.
- If you ever encounter something in the project that surprises you, please alert the developer working with you and indicate that this is the case in the relevant file under `docs/workspace-instructions/`. Update `docs/WORKSPACE_INSTRUCTIONS.md` too if future agents need different loading guidance because of it.

### 4. Verification Before Done

- Never mark a task complete without proving the result works.
- Diff behavior between baseline and changes when relevant.
- Run tests/checks and demonstrate correctness with evidence.
- Make sure imports are sorted (rule `eslintsimple-import-sort/imports`)
- Fix any lint or ts warnings and errors

### 5. Demand Elegance (Balanced)

- For non-trivial changes, pause and ask whether a more elegant solution exists.
- If a fix feels hacky, restart from an elegant implementation path.
- Skip over-engineering for obvious, simple fixes.
- Challenge your own output before presenting.

### 6. Autonomous Bug Fixing

- When given a bug report, proceed directly to diagnosis and fix.
- Use logs, errors, and failing tests to drive resolution.
- Avoid unnecessary context switching for the user.
- Fix failing CI tests without requiring step-by-step user direction.
