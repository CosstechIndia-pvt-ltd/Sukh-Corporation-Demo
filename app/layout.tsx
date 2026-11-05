import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { site } from "@/data/site";
import { getListingIndex, getNavData } from "@/lib/nav";
import { DEFAULT_THEME, themeInitScript } from "@/lib/themes";
import { CompareTray } from "@/components/layout/CompareTray";
import { ContactFab } from "@/components/layout/ContactFab";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { Toast } from "@/components/ui/Toast";
import "./globals.css";

// Roman is preloaded (it carries the LCP headline); italic is used only for <em> accents, so it loads lazily.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: "normal",
  display: "swap",
  variable: "--font-fraunces",
});

const frauncesItalic = Fraunces({
  subsets: ["latin"],
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-fraunces-italic",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sukh Corporation — Homes, offices and land across India",
    template: "%s · Sukh Corporation",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: "Sukh Corporation — Homes, offices and land, chosen with care",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF6F2" },
    { media: "(prefers-color-scheme: dark)", color: "#16111A" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = getNavData();
  const listings = getListingIndex();
  return (
    <html lang="en-IN" data-theme={DEFAULT_THEME} className={`${fraunces.variable} ${frauncesItalic.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh">
        <Providers>
          <Header nav={nav} />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <Footer />
          <ContactFab listings={listings} />
          <CompareTray listings={listings} />
          <ThemeSwitcher />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
