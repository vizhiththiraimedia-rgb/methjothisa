import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });


export const metadata: Metadata = {
  title: {
    default: "Methjothisa - Universal Astro Intelligence Platform",
    template: "%s | Methjothisa",
  },
  description: "The Complete Global Astrology Intelligence Platform. AI-powered astrology with mathematically accurate Swiss Ephemeris calculations, multi-language support, and comprehensive reports.",
  keywords: ["astrology", "horoscope", "birth chart", "kundali", "rasi chart", "navamsa", "AI astrology", "Swiss Ephemeris"],
  authors: [{ name: "Methjothisa" }],
  creator: "Methjothisa",
  publisher: "Methjothisa",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ta: "/ta",
      hi: "/hi",
      si: "/si",
      ml: "/ml",
      te: "/te",
      kn: "/kn",
      ar: "/ar",
      es: "/es",
      fr: "/fr",
      de: "/de",
      it: "/it",
      pt: "/pt",
      zh: "/zh",
      ja: "/ja",
      ko: "/ko",
      ru: "/ru",
      th: "/th",
      id: "/id",
      tr: "/tr",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Methjothisa",
    title: "Methjothisa - Universal Astro Intelligence Platform",
    description: "The Complete Global Astrology Intelligence Platform with AI-powered insights and mathematically accurate calculations.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Methjothisa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Methjothisa - Universal Astro Intelligence Platform",
    description: "AI-powered astrology with mathematically accurate Swiss Ephemeris calculations.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <QueryProvider>
              <AuthProvider>
                <div className="relative min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1 pt-16">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </AuthProvider>
            </QueryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
