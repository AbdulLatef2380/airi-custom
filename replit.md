# PocketPal AI (AIRI.AI)

## Overview

PocketPal AI is a React Native mobile application that enables users to run Small Language Models (SLMs) locally on iOS and Android devices. All inference runs on-device — no internet connection required for AI interactions.

## Tech Stack

- **Framework**: React Native 0.82.1 with TypeScript 5.0.4
- **Package Manager**: npm (dependencies installed with --ignore-scripts to skip native compilation)
- **Node.js**: v20 (available in Replit environment)
- **AI/Inference**: `llama.rn` — bindings for llama.cpp to run GGUF models
- **State Management**: MobX 6 with mobx-persist-store
- **Database**: WatermelonDB 0.28 (reactive local DB for chats, messages, models)
- **UI**: React Native Paper (Material Design), react-native-vector-icons
- **Navigation**: React Navigation v7 (Stack + Drawer)
- **Dev Server**: Metro Bundler (React Native's bundler) on port 8080

## Project Structure

- `src/` — Main source code
  - `api/` — Hugging Face and OpenAI-compatible endpoint integrations
  - `assets/` — Images, fonts, SVG icons
  - `components/` — Reusable UI components
  - `database/` — WatermelonDB schema, migrations, models
  - `hooks/` — Custom React hooks
  - `locales/` — i18n translation files (JSON), including Arabic (`ar.json`)
  - `repositories/` — Data access layer
  - `screens/` — App screens (Chat, Models, Pals, Benchmark)
  - `services/` — Business logic (downloads, HuggingFace, PalsHub)
  - `specs/` — TurboModule specs (generated under `com.abdullatef.airi.specs` package)
  - `store/` — MobX stores
- `android/` — Android native code + Gradle build
- `ios/` — iOS native code + CocoaPods build
- `e2e/` — WebdriverIO end-to-end tests
- `__tests__/` — Jest unit tests

## Development Workflow

- Metro bundler runs as the dev server on port 8080
- Workflow command: `npx react-native start --port 8080 --reset-cache`
- Native builds require Android Studio (Android) or Xcode (iOS) — not available in this environment

## Key Notes

- This is a **mobile-only** app — no web frontend.
- The Metro server can be connected to by physical devices or emulators for development.
- Dependencies are installed with `--ignore-scripts` to skip native compilation steps.
- Use `npm install --ignore-scripts --legacy-peer-deps` to install/update packages.
- The WatermelonDB database file is named `pocketpalai.db` — do NOT rename (would break existing user data).

## Replit Setup Notes

- Dependencies installed via `npm install --ignore-scripts --legacy-peer-deps`
- Workflow uses `npx react-native start` since yarn had cache issues
- Node 20 is used (project specifies >=22 in engines but runs fine on 20)

## Fork Changes (AIRI.AI)

This is a fork of PocketPal AI renamed to AIRI.AI with the following changes:

- **Package name**: `com.abdullatef.airi` (was `com.pocketpalai`)
- **App name**: AIRI AI (Android strings.xml, iOS Info.plist CFBundleDisplayName, LaunchScreen)
- **Android package**: `android/app/src/main/java/com/abdullatef/airi/`
- **Android app ID**: `com.abdullatef.airi` in namespace and applicationId
- **Codegen specs**: `javaPackageName = com.abdullatef.airi.specs` in `package.json` codegenConfig
  - All native Kotlin modules import from `com.abdullatef.airi.specs.*`
  - The codegenConfig `name` is still "PocketPalSpecs" — do NOT change
- **iOS bundle ID**: `ai.pocketpal` (unchanged — provisioning profiles set up for this)
- **iOS module name**: `AIRI.AI` in AppDelegate.swift (matches app.json registration)
- **Arabic language**: Added `ar.json` to `src/locales/` i18n system
- **App icon**: Custom AI-branded icons in all Android mipmap-* folders and iOS xcassets

## Android Build Notes

- `google-services.json`: Only contains `com.abdullatef.airi` client entry (clean)
- **Signing**: Release config reads from env vars (`APP_RELEASE_STORE_PASSWORD`, `APP_RELEASE_KEY_PASSWORD`). Falls back to debug keystore if not set.
- **Release keystore**: `android/app/pocketpal-release-key.keystore` (must be provided for release builds)
- **Kotlin version**: 1.9.25
- Firebase BoM: 34.4.0 with App Check (Play Integrity + Debug)
- Room: 2.8.2 with KAPT (not K2 — `kotlin.useK2=false` in gradle.properties)

## iOS Build Notes

- **GoogleService-Info.plist**: `ios/PocketPal/GoogleService-Info.plist` is a placeholder.
  Replace with the real file from Firebase Console (add iOS app under same Firebase project).
  In CI/CD (Fastlane), this is injected from `GOOGLE_SERVICES_PLIST` secret.
- **Env.xcconfig**: `ios/Config/Env.xcconfig` contains Google sign-in client IDs.
  Replace placeholder values with real ones from Google Cloud Console.
- **Signing**: Manual with Team MYXGXY23Y6, provisioning profiles via Fastlane Match (`ai.pocketpal`)
- **Podfile**: Firebase autolinked via `@react-native-firebase/app` and `@react-native-firebase/app-check`

## Android Build Fixes Applied

1. `MainApplication.kt` — removed broken `com.pocketpal.*` imports; custom packages are same-package (no import needed); fixed `DownloadPackage` import to `com.abdullatef.airi.download.DownloadPackage`
2. `KeepAwakeModule.kt` — fixed from misnamed `KeepAwakeModule.k` (wrong extension, Kotlin compiler ignored it)
3. All native module Kotlin files — updated codegen spec imports from `com.pocketpal.specs` to `com.abdullatef.airi.specs`
4. Signing — `build.gradle` auto-falls back to debug keystore if release credentials are absent
5. `google-services.json` — removed leftover `com.company.SpiderRAT` test entry
