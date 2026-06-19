"use client";

import { signOut } from "next-auth/react";
import { ArrowRightIcon } from "./Icons";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 active:scale-95"
    >
      <ArrowRightIcon className="h-4 w-4" /> Cerrar sesión
    </button>
  );
}
