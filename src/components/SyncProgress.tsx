"use client";

import { useEffect } from "react";
import { flushQueue } from "@/lib/offlineQueue";

// Sincroniza el progreso pendiente al cargar la app y cada vez que vuelve la
// conexión. No renderiza nada.
export default function SyncProgress() {
  useEffect(() => {
    void flushQueue();
    const onOnline = () => void flushQueue();
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, []);

  return null;
}
