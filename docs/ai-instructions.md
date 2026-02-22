# AI Instructions Governance

## Purpose

This document defines ownership and lifecycle for AI instruction files in this repository.

## Canonical and Generated Files

- Workspace behavior canonical policy: `WORKSPACE_INSTRUCTIONS.md`
- Project coding standards canonical policy: `AGENTS.md`
- Generated Copilot instructions: `.github/copilot-instructions.md`

Rules:

1. Edit `WORKSPACE_INSTRUCTIONS.md` for workspace-level agent behavior.
2. Edit `AGENTS.md` for project-wide coding standards.
3. Do not manually edit `.github/copilot-instructions.md`.
4. After changes to either canonical file, run:
   - `bun run instructions:sync`
   - `bun run instructions:check`

## Why this setup

- Separates behavior orchestration from project coding standards.
- Preserves Copilot repository-level instruction compatibility.
- Avoids accidental drift between canonical and generated files.

## Secondary Rule Systems

Deprecated extension-specific rule systems are retired from this repository.

Use `WORKSPACE_INSTRUCTIONS.md` + `AGENTS.md` as canonical inputs and `.github/copilot-instructions.md` as the generated Copilot file.
