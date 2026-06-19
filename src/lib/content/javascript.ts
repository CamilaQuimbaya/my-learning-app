import type { Module } from "./types";

export const jsModule: Module = {
  slug: "javascript",
  title: "JavaScript — La lógica",
  icon: "js",
  accent: "purple",
  description:
    "Haz que tus páginas piensen y reaccionen: variables, funciones, lógica e interacción.",
  lessons: [
    {
      slug: "variables-y-tipos",
      title: "Variables y tipos",
      summary: "Guarda datos con let y const, y conoce los tipos básicos.",
      minutes: 10,
      blocks: [
        { t: "h", text: "¿Qué es JavaScript?" },
        {
          t: "p",
          text: "JavaScript SÍ es un lenguaje de programación. Le da comportamiento e interactividad a la web: responder a clics, validar formularios, animar, pedir datos a un servidor...",
        },
        { t: "h", text: "Variables" },
        {
          t: "p",
          text: "Una variable guarda un valor. Usamos `const` cuando el valor no va a cambiar, y `let` cuando sí. Evita `var` (es antiguo).",
        },
        {
          t: "code",
          lang: "js",
          code: 'const nombre = "Camila";\nlet edad = 25;\nedad = 26; // permitido con let\n\nconsole.log(nombre, edad);',
        },
        { t: "h", text: "Tipos básicos" },
        {
          t: "list",
          items: [
            "String: texto, entre comillas. Ej: `\"hola\"`",
            "Number: números. Ej: `42`, `3.14`",
            "Boolean: verdadero o falso. Ej: `true`, `false`",
            "Array: lista de valores. Ej: `[1, 2, 3]`",
            "Object: datos con propiedades. Ej: `{ nombre: \"Cami\" }`",
          ],
        },
        {
          t: "tip",
          text: "console.log() es tu mejor amiga: imprime valores en la consola para ver qué está pasando. ¡Úsala sin miedo!",
        },
      ],
      exercises: [
        {
          id: "js-q1",
          kind: "quiz",
          question: "¿Qué palabra usas para una variable que NO va a cambiar?",
          options: ["var", "let", "const", "fixed"],
          answer: 2,
          explain: "const declara una constante: su valor no se puede reasignar.",
          points: 10,
        },
        {
          id: "js-c1",
          kind: "code",
          title: "Juega con la consola",
          instructions:
            "Crea variables con tu nombre y tu edad, y muéstralas con console.log(). Mira el resultado abajo.",
          starter: {
            js: 'const nombre = "tu nombre";\nlet edad = 20;\nconsole.log("Hola", nombre, "tienes", edad);',
          },
          show: ["js"],
          points: 15,
        },
      ],
    },
    {
      slug: "funciones-y-condiciones",
      title: "Funciones y condiciones",
      summary: "Agrupa lógica en funciones y toma decisiones con if/else.",
      minutes: 12,
      blocks: [
        { t: "h", text: "Funciones" },
        {
          t: "p",
          text: "Una función es un bloque de código reutilizable. Recibe datos (parámetros) y puede devolver un resultado con `return`.",
        },
        {
          t: "code",
          lang: "js",
          code: "function sumar(a, b) {\n  return a + b;\n}\n\nconsole.log(sumar(2, 3)); // 5",
        },
        {
          t: "p",
          text: "También existe la forma de flecha, más corta y muy usada hoy:",
        },
        {
          t: "code",
          lang: "js",
          code: "const sumar = (a, b) => a + b;",
        },
        { t: "h", text: "Condiciones" },
        {
          t: "p",
          text: "Con `if` ejecutamos código solo si una condición es verdadera. `else` cubre el caso contrario.",
        },
        {
          t: "code",
          lang: "js",
          code: 'const edad = 18;\nif (edad >= 18) {\n  console.log("Eres mayor de edad");\n} else {\n  console.log("Eres menor de edad");\n}',
        },
        {
          t: "tip",
          text: "Cuidado: == compara con conversión de tipos y === compara estrictamente. Usa siempre === para evitar sorpresas.",
        },
      ],
      exercises: [
        {
          id: "js-q2",
          kind: "quiz",
          question: "¿Qué palabra clave devuelve un resultado desde una función?",
          options: ["give", "return", "output", "send"],
          answer: 1,
          explain: "return devuelve un valor y termina la ejecución de la función.",
          points: 10,
        },
        {
          id: "js-ch1",
          kind: "challenge",
          title: "Reto: función esPar",
          instructions:
            "Completa la función esPar(n) para que devuelva true si n es par y false si es impar. Pista: usa el operador % (resto).",
          starter: {
            js: "function esPar(n) {\n  // tu código aquí\n}\n\n// no borres estas líneas, validan tu función:\nwindow.__esPar = esPar;",
          },
          show: ["js"],
          checks: [
            {
              label: "esPar(4) devuelve true",
              test: (doc) => {
                try {
                  return (doc.defaultView as any).__esPar(4) === true;
                } catch {
                  return false;
                }
              },
            },
            {
              label: "esPar(7) devuelve false",
              test: (doc) => {
                try {
                  return (doc.defaultView as any).__esPar(7) === false;
                } catch {
                  return false;
                }
              },
            },
            {
              label: "esPar(0) devuelve true",
              test: (doc) => {
                try {
                  return (doc.defaultView as any).__esPar(0) === true;
                } catch {
                  return false;
                }
              },
            },
          ],
          points: 30,
        },
      ],
    },
    {
      slug: "el-dom",
      title: "Manipular el DOM",
      summary: "Cambia el HTML desde JavaScript y responde a clics.",
      minutes: 14,
      blocks: [
        { t: "h", text: "El DOM" },
        {
          t: "p",
          text: "El DOM (Document Object Model) es la representación de la página que JavaScript puede leer y modificar. Seleccionamos elementos y cambiamos su contenido o estilo.",
        },
        {
          t: "code",
          lang: "js",
          code: 'const titulo = document.querySelector("h1");\ntitulo.textContent = "¡Texto cambiado!";\ntitulo.style.color = "magenta";',
        },
        { t: "h", text: "Eventos" },
        {
          t: "p",
          text: "Con `addEventListener` reaccionamos a acciones del usuario, como un clic.",
        },
        {
          t: "code",
          lang: "js",
          code: 'const boton = document.querySelector("button");\nboton.addEventListener("click", () => {\n  alert("¡Me hiciste clic!");\n});',
        },
        {
          t: "tip",
          text: "querySelector usa selectores CSS: querySelector(\".clase\"), querySelector(\"#id\"), querySelector(\"p\"). ¡Reutilizas lo que ya sabes de CSS!",
        },
      ],
      exercises: [
        {
          id: "js-q3",
          kind: "quiz",
          question: "¿Qué método selecciona un elemento usando un selector CSS?",
          options: [
            "document.getElement()",
            "document.querySelector()",
            "document.find()",
            "document.select()",
          ],
          answer: 1,
          explain:
            "querySelector() acepta cualquier selector CSS y devuelve el primer elemento que coincide.",
          points: 10,
        },
        {
          id: "js-ch2",
          kind: "challenge",
          title: "Reto: cambia el texto",
          instructions:
            "Usando JavaScript, cambia el contenido del elemento con id=\"saludo\" para que diga exactamente: ¡Hola DOM!",
          starter: {
            html: '<h2 id="saludo">Texto original</h2>',
            js: "// Selecciona #saludo y cambia su texto a ¡Hola DOM!\n",
          },
          show: ["html", "js"],
          checks: [
            {
              label: "El elemento #saludo ahora dice «¡Hola DOM!»",
              test: (doc) => {
                const el = doc.querySelector("#saludo");
                return !!el && el.textContent?.trim() === "¡Hola DOM!";
              },
            },
          ],
          points: 30,
        },
      ],
    },
  ],
};
