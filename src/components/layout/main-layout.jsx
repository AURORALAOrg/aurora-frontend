"use client";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header/header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Cerrar el sidebar cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar-container');
      if (sidebar && !sidebar.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-[#0d1117] relative">
      {/* Overlay para cuando el sidebar está abierto */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className="sidebar-container fixed top-0 left-0 h-full z-50">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          headerHeight="64px"
        />
      </div>

      {/* Contenido principal */}
      <div className={`flex flex-col flex-1 w-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-64' : ''
      }`}>
        <Header onMenuClick={toggleSidebar} />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full">
            <Outlet />
          </div>
        </main>

        <Footer
          customClass={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default MainLayout;
