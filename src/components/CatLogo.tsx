"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = { className?: string; happy?: boolean };

/**
 * Gatito kawaii con audífonos 🎧🐱 — ¡interactivo!
 * - Los ojos siguen el cursor del mouse.
 * - Parpadea solito cada cierto tiempo.
 * - Al pasar el mouse por encima: guiña el ojo, se sonroja,
 *   las orejas se mueven y aparecen notas musicales ♪.
 */
export default function CatLogo({ className, happy = false }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);
  const [blinking, setBlinking] = useState(false);
  const [hovered, setHovered] = useState(false);

  // IDs únicos por instancia: evita que varios gatos en la misma página
  // compartan el mismo id de degradado (lo que dejaba la cara sin relleno).
  const uid = useId().replace(/:/g, "");
  const furId = `catFur-${uid}`;
  const headId = `catHead-${uid}`;

  // 👀 Los ojos siguen al cursor.
  // Solo calcula al mover el mouse (throttle con 1 rAF) y suaviza con CSS,
  // en vez de un bucle por frame -> no traba el scroll.
  useEffect(() => {
    let ticking = false;
    let mx = 0;
    let my = 0;

    const update = () => {
      ticking = false;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = mx - cx;
      let dy = my - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 1.8; // límite de movimiento de la pupila (unidades del viewBox)
      const f = Math.min(dist, 200) / 200;
      dx = (dx / dist) * max * f;
      dy = (dy / dist) * max * f;
      const t = `translate(${dx}px, ${dy}px)`;
      // Mueve ambas pupilas (la derecha puede no existir si está guiñando)
      if (pupilsRef.current) pupilsRef.current.style.transform = t;
      if (rightPupilRef.current) rightPupilRef.current.style.transform = t;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // 😴 Parpadeo automático
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      window.setTimeout(() => setBlinking(false), 150);
    };
    const id = window.setInterval(blink, 3800);
    return () => window.clearInterval(id);
  }, []);

  const eyeStyle = {
    transformBox: "fill-box" as const,
    transformOrigin: "center",
    transform: blinking ? "scaleY(0.1)" : "scaleY(1)",
    transition: "transform 0.08s ease",
  };

  // Cara feliz: por hover o forzada con la prop `happy`
  const show = happy || hovered;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Gatito kawaii con audífonos"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <defs>
        <linearGradient id={furId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8fe0" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <linearGradient id={headId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff0fb" />
          <stop offset="100%" stopColor="#ffd6f5" />
        </linearGradient>
      </defs>

      {/* Orejas (se mueven al hacer hover) */}
      <g
        style={{
          transformBox: "fill-box",
          transformOrigin: "center bottom",
          transform: show ? "rotate(-8deg) translateY(-1px)" : "rotate(0)",
          transition: "transform 0.3s ease",
        }}
      >
        <path d="M14 22 L18 8 L30 18 Z" fill={`url(#${furId})`} />
        <path d="M17 18 L19 11 L25 17 Z" fill="#ff5fd2" opacity="0.8" />
      </g>
      <g
        style={{
          transformBox: "fill-box",
          transformOrigin: "center bottom",
          transform: show ? "rotate(8deg) translateY(-1px)" : "rotate(0)",
          transition: "transform 0.3s ease",
        }}
      >
        <path d="M50 22 L46 8 L34 18 Z" fill={`url(#${furId})`} />
        <path d="M47 18 L45 11 L39 17 Z" fill="#ff5fd2" opacity="0.8" />
      </g>

      {/* Cabeza */}
      <circle cx="32" cy="34" r="20" fill={`url(#${headId})`} stroke="#ff5fd2" strokeWidth="1.5" />

      {/* Mejillas (laten; se agrandan al hover) */}
      <circle cx="20" cy="38" r={show ? 5 : 4} fill="#ff8fe0" opacity={show ? 0.9 : 0.7} style={{ transition: "all 0.3s ease" }}>
        <animate attributeName="r" values="4;4.6;4" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="44" cy="38" r={show ? 5 : 4} fill="#ff8fe0" opacity={show ? 0.9 : 0.7} style={{ transition: "all 0.3s ease" }}>
        <animate attributeName="r" values="4;4.6;4" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* OJO IZQUIERDO */}
      <g style={eyeStyle}>
        <g ref={pupilsRef} style={{ transition: "transform 0.12s ease-out" }}>
          <ellipse cx="25" cy="33" rx="2.6" ry="3.4" fill="#3b1d4e" />
          <circle cx="26" cy="31.5" r="1" fill="#fff" />
        </g>
      </g>

      {/* OJO DERECHO — al hover se convierte en guiño feliz ^ */}
      {show ? (
        <path
          d="M35.5 33 Q39 30 42.5 33"
          stroke="#3b1d4e"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <g style={eyeStyle}>
          <g ref={rightPupilRef} style={{ transition: "transform 0.12s ease-out" }}>
            <ellipse cx="39" cy="33" rx="2.6" ry="3.4" fill="#3b1d4e" />
            <circle cx="40" cy="31.5" r="1" fill="#fff" />
          </g>
        </g>
      )}

      {/* Naricita */}
      <path d="M30.5 38 L33.5 38 L32 39.6 Z" fill="#ff5fd2" />

      {/* Boca: :3 normal, sonrisa feliz al hover */}
      {show ? (
        <path
          d="M27 40 Q32 45 37 40"
          stroke="#c2418f"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M32 39.6 Q29.5 42 27.5 40" stroke="#c2418f" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <path d="M32 39.6 Q34.5 42 36.5 40" stroke="#c2418f" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Bigotes */}
      <g stroke="#d98fc7" strokeWidth="0.9" strokeLinecap="round" opacity="0.8">
        <line x1="12" y1="36" x2="20" y2="37" />
        <line x1="12" y1="40" x2="20" y2="40" />
        <line x1="52" y1="36" x2="44" y2="37" />
        <line x1="52" y1="40" x2="44" y2="40" />
      </g>

      {/* Audífonos: diadema */}
      <path d="M11 34 A21 21 0 0 1 53 34" stroke="#a855f7" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <rect x="7.5" y="31" width="8" height="13" rx="4" fill="#7c3aed" />
      <rect x="48.5" y="31" width="8" height="13" rx="4" fill="#7c3aed" />
      <rect x="9.5" y="33.5" width="4" height="8" rx="2" fill="#22d3ee" opacity="0.9" />
      <rect x="50.5" y="33.5" width="4" height="8" rx="2" fill="#22d3ee" opacity="0.9" />

      {/* Corazoncito musical (late siempre) */}
      <g transform="translate(48 14)">
        <path d="M4 7 C4 5 2 4 1 5 C-0.2 6 0 8 4 11 C8 8 8.2 6 7 5 C6 4 4 5 4 7 Z" fill="#ff2d95">
          <animateTransform attributeName="transform" type="scale" values="1;1.25;1" dur="1.4s" repeatCount="indefinite" additive="sum" />
        </path>
      </g>

      {/* Notas musicales ♪ que aparecen al hacer hover */}
      {show && (
        <g fill="#22d3ee" className="cat-notes">
          <text x="6" y="20" fontSize="7" className="cat-note cat-note-1">♪</text>
          <text x="54" y="24" fontSize="6" className="cat-note cat-note-2">♫</text>
        </g>
      )}
    </svg>
  );
}
