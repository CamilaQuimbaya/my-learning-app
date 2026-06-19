import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// Tipado del scope del service worker (se compila aparte del bundle principal,
// por eso este archivo está excluido en tsconfig.json).
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  // Lista de assets a precachear, inyectada por @serwist/next en build.
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  // Estrategias por defecto de Next: páginas, fuentes, imágenes, estáticos, APIs.
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
