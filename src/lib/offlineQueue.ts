"use client";

// Cola de progreso offline. Cuando se completa un ejercicio sin conexión (o el
// POST falla), el ítem se guarda en localStorage y se reintenta al volver online.
const KEY = "camikaze:pendingProgress";

export type PendingItem = {
  moduleSlug: string;
  lessonSlug: string;
  exerciseId: string;
};

function read(): PendingItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PendingItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: PendingItem[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* almacenamiento lleno o bloqueado: nada que hacer */
  }
}

/** Agrega un ejercicio a la cola (sin duplicar por exerciseId). */
export function enqueue(item: PendingItem): void {
  const items = read();
  if (items.some((i) => i.exerciseId === item.exerciseId)) return;
  items.push(item);
  write(items);
}

let flushing = false;

/**
 * Reintenta enviar todo lo pendiente. Conserva en cola los ítems con error de
 * red o 401 (sesión aún no iniciada); descarta el resto (ej. 404 definitivo).
 */
export async function flushQueue(): Promise<void> {
  if (flushing) return;
  if (typeof navigator !== "undefined" && !navigator.onLine) return;

  flushing = true;
  try {
    let items = read();
    if (items.length === 0) return;

    for (const item of [...items]) {
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        // 401: aún no hay sesión -> dejar en cola para reintentar más tarde.
        if (res.status === 401) continue;
        // Éxito o error definitivo (404, etc.): sacarlo de la cola.
        items = items.filter((i) => i.exerciseId !== item.exerciseId);
        write(items);
      } catch {
        // Error de red: cortar y reintentar cuando vuelva la conexión.
        break;
      }
    }
  } finally {
    flushing = false;
  }
}
