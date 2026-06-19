import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProgress } from "@/lib/progress";
import { modules, allLessons, totalExercises } from "@/lib/content";
import CatLogo from "@/components/CatLogo";
import InstallButton from "@/components/InstallButton";
import {
  ModuleIcon,
  TrophyIcon,
  PlayIcon,
  CheckIcon,
  SparkleIcon,
  FlameIcon,
  CrownIcon,
  CodeIcon,
} from "@/components/Icons";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const progress = await getProgress(session.user.id);
  const doneSet = new Set(Object.keys(progress.exercises ?? {}));
  const totalEx = totalExercises();
  const doneCount = doneSet.size;
  const overallPct = totalEx ? Math.round((doneCount / totalEx) * 100) : 0;
  const firstName = session.user.name?.split(" ")[0] ?? "alumna";

  // Progreso por módulo
  const moduleStats = modules.map((m) => {
    const exIds = m.lessons.flatMap((l) => l.exercises.map((e) => e.id));
    const done = exIds.filter((id) => doneSet.has(id)).length;
    const pct = exIds.length ? Math.round((done / exIds.length) * 100) : 0;
    return { ...m, done, total: exIds.length, pct };
  });

  // Lección para "continuar": la primera con ejercicios pendientes
  const flat = allLessons();
  const next =
    flat.find((x) => x.lesson.exercises.some((e) => !doneSet.has(e.id))) ?? flat[0];

  const accentBar: Record<string, string> = {
    pink: "from-neon-pink to-neon-hot",
    cyan: "from-neon-cyan to-neon-purple",
    purple: "from-neon-purple to-neon-violet",
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
      {/* ===== Columna central ===== */}
      <section className="space-y-6">
        {/* Saludo */}
        <header className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-white/55">¡Hola de nuevo!</p>
            <h1 className="truncate font-display text-2xl font-bold">
              {firstName} <span className="align-middle">👋</span>
            </h1>
          </div>
          <Link href="/cursos" className="btn-neon hidden text-sm sm:inline-block">
            Explorar
          </Link>
        </header>

        {/* Banner destacado */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neon-pink via-neon-hot to-neon-purple p-5 shadow-glow sm:p-7">
          <div className="cyber-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="max-w-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                Camikaze Learn
              </p>
              <h2 className="mt-2 font-display text-xl font-extrabold leading-tight text-white sm:text-3xl">
                ¡Sigue aprendiendo, {firstName}!
              </h2>
              <p className="mt-2 text-sm text-white/85">
                Llevas {overallPct}% del camino. Tu próxima parada: {next.lesson.title}.
              </p>
              <Link
                href={`/cursos/${next.module.slug}/${next.lesson.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-ink transition active:scale-95 hover:scale-105"
              >
                Continuar ahora <PlayIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="hidden shrink-0 animate-float sm:block">
              <div className="grid h-32 w-32 place-items-center rounded-full bg-ink/55 ring-2 ring-white/20 backdrop-blur-sm">
                <CatLogo className="h-24 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats rápidos (arriba, estilo app) */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="card p-3 text-center">
              <p className="font-display text-2xl font-extrabold text-gradient">
                {progress.points}
              </p>
              <p className="text-[11px] text-white/50">puntos</p>
            </div>
            <div className="card p-3 text-center">
              <p className="font-display text-2xl font-extrabold text-neon-cyan">
                {doneCount}
              </p>
              <p className="text-[11px] text-white/50">ejercicios</p>
            </div>
            <div className="card p-3 text-center">
              <p className="font-display text-2xl font-extrabold text-neon-pink">
                {overallPct}%
              </p>
              <p className="text-[11px] text-white/50">completado</p>
            </div>
          </div>
          <div className="card p-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-white/70">
                <TrophyIcon className="h-4 w-4 text-neon-pink" /> Progreso total
              </span>
              <span className="text-white/50">
                {doneCount}/{totalEx}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-pink via-neon-hot to-neon-purple transition-all"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Módulos (carrusel horizontal en móvil) */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Tus módulos</h3>
            <Link href="/cursos" className="text-xs text-white/50 hover:text-neon-pink">
              Ver todos
            </Link>
          </div>
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {moduleStats.map((m) => (
              <Link
                key={m.slug}
                href={`/cursos/${m.slug}`}
                className="card group w-[68%] shrink-0 snap-start p-4 transition hover:shadow-glow active:scale-95 sm:w-auto sm:hover:scale-[1.02]"
              >
                <div
                  className={`mb-3 grid h-20 place-items-center rounded-xl bg-gradient-to-br ${accentBar[m.accent]} text-white`}
                >
                  <ModuleIcon name={m.icon} className="h-9 w-9" />
                </div>
                <p className="font-semibold">{m.title.split(" — ")[0]}</p>
                <p className="text-xs text-white/50">
                  {m.done}/{m.total} ejercicios
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${accentBar[m.accent]}`}
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Lista de lecciones (estilo trending) */}
        <div>
          <h3 className="mb-3 font-display text-lg font-bold">Todas las lecciones</h3>
          <div className="card divide-y divide-white/5">
            {flat.map(({ module: m, lesson: l }, i) => {
              const total = l.exercises.length;
              const done = l.exercises.filter((e) => doneSet.has(e.id)).length;
              const complete = done === total && total > 0;
              return (
                <Link
                  key={`${m.slug}-${l.slug}`}
                  href={`/cursos/${m.slug}/${l.slug}`}
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-white/5"
                >
                  <span className="w-6 text-center text-sm text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-neon-pink">
                    <ModuleIcon name={m.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{l.title}</span>
                    <span className="block truncate text-xs text-white/50">
                      {m.title.split(" — ")[0]} · {l.minutes} min
                    </span>
                  </span>
                  <span className="text-xs text-white/50">
                    {done}/{total}
                  </span>
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full ${
                      complete
                        ? "bg-neon-lime/20 text-neon-lime"
                        : "bg-gradient-to-r from-neon-pink to-neon-purple text-white"
                    }`}
                  >
                    {complete ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <PlayIcon className="h-3.5 w-3.5" />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Columna derecha ===== */}
      <aside className="space-y-5">
        {/* Logros */}
        <div className="card p-5">
          <h3 className="font-display font-bold">Logros</h3>
          <div className="mt-3 grid grid-cols-4 gap-2">
            <Badge unlocked={doneCount >= 1} icon={<SparkleIcon className="h-6 w-6" />} title="Primer paso" />
            <Badge unlocked={doneCount >= 5} icon={<FlameIcon className="h-6 w-6" />} title="En racha" />
            <Badge unlocked={(moduleStats[0]?.pct ?? 0) === 100} icon={<CodeIcon className="h-6 w-6" />} title="HTML pro" />
            <Badge unlocked={overallPct === 100} icon={<CrownIcon className="h-6 w-6" />} title="Maestra web" />
          </div>
          <p className="mt-3 text-xs text-white/50">
            Completa ejercicios para desbloquear más insignias.
          </p>
        </div>

        {/* Próxima lección destacada */}
        <Link
          href={`/cursos/${next.module.slug}/${next.lesson.slug}`}
          className="block rounded-2xl bg-gradient-to-br from-neon-violet/50 to-neon-pink/30 p-5 transition hover:shadow-glow"
        >
          <p className="text-[11px] uppercase tracking-wider text-white/60">
            Tu próxima lección
          </p>
          <p className="mt-1 font-display font-bold">{next.lesson.title}</p>
          <p className="mt-1 text-xs text-white/60">{next.lesson.summary}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-ink">
            Empezar <PlayIcon className="h-3 w-3" />
          </span>
        </Link>

        {/* Instalar la app (aparece solo si el navegador lo permite) */}
        <InstallButton />
      </aside>
    </div>
  );
}

function Badge({
  unlocked,
  icon,
  title,
}: {
  unlocked: boolean;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div
      title={title}
      className={`grid aspect-square place-items-center rounded-xl transition ${
        unlocked
          ? "bg-gradient-to-br from-neon-pink/30 to-neon-purple/30 text-white shadow-glow"
          : "bg-white/5 text-white/30 opacity-50"
      }`}
    >
      {icon}
    </div>
  );
}
