"use client";

import { useEffect, useState } from "react";
import CatLogo from "./CatLogo";
import { DownloadIcon } from "./Icons";

// Evento no estándar de Chromium para instalar la PWA.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /iphone|ipad|ipod/i.test(ua) ||
    // iPad con iPadOS se reporta como Mac con pantalla táctil
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

// Íconos del paso a paso (estilo iOS).
const ShareIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M12 15V3" />
    <path d="m8 7 4-4 4 4" />
    <path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" />
  </svg>
);
const AddIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

export default function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      setInstalled(true);
      return;
    }
    setIos(isIOS());

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  async function installChromium() {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferred(null);
  }

  // Ni Chromium (sin prompt) ni iOS → no hay forma de instalar: no mostramos nada.
  if (!deferred && !ios) return null;

  return (
    <>
      <button
        onClick={deferred ? installChromium : () => setShowSheet(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-2.5 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20 hover:shadow-glow active:scale-95"
      >
        <DownloadIcon className="h-4 w-4" /> Instalar app
      </button>

      {/* Bottom-sheet con la guía para iPhone */}
      {ios && showSheet && (
        <div
          className="animate-fade-in fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSheet(false)}
        >
          <div
            className="animate-sheet-up glass-strong pb-safe w-full max-w-md rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-white/20" />

            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/5 shadow-glow ring-1 ring-white/10">
                <CatLogo className="h-9 w-9" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">Instalar Camikaze Learn</h3>
                <p className="text-sm text-white/60">Agregala a tu inicio en 2 pasos</p>
              </div>
            </div>

            <ol className="mt-6 space-y-3">
              <li className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neon-pink/15 text-sm font-bold text-neon-pink">
                  1
                </span>
                <span className="flex-1 text-sm">
                  Tocá el botón <strong>Compartir</strong> de Safari
                </span>
                <ShareIcon className="h-6 w-6 shrink-0 text-neon-cyan" />
              </li>
              <li className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neon-pink/15 text-sm font-bold text-neon-pink">
                  2
                </span>
                <span className="flex-1 text-sm">
                  Elegí <strong>“Agregar a inicio”</strong>
                </span>
                <AddIcon className="h-6 w-6 shrink-0 text-neon-cyan" />
              </li>
            </ol>

            <button
              onClick={() => setShowSheet(false)}
              className="btn-neon mt-6 w-full"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
