"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header/header";
import Sidebar from "./sidebar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-[#0d1117] relative">
      {/* Contenedor exclusivo para sidebar y fondo de sidebar */}
      <div className="absolute top-0 left-0 bottom-0 w-64 z-40">
        {isSidebarOpen && (
          <div className="absolute inset-0 bg-[#0d1117]" />
        )}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          headerHeight="64px"
        />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 w-full transition-all duration-300 ease-in-out relative z-0">
        <Header onMenuClick={toggleSidebar} />

        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-64" : ""
          }`}
        >
          <div className="w-full">
            <Outlet />
          </div>
        </main>

        <Footer
          customClass={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-64" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default MainLayout;
