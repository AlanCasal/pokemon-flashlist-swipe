## Internationalization

- Use `i18next` + `react-i18next` for user-facing copy and avoid hardcoded UI strings in components.
- Keep translation resources under `src/i18n/locales/` and resolve text with `useTranslation()` in UI components/hooks.
- For non-component helpers, pass a `translate` function in arguments instead of importing static JSON text.
- Use `src/store/languageStore.ts` for persisted language preference (`system | en | es | de | ja`).
- When adding new `FingerPaint` text styles, prefer `usePrimaryFontFamily()` so Japanese can fallback to a glyph-safe font.
