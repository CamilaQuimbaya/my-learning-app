import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { modules, totalLessons, totalExercises } from "@/lib/content";
import InstallButton from "@/components/InstallButton";
import {
  BookIcon,
  KeyboardIcon,
  CheckCircleIcon,
  PencilIcon,
  TrophyIcon,
} from "@/components/Icons";

export default async function Home() {
  // Si ya inició sesión, el Inicio es el dashboard.
  const session = await auth();
  if (session?.user?.id) redirect("/dashboard");

  const accentMap: Record<string, string> = {
    pink: "hover:shadow-glow",
    cyan: "hover:shadow-neon-cyan",
    purple: "hover:shadow-glow-lg",
  };

  return (
    <div className="space-y-16">
      {/* Hero: banner */}
      <section className="space-y-6 text-center">
        <Link
          href="/register"
          aria-label="Empezar el curso de HTML"
          className="group block overflow-hidden rounded-3xl shadow-glow ring-1 ring-white/10 transition hover:ring-neon-pink/40"
        >
          <Image
            src="/banners/html-hero.png"
            alt="HTML para principiantes — empieza tu camino en el desarrollo web"
            width={1998}
            height={666}
            priority
            sizes="(max-width: 1600px) 100vw, 1600px"
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </Link>

        <div className="mx-auto max-w-2xl space-y-5">
          <p className="text-base text-[#f5e9ff]/80 sm:text-lg">
            Teoría clara, lecturas y ejercicios interactivos de HTML, CSS y JavaScript.
            Escribe código en vivo y sigue tu progreso paso a paso.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/register" className="btn-neon text-base">
              Crear mi cuenta
            </Link>
            <Link href="/login" className="btn-ghost text-base">
              Iniciar sesión
            </Link>
          </div>

          {/* Instalar la app (aparece solo si el navegador lo permite) */}
          <div className="mx-auto max-w-xs">
            <InstallButton />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm text-[#f5e9ff]/60">
            <span className="inline-flex items-center gap-2">
              <BookIcon className="h-4 w-4 text-neon-pink" /> {totalLessons()} lecciones
            </span>
            <span className="inline-flex items-center gap-2">
              <PencilIcon className="h-4 w-4 text-neon-cyan" /> {totalExercises()} ejercicios
            </span>
            <span className="inline-flex items-center gap-2">
              <TrophyIcon className="h-4 w-4 text-neon-purple" /> Sistema de puntos
            </span>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold">Los 3 pilares de la web</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.slug}
              href={`/cursos/${m.slug}`}
              className={`card group p-6 transition hover:scale-[1.02] ${accentMap[m.accent]}`}
            >
              <Image
                src={`/courses/${m.slug}.png`}
                alt={`Mascota del curso de ${m.title.split(" — ")[0]}`}
                width={120}
                height={120}
                className="mb-3 h-24 w-24 object-contain drop-shadow-lg transition-transform group-hover:scale-110"
              />
              <h3 className="font-display text-xl font-bold">{m.title}</h3>
              <p className="mt-2 text-sm text-[#f5e9ff]/70">{m.description}</p>
              <p className="mt-4 text-sm font-medium text-neon-pink">
                {m.lessons.length} lecciones →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="grid gap-5 sm:grid-cols-3">
        {[
          { Icon: BookIcon, t: "Lee y aprende", d: "Teoría explicada con ejemplos de código claros y al grano." },
          { Icon: KeyboardIcon, t: "Practica en vivo", d: "Escribe HTML, CSS y JS en un editor con vista previa instantánea." },
          { Icon: CheckCircleIcon, t: "Supera retos", d: "Ejercicios con validación automática que comprueban tu solución." },
        ].map((f) => (
          <div key={f.t} className="card p-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-neon-pink">
              <f.Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-3 font-display font-bold">{f.t}</h3>
            <p className="mt-1 text-sm text-[#f5e9ff]/70">{f.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
