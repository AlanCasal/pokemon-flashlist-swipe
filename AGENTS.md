---
description: 'Agent expected behavior and core instructions'
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts'
---

## Session Bootstrap

- For every new chat session, before performing task work that involves editing or creating files in the repo, load and apply `WORKSPACE_INSTRUCTIONS.md`. If the file doesn't exist, alert the developer before continuing.
- Treat `WORKSPACE_INSTRUCTIONS.md` as **non mandatory** (improvement suggestions are always welcome) current workspace preferences.
- Update `WORKSPACE_INSTRUCTIONS.md` in the same PR when architecture, conventions, patterns change and alert the developer.
- Apply this file's standards in every chat/task that changes.

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

- After any correction from the user, record/add the lesson in `WORKSPACE_INSTRUCTIONS.md`.
- Convert corrections into explicit rules that prevent common mistakes and confusion points for agents as they work in this project.
- If you ever encounter something in the project that surprises you, please alert the developer working with you and indicate that this is the case in the `WORKSPACE_INSTRUCTIONS.md` file to help prevent future agents from having the same issue.

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
