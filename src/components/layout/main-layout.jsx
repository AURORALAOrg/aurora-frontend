"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        headerHeight="64px"
      />

      {/* Main Content Container */}
      <div className="flex flex-col flex-1 w-full transition-all duration-300 ease-in-out">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-64" : ""
          }`}
        >
          <div className="w-full">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
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
