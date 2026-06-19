"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getLesson } from "@/lib/content";
import { enqueue, flushQueue } from "@/lib/offlineQueue";
import Quiz from "./exercises/Quiz";
import Playground from "./exercises/Playground";
import { PencilIcon, BulbIcon, CheckIcon } from "@/components/Icons";

export default function LessonExercises({
  moduleSlug,
  lessonSlug,
  initialDone,
}: {
  moduleSlug: string;
  lessonSlug: string;
  initialDone: string[];
}) {
  const { status } = useSession();
  const lesson = getLesson(moduleSlug, lessonSlug);
  const [done, setDone] = useState<Set<string>>(new Set(initialDone));
  const [needLogin, setNeedLogin] = useState(false);

  if (!lesson) return null;

  async function complete(exerciseId: string) {
    setDone((prev) => new Set(prev).add(exerciseId));
    if (status !== "authenticated") {
      setNeedLogin(true);
      return;
    }
    const item = { moduleSlug, lessonSlug, exerciseId };
    try {
      // Sincroniza primero lo que hubiera quedado pendiente de antes.
      await flushQueue();
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      // 401/5xx: encolar para reintentar cuando se pueda.
      if (!res.ok) enqueue(item);
    } catch {
      // Sin conexión: guardar y sincronizar al volver online.
      enqueue(item);
    }
  }

  const total = lesson.exercises.length;
  const completed = lesson.exercises.filter((e) => done.has(e.id)).length;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <PencilIcon className="h-5 w-5 text-neon-pink" /> Ejercicios
        </h2>
        <span className="text-sm text-pink-100/60">
          {completed} / {total} completados
        </span>
      </div>

      {needLogin && status !== "authenticated" && (
        <div className="card flex gap-2 border-neon-cyan/30 bg-neon-cyan/5 p-4 text-sm">
          <BulbIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-cyan" />
          <span>
            Tu progreso no se está guardando.{" "}
            <Link href="/login" className="font-medium text-neon-cyan hover:underline">
              Inicia sesión
            </Link>{" "}
            para guardar tus puntos y avances.
          </span>
        </div>
      )}

      {lesson.exercises.map((ex, i) => {
        const isDone = done.has(ex.id);
        return (
          <div
            key={ex.id}
            className={`card p-5 transition ${isDone ? "border-neon-lime/40" : ""}`}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-neon-pink/15 text-sm font-bold text-neon-pink">
                {i + 1}
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-pink-100/60">
                {ex.kind === "quiz"
                  ? "Quiz"
                  : ex.kind === "challenge"
                    ? "Reto"
                    : "Práctica"}
              </span>
              {isDone && (
                <span className="ml-auto inline-flex items-center gap-1 text-sm text-neon-lime">
                  <CheckIcon className="h-4 w-4" /> Hecho
                </span>
              )}
            </div>

            {ex.kind === "quiz" ? (
              <Quiz exercise={ex} done={isDone} onComplete={() => complete(ex.id)} />
            ) : (
              <Playground exercise={ex} done={isDone} onComplete={() => complete(ex.id)} />
            )}
          </div>
        );
      })}
    </section>
  );
}
