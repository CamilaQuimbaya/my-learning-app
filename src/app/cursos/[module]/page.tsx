import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getModule, modules } from "@/lib/content";
import { requireAuth } from "@/lib/requireAuth";

const accentGrad: Record<string, string> = {
  pink: "from-neon-pink via-neon-hot to-neon-purple",
  cyan: "from-neon-cyan via-neon-purple to-neon-violet",
  purple: "from-neon-purple via-neon-violet to-neon-hot",
};

export function generateStaticParams() {
  return modules.map((m) => ({ module: m.slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleSlug } = await params;
  await requireAuth(`/cursos/${moduleSlug}`);
  const mod = getModule(moduleSlug);
  if (!mod) notFound();

  return (
    <div className="space-y-6">
      <Link href="/cursos" className="text-sm text-pink-100/60 hover:text-neon-pink">
        ← Todos los cursos
      </Link>

      {/* Banner del curso */}
      <header className="relative mt-16 sm:mt-20 lg:mt-28">
        {/* Fondo del banner (recortado a bordes redondeados) */}
        <div
          className={`relative h-52 overflow-hidden rounded-3xl bg-gradient-to-r ${accentGrad[mod.accent]} shadow-glow sm:h-60`}
        >
          <div className="cyber-grid pointer-events-none absolute inset-0 opacity-30" />
          {/* destellos decorativos */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-neon-cyan/20 blur-3xl" />

          <div className="relative z-10 flex h-full max-w-[60%] flex-col justify-center p-6 sm:max-w-md sm:p-9">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Curso
            </span>
            <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              {mod.title.split(" — ")[0]}
            </h1>
            <p className="mt-2 line-clamp-2 text-sm text-white/85 sm:text-base">
              {mod.description}
            </p>
            <p className="mt-3 inline-block w-fit rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white">
              {mod.lessons.length} lecciones
            </p>
          </div>
        </div>

        {/* Mascota: sobresale por arriba, pero abajo queda dentro del banner */}
        <Image
          src={`/courses/${mod.slug}.png`}
          alt={`Mascota del curso de ${mod.title.split(" — ")[0]}`}
          width={400}
          height={400}
          priority
          className="absolute bottom-0 right-2 h-60 w-60 object-contain object-bottom drop-shadow-2xl sm:right-6 sm:h-80 sm:w-80 lg:right-12 lg:h-[22rem] lg:w-[22rem]"
        />
      </header>

      <ol className="grid gap-3">
        {mod.lessons.map((l, i) => (
          <li key={l.slug}>
            <Link
              href={`/cursos/${mod.slug}/${l.slug}`}
              className="card flex items-center gap-4 p-4 transition hover:border-neon-pink/50 hover:bg-white/10"
            >
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-neon-pink/15 font-bold text-neon-pink">
                {i + 1}
              </span>
              <span className="flex-1">
                <span className="font-semibold">{l.title}</span>
                <span className="block text-sm text-pink-100/60">{l.summary}</span>
              </span>
              <span className="text-xs text-pink-100/50">{l.minutes} min</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
