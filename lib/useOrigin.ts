"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

const noop = () => () => {};

/** window.location.origin on the client, the configured site URL during SSR. */
export function useOrigin() {
  return useSyncExternalStore(
    noop,
    () => window.location.origin,
    () => site.url,
  );
}
