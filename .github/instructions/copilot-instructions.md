<!-- This file is auto-generated from AGENTS.md. Do not edit directly. Run: bun run instructions:sync -->

---
description: 'Project development standards and best practices'
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts'
---

## File Purpose

- This is the canonical source of truth for AI coding standards in this repository.
- This file is human-readable, long-lived project policy, and should be edited directly when standards change.

## Source of Truth & Sync

- Canonical file: `AGENTS.md`.
- Generated mirror: `.github/instructions/copilot-instructions.md`.
- Regenerate mirror after changes: `bun run instructions:sync`.
- Validate mirror is in sync: `bun run instructions:check`.
- Governance and lifecycle details: `docs/ai-instructions.md`.

## Project Snapshot

- Stack: React 19, React Native 0.81, Expo SDK 54, TypeScript.
- Routing: `expo-router` file-based routes in `src/app/`.
- Styling: use React Native `StyleSheet` with sibling `styles.ts` files; use dynamic style factories only when values depend on runtime state/props.
- Server state: `@tanstack/react-query` in hooks under `src/hooks/`.
- Client state: `zustand` stores in `src/store/`, persisted with `react-native-mmkv` where required.
- Core UI/runtime libs in use: `@shopify/flash-list`, `expo-image`, `react-native-reanimated`, `react-native-svg`, `@gorhom/bottom-sheet`.

## Code Priorities

- Prioritize readability and maintainability over cleverness.
- Keep implementations small and focused.
- Optimize performance without sacrificing clarity.
- When adding numeric constants or non-obvious logic, include a concise comment explaining purpose.

## Architecture & Conventions

- Use functional components and hooks.
- Prefer composition over inheritance.
- Keep routes under `src/app/` (do not add central route registries).
- Keep reusable UI in `src/components/<Feature>/` with local `index.ts` re-exports.
- Keep reusable logic in `src/hooks/` (`use*` naming).
- Keep shared types in `src/types/`; colocate feature-specific complex types in local `types.ts`.
- For feature folders (`src/features/<Feature>/`), keep shared feature-level `helpers.ts` and `types.ts` at the feature root.
- Feature folder contract (`src/features/<Feature>/`):
  - Always expose a feature root `index.ts`.
  - Keep one main feature component file (`<Feature>.tsx`) focused on JSX and minor orchestration logic.
  - Move complex or stateful logic into feature hooks under `src/features/<Feature>/hooks/` when needed.
  - Keep child UI pieces under `src/features/<Feature>/components/` when needed.
- Do not create umbrella barrels like `src/features/<Feature>/components/index.ts`; import feature components from each component's own path.
- In `src/features/<Feature>/components/<ComponentName>/`, allow at most one `helpers.ts` and one `types.ts` in that component folder root (no extra nested helper/type duplicates for the same component). The less files the better for readability.
- Use `export default` for main components and named exports for helpers/utilities.
- Use TypeScript path aliases (`@/* -> src/*`) for imports.
- Prefer smaller, readable component and hook files; split logic by responsibility when readability drops (guideline, not a strict line cap).

## State, Data & Error Handling

- Use `useState` for local component state.
- Keep ephemeral UI state (input focus, bottom sheet visibility, local drafts, animation toggles) local to component/hooks.
- Use Zustand for cross-screen or persisted client state.
- Use React Query for remote data, caching, and pagination.
- Handle loading/error/success states explicitly.
- Use `tryCatch` from `src/utils/helpers.ts` when suitable for async flows.

## Styling

- Prefer a single sibling `styles.ts` file per component folder, exporting a default `styles` object from `StyleSheet.create(...)`.
- Split a component's styles into multiple files only when that component's `styles.ts` grows beyond ~200 lines.
- For dynamic values (state/props/insets/theme), export a named style factory (for example `useStyles(params)`) that returns `StyleSheet.create(...)`.
- In components, always name the style object returned from the component's style module as `styles` (for example `const styles = useStyles(params)`).
- Inset/layout hooks used for styling (for example `useSafeAreaInsets`) should be called inside `useStyles(...)` in `styles.ts`, not in the component and passed into styles as params.
- In dynamic style factories, use props directly in style properties when the expression is simple.
- If logic is complex or reused, extract a constant or helper function first.
- Use tokens/constants from `src/constants/` (especially colors and shared values).
- Avoid ad-hoc inline style objects for static values; keep inline styles only for truly runtime-only values.
- In any component `styles.ts`, keep style declarations only; do not place non-style config values (for example snap points, opacity tokens, sizes) inside `styles.ts`.

## Routing, Testing & Tooling

- Follow `expo-router` conventions (including grouped routes like `(tabs)`).
- Add tests close to source files (`*.test.ts` / `*.test.tsx`) and test behavior over implementation.
- Install deps with `bun install` (preferred).
- Run formatting/linting with `bun run format:fix`.
- Start app with `bun run start` (or `expo start`).
- For native package changes, run the proper `expo prebuild` / rebuild flow.

## Implementation Process

1. Confirm requirements and existing patterns in adjacent files.
2. Define or update types first when needed.
3. Implement minimal UI/logic changes in the correct feature location.
4. Wire state/data flow (local state, Zustand, React Query).
5. Add loading/error/empty states.
6. Add or update focused tests near changed code.
7. Add concise comments for non-obvious, or complex logic or constants (only when necessary).
8. Run lint/format and relevant checks.
9. Update docs/instruction files when architecture or packages change.

## Common Patterns

- Feature-first component structure with re-export `index.ts` files.
- Custom hooks for reusable stateful logic.
- Container/presentational separation where complexity justifies it.
- Shared constants for non-trivial numbers/strings (avoid magic values).

## Practical Examples

- Root layout and router entry: [src/app/\_layout.tsx](src/app/_layout.tsx)
- Route screen example: [src/app/details.tsx](src/app/details.tsx)
- Infinite query hook: [src/hooks/usePokemonList.ts](src/hooks/usePokemonList.ts)
- Zustand stores: [src/store/savedStore.ts](src/store/savedStore.ts), [src/store/toastStore.ts](src/store/toastStore.ts)
- Component re-export pattern: [src/components/PokeCard/index.ts](src/components/PokeCard/index.ts)
- API and design constants: [src/constants/api.ts](src/constants/api.ts), [src/constants/colors.ts](src/constants/colors.ts)
- Alias/config references: [tsconfig.json](tsconfig.json), [babel.config.js](babel.config.js), [metro.config.js](metro.config.js)

## Keep This File Current

- Update this file in the same PR when package usage, architecture, or conventions change.
- Run `bun run instructions:sync` in the same PR when this file changes.
- Ensure package/library statements match `package.json`.
- Remove stale guidance instead of adding exceptions.
- Keep guidance concise, specific, and example-driven.
