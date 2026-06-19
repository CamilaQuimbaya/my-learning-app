import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { completeExercise, getProgress } from "@/lib/progress";
import { getExercise } from "@/lib/content";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  const progress = await getProgress(session.user.id);
  return NextResponse.json(progress);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { moduleSlug, lessonSlug, exerciseId } = await req.json();
  const exercise = getExercise(moduleSlug, lessonSlug, exerciseId);
  if (!exercise) {
    return NextResponse.json({ error: "Ejercicio no encontrado" }, { status: 404 });
  }

  // La puntuación la define el contenido del servidor, no el cliente.
  const progress = await completeExercise(
    session.user.id,
    exercise.id,
    exercise.points
  );
  return NextResponse.json(progress);
}
