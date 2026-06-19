// Íconos SVG estilo "line" (lucide-like), mismo lenguaje visual del portafolio.
// Trazo con currentColor para heredar el color del contenedor.

type IconProps = { className?: string };

const S = (props: IconProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    aria-hidden
  >
    {props.children}
  </svg>
);

export const HomeIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </S>
);

export const CompassIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" />
  </S>
);

export const TrophyIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
    <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
    <path d="M10 14.5V18M14 14.5V18M8 21h8M9 18h6" />
  </S>
);

export const TrendingIcon = (p: IconProps) => (
  <S {...p}>
    <path d="m3 17 6-6 4 4 7-7" />
    <path d="M17 7h4v4" />
  </S>
);

export const PlayIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M7 4.5v15a1 1 0 0 0 1.54.84l11.5-7.5a1 1 0 0 0 0-1.68L8.54 3.66A1 1 0 0 0 7 4.5Z" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M5 13l4 4L19 7" />
  </S>
);

export const CheckCircleIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </S>
);

export const BookIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M12 6.5C10.5 5 7 4.5 4 5v13c3-.5 6.5 0 8 1.5" />
    <path d="M12 6.5C13.5 5 17 4.5 20 5v13c-3-.5-6.5 0-8 1.5" />
    <path d="M12 6.5V20" />
  </S>
);

export const KeyboardIcon = (p: IconProps) => (
  <S {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01M8 14h8" />
  </S>
);

export const PencilIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
    <path d="M14 6l4 4" />
  </S>
);

export const ClockIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </S>
);

export const BulbIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M9.5 18h5M10.5 21h3" />
    <path d="M12 3a6 6 0 0 0-3.8 10.6c.5.4.8 1 .8 1.7v.2h6v-.2c0-.7.3-1.3.8-1.7A6 6 0 0 0 12 3Z" />
  </S>
);

export const HeartIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M12 21s-7-4.4-9.4-8.9A5 5 0 0 1 12 6.5a5 5 0 0 1 9.4 5.6C19 16.6 12 21 12 21Z" />
  </svg>
);

export const SparkleIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2Z" />
    <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
  </svg>
);

export const FlameIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M12 2c.5 3 3 4.2 3 7.5a3 3 0 0 1-.8 2c.5-2-.7-3.4-1.7-4 .3 2.2-1.2 3-2 4a2.6 2.6 0 0 0 .2 3.4 4.5 4.5 0 0 1-3.4-4.4c0-3.3 3.5-4 4.5-8.5.5.5.9 1 1 1.5.3-1.7-.8-2.9-1-2.4Z" />
    <path d="M12 22a6 6 0 0 0 6-6c0-1.5-.5-2.8-1.3-3.9.3 3.4-2 5.3-4.7 5.3-1.7 0-3-1-3-2.6 0-1 .4-1.7 1-2.4-2 .8-3 2.6-3 4.6a6 6 0 0 0 5 5Z" opacity="0.55" />
  </svg>
);

export const CrownIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M3 7l4 3.5L12 4l5 6.5L21 7l-1.8 11H4.8L3 7Z" />
    <rect x="4.5" y="19" width="15" height="2" rx="1" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </S>
);

export const DownloadIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M12 3v12" />
    <path d="m7 11 5 5 5-5" />
    <path d="M5 21h14" />
  </S>
);

export const ArrowRightIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </S>
);

export const HeadphonesIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="2.5" y="13.5" width="4" height="6.5" rx="1.8" />
    <rect x="17.5" y="13.5" width="4" height="6.5" rx="1.8" />
  </S>
);

// ===== Íconos de los módulos =====
export const CodeIcon = (p: IconProps) => (
  <S {...p}>
    <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
  </S>
);

export const PaletteIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
    <path
      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 10 10c0 1.66-1.34 3-3 3h-1.6a1.6 1.6 0 0 0-1.13 2.73A1.6 1.6 0 0 1 12 22Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="7.5" cy="11" r="1.2" fill="currentColor" />
    <circle cx="12" cy="7.5" r="1.2" fill="currentColor" />
    <circle cx="16.5" cy="11" r="1.2" fill="currentColor" />
  </svg>
);

export const ZapIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M13 2 4 13.5a.6.6 0 0 0 .5 1H10l-1 7.5 9-11.5a.6.6 0 0 0-.5-1H12l1-7.5Z" />
  </svg>
);

export const GoogleIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 6.68 9.14 4.75 12 4.75Z"
    />
  </svg>
);

export const moduleIcons: Record<string, (p: IconProps) => React.ReactElement> = {
  html: CodeIcon,
  css: PaletteIcon,
  js: ZapIcon,
};

export function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = moduleIcons[name] ?? CodeIcon;
  return <Cmp className={className} />;
}
