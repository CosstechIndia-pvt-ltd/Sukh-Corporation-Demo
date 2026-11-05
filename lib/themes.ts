export const THEMES = [
  { id: "velvet-plum", name: "Velvet Plum", swatch: ["#5B2A4A", "#EBCFD4", "#B8956A"] },
  { id: "sage-atelier", name: "Sage Atelier", swatch: ["#2F4A3C", "#C9D5C3", "#A88B5C"] },
  { id: "dusk-lavender", name: "Dusk Lavender", swatch: ["#262B52", "#D8D1EC", "#D6E4EF"] },
  { id: "rose-clay", name: "Rosé Clay", swatch: ["#6E2433", "#EBC2AE", "#B08A5A"] },
  { id: "midnight-velvet", name: "Midnight Velvet", swatch: ["#16111A", "#D8B4C8", "#C9A877"] },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export const DEFAULT_THEME: ThemeId = "velvet-plum";
export const THEME_STORAGE_KEY = "sukh-theme";

/** Runs inline in <head> before paint so there is no flash of the wrong theme. */
export const themeInitScript = `(function(){try{var s=JSON.parse(localStorage.getItem('${THEME_STORAGE_KEY}')||'null');var t=s&&s.state&&s.state.theme;var ok=${JSON.stringify(
  ["velvet-plum", "sage-atelier", "dusk-lavender", "rose-clay", "midnight-velvet"],
)};document.documentElement.setAttribute('data-theme',ok.indexOf(t)>-1?t:'${DEFAULT_THEME}');}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');}})();`;
