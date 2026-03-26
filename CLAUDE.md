# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build all packages (TypeScript project references)
pnpm run build

# Run tests (builds first, then runs with Node.js built-in runner)
pnpm run test

# Run a single test file
node --test tests/core.test.mjs

# Type-check without emitting
pnpm run typecheck

# Clean all dist directories
pnpm run clean

# Serve browser examples at http://localhost:4173/examples/index.html
pnpm run examples:serve
```

## Architecture

Chroma-tion is a monorepo for a visual password strength indicator: it converts a password string into a deterministic HSL color (via FNV-1a hash) and renders that color into the DOM.

**Layer dependency chain:**

```
@chroma-tion/core          (hash → color, zero dependencies)
       ↓
@chroma-tion/vanilla       (DOM attachment, PasswordRenderer interface)
    ↙         ↘
renderer-dot  renderer-bottom-border   (pluggable renderers)
       ↓
 vue / react / angular     (framework adapters wrapping vanilla)
```

**Key design points:**

- `core` exports `textToColor(input)` → `hsl(N 70% 52%)` deterministically. No side effects.
- `vanilla` exports `attachPasswordInput(input, options)` which wires an `input` event listener and calls a `PasswordRenderer` function with a `RenderContext` (input element, value, hash, color). Returns a controller for cleanup.
- Renderers (`renderer-dot`, `renderer-bottom-border`) are factories that return a `PasswordRenderer` function. They create/update DOM elements next to or on the input.
- Framework adapters (currently only `vue` is complete) wrap the vanilla layer with lifecycle integration. The Vue adapter exports `usePasswordColor(Ref<string>)` and `usePasswordRenderer(Ref<HTMLInputElement>, options)` composables.
- React and Angular adapters are stubs (TODO).

**Build system:** `tsc -b` with TypeScript project references. Each package has `composite: true` and lists its `@chroma-tion/*` dependencies as project references. Path aliases in `tsconfig.base.json` map package names to source files for cross-package type resolution during development.

**Tests:** Node.js built-in `node:test` runner. Test files are `.mjs` and live in `tests/`. No external test framework.

**Examples:** Static HTML files using import maps that point package names to compiled `dist/` output. Served with `python3 -m http.server`. Vue example loads Vue 3 from CDN.
