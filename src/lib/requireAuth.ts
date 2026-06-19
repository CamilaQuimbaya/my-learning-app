import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { auth } from "@/auth";

/**
 * Exige sesión en un Server Component. Si no hay sesión, redirige al login
 * con un callbackUrl para volver a la página pedida después de entrar.
 */
export async function requireAuth(callbackUrl: string): Promise<Session> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  return session;
}
