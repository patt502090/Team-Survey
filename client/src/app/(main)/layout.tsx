"use client";

import DefaultSidebar from "../../components/Layouts/Side/Sidebar";
import MobileNavbar from "../../components/Layouts/Down/MobileNavbar";
import ResponsiveAppBar from "../../components/Layouts/Top/AppBar";
import AppBarCustom from "../../components/Layouts/Top/AppBar1";
import React, { ReactNode } from "react";
import { ContextProvider } from "@/contexts/Auth.context";
import LabelBottomNavigation from "../../components/Layouts/Down/MobileNavbar";
import ProtectRoute from "@/conf/AuthRoute";
import GuestRoute from "@/conf/GuestRoute";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ContextProvider>
      <GuestRoute>
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Mobile AppBar */}
          <div className="md:hidden w-full">{/* <ResponsiveAppBar /> */}</div>

          {/* Main Content */}
          <div className="">
            {/* Sidebar */}
            <div className="hidden md:block bg-white shadow-lg rounded-xl">
              <DefaultSidebar />
            </div>

            {children}
          </div>

          {/* Mobile Navbar at the bottom */}
          <div className="md:hidden fixed">
            <AppBarCustom />
          </div>
          <div className="bottom-0 w-full bg-white shadow-lg fixed md:hidden px-8">
            <LabelBottomNavigation />
          </div>
        </div>
      </GuestRoute>
    </ContextProvider>
  );
}
