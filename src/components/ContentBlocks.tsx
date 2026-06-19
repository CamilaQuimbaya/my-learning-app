import { Fragment } from "react";
import type { Block } from "@/lib/content/types";
import { BulbIcon } from "@/components/Icons";

/** Convierte `texto con backticks` en <code> en línea. */
function inline(text: string) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="inline">
        {part}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function ContentBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-cyber">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h":
            return (
              <h3 key={i} className="mt-8 text-xl font-bold text-neon-pink">
                {b.text}
              </h3>
            );
          case "p":
            return <p key={i}>{inline(b.text)}</p>;
          case "list":
            return (
              <ul key={i} className="my-3 space-y-1.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2 text-pink-100/90">
                    <span className="text-neon-pink">▸</span>
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-base-950 p-4 font-mono text-sm text-neon-cyan"
              >
                <code>{b.code}</code>
              </pre>
            );
          case "tip":
            return (
              <div
                key={i}
                className="my-4 flex gap-3 rounded-xl border border-neon-purple/30 bg-neon-purple/10 p-4 text-sm text-pink-100/90"
              >
                <BulbIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-neon-purple" />
                <span>
                  <span className="font-semibold text-neon-purple">Tip: </span>
                  {inline(b.text)}
                </span>
              </div>
            );
        }
      })}
    </div>
  );
}
