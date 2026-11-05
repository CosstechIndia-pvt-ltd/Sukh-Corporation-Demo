"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type ThemeId } from "./themes";

export const COMPARE_LIMIT = 3;

type ShortlistState = {
  ids: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useShortlist = create<ShortlistState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [id, ...s.ids] })),
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
      clear: () => set({ ids: [] }),
    }),
    { name: "sukh-shortlist" },
  ),
);

type CompareState = {
  ids: string[];
  /** Returns false when the tray is already full. */
  toggle: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const { ids } = get();
        if (ids.includes(id)) {
          set({ ids: ids.filter((x) => x !== id) });
          return true;
        }
        if (ids.length >= COMPARE_LIMIT) return false;
        set({ ids: [...ids, id] });
        return true;
      },
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
      clear: () => set({ ids: [] }),
    }),
    { name: "sukh-compare" },
  ),
);

type ThemeState = { theme: ThemeId; setTheme: (t: ThemeId) => void };

export const useTheme = create<ThemeState>()(
  persist((set) => ({ theme: DEFAULT_THEME, setTheme: (theme) => set({ theme }) }), { name: THEME_STORAGE_KEY }),
);

/** Small toast bus used for "Compare is full" and "Link copied" messages. */
type ToastState = { message: string | null; key: number; show: (m: string) => void; hide: () => void };
export const useToast = create<ToastState>()((set) => ({
  message: null,
  key: 0,
  show: (message) => set((s) => ({ message, key: s.key + 1 })),
  hide: () => set({ message: null }),
}));
