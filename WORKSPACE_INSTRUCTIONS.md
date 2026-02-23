## Architecture & Conventions

- Use functional components and hooks.
- Keep small reusable UI in `src/components/common/<Feature>/` with local `index.ts` re-exports.
- Keep more complex/bigger reusable UI in `src/components/<Feature>/` with local `index.ts` re-exports.
- Keep reusable logic in `src/hooks/` (`use*` naming).
- For types reused in different components and features, keep the in `src/types/`; colocate feature-specific complex types in local `types.ts`.
- For components and feature folders, keep one shared feature-level `helpers.ts`, one `types.ts` and one `styles.ts` file at the component or feature root.
- Feature folder contract (`src/features/<Feature>/`):
  - Always expose a feature root `index.ts`.
  - Move complex or stateful logic into feature hooks under `src/features/<Feature>/hooks/` when needed.
  - Keep child UI pieces under `src/features/<Feature>/components/` when needed.
- Use `export default` for main components and named exports for helpers/utilities.
- Use TypeScript path aliases (`@/* -> src/*`) for imports.

## Styling

- Export a default `styles` object from `StyleSheet.create(...)`.
- For dynamic values (state/props/insets/theme), export a named style factory (for example `useStyles(params)`) that returns `StyleSheet.create(...)`.
- In components, always name the style object returned from the component's style module as `styles` (for example `const styles = useStyles(params)`).
- Inset/layout hooks used for styling (for example `useSafeAreaInsets`) should be called inside `useStyles(...)` the styles file, not in the component and passed into styles as params.
- Avoid using colors directly in styles files. Try using colors from `colors.ts` or add new colors to it so they can be reused.

## Routing, Testing & Tooling

- Follow `expo-router` conventions (including grouped routes like `(tabs)`).
- Add tests close to source files (`*.test.ts` / `*.test.tsx`) and test behavior over implementation.
- Install deps with `bun install` (preferred).
- Run formatting/linting with `bun run format:fix`.
- Start app with `bun run start` (or `expo start`).
- For native package changes, run `bunx expo prebuild --clean --platform all` (or its alias `bpall`) for rebuild flow.
