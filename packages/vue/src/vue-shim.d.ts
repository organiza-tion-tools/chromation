declare module "vue" {
  export interface Ref<T> {
    value: T;
  }

  export interface ComputedRef<T> extends Ref<T> {
    readonly value: T;
  }

  export type WatchStopHandle = () => void;

  export function computed<T>(getter: () => T): ComputedRef<T>;
  export function isRef<T>(value: unknown): value is Ref<T>;
  export function onMounted(callback: () => void): void;
  export function onBeforeUnmount(callback: () => void): void;
  export function watch<T1, T2>(
    source: readonly [Ref<T1>, () => T2],
    callback: (value: [T1, T2]) => void,
    options?: { immediate?: boolean }
  ): WatchStopHandle;
}
