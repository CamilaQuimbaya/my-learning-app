// Tipos del contenido didáctico. El contenido es estático (TypeScript), así que
// puede importarse tanto desde Server Components como desde componentes cliente.

export type Block =
  | { t: "h"; text: string }
  | { t: "p"; text: string } // admite `código` en línea con backticks
  | { t: "code"; lang: string; code: string }
  | { t: "tip"; text: string }
  | { t: "list"; items: string[] };

export type StarterCode = { html?: string; css?: string; js?: string };

/** Pregunta de opción múltiple con corrección automática. */
export type QuizExercise = {
  id: string;
  kind: "quiz";
  question: string;
  options: string[];
  answer: number; // índice de la opción correcta
  explain: string;
  points: number;
};

/** Editor de código en vivo, libre (sin validación, solo experimentar). */
export type CodeExercise = {
  id: string;
  kind: "code";
  title: string;
  instructions: string;
  starter: StarterCode;
  show: ("html" | "css" | "js")[];
  points: number;
};

/** Reto: editor + validación automática contra una lista de comprobaciones. */
export type ChallengeExercise = {
  id: string;
  kind: "challenge";
  title: string;
  instructions: string;
  starter: StarterCode;
  show: ("html" | "css" | "js")[];
  // Cada check recibe el documento renderizado y el código fuente del alumno.
  checks: {
    label: string;
    test: (doc: Document, code: Required<StarterCode>) => boolean;
  }[];
  points: number;
};

export type Exercise = QuizExercise | CodeExercise | ChallengeExercise;

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  blocks: Block[];
  exercises: Exercise[];
};

export type Module = {
  slug: string;
  title: string;
  icon: "html" | "css" | "js";
  accent: "pink" | "cyan" | "purple";
  description: string;
  lessons: Lesson[];
};
