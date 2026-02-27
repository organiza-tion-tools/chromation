# Chroma-tion

Monorepo with scoped packages `@chroma-tion/*`.

## Packages

- `@chroma-tion/core`: string -> hash -> color
- `@chroma-tion/vanilla`: attach to `input[type=password]`
- `@chroma-tion/renderer-dot`: dot indicator renderer
- `@chroma-tion/renderer-bottom-border`: bottom border renderer
- `@chroma-tion/react`: placeholder
- `@chroma-tion/vue`: placeholder
- `@chroma-tion/angular`: placeholder

## Quick start (vanilla)

```ts
import { attachPasswordInput } from "@chroma-tion/vanilla";
import { createDotRenderer } from "@chroma-tion/renderer-dot";

const input = document.querySelector("#password");
if (input instanceof HTMLInputElement) {
  const controller = attachPasswordInput(input, {
    renderer: createDotRenderer()
  });

  // call when you need cleanup:
  // controller.detach();
}
```

## Scripts

- `pnpm run build`
- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run examples:build`
- `pnpm run examples:serve`

## Browser examples

1. Run `pnpm run examples:build`
2. Run `pnpm run examples:serve`
3. Open `http://localhost:4173/examples/index.html`
