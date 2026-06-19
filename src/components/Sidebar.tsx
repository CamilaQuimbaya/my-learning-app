"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import CatLogo from "./CatLogo";
import { modules } from "@/lib/content";
import {
  HomeIcon,
  CompassIcon,
  UserIcon,
  TrendingIcon,
  PlayIcon,
  ModuleIcon,
  ArrowRightIcon,
} from "./Icons";

const firstLesson = modules[0].lessons[0];

// Barra lateral: solo en desktop (lg+). En móvil la navegación es la barra
// inferior de tabs (ver MobileNav).
export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const menu = [
    { href: "/dashboard", label: "Inicio", icon: <HomeIcon className="h-5 w-5" /> },
    { href: "/cursos", label: "Explorar cursos", icon: <CompassIcon className="h-5 w-5" /> },
    ...modules.map((m) => ({
      href: `/cursos/${m.slug}`,
      label: m.title.split(" — ")[0],
      icon: <ModuleIcon name={m.icon} className="h-5 w-5" />,
    })),
  ];

  const library = [
    { href: "/dashboard", label: "Mi progreso", icon: <TrendingIcon className="h-5 w-5" /> },
    { href: "/perfil", label: "Perfil", icon: <UserIcon className="h-5 w-5" /> },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[260px] flex-col gap-6 overflow-y-auto border-r border-white/10 bg-gradient-to-b from-ink2/95 to-ink/95 p-5 backdrop-blur-xl lg:flex">
      {/* Logo */}
      <Link href="/dashboard" className="group flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 shadow-glow transition-transform group-hover:scale-110 group-hover:-rotate-6">
          <CatLogo className="h-8 w-8" />
        </span>
        <span className="font-display text-lg font-bold tracking-tight">
          Camikaze<span className="text-neon-pink"> Learn</span>
        </span>
      </Link>

      {/* Perfil */}
      {session?.user ? (
        <Link
          href="/perfil"
          className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 transition hover:bg-white/10"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-ink/60 ring-1 ring-white/10">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "avatar"}
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <CatLogo className="h-7 w-7" />
            )}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] text-white/50">¡Hola!</p>
            <p className="truncate font-display text-sm font-bold leading-tight">
              {session.user.name?.split(" ")[0]}
            </p>
          </div>
        </Link>
      ) : (
        <div className="rounded-2xl bg-white/5 p-3 text-center">
          <p className="text-xs text-white/60">Invitada</p>
          <Link
            href="/login"
            className="mt-2 block rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-3 py-2 text-sm font-semibold text-white shadow-glow"
          >
            Entrar
          </Link>
        </div>
      )}

      {/* Menú */}
      <nav className="space-y-1">
        <p className="px-2 text-[11px] uppercase tracking-wider text-white/40">Menú</p>
        {menu.map((item) => (
          <NavItem key={item.label} {...item} active={isActive(item.href)} />
        ))}
      </nav>

      {/* Biblioteca */}
      <nav className="space-y-1">
        <p className="px-2 text-[11px] uppercase tracking-wider text-white/40">
          Mi biblioteca
        </p>
        {library.map((item) => (
          <NavItem key={item.label} {...item} active={isActive(item.href)} />
        ))}
      </nav>

      {/* Mini-card: continuar (estilo reproductor) */}
      <Link
        href={`/cursos/${modules[0].slug}/${firstLesson.slug}`}
        className="mt-auto block rounded-2xl bg-gradient-to-br from-neon-purple/50 to-neon-pink/30 p-4 transition hover:shadow-glow"
      >
        <p className="text-[11px] uppercase tracking-wider text-white/60">
          Continúa aprendiendo
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-semibold">{firstLesson.title}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-white/60">Empieza aquí</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-glow">
            <PlayIcon className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* Salir */}
      {session?.user && (
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowRightIcon className="h-4 w-4" /> Cerrar sesión
        </button>
      )}
    </aside>
  );
}

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
        active
          ? "bg-gradient-to-r from-neon-pink/20 to-neon-purple/10 font-semibold text-neon-pink shadow-[inset_0_0_0_1px_rgba(255,79,216,0.25)]"
          : "text-white/65 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
