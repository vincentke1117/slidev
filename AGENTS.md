# Agent Guidelines for the Slidev Monorepo

## Overview

- This repository hosts the Slidev presentation framework and supporting tooling.
- It is a PNPM workspace composed of multiple TypeScript packages that target both Node.js CLIs and Vue 3 front-ends.
- Treat the project as ESM-only—use native `import`/`export` syntax and avoid CommonJS utilities.

## Repository Structure

- `packages/slidev` – CLI entry point and core runtime for authoring Slidev decks.
- `packages/client` – Front-end SPA that renders decks in the browser with Vue 3 and Vite.
- `packages/parser` – Markdown/YAML parser that turns deck sources into Slidev-compatible data structures.
- `packages/create-app`, `packages/create-theme` – Scaffolding tools invoked via `pnpm create` or `npx`.
- `packages/types` – Shared TypeScript definitions re-used across packages.
- `packages/vscode` – VS Code extension, built with Vite and Vue.
- `docs` – Slidev documentation site (also a Slidev deck) built with VitePress.
- `demo` – Example projects for manual validation. Keep these lightweight and aligned with the main packages.
- `cypress`, `test` – End-to-end and unit/regression tests.

## Coding Guidelines

- Follow the repo ESLint and Prettier configurations (`@antfu/eslint-config`). No custom formatters.
- Prefer TypeScript; when editing `.ts`/`.tsx`/`.vue`, keep strict type safety and update related `@slidev/types` exports when changing shared contracts.
- Vue Single File Components should use `<script setup lang="ts">` unless there is a specific reason otherwise.
- Keep imports path-aligned with the existing aliases (e.g., use relative paths within a package, or workspace aliases like `@slidev/client`).
- When modifying CLI packages, update both the TypeScript source and generated command metadata/help strings if applicable.
- For packages targeting Node and browser, ensure code is tree-shakeable and side-effect free unless explicitly necessary.
- Respect existing internationalization/localization utilities. Hard-coded strings should remain in the appropriate locale modules.

## Testing & Tooling

- Use `pnpm` for all scripts. Common commands: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm -C docs run build`.
- Run the relevant tests for the packages you touch. For CLI changes, add or update unit tests in `test` or integration tests in `cypress`.
- When adjusting build tooling, make sure `pnpm build` (parallel workspace build) still succeeds locally.
- For documentation or demo updates, run the corresponding dev server (`pnpm -C docs run dev`, etc.) to verify output.

## Documentation & Changelogs

- Update `docs/` content when altering user-facing behavior, flags, or configuration formats.
- Maintain the templates in `packages/slidev/template.md` to reflect new features or breaking changes.
- Use inline comments sparingly—prefer self-documenting code and update TypeDoc-style annotations when adding public APIs.

## Workflow Notes

- Group related changes by package to keep diffs focused.
- When modifying multiple packages, ensure version constraints in `package.json` files remain consistent.
- If adding a new package, register it in `pnpm-workspace.yaml` and ensure lint/test pipelines include it.
- Follow semantic commit messages (e.g., `feat:`, `fix:`, `docs:`) aligned with Conventional Commits.
