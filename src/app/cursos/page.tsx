import Link from "next/link";
import Image from "next/image";
import { modules } from "@/lib/content";
import { BookIcon } from "@/components/Icons";
import { requireAuth } from "@/lib/requireAuth";

const accentMap: Record<string, string> = {
  pink: "border-neon-pink/30 hover:shadow-neon",
  cyan: "border-neon-cyan/30 hover:shadow-neon-cyan",
  purple: "border-neon-purple/30 hover:shadow-neon",
};

export default async function CursosPage() {
  await requireAuth("/cursos");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <BookIcon className="h-7 w-7 text-neon-pink" /> Cursos
        </h1>
        <p className="text-pink-100/70">
          Elige un módulo y avanza a tu ritmo. Cada lección incluye teoría y ejercicios.
        </p>
      </header>

      <div className="space-y-6">
        {modules.map((m) => (
          <div key={m.slug} className={`card border p-6 ${accentMap[m.accent]}`}>
            <div className="flex items-center gap-4">
              <Image
                src={`/courses/${m.slug}.png`}
                alt={`Mascota del curso de ${m.title.split(" — ")[0]}`}
                width={96}
                height={96}
                className="h-16 w-16 shrink-0 object-contain drop-shadow-lg sm:h-20 sm:w-20"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold">{m.title}</h2>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-pink-100/60">
                    {m.lessons.length} lecciones
                  </span>
                </div>
                <p className="mt-1 text-sm text-pink-100/70">{m.description}</p>
              </div>
            </div>

            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {m.lessons.map((l, i) => (
                <li key={l.slug}>
                  <Link
                    href={`/cursos/${m.slug}/${l.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-neon-pink/50 hover:bg-white/10"
                  >
                    <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-neon-pink/15 text-xs font-bold text-neon-pink">
                      {i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="font-medium">{l.title}</span>
                      <span className="block text-xs text-pink-100/50">
                        {l.minutes} min · {l.exercises.length} ejercicios
                      </span>
                    </span>
                    <span className="text-neon-pink">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
