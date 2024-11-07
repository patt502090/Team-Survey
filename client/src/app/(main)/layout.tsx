"use client";

import DefaultSidebar from "../../components/Layouts/Sidebar";
import MobileNavbar from "../../components/Layouts/MobileNavbar";
import ResponsiveAppBar from "../../components/Layouts/AppBar";
import { BreadcrumbsWithIcon } from "../../components/Dashboard/Breadcrumbs";
import { ControlledSelect } from "../../components/Dashboard/FilterSelect";
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

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <BreadcrumbsWithIcon />
          </div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <ControlledSelect />
          </div>

          {children}
        </main>
      </div>

      {/* Mobile Navbar at the bottom */}
      <div className="sticky bottom-0 left-0 right-0 md:hidden bg-white shadow-lg">
        <MobileNavbar />
      </div>
    </div>
  );
}
