## Architecture & Conventions

- Use functional components and hooks.
- Keep small reusable UI in `src/components/common/<Feature>/` with local `index.ts` re-exports.
- Keep more complex/bigger reusable UI in `src/components/<Feature>/` with local `index.ts` re-exports.
- Keep reusable logic in `src/hooks/` (`use*` naming).
- For types reused in different components and features, keep the in `src/types/`; colocate feature-specific complex types in local `types.ts`.
- For each feature/component folder:
  - keep helpers in the single root `helpers.ts`; avoid nested `helpers.ts` files inside child `components/` subfolders.
  - keep styles in the single root `styles.ts`; avoid nested `styles.ts` files inside child `components/` subfolders.
  - keep props/types in the single root `types.ts`; avoid nested `types.ts` files inside child `components/` subfolders.
- Prefer reusing existing shared UI components from `src/components/common/` before introducing new local UI primitives with similar behavior or visuals.
- When a feature component grows with non-trivial UI subparts, extract those subparts into a sibling `components/` folder instead of keeping them inline in the parent component file.
- For tab-driven feature screens, colocate tab content components under a lowercase `tabs/` folder at the feature root (for example `src/features/Pokemon/tabs/`).
- Feature folder contract (`src/features/<Feature>/`):
  - Always expose a feature root `index.ts`.
  - Move complex or stateful logic into feature hooks under `src/features/<Feature>/hooks/` when needed.
  - Keep child UI pieces under `src/features/<Feature>/components/` when needed.
- Use `export default` for main components and named exports for helpers/utilities.
- Use TypeScript path aliases (`@/* -> src/*`) for imports.
