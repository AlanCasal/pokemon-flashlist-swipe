# Pokedex Screen Refactor (Phase 1)

**Branch:** `pokedex-refactor-phase-1`
**Description:** Split the large Pokedex screen into focused hooks and UI sections without changing behavior.

## Goal
Reduce complexity in the screen container by separating state orchestration, derived data, side effects, and rendering sections. Keep all current UX, interactions, and tests passing during each step.

## Implementation Steps

### Step 1: Extract screen controller hook

**Files:**
- `src/features/Pokedex/Pokedex.tsx`
- `src/features/Pokedex/hooks/usePokedexController.ts`
- `src/features/Pokedex/hooks/types.ts` (if needed)

**What:**
Move local UI state and handlers (search inputs, sheet open/close, option selection, scroll-to-top visibility, callbacks) into a single controller hook returning a typed view model to the screen.

**Testing:**
Run `src/features/Pokedex/Pokedex.test.tsx`, verify generation/sort toggle behavior unchanged, verify both tabs still open expected bottom sheets.

### Step 2: Extract derived data hook

**Files:**
- `src/features/Pokedex/Pokedex.tsx`
- `src/features/Pokedex/hooks/usePokedexData.ts`
- `src/features/Pokedex/helpers.ts` (reuse only, no behavior change)

**What:**
Move memo-heavy list derivations and search/sort/filter composition into a dedicated hook. Keep existing helpers as source of truth, avoid new business logic.

**Testing:**
Run `src/features/Pokedex/Pokedex.test.tsx`, manually validate all/saved/search flows and list ordering for saved mode.

### Step 3: Extract side-effect hook

**Files:**
- `src/features/Pokedex/Pokedex.tsx`
- `src/features/Pokedex/hooks/usePokedexEffects.ts`

**What:**
Move screen effects (alerts, list reset on screen/search changes, spinner animation lifecycle) into a focused effects hook with explicit params.

**Testing:**
Validate no duplicate alerts, spinner behavior unchanged during search loading, list reset behavior preserved when screen/tab/search context changes.

### Step 4: Split JSX into section components

**Files:**
- `src/features/Pokedex/Pokedex.tsx`
- `src/features/Pokedex/components/PokedexBackgroundLayer.tsx`
- `src/features/Pokedex/components/PokedexHeaderLayer.tsx`
- `src/features/Pokedex/components/PokedexListSection.tsx`
- `src/features/Pokedex/components/PokedexBottomSheets.tsx`

**What:**
Extract render blocks into presentational sections with narrow props and no duplicated business logic. Keep className-first styling and existing shared tokens.

**Testing:**
Manual regression: load states, search, saved mode sort, generation sheet open/close/select, scroll-to-top visibility, iOS blur overlay behavior.

### Step 5: Final cleanup and verification

**Files:**
- `src/features/Pokedex/Pokedex.tsx`
- `src/features/Pokedex/Pokedex.test.tsx` (only if imports/coverage need update)

**What:**
Prune dead imports/variables, keep API surface stable, ensure types remain explicit and readable.

**Testing:**
Run focused tests first, then project lint/format command and any relevant suite used in this repo.

## Assumptions/Risks
- Scope is structural refactor only; no feature behavior changes.
- Biggest risk is prop wiring drift between new section components; mitigated by stepwise extraction and testing after each step.
