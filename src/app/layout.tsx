import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import { HeartIcon } from "@/components/Icons";
import { auth } from "@/auth";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Camikaze Learn | Aprende desarrollo web",
  description:
    "Plataforma didáctica para aprender HTML, CSS y JavaScript con teoría, lecturas y ejercicios interactivos.",
  applicationName: "Camikaze Learn",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Camikaze",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#120a1f",
  colorScheme: "dark",
  // Permite usar las safe-areas (notch / barra de gestos) en standalone.
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // El sidebar (shell de la app) solo se muestra a usuarias con sesión.
  const session = await auth();
  const isAuthed = !!session?.user?.id;

  return (
    <html lang="es" className={`${outfit.variable} ${grotesk.variable} ${pixel.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          {isAuthed && (
            <>
              <Sidebar />
              <MobileNav />
            </>
          )}
          <div
            className={isAuthed ? "pb-24 lg:pb-0 lg:pl-[260px]" : ""}
          >
            <main
              className={`mx-auto max-w-[1600px] px-4 pb-8 sm:px-6 ${
                isAuthed
                  ? "pt-[calc(env(safe-area-inset-top)+4.25rem)] lg:pt-8"
                  : "pt-[calc(env(safe-area-inset-top)+2rem)]"
              }`}
            >
              {children}
            </main>
            <footer className="mt-16 flex items-center justify-center gap-1.5 border-t border-white/10 py-8 text-center text-sm text-[#f5e9ff]/40">
              Hecho con <HeartIcon className="h-4 w-4 text-neon-pink" /> para aprender
              desarrollo web · Camikaze Learn
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
