"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CodeExercise, ChallengeExercise, StarterCode } from "@/lib/content/types";
import { CheckIcon, CheckCircleIcon } from "@/components/Icons";

type Lang = "html" | "css" | "js";

const LANG_LABEL: Record<Lang, string> = { html: "HTML", css: "CSS", js: "JavaScript" };

function buildSrcDoc(code: Required<StarterCode>, withConsole: boolean) {
  const consoleUI = withConsole
    ? `<div id="__console" class="__console"></div>`
    : "";
  const consoleScript = withConsole
    ? `<script>(function(){
        var box=document.getElementById('__console');
        function print(args,cls){
          if(!box)return;
          var line=document.createElement('div');
          line.className=cls;
          line.textContent=Array.prototype.map.call(args,function(a){
            try{return (typeof a==='object'&&a!==null)?JSON.stringify(a):String(a);}catch(e){return String(a);}
          }).join(' ');
          box.appendChild(line);
        }
        ['log','info','warn','error'].forEach(function(k){
          var orig=console[k];
          console[k]=function(){print(arguments,'__'+k);try{orig.apply(console,arguments);}catch(e){}};
        });
        window.addEventListener('error',function(e){print(['❌ '+e.message],'__error');});
      })();<\/script>`
    : "";

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
<style>
  body{font-family:system-ui,-apple-system,sans-serif;padding:14px;color:#111;background:#fff;margin:0}
  .__console{margin-top:14px;border-top:1px dashed #ccc;padding-top:8px;font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap}
  .__console div{padding:1px 0}
  .__warn{color:#b8860b}.__error{color:#c1121f}.__info,.__log{color:#222}
</style>
<style>${code.css}</style>
</head><body>
${code.html}
${consoleUI}
${consoleScript}
<script>
try{
${code.js}
}catch(e){ if(window.console)console.error(e.message); }
<\/script>
</body></html>`;
}

export default function Playground({
  exercise,
  done,
  onComplete,
}: {
  exercise: CodeExercise | ChallengeExercise;
  done: boolean;
  onComplete: () => void;
}) {
  const isChallenge = exercise.kind === "challenge";
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [code, setCode] = useState<Required<StarterCode>>({
    html: exercise.starter.html ?? "",
    css: exercise.starter.css ?? "",
    js: exercise.starter.js ?? "",
  });
  const [tab, setTab] = useState<Lang>(exercise.show[0]);
  const [results, setResults] = useState<{ label: string; pass: boolean }[] | null>(null);

  const showConsole = exercise.show.includes("js");

  // Vista previa con un pequeño retardo para no recargar en cada tecla.
  const [debounced, setDebounced] = useState(code);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(code), 400);
    return () => clearTimeout(t);
  }, [code]);

  const srcDoc = useMemo(() => buildSrcDoc(debounced, showConsole), [debounced, showConsole]);

  function runChecks() {
    if (!isChallenge) return;
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    const checks = (exercise as ChallengeExercise).checks;
    const res = checks.map((c) => {
      let pass = false;
      try {
        pass = c.test(doc, code);
      } catch {
        pass = false;
      }
      return { label: c.label, pass };
    });
    setResults(res);
    if (res.every((r) => r.pass)) onComplete();
  }

  function reset() {
    setCode({
      html: exercise.starter.html ?? "",
      css: exercise.starter.css ?? "",
      js: exercise.starter.js ?? "",
    });
    setResults(null);
  }

  const allPass = results !== null && results.every((r) => r.pass);

  return (
    <div className="space-y-4">
      <p className="text-sm text-pink-100/80">{exercise.instructions}</p>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Editor */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-base-900">
          <div className="flex items-center gap-1 border-b border-white/10 bg-base-800/60 px-2 py-1.5">
            {exercise.show.map((l) => (
              <button
                key={l}
                onClick={() => setTab(l)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                  tab === l
                    ? "bg-neon-pink/20 text-neon-pink"
                    : "text-pink-100/60 hover:text-pink-100"
                }`}
              >
                {LANG_LABEL[l]}
              </button>
            ))}
            <button
              onClick={reset}
              className="ml-auto rounded-lg px-2 py-1 text-xs text-pink-100/50 hover:text-pink-100"
              title="Reiniciar código"
            >
              ↺ Reiniciar
            </button>
          </div>
          <textarea
            spellCheck={false}
            value={code[tab]}
            onChange={(e) => setCode({ ...code, [tab]: e.target.value })}
            className="h-64 w-full resize-none bg-transparent p-3 font-mono text-sm text-pink-50 outline-none"
          />
        </div>

        {/* Vista previa */}
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="border-b border-white/10 bg-base-800/60 px-3 py-1.5 text-xs text-pink-100/60">
            Vista previa
          </div>
          <iframe
            ref={iframeRef}
            title={`preview-${exercise.id}`}
            sandbox="allow-scripts allow-same-origin allow-modals"
            srcDoc={srcDoc}
            className="h-64 w-full bg-white"
          />
        </div>
      </div>

      {isChallenge && (
        <div className="space-y-3">
          <button onClick={runChecks} className="btn-neon">
            Comprobar reto
          </button>

          {results && (
            <ul className="space-y-1.5">
              {results.map((r, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 text-sm ${
                    r.pass ? "text-neon-lime" : "text-pink-100/60"
                  }`}
                >
                  {r.pass ? (
                    <CheckIcon className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <span className="h-4 w-4 flex-shrink-0 rounded-full border border-white/30" />
                  )}
                  {r.label}
                </li>
              ))}
            </ul>
          )}

          {allPass && (
            <div className="flex items-center gap-2 rounded-xl bg-neon-lime/10 p-3 text-sm font-medium text-neon-lime">
              <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
              ¡Reto superado! Ganaste {exercise.points} puntos.
            </div>
          )}
        </div>
      )}

      {!isChallenge && (
        <button onClick={onComplete} className="btn-ghost inline-flex items-center gap-1.5 text-sm">
          {done ? (
            <>
              <CheckIcon className="h-4 w-4" /> Completado
            </>
          ) : (
            `Marcar como hecho (+${exercise.points} pts)`
          )}
        </button>
      )}
    </div>
  );
}
