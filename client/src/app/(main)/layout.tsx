"use client";

import DefaultSidebar from "../../components/Layouts/Sidebar";
import MobileNavbar from "../../components/Layouts/MobileNavbar";
import ResponsiveAppBar from "../../components/Layouts/AppBar";

import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Mobile AppBar */}
      <div className="md:hidden w-full">
        <ResponsiveAppBar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:block bg-white shadow-lg rounded-xl">
          <DefaultSidebar />
        </div>
        {children}
      </div>

      {/* Mobile Navbar at the bottom */}
      <div className="sticky bottom-0 left-0 right-0 md:hidden bg-white shadow-lg">
        <MobileNavbar />
      </div>
    </div>
  );
}
