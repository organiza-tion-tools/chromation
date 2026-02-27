import { hash, hashToColor } from "@chroma-tion/core";

export interface RenderContext {
  input: HTMLInputElement;
  value: string;
  hash: number;
  color: string;
}

export type PasswordRenderer = (context: RenderContext) => void;

export interface AttachPasswordInputOptions {
  renderer: PasswordRenderer;
}

export interface PasswordInputController {
  update: () => void;
  detach: () => void;
}

export function attachPasswordInput(
  input: HTMLInputElement,
  options: AttachPasswordInputOptions
): PasswordInputController {
  const update = (): void => {
    const value = input.value;
    const hashValue = hash(value);
    const color = hashToColor(hashValue);

    options.renderer({
      input,
      value,
      hash: hashValue,
      color
    });
  };

  const onInput = (): void => {
    update();
  };

  input.addEventListener("input", onInput);
  update();

  return {
    update,
    detach: (): void => {
      input.removeEventListener("input", onInput);
    }
  };
}
