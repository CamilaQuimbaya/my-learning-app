import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule, getLesson, allLessons } from "@/lib/content";
import { requireAuth } from "@/lib/requireAuth";
import { getProgress } from "@/lib/progress";
import ContentBlocks from "@/components/ContentBlocks";
import LessonExercises from "@/components/LessonExercises";
import { ModuleIcon, ClockIcon, TrophyIcon } from "@/components/Icons";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}) {
  const { module: moduleSlug, lesson: lessonSlug } = await params;
  const session = await requireAuth(`/cursos/${moduleSlug}/${lessonSlug}`);
  const mod = getModule(moduleSlug);
  const lesson = getLesson(moduleSlug, lessonSlug);
  if (!mod || !lesson) notFound();

  // Progreso del alumno (siempre hay sesión: la página está protegida).
  const progress = await getProgress(session.user.id);
  const doneIds = lesson.exercises
    .filter((e) => progress.exercises?.[e.id])
    .map((e) => e.id);

  // Navegación anterior / siguiente entre todas las lecciones.
  const flat = allLessons();
  const idx = flat.findIndex(
    (x) => x.module.slug === moduleSlug && x.lesson.slug === lessonSlug
  );
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-pink-100/50">
        <Link href="/cursos" className="hover:text-neon-pink">
          Cursos
        </Link>{" "}
        /{" "}
        <Link href={`/cursos/${mod.slug}`} className="hover:text-neon-pink">
          {mod.title}
        </Link>
      </nav>

      <header className="space-y-2">
        <span className="inline-flex items-center gap-1.5 text-sm text-neon-pink">
          <ModuleIcon name={mod.icon} className="h-4 w-4" /> {mod.title}
        </span>
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-pink-100/70">{lesson.summary}</p>
        <p className="inline-flex items-center gap-1.5 text-xs text-pink-100/40">
          <ClockIcon className="h-3.5 w-3.5" /> {lesson.minutes} min de lectura
        </p>
      </header>

      <ContentBlocks blocks={lesson.blocks} />

      <hr className="border-white/10" />

      <LessonExercises
        moduleSlug={moduleSlug}
        lessonSlug={lessonSlug}
        initialDone={doneIds}
      />

      {/* Navegación */}
      <nav className="flex items-center justify-between gap-3 border-t border-white/10 pt-6">
        {prev ? (
          <Link
            href={`/cursos/${prev.module.slug}/${prev.lesson.slug}`}
            className="btn-ghost text-sm"
          >
            ← {prev.lesson.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/cursos/${next.module.slug}/${next.lesson.slug}`}
            className="btn-neon text-sm"
          >
            {next.lesson.title} →
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="btn-neon inline-flex items-center gap-2 text-sm"
          >
            Ver mi progreso <TrophyIcon className="h-4 w-4" />
          </Link>
        )}
      </nav>
    </article>
  );
}
