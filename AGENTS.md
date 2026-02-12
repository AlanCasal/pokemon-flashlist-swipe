# Project Agent Instructions

## Core Preferences

- Prefer `bun` for dependency and script commands.
- Prefer Zustand as state manager if additional global state is needed.
- Prefer Uniwind for styling whenever possible.
- Avoid `StyleSheet.create` unless dynamic runtime values or platform constraints make Uniwind impractical.

## Project Context

- Expo + React Native + TypeScript app using `expo-router` file-based routing under `src/app`.
- Data fetching uses `axios` + `@tanstack/react-query`.
- Existing global state patterns also include React Contexts in `src/store`.
- Import aliases from `tsconfig.json` should be preferred (for example `@/`, `@components/`).

## Code Organization

- Preserve file-based routing: add screens under `src/app` instead of central route registries.
- Follow existing component conventions:
  - If using Uniwind/Nativewind in that area, keep utility classes in component files.
  - Otherwise follow local folder pattern (`index.ts`, `Component.tsx`, `styles.ts`) used by that feature/component.
- Prefer extending existing hooks in `src/hooks` and providers in `src/store` over introducing new global singletons.

## Tooling and Quality

- Keep changes aligned with existing ESLint + Prettier setup.
- Use existing scripts in `package.json` (`lint`, `lint:fix`, `prettier`, `prettier:fix`, `format:fix`).
- Do not introduce `package-lock.json` or `yarn.lock` unless explicitly requested; keep `bun.lock` as lockfile source of truth.
