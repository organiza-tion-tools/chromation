import { hash, hashToColor } from "@chroma-tion/core";
import {
  attachPasswordInput,
  type PasswordInputController,
  type PasswordRenderer,
  type RenderContext
} from "@chroma-tion/vanilla";
import {
  computed,
  isRef,
  onBeforeUnmount,
  onMounted,
  type ComputedRef,
  type Ref,
  watch,
  type WatchStopHandle
} from "vue";

export type { PasswordInputController, PasswordRenderer, RenderContext };

type MaybeRef<T> = T | Ref<T>;

export interface UsePasswordColorResult {
  hash: ComputedRef<number>;
  color: ComputedRef<string>;
}

export interface UsePasswordRendererOptions {
  renderer: PasswordRenderer;
  enabled?: MaybeRef<boolean>;
}

export function usePasswordColor(password: Ref<string>): UsePasswordColorResult {
  const hashValue = computed<number>(() => hash(password.value));
  const color = computed<string>(() => hashToColor(hashValue.value));

  return {
    hash: hashValue,
    color
  };
}

export function usePasswordRenderer(
  input: Ref<HTMLInputElement | null>,
  options: UsePasswordRendererOptions
): void {
  let controller: PasswordInputController | null = null;
  let stopWatch: WatchStopHandle | null = null;

  const detach = (): void => {
    if (controller !== null) {
      controller.detach();
      controller = null;
    }
  };

  onMounted((): void => {
    stopWatch = watch(
      [input, (): boolean => readMaybeRef(options.enabled ?? true)],
      ([nextInput, enabled]): void => {
        detach();

        if (nextInput !== null && enabled) {
          controller = attachPasswordInput(nextInput, {
            renderer: options.renderer
          });
        }
      },
      { immediate: true }
    );
  });

  onBeforeUnmount((): void => {
    if (stopWatch !== null) {
      stopWatch();
      stopWatch = null;
    }

    detach();
  });
}

function readMaybeRef<T>(value: MaybeRef<T>): T {
  if (isRef(value)) {
    return value.value;
  }

  return value;
}
