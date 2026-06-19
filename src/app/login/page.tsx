"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { GoogleIcon, HeartIcon } from "@/components/Icons";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Correo o contraseña incorrectos.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8">
        <h1 className="flex items-center justify-center gap-2 text-center text-2xl font-bold">
          Bienvenida de nuevo <HeartIcon className="h-6 w-6 text-neon-pink" />
        </h1>
        <p className="mt-1 text-center text-sm text-pink-100/60">
          Entra para seguir aprendiendo
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="btn-ghost mt-6 flex w-full items-center justify-center gap-2"
        >
          <GoogleIcon className="h-5 w-5" /> Continuar con Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-pink-100/40">
          <div className="h-px flex-1 bg-white/10" />o con tu correo
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="tu@correo.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Tu contraseña"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-neon w-full">
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-pink-100/60">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="font-medium text-neon-pink hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
