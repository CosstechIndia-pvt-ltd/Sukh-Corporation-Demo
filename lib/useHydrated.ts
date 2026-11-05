"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True only after hydration — guards UI that depends on localStorage-persisted state. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
