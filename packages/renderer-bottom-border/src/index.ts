import type { PasswordRenderer } from "@chroma-tion/vanilla";

export interface BottomBorderRendererOptions {
  widthPx?: number;
}

export function createBottomBorderRenderer(
  options: BottomBorderRendererOptions = {}
): PasswordRenderer {
  const widthPx = options.widthPx ?? 2;

  return ({ input, color }): void => {
    input.style.borderBottomWidth = `${widthPx}px`;
    input.style.borderBottomStyle = "solid";
    input.style.borderBottomColor = color;
    input.style.transition = "border-bottom-color 120ms linear";
  };
}
