import type { Module, Lesson, Exercise } from "./types";
import { htmlModule } from "./html";
import { cssModule } from "./css";
import { jsModule } from "./javascript";

export const modules: Module[] = [htmlModule, cssModule, jsModule];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getLesson(moduleSlug: string, lessonSlug: string): Lesson | undefined {
  return getModule(moduleSlug)?.lessons.find((l) => l.slug === lessonSlug);
}

export function getExercise(
  moduleSlug: string,
  lessonSlug: string,
  exerciseId: string
): Exercise | undefined {
  return getLesson(moduleSlug, lessonSlug)?.exercises.find((e) => e.id === exerciseId);
}

/** Lista plana de todas las lecciones, con su módulo, en orden. */
export function allLessons(): { module: Module; lesson: Lesson }[] {
  return modules.flatMap((m) => m.lessons.map((lesson) => ({ module: m, lesson })));
}

/** Cuenta total de ejercicios en toda la plataforma. */
export function totalExercises(): number {
  return modules.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.exercises.length, 0),
    0
  );
}

export function totalLessons(): number {
  return modules.reduce((acc, m) => acc + m.lessons.length, 0);
}

export * from "./types";
