import type { Module } from "./types";

export const cssModule: Module = {
  slug: "css",
  title: "CSS — El estilo",
  icon: "css",
  accent: "cyan",
  description:
    "Dale vida, color y diseño a tus páginas: colores, cajas, tipografía y maquetación.",
  lessons: [
    {
      slug: "selectores-y-propiedades",
      title: "Selectores y propiedades",
      summary: "Cómo apuntar a un elemento y cambiar su apariencia.",
      minutes: 10,
      blocks: [
        { t: "h", text: "¿Qué es CSS?" },
        {
          t: "p",
          text: "CSS (Cascading Style Sheets) define cómo se ven los elementos HTML. La sintaxis es: un selector, y entre llaves las propiedades con sus valores.",
        },
        {
          t: "code",
          lang: "css",
          code: "h1 {\n  color: hotpink;\n  font-size: 32px;\n}",
        },
        { t: "h", text: "Tipos de selectores" },
        {
          t: "list",
          items: [
            "Por etiqueta: `p { ... }` afecta a todos los <p>.",
            "Por clase: `.destacado { ... }` afecta a los elementos con class=\"destacado\".",
            "Por id: `#cabecera { ... }` afecta al elemento con id=\"cabecera\".",
          ],
        },
        {
          t: "code",
          lang: "css",
          code: ".boton {\n  background: magenta;\n  color: white;\n  padding: 12px;\n}",
        },
        {
          t: "tip",
          text: "Usa clases para casi todo: son reutilizables. Reserva los id para elementos únicos.",
        },
      ],
      exercises: [
        {
          id: "css-q1",
          kind: "quiz",
          question: "¿Qué selector apunta a los elementos con class=\"caja\"?",
          options: ["#caja", ".caja", "caja", "*caja"],
          answer: 1,
          explain: "El punto (.) selecciona por clase. La almohadilla (#) selecciona por id.",
          points: 10,
        },
        {
          id: "css-c1",
          kind: "code",
          title: "Pinta tu título",
          instructions:
            "Experimenta: cambia el color y el tamaño del <h1>. Prueba colores como deeppink, cyan o #ff4dd2.",
          starter: {
            html: "<h1>¡Mira mi estilo!</h1>\n<p>Soy un párrafo.</p>",
            css: "h1 {\n  color: deeppink;\n}",
          },
          show: ["html", "css"],
          points: 15,
        },
      ],
    },
    {
      slug: "modelo-de-caja",
      title: "El modelo de caja",
      summary: "Margin, border, padding y content: cómo ocupa espacio cada elemento.",
      minutes: 12,
      blocks: [
        { t: "h", text: "Todo es una caja" },
        {
          t: "p",
          text: "Cada elemento HTML es una caja rectangular formada por 4 capas, de dentro hacia fuera: el contenido, el `padding` (relleno interior), el `border` (borde) y el `margin` (margen exterior).",
        },
        {
          t: "code",
          lang: "css",
          code: ".tarjeta {\n  padding: 16px;   /* espacio interior */\n  border: 2px solid magenta;\n  margin: 20px;    /* separación con otros */\n}",
        },
        {
          t: "tip",
          text: "Añade `box-sizing: border-box;` para que el ancho incluya el padding y el borde. ¡Te ahorra muchos dolores de cabeza!",
        },
        { t: "h", text: "Fondo y bordes redondeados" },
        {
          t: "code",
          lang: "css",
          code: ".tarjeta {\n  background: #1b1030;\n  border-radius: 16px;\n}",
        },
      ],
      exercises: [
        {
          id: "css-q2",
          kind: "quiz",
          question: "¿Cuál es el espacio INTERIOR entre el contenido y el borde?",
          options: ["margin", "padding", "border", "gap"],
          answer: 1,
          explain: "El padding es el relleno interior; el margin es la separación exterior.",
          points: 10,
        },
        {
          id: "css-ch1",
          kind: "challenge",
          title: "Reto: una tarjeta kawaii",
          instructions:
            "Estiliza el .card: dale un padding de al menos 16px, un border-radius y un color de fondo. ¡Hazla bonita!",
          starter: {
            html: '<div class="card">\n  <h3>Tarjeta 💖</h3>\n  <p>Estilízame con CSS.</p>\n</div>',
            css: ".card {\n  /* tu estilo aquí */\n}",
          },
          show: ["html", "css"],
          checks: [
            {
              label: "La tarjeta tiene padding",
              test: (doc) => {
                const el = doc.querySelector(".card") as HTMLElement | null;
                if (!el || !doc.defaultView) return false;
                const p = parseFloat(doc.defaultView.getComputedStyle(el).paddingTop);
                return p >= 16;
              },
            },
            {
              label: "Tiene bordes redondeados (border-radius)",
              test: (doc) => {
                const el = doc.querySelector(".card") as HTMLElement | null;
                if (!el || !doc.defaultView) return false;
                return (
                  parseFloat(doc.defaultView.getComputedStyle(el).borderTopLeftRadius) > 0
                );
              },
            },
            {
              label: "Tiene un color de fondo definido",
              test: (doc) => {
                const el = doc.querySelector(".card") as HTMLElement | null;
                if (!el || !doc.defaultView) return false;
                const bg = doc.defaultView.getComputedStyle(el).backgroundColor;
                return bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";
              },
            },
          ],
          points: 25,
        },
      ],
    },
    {
      slug: "flexbox",
      title: "Maquetación con Flexbox",
      summary: "Alinea y distribuye elementos en filas y columnas con facilidad.",
      minutes: 14,
      blocks: [
        { t: "h", text: "Flexbox al rescate" },
        {
          t: "p",
          text: "Flexbox es la forma moderna de alinear elementos. Aplicas `display: flex` a un contenedor y sus hijos se colocan en fila automáticamente.",
        },
        {
          t: "code",
          lang: "css",
          code: ".fila {\n  display: flex;\n  gap: 12px;            /* separación entre hijos */\n  justify-content: center;  /* alineación horizontal */\n  align-items: center;      /* alineación vertical */\n}",
        },
        {
          t: "list",
          items: [
            "`justify-content`: distribuye en el eje principal (horizontal por defecto).",
            "`align-items`: alinea en el eje cruzado (vertical por defecto).",
            "`flex-direction: column` cambia el eje principal a vertical.",
          ],
        },
        {
          t: "tip",
          text: "Centrar algo en vertical y horizontal: display:flex + justify-content:center + align-items:center. ¡El truco más usado del mundo!",
        },
      ],
      exercises: [
        {
          id: "css-q3",
          kind: "quiz",
          question: "¿Qué propiedad activa Flexbox en un contenedor?",
          options: ["position: flex", "display: flex", "flex: on", "layout: flex"],
          answer: 1,
          explain: "Se activa con display: flex en el elemento contenedor.",
          points: 10,
        },
        {
          id: "css-ch2",
          kind: "challenge",
          title: "Reto: centra las cajas",
          instructions:
            "Haz que el .contenedor use Flexbox y centre sus hijos horizontalmente con un espacio (gap) entre ellos.",
          starter: {
            html: '<div class="contenedor">\n  <div class="box">A</div>\n  <div class="box">B</div>\n  <div class="box">C</div>\n</div>',
            css: ".contenedor {\n  /* tu código */\n}\n.box {\n  background: cyan;\n  color: black;\n  padding: 20px;\n}",
          },
          show: ["html", "css"],
          checks: [
            {
              label: "El contenedor usa display: flex",
              test: (doc) => {
                const el = doc.querySelector(".contenedor") as HTMLElement | null;
                if (!el || !doc.defaultView) return false;
                return doc.defaultView.getComputedStyle(el).display === "flex";
              },
            },
            {
              label: "Tiene un gap entre los hijos",
              test: (doc) => {
                const el = doc.querySelector(".contenedor") as HTMLElement | null;
                if (!el || !doc.defaultView) return false;
                return parseFloat(doc.defaultView.getComputedStyle(el).columnGap || "0") > 0;
              },
            },
          ],
          points: 25,
        },
      ],
    },
  ],
};
