"use client";

import { SessionProvider } from "next-auth/react";
import SyncProgress from "./SyncProgress";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SyncProgress />
      {children}
    </SessionProvider>
  );
}
