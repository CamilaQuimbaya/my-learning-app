"use client";

import { useEffect, useState } from "react";
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
    // iOS Safari
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export default function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [iosHint, setIosHint] = useState(false);
  const [showIos, setShowIos] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      setInstalled(true);
      return;
    }

    const onPrompt = (e: Event) => {
      e.preventDefault(); // evita el mini-infobar nativo; lo disparamos nosotros
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // iOS no dispara beforeinstallprompt: mostramos instrucciones manuales.
    if (isIOS()) setIosHint(true);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferred(null); // el evento solo puede usarse una vez
  }

  // Chrome / Edge / Android / desktop con prompt disponible.
  if (deferred) {
    return (
      <button
        onClick={install}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-2.5 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20 hover:shadow-glow"
      >
        <DownloadIcon className="h-4 w-4" /> Instalar app
      </button>
    );
  }

  // iOS: botón que despliega el paso a paso de "Agregar a inicio".
  if (iosHint) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => setShowIos((v) => !v)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-2.5 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
        >
          <DownloadIcon className="h-4 w-4" /> Instalar app
        </button>
        {showIos && (
          <p className="rounded-xl bg-white/5 p-3 text-xs leading-relaxed text-white/70">
            En iPhone/iPad: tocá el botón <strong>Compartir</strong> y luego{" "}
            <strong>“Agregar a inicio”</strong>.
          </p>
        )}
      </div>
    );
  }

  return null;
}
