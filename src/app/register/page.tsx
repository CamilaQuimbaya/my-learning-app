"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleIcon, SparkleIcon } from "@/components/Icons";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo crear la cuenta.");
        setLoading(false);
        return;
      }
      // Cuenta creada: iniciamos sesión automáticamente.
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8">
        <h1 className="flex items-center justify-center gap-2 text-center text-2xl font-bold">
          Crea tu cuenta <SparkleIcon className="h-6 w-6 text-neon-pink" />
        </h1>
        <p className="mt-1 text-center text-sm text-pink-100/60">
          Empieza tu camino en el desarrollo web
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="btn-ghost mt-6 flex w-full items-center justify-center gap-2"
        >
          <GoogleIcon className="h-5 w-5" /> Registrarme con Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-pink-100/40">
          <div className="h-px flex-1 bg-white/10" />o con tu correo
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            minLength={6}
            placeholder="Contraseña (mín. 6 caracteres)"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-neon w-full">
            {loading ? "Creando…" : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-pink-100/60">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-medium text-neon-pink hover:underline">
            Entra aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
