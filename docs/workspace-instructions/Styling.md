## Styling

- Export a default `styles` object from `StyleSheet.create(...)`.
- For dynamic values (state/props/insets/theme), export a named style factory (for example `useStyles(params)`) that returns `StyleSheet.create(...)`.
- In components, always name the style object returned from the component's style module as `styles` (for example `const styles = useStyles(params)`).
- Inset/layout hooks used for styling (for example `useSafeAreaInsets`) should be called inside `useStyles(...)` the styles file, not in the component and passed into styles as params.
- Avoid using colors directly in styles files. Try using colors from `colors.ts` or add new colors to it so they can be reused.
