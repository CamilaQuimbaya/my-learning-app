"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import CatLogo from "./CatLogo";
import { getModule, getLesson } from "@/lib/content";
import { HomeIcon, CompassIcon, UserIcon, ArrowRightIcon } from "./Icons";

// Navegación móvil estilo app: header compacto arriba + barra de tabs curva
// abajo con un "hundimiento" que se desliza al tab activo. Solo en pantallas
// chicas (lg:hidden); en desktop manda el Sidebar.
const tabs = [
  { href: "/dashboard", label: "Inicio", Icon: HomeIcon },
  { href: "/cursos", label: "Cursos", Icon: CompassIcon },
  { href: "/perfil", label: "Perfil", Icon: UserIcon },
];

const BAR_H = 64; // alto de la barra
const NOTCH_HALF = 44; // medio ancho de la curva
const NOTCH_DEPTH = 20; // profundidad del hundimiento

// Construye el borde superior de la barra con un hueco cóncavo centrado en cx.
function barPath(w: number, cx: number): string {
  const left = Math.max(cx - NOTCH_HALF, 0);
  const right = Math.min(cx + NOTCH_HALF, w);
  return [
    "M0 0",
    `H ${left}`,
    `C ${cx - NOTCH_HALF * 0.5} 0, ${cx - NOTCH_HALF * 0.6} ${NOTCH_DEPTH}, ${cx} ${NOTCH_DEPTH}`,
    `C ${cx + NOTCH_HALF * 0.6} ${NOTCH_DEPTH}, ${cx + NOTCH_HALF * 0.5} 0, ${right} 0`,
    `H ${w}`,
    `V ${BAR_H}`,
    "H 0",
    "Z",
  ].join(" ");
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function MobileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const segments = pathname.split("/").filter(Boolean);

  // Título / botón volver del header.
  let title = "Camikaze Learn";
  let back: string | null = null;
  if (pathname === "/dashboard") title = "Inicio";
  else if (pathname === "/perfil") title = "Perfil";
  else if (segments[0] === "cursos") {
    if (segments[2]) {
      title =
        getLesson(segments[1], segments[2])?.title ??
        getModule(segments[1])?.title.split(" — ")[0] ??
        "Lección";
      back = `/cursos/${segments[1]}`;
    } else if (segments[1]) {
      title = getModule(segments[1])?.title.split(" — ")[0] ?? "Curso";
      back = "/cursos";
    } else {
      title = "Cursos";
    }
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => isActive(t.href))
  );

  // Medición del ancho de la barra (para el SVG en px reales).
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) =>
      setWidth(entries[0].contentRect.width)
    );
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Posición X (animada) del hundimiento.
  const targetCx = width > 0 ? (width * (activeIndex + 0.5)) / tabs.length : 0;
  const [cx, setCx] = useState(0);
  const cxRef = useRef(0);
  const initRef = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (width === 0) return;
    // Primer cálculo: ubicar sin animar.
    if (!initRef.current) {
      initRef.current = true;
      cxRef.current = targetCx;
      setCx(targetCx);
      return;
    }
    const start = cxRef.current;
    const delta = targetCx - start;
    if (Math.abs(delta) < 0.5) return;
    const t0 = performance.now();
    const dur = 420;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const v = start + delta * easeOutCubic(p);
      cxRef.current = v;
      setCx(v);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetCx, width]);

  return (
    <>
      {/* ===== Header compacto ===== */}
      <header className="fixed inset-x-0 top-0 z-40 lg:hidden">
        {/* pt-safe empuja el contenido por debajo de la barra de estado del
            celu (notch/hora/wifi/batería) cuando la app está instalada */}
        <div className="pt-safe bg-ink2/75 backdrop-blur-xl">
          <div className="flex h-14 items-center gap-2.5 px-3">
            {back ? (
            <Link
              href={back}
              aria-label="Volver"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 transition active:scale-90 active:bg-white/10"
            >
              <ArrowRightIcon className="h-5 w-5 rotate-180" />
            </Link>
          ) : (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 shadow-glow ring-1 ring-white/10">
              <CatLogo className="h-7 w-7" />
            </span>
          )}

          {pathname === "/dashboard" ? (
            <span className="flex-1 truncate font-display text-lg font-bold tracking-tight">
              Camikaze<span className="text-gradient"> Learn</span>
            </span>
          ) : (
            <h1 className="min-w-0 flex-1 truncate font-display text-base font-bold">
              {title}
            </h1>
          )}

          {/* Avatar con anillo de gradiente */}
          <Link
            href="/perfil"
            aria-label="Perfil"
            className="shrink-0 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple p-[2px] shadow-glow transition active:scale-90"
          >
            <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-ink">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Tu perfil"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              ) : (
                <CatLogo className="h-5 w-5" />
              )}
            </span>
          </Link>
          </div>
          {/* Línea neón inferior (brillo) */}
          <div className="h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />
        </div>
      </header>

      {/* ===== Barra de tabs curva ===== */}
      <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div ref={wrapRef} className="relative" style={{ height: BAR_H }}>
          {/* Forma curva de la barra (SVG con notch deslizante) */}
          {width > 0 && (
            <svg
              width={width}
              height={BAR_H}
              viewBox={`0 0 ${width} ${BAR_H}`}
              className="absolute inset-0 drop-shadow-[0_-6px_20px_rgba(124,58,237,0.35)]"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="navFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1b1030" />
                  <stop offset="1" stopColor="#120a1f" />
                </linearGradient>
                <linearGradient id="navRim" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ff4fd8" />
                  <stop offset="0.5" stopColor="#a855f7" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <path
                d={barPath(width, cx)}
                fill="url(#navFill)"
                stroke="url(#navRim)"
                strokeWidth={1.5}
                strokeOpacity={0.55}
              />
            </svg>
          )}

          {/* Tabs por encima de la forma */}
          <div className="relative flex h-full">
            {tabs.map(({ href, label, Icon }, i) => {
              const active = i === activeIndex;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="flex flex-1 flex-col items-center justify-center"
                >
                  {/* Caja de tamaño fijo: el "lift" del activo es solo visual */}
                  <span
                    className={`relative grid h-12 w-12 place-items-center overflow-hidden rounded-full transition-all duration-300 ease-out ${
                      active
                        ? "nav-active-glow -translate-y-6 bg-gradient-to-br from-neon-pink to-neon-purple text-white ring-2 ring-white/15"
                        : "translate-y-0 text-white/55"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {active && <span className="nav-shine" aria-hidden />}
                  </span>
                  <span
                    className={`text-[10px] transition-all duration-300 ${
                      active
                        ? "-translate-y-3 font-semibold text-neon-pink"
                        : "-mt-1 text-white/55"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        {/* Relleno sólido para la safe-area (home indicator) */}
        <div className="h-safe-bottom bg-[#120a1f]" />
      </nav>
    </>
  );
}
