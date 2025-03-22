"use client";

import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/utils/helpers";
import { useWallet } from "@/context/WalletContext";

export default function ConnectWalletButton() {
  const { address, connectWallet, disconnectWallet } = useWallet();

  return (
    <Button
      variant="default"
      className="flex items-center space-x-2 bg-blue-600 text-gray-200 hover:bg-gray-100 hover:text-blue-600 hover:border-blue-600 transition-colors duration-200"
      onClick={address ? disconnectWallet : connectWallet}
    >
      <Wallet className="h-5 w-5" />
      <span>{address ? truncateAddress(address) : "Connect Wallet"}</span>
    </Button>
  );
}
