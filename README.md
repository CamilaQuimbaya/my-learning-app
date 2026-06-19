# Camikaze Learn 💖

Plataforma didáctica para enseñar **desarrollo web** (HTML, CSS y JavaScript) con
teoría, lecturas y ejercicios interactivos. Construida con **Next.js + MongoDB**,
con login de alumnos y seguimiento de progreso.

## ✨ Qué incluye

- **3 módulos** con lecciones reales: HTML 🧱, CSS 🎨 y JavaScript ⚡.
- **3 tipos de ejercicios**:
  - 📝 **Quiz** de opción múltiple con corrección automática.
  - ⌨️ **Editor de código en vivo** con vista previa instantánea (HTML/CSS/JS).
  - ✅ **Retos con validación** automática (comprueban tu solución en el navegador).
- **Login dual**: correo + contraseña *y* Google.
- **Progreso por alumno**: puntos, ejercicios completados y barras de avance.
- Estilo **cyberpunk rosa kawaii** 🌸.

## 🚀 Puesta en marcha

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
```

## 🔐 Variables de entorno (`.env.local`)

Copia `.env.example` a `.env.local` y rellena:

| Variable | Para qué |
|---|---|
| `MONGODB_URI` | Cadena de conexión de MongoDB Atlas. |
| `AUTH_SECRET` | Secreto de NextAuth (genera con `openssl rand -base64 32`). |
| `AUTH_URL` | URL de la app (`http://localhost:3000` en local). |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Credenciales de Google OAuth (opcional). |

> ⚠️ **Seguridad:** nunca subas `.env.local` a git (ya está en `.gitignore`).
> Si tu contraseña de Mongo se expuso, rótala en Atlas → Database Access.

### Activar login con Google (opcional)

1. Ve a <https://console.cloud.google.com/apis/credentials>.
2. Crea un *OAuth Client ID* tipo *Web application*.
3. En *Authorized redirect URIs* añade:
   `http://localhost:3000/api/auth/callback/google`
4. Copia el *Client ID* y *Client Secret* en `.env.local`.

El login con correo y contraseña funciona sin configurar nada de Google.

## 🗂️ Estructura

```
src/
  app/
    page.tsx                       # landing
    login/  register/              # autenticación
    dashboard/                     # progreso del alumno
    cursos/[module]/[lesson]/      # lección: lectura + ejercicios
    api/
      auth/[...nextauth]/          # NextAuth
      register/                    # alta de usuarios
      progress/                    # guardar/leer progreso
  components/
    exercises/Quiz.tsx             # quiz
    exercises/Playground.tsx       # editor en vivo + validación
    LessonExercises.tsx            # orquesta los ejercicios de una lección
    ContentBlocks.tsx              # render del contenido de lectura
  lib/
    content/                       # 👈 TODO el temario (edítalo aquí)
    mongodb.ts  auth.ts  progress.ts
```

## ✏️ Cómo añadir o editar contenido

Todo el temario vive en `src/lib/content/`. Cada módulo (`html.ts`, `css.ts`,
`javascript.ts`) es un objeto con `lessons`, y cada lección tiene `blocks`
(la lectura) y `exercises`. Para añadir una lección, copia una existente y
cambia los textos. Los tipos están documentados en `content/types.ts`.

Los **retos** validan con funciones `test(doc, code)` que reciben el documento
renderizado de la vista previa: devuelve `true` si la solución del alumno cumple.
