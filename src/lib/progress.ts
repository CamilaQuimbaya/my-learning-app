import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export type ExerciseRecord = {
  points: number;
  at: string; // ISO date
};

export type UserProgress = {
  points: number;
  exercises: Record<string, ExerciseRecord>;
};

const EMPTY: UserProgress = { points: 0, exercises: {} };

function toObjectId(id: string): ObjectId | null {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

/** Lee el progreso de un usuario. Devuelve un progreso vacío si no existe. */
export async function getProgress(userId: string): Promise<UserProgress> {
  const _id = toObjectId(userId);
  if (!_id) return EMPTY;
  const db = await getDb();
  const user = await db
    .collection("users")
    .findOne({ _id }, { projection: { progress: 1 } });
  return (user?.progress as UserProgress) ?? EMPTY;
}

/**
 * Marca un ejercicio como completado. Si ya estaba completado conserva la mejor
 * puntuación y no la duplica. Devuelve el progreso actualizado.
 */
export async function completeExercise(
  userId: string,
  exerciseId: string,
  points: number
): Promise<UserProgress> {
  const _id = toObjectId(userId);
  if (!_id) return EMPTY;
  const db = await getDb();
  const users = db.collection("users");

  const current = await getProgress(userId);
  const already = current.exercises[exerciseId];

  // No volver a sumar puntos si ya estaba completado con igual o más puntos.
  if (already && already.points >= points) return current;

  const deltaPoints = points - (already?.points ?? 0);

  const updated: UserProgress = {
    points: current.points + deltaPoints,
    exercises: {
      ...current.exercises,
      [exerciseId]: { points, at: new Date().toISOString() },
    },
  };

  await users.updateOne({ _id }, { $set: { progress: updated } });
  return updated;
}
