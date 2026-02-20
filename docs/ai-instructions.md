# AI Instructions Governance

## Purpose

This document defines ownership and lifecycle for AI instruction files in this repository.

## Canonical and Generated Files

- Canonical policy: `AGENTS.md`
- Generated Copilot mirror: `.github/instructions/copilot-instructions.md`

Rules:

1. Edit `AGENTS.md` directly for project-wide coding standards.
2. Do not manually edit `.github/instructions/copilot-instructions.md`.
3. After `AGENTS.md` changes, run:
   - `bun run instructions:sync`
   - `bun run instructions:check`

## Why this setup

- Keeps one source of truth for standards.
- Preserves Copilot-specific instruction file compatibility.
- Avoids accidental drift between duplicated files.

## Secondary Rule Systems

Deprecated mirror rule files were removed from this repository.

- `.agent/rules/pokedex-rules.md` (removed)
- `.kilocode/rules/rules.md` (removed)

Use `AGENTS.md` as the only project policy source and `.github/instructions/copilot-instructions.md` as the generated Copilot mirror.
