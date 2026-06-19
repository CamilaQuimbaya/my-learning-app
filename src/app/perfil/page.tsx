import Image from "next/image";
import { requireAuth } from "@/lib/requireAuth";
import { getProgress } from "@/lib/progress";
import { totalExercises } from "@/lib/content";
import CatLogo from "@/components/CatLogo";
import InstallButton from "@/components/InstallButton";
import LogoutButton from "@/components/LogoutButton";
import { TrophyIcon } from "@/components/Icons";

export default async function PerfilPage() {
  const session = await requireAuth("/perfil");
  const progress = await getProgress(session.user.id);

  const totalEx = totalExercises();
  const doneCount = Object.keys(progress.exercises ?? {}).length;
  const overallPct = totalEx ? Math.round((doneCount / totalEx) * 100) : 0;

  return (
    <div className="mx-auto max-w-md space-y-6">
      {/* Cabecera de perfil */}
      <section className="card flex flex-col items-center gap-3 p-6 text-center">
        <span className="grid h-24 w-24 place-items-center overflow-hidden rounded-3xl bg-ink/60 ring-2 ring-neon-pink/40 shadow-glow">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "avatar"}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            <CatLogo className="h-16 w-16" />
          )}
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold">
            {session.user.name ?? "Alumna"}
          </h1>
          {session.user.email && (
            <p className="text-sm text-white/50">{session.user.email}</p>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3 text-center">
        <div className="card p-4">
          <p className="font-display text-2xl font-extrabold text-gradient">
            {progress.points}
          </p>
          <p className="text-[11px] text-white/50">puntos</p>
        </div>
        <div className="card p-4">
          <p className="font-display text-2xl font-extrabold text-neon-cyan">
            {doneCount}
          </p>
          <p className="text-[11px] text-white/50">ejercicios</p>
        </div>
        <div className="card p-4">
          <p className="font-display text-2xl font-extrabold text-neon-pink">
            {overallPct}%
          </p>
          <p className="text-[11px] text-white/50">completado</p>
        </div>
      </section>

      {/* Progreso global */}
      <section className="card p-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <TrophyIcon className="h-4 w-4 text-neon-pink" /> Tu progreso
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-pink via-neon-hot to-neon-purple transition-all"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-white/50">
          {doneCount} de {totalEx} ejercicios completados
        </p>
      </section>

      {/* Acciones */}
      <section className="space-y-3">
        <InstallButton />
        <LogoutButton />
      </section>
    </div>
  );
}
