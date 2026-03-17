# Pokédex App

> A high-performance, mobile-first Pokédex built with Expo + React Native, designed to showcase polished UI/UX, thoughtful architecture, and multilingual support (`en`, `es`, `de`, `ja`).

> [!WARNING]
> This project is currently **WIP (Work in Progress)**. More features and refinements are actively being added.

<p align="center">
  <img src="./assets/demo/demo-intro.gif" width=30%>
  <img src="./assets/demo/demo-list.gif" width=30%>
  <img src="./assets/demo/demo-filters.gif" width=30%>
</p>

<p align="center">
  <img src="./assets/demo/demo-star.gif" width=30%>
  <img src="./assets/demo/demo-pokemon.gif" width=30%>
  <img src="./assets/demo/demo-languages.gif" width=30%>
</p>

[![Status: WIP](https://img.shields.io/badge/status-WIP-orange?style=for-the-badge)](https://github.com/AlanCasal/pokemon-flashlist-swipe)
[![Last Commit](https://img.shields.io/github/last-commit/AlanCasal/pokemon-flashlist-swipe?style=for-the-badge&logo=github)](https://github.com/AlanCasal/pokemon-flashlist-swipe/commits/main)

### Core Stack

[![TypeScript](https://img.shields.io/badge/typescript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/expo-55.0.6-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/react_native-0.83.2-20232A?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/react-19.2.0-149ECA?style=for-the-badge&logo=react)](https://react.dev/)
[![Bun](https://img.shields.io/badge/bun-1.3.4-000000?style=for-the-badge&logo=bun)](https://bun.sh/)

### Key Libraries

[![Expo Router](https://img.shields.io/badge/expo_router-55.0.5-111111?style=for-the-badge)](https://docs.expo.dev/router/introduction/)
[![FlashList](https://img.shields.io/badge/FlashList-2.0.2-00A86B?style=for-the-badge)](https://shopify.github.io/flash-list/)
[![React Query](https://img.shields.io/badge/React_Query-5.90.21-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.12-4E342E?style=for-the-badge)](https://zustand.docs.pmnd.rs/)
[![Clerk](https://img.shields.io/badge/Clerk-2.19.31-6C47FF?style=for-the-badge)](https://clerk.com/)
[![Reanimated](https://img.shields.io/badge/Reanimated-4.2.1-6C5CE7?style=for-the-badge)](https://docs.swmansion.com/react-native-reanimated/)
[![Bottom Sheet](https://img.shields.io/badge/Bottom_Sheet-5.2.8-0EA5E9?style=for-the-badge)](https://gorhom.dev/react-native-bottom-sheet/)
[![MMKV](https://img.shields.io/badge/MMKV-4.2.0-16A34A?style=for-the-badge)](https://github.com/mrousavy/react-native-mmkv)

### AI Workflow

[![Built with Codex App](https://img.shields.io/badge/Built%20with-Codex%20App-111111?style=for-the-badge)](https://openai.com/codex/)
[![AI Pairing: Codex 5.4](https://img.shields.io/badge/AI-Codex%205.4-111111?style=for-the-badge)](https://openai.com/codex/)
[![Editor: VS Code](https://img.shields.io/badge/Editor-VS%20Code-007ACC?style=for-the-badge)](https://code.visualstudio.com/)

## Project Health

[![Tests In Progress](https://img.shields.io/badge/tests-in%20progress-yellow?style=for-the-badge)](#project-health)

<!-- [![Coverage](https://img.shields.io/badge/coverage-38%25-orange?style=for-the-badge)](#project-health) -->

<!--
Future dynamic test badge template (GitHub Actions):
[![Tests](https://img.shields.io/github/actions/workflow/status/AlanCasal/pokemon-flashlist-swipe/ci.yml?branch=main&label=tests&style=for-the-badge)](https://github.com/AlanCasal/pokemon-flashlist-swipe/actions)

Future dynamic coverage badge templates:
[![Codecov](https://img.shields.io/codecov/c/github/AlanCasal/pokemon-flashlist-swipe?style=for-the-badge)](https://codecov.io/gh/AlanCasal/pokemon-flashlist-swipe)
[![Coveralls](https://img.shields.io/coverallsCoverage/github/AlanCasal/pokemon-flashlist-swipe?style=for-the-badge)](https://coveralls.io/github/AlanCasal/pokemon-flashlist-swipe)
-->

## Why This Project Stands Out

- ⚡ **Performance-first list rendering** with FlashList and smooth scrolling behavior.
- 🎨 **Strong visual direction** inspired by a dedicated Figma UI guide.
- 🧠 **Thoughtful state + data flow** using React Query, Zustand, and MMKV persistence.
- 🔐 **Modern authentication flows** powered by Clerk with email and Google sign-in.
- 🧩 **Scalable architecture** with feature-based structure, reusable components, and hooks.
- 🤖 **AI-accelerated development** using Codex App + Codex 5.4 as coding copilot.

## Current Features

- ✨ Animated home experience with marquee Pokémon sprites.
- 📱 Tab-based navigation (Pokédex + Saved) powered by Expo Router.
- 🔐 Clerk authentication with email flows and Google sign-in.
- 🔎 Search + filter + generation + sort workflows in the Pokédex screen.
- 📊 Pokémon detail screen with **About**, **Stats**, and **Evolution** tabs.
- ⭐ Save/unsave Pokémon with local persistence.
- 🌍 Internationalization with in-app language switching: English (`en`), Español (`es`), Deutsch (`de`), 日本語 (`ja`).
- 🎬 Rich motion via Reanimated and polished bottom-sheet interactions.

## WIP: In Progress / Next

- 🚧 Ongoing feature additions and UX polish.
- 🧪 Continued test coverage expansion.
- 🧬 Evolution-chain data quality fixes.
- 🪟 UI refinements for tab/bar behavior across iOS and Android.
- 🌍 Additional locale expansion beyond current `en` / `es` / `de` / `ja` support.

## Tech & AI Stack

### Languages & Runtime

- TypeScript
- JavaScript
- React 19.2.0
- React Native 0.83.2
- Expo 55.0.6
- Bun 1.3.4

### Core Packages

- `expo-router`
- `@shopify/flash-list`
- `@tanstack/react-query`
- `@clerk/clerk-expo`
- `zustand`
- `react-native-reanimated`
- `@gorhom/bottom-sheet`
- `react-native-mmkv`
- `expo-image`
- `expo-linear-gradient`
- `i18next`
- `react-i18next`
- `expo-localization`

### Internationalization

- Device language is resolved with `expo-localization` and mapped to supported app locales.
- Translation resources are managed with `i18next` + `react-i18next`.
- The language preference is persisted locally, with English (`en`) as fallback.

### Authentication

- Authentication is powered by Clerk.
- Users can sign in with email-based flows or continue with Google OAuth.
- Auth state is available across the app for protected and public route experiences.

### AI Tools Used

- Codex App
- Codex 5.4, GPT-4

## Quick Start

```bash
bun install
bun run start
```

Run on device/simulator:

```bash
bun run ios
bun run android
```

Format + lint:

```bash
bun run format:fix
```

Test coverage:

```bash
bun run test:coverage
```

Open the local HTML coverage report at `coverage/lcov-report/index.html`.

## Sources

- [Figma UI Guide](https://www.figma.com/design/dmZL7AGoSOpu8Lh2RXAXi2/Pok%C3%A9dex--Fox-%F0%9F%A6%8A-?node-id=18241-2789&t=zehKinBHAs9D14pk-1)
- [Charmander](https://imgur.com/charmander-chasing-his-tail-f21JG84) chasing his tail

## Contact

- LinkedIn: [linkedin.com/in/alancasal](https://www.linkedin.com/in/alancasal/)
- Email: [alan.casal.dev@gmail.com](mailto:alan.casal.dev@gmail.com)

<p align="center">
  <img src="./assets/animated/charmander-animated.gif" width=20%>
</p>
