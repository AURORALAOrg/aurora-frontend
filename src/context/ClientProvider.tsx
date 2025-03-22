"use client";

import { WalletProvider } from "@/context/WalletContext";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WalletProvider>{children}</WalletProvider>;
}
