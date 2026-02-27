import type { PasswordRenderer } from "@chroma-tion/vanilla";

const DOT_DATASET_KEY = "chromationDotId";

export interface DotRendererOptions {
  sizePx?: number;
  className?: string;
}

export function createDotRenderer(options: DotRendererOptions = {}): PasswordRenderer {
  const sizePx = options.sizePx ?? 12;

  return ({ input, color }): void => {
    const inputId = ensureInputId(input);
    const dotId = `chromation-dot-${inputId}`;

    let dot = findExistingDot(input, dotId);
    if (dot === null) {
      dot = createDot(dotId, sizePx, options.className);
      input.insertAdjacentElement("afterend", dot);
      input.dataset[DOT_DATASET_KEY] = dotId;
    }

    dot.style.backgroundColor = color;
  };
}

function ensureInputId(input: HTMLInputElement): string {
  if (input.id.length > 0) {
    return input.id;
  }

  const fallbackId = `chromation-input-${Math.random().toString(36).slice(2, 10)}`;
  input.id = fallbackId;
  return fallbackId;
}

function findExistingDot(input: HTMLInputElement, dotId: string): HTMLSpanElement | null {
  const existing = input.parentElement?.querySelector(`#${dotId}`);
  if (existing instanceof HTMLSpanElement) {
    return existing;
  }

  const datasetId = input.dataset[DOT_DATASET_KEY];
  if (datasetId === undefined) {
    return null;
  }

  const fromDocument = document.getElementById(datasetId);
  return fromDocument instanceof HTMLSpanElement ? fromDocument : null;
}

function createDot(dotId: string, sizePx: number, className?: string): HTMLSpanElement {
  const dot = document.createElement("span");
  dot.id = dotId;
  dot.style.display = "inline-block";
  dot.style.width = `${sizePx}px`;
  dot.style.height = `${sizePx}px`;
  dot.style.marginInlineStart = "8px";
  dot.style.borderRadius = "999px";
  dot.style.verticalAlign = "middle";
  dot.style.transition = "background-color 120ms linear";

  if (className !== undefined && className.length > 0) {
    dot.className = className;
  }

  return dot;
}
