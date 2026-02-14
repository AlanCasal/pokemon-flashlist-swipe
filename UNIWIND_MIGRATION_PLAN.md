# Uniwind Migration Plan

## Summary

Migrate the app from React Native `StyleSheet` usage to `uniwind` utility classes across `src/`, preserving behavior and component APIs.

## Scope

- Full app conversion in one PR.
- Keep inline `style` only for runtime-dynamic values (safe area insets, animated styles, dynamic mapped colors).

## Steps

1. Add uniwind infrastructure (`uniwind`, `tailwindcss`, Metro integration, global CSS import).
2. Remove `StyleSheet` from shared constants and keep style tokens as plain objects/constants.
3. Convert screen-level styles to `className` and remove screen `styles.ts`.
4. Convert reusable component styles to `className` and remove component `styles.ts`.
5. Validate with lint + type checks and ensure no `StyleSheet.create` remains.

## Acceptance

- App boots without uniwind runtime errors.
- Primary screens and interactions are visually equivalent.
- No `StyleSheet.create(` in active `src/` files.
- No stale imports from deleted `styles.ts` modules.
