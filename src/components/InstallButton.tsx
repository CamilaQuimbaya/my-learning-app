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

export default function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

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

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Solo mostramos el botón cuando el navegador realmente permite instalar
  // (Android / Chrome / Edge / escritorio). En iPhone no se muestra nada,
  // porque Safari no admite instalación por botón.
  if (installed || !deferred) return null;

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferred(null); // el evento solo puede usarse una vez
  }

  return (
    <button
      onClick={install}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-2.5 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20 hover:shadow-glow active:scale-95"
    >
      <DownloadIcon className="h-4 w-4" /> Instalar app
    </button>
  );
}
