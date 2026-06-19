"use client";

import { useState } from "react";
import type { QuizExercise } from "@/lib/content/types";
import { CheckCircleIcon, CheckIcon } from "@/components/Icons";

export default function Quiz({
  exercise,
  done,
  onComplete,
}: {
  exercise: QuizExercise;
  done: boolean;
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const isCorrect = selected === exercise.answer;

  function check() {
    if (selected === null) return;
    setRevealed(true);
    if (selected === exercise.answer) onComplete();
  }

  return (
    <div className="space-y-4">
      <p className="font-medium">{exercise.question}</p>
      <div className="space-y-2">
        {exercise.options.map((opt, i) => {
          const showState = revealed && (i === exercise.answer || i === selected);
          const stateClass = !showState
            ? "border-white/15 hover:border-neon-pink/50"
            : i === exercise.answer
              ? "border-neon-lime/70 bg-neon-lime/10"
              : "border-red-400/60 bg-red-400/10";
          return (
            <button
              key={i}
              disabled={revealed && isCorrect}
              onClick={() => {
                setSelected(i);
                setRevealed(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                selected === i && !revealed ? "border-neon-pink bg-neon-pink/10" : stateClass
              }`}
            >
              <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border border-white/20 text-xs">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div
          className={`flex gap-2 rounded-xl p-3 text-sm ${
            isCorrect ? "bg-neon-lime/10 text-neon-lime" : "bg-red-400/10 text-red-300"
          }`}
        >
          {isCorrect && <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />}
          <span>
            <span className="font-semibold">{isCorrect ? "¡Correcto! " : "Aún no. "}</span>
            {exercise.explain}
          </span>
        </div>
      )}

      {!(revealed && isCorrect) && (
        <button onClick={check} disabled={selected === null} className="btn-neon">
          Comprobar respuesta
        </button>
      )}
      {done && !revealed && (
        <p className="inline-flex items-center gap-1 text-sm text-neon-lime">
          <CheckIcon className="h-4 w-4" /> Ya completaste este ejercicio.
        </p>
      )}
    </div>
  );
}
