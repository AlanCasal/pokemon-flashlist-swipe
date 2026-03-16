## Routing

- Follow `expo-router` conventions (including grouped routes like `(tabs)`).
- Keep authenticated routes under `src/app/(protected)/` and guest routes under `src/app/(public)/`.
- When bottom tabs are only part of the authenticated experience, nest them under `src/app/(protected)/(tabs)/` and keep non-tab protected screens (for example detail pages) as siblings of the tabs group.
- For custom sign-out flows in Expo/native UI, prefer `useClerk().signOut()` and then navigate with `expo-router` explicitly; do not reuse the Clerk form button component as a shared sign-out helper for menu flows.
