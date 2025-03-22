"use client";

import { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        headerHeight={64}
      />

      <div className="flex flex-col flex-1 w-full transition-all duration-300 ease-in-out">
        <Header onMenuClick={toggleSidebar} />

        <main
          className={cn(
            "flex-1 p-4 sm:p-6 overflow-y-auto transition-all duration-300 ease-in-out",
            isSidebarOpen ? "lg:ml-64" : ""
          )}
        >
          <div className="container mx-auto max-w-7xl">{children}</div>
        </main>

        <Footer
          customClass={cn(
            "transition-all duration-300 ease-in-out",
            isSidebarOpen ? "lg:ml-64" : ""
          )}
        />
      </div>
    </div>
  );
}
