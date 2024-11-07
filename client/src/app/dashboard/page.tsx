"use client";
import DefaultSidebar from "../../components/Sidebar";
import MobileNavbar from "../../components/MobileNavbar";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile AppBar */}
      <div className="md:hidden">
        <ResponsiveAppBar position="sticky" />
        <Toolbar>
          {/* <Typography variant="h6">Dashboard</Typography> */}
        </Toolbar>
      </div>

      {/* PC Sidebar */}
      <div className="hidden md:block">
        <DefaultSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 justify-center p-4 mt-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to the dashboard!</p>
      </main>

      {/* Mobile Navbar */}
      <div className="fixed bottom-0 w-full md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}
