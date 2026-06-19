import type { Module } from "./types";

export const htmlModule: Module = {
  slug: "html",
  title: "HTML — La estructura",
  icon: "html",
  accent: "pink",
  description:
    "Aprende a darle estructura y significado a las páginas web: el esqueleto de todo sitio.",
  lessons: [
    {
      slug: "que-es-html",
      title: "¿Qué es HTML?",
      summary: "El lenguaje de marcado que da estructura a la web.",
      minutes: 8,
      blocks: [
        { t: "h", text: "HTML: el esqueleto de la web" },
        {
          t: "p",
          text: "HTML (HyperText Markup Language) es el lenguaje que usamos para describir la estructura de una página web. No es un lenguaje de programación: es un lenguaje de marcado. Con él decimos «esto es un título», «esto es un párrafo», «esto es una imagen».",
        },
        {
          t: "p",
          text: "Marcamos el contenido con etiquetas. Una etiqueta se escribe entre `<` y `>`. La mayoría vienen en pareja: una de apertura y una de cierre.",
        },
        {
          t: "code",
          lang: "html",
          code: "<p>Hola, soy un párrafo.</p>\n<!--  ↑ apertura        ↑ cierre (con /)  -->",
        },
        { t: "h", text: "La estructura mínima de un documento" },
        {
          t: "p",
          text: "Todo documento HTML moderno empieza igual. Memoriza este esqueleto:",
        },
        {
          t: "code",
          lang: "html",
          code: '<!DOCTYPE html>\n<html lang="es">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Mi página</title>\n  </head>\n  <body>\n    <h1>¡Hola mundo!</h1>\n  </body>\n</html>',
        },
        {
          t: "list",
          items: [
            "`<!DOCTYPE html>` le dice al navegador que use HTML5.",
            "`<head>` contiene información que NO se ve (título, codificación, estilos).",
            "`<body>` contiene todo lo que SÍ se ve en la página.",
          ],
        },
        {
          t: "tip",
          text: "Atributo `lang=\"es\"`: ayuda a buscadores y lectores de pantalla a saber el idioma. ¡Accesibilidad desde el primer día!",
        },
      ],
      exercises: [
        {
          id: "html-q1",
          kind: "quiz",
          question: "¿Qué tipo de lenguaje es HTML?",
          options: [
            "Un lenguaje de programación",
            "Un lenguaje de marcado",
            "Un sistema de bases de datos",
            "Una hoja de estilos",
          ],
          answer: 1,
          explain:
            "HTML es un lenguaje de marcado: describe la estructura del contenido, no ejecuta lógica.",
          points: 10,
        },
        {
          id: "html-q2",
          kind: "quiz",
          question: "¿Dónde va el contenido que se VE en la página?",
          options: ["Dentro de <head>", "Dentro de <title>", "Dentro de <body>", "Dentro de <meta>"],
          answer: 2,
          explain: "Todo lo visible vive dentro de la etiqueta <body>.",
          points: 10,
        },
        {
          id: "html-c1",
          kind: "code",
          title: "Tu primer HTML",
          instructions:
            "Experimenta libremente. Cambia el texto del <h1> por tu nombre y agrega un párrafo <p> debajo.",
          starter: {
            html: "<h1>¡Hola mundo!</h1>\n<p>Escribe aquí algo sobre ti.</p>",
          },
          show: ["html"],
          points: 15,
        },
      ],
    },
    {
      slug: "etiquetas-de-texto",
      title: "Etiquetas de texto",
      summary: "Títulos, párrafos, énfasis y semántica del texto.",
      minutes: 10,
      blocks: [
        { t: "h", text: "Títulos y jerarquía" },
        {
          t: "p",
          text: "Los títulos van de `<h1>` a `<h6>`. El `<h1>` es el más importante (suele haber uno por página) y `<h6>` el menos. Respetar la jerarquía es clave para el SEO y la accesibilidad.",
        },
        {
          t: "code",
          lang: "html",
          code: "<h1>Título principal</h1>\n<h2>Sección</h2>\n<h3>Subsección</h3>",
        },
        { t: "h", text: "Párrafos y énfasis" },
        {
          t: "p",
          text: "El texto normal va en `<p>`. Para dar énfasis usamos `<strong>` (importante, se ve en negrita) y `<em>` (énfasis, se ve en cursiva). Tienen significado, no solo apariencia.",
        },
        {
          t: "code",
          lang: "html",
          code: "<p>Esto es <strong>muy importante</strong> y esto va con <em>énfasis</em>.</p>",
        },
        {
          t: "tip",
          text: "Evita usar <b> e <i> solo por la apariencia. <strong> y <em> comunican significado además del estilo.",
        },
      ],
      exercises: [
        {
          id: "html-q3",
          kind: "quiz",
          question: "¿Cuántos <h1> se recomienda tener por página?",
          options: ["Tantos como quieras", "Exactamente uno", "Mínimo tres", "Ninguno"],
          answer: 1,
          explain:
            "Lo recomendado es un único <h1> que describa el tema principal de la página.",
          points: 10,
        },
        {
          id: "html-ch1",
          kind: "challenge",
          title: "Reto: estructura una noticia",
          instructions:
            "Crea un <h1> con el titular, un <h2> con un subtítulo, y al menos un <p>. Dentro del párrafo, resalta una palabra con <strong>.",
          starter: { html: "<!-- Escribe tu noticia aquí -->\n" },
          show: ["html"],
          checks: [
            {
              label: "Tiene exactamente un <h1>",
              test: (doc) => doc.querySelectorAll("h1").length === 1,
            },
            {
              label: "Tiene al menos un <h2>",
              test: (doc) => doc.querySelectorAll("h2").length >= 1,
            },
            {
              label: "Tiene al menos un párrafo <p>",
              test: (doc) => doc.querySelectorAll("p").length >= 1,
            },
            {
              label: "Usa <strong> dentro del contenido",
              test: (doc) => doc.querySelectorAll("strong").length >= 1,
            },
          ],
          points: 25,
        },
      ],
    },
    {
      slug: "enlaces-imagenes-listas",
      title: "Enlaces, imágenes y listas",
      summary: "Conecta páginas, muestra imágenes y organiza información.",
      minutes: 12,
      blocks: [
        { t: "h", text: "Enlaces con <a>" },
        {
          t: "p",
          text: "Un enlace usa la etiqueta `<a>` con el atributo `href` que indica el destino.",
        },
        {
          t: "code",
          lang: "html",
          code: '<a href="https://developer.mozilla.org">Ir a MDN</a>',
        },
        { t: "h", text: "Imágenes con <img>" },
        {
          t: "p",
          text: "La imagen usa `<img>` con `src` (la fuente) y `alt` (texto alternativo, obligatorio por accesibilidad). Es una etiqueta sin cierre.",
        },
        {
          t: "code",
          lang: "html",
          code: '<img src="gato.png" alt="Un gato naranja durmiendo" />',
        },
        { t: "h", text: "Listas" },
        {
          t: "p",
          text: "`<ul>` crea listas con viñetas y `<ol>` listas numeradas. Cada elemento va en un `<li>`.",
        },
        {
          t: "code",
          lang: "html",
          code: "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>",
        },
        {
          t: "tip",
          text: "El atributo alt no es opcional: describe la imagen para quien no puede verla y aparece si la imagen no carga.",
        },
      ],
      exercises: [
        {
          id: "html-q4",
          kind: "quiz",
          question: "¿Qué atributo de <a> indica el destino del enlace?",
          options: ["src", "link", "href", "url"],
          answer: 2,
          explain: "El atributo href (hypertext reference) define a dónde lleva el enlace.",
          points: 10,
        },
        {
          id: "html-ch2",
          kind: "challenge",
          title: "Reto: mini-perfil",
          instructions:
            "Crea una lista <ul> con 3 elementos <li> sobre tus hobbies, y agrega un enlace <a> que apunte a cualquier sitio (con su atributo href).",
          starter: { html: "<h2>Mi perfil</h2>\n" },
          show: ["html"],
          checks: [
            {
              label: "Tiene una lista <ul>",
              test: (doc) => doc.querySelectorAll("ul").length >= 1,
            },
            {
              label: "La lista tiene al menos 3 <li>",
              test: (doc) => doc.querySelectorAll("ul li").length >= 3,
            },
            {
              label: "Tiene un enlace <a> con href",
              test: (doc) => {
                const a = doc.querySelector("a");
                return !!a && !!a.getAttribute("href");
              },
            },
          ],
          points: 25,
        },
      ],
    },
  ],
};
