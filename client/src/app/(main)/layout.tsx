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
        {/* <ResponsiveAppBar /> */}
      </div>

      {/* Main Content */}
      <div className="">
        {/* Sidebar */}
        <div className="hidden md:block bg-white shadow-lg rounded-xl">
          <DefaultSidebar />
        </div>
        {children}
      </div>

      {/* Mobile Navbar at the bottom */}
      <div className="fixed bottom-0 md:hidden left-0 right-0 bg-white shadow-lg">
        <MobileNavbar />
      </div>
    </div>
  );
}
