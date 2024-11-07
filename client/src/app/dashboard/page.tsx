"use client";
import DefaultSidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar"; 

export default function Dashboard() {
    return (
        <div className="flex">
            {/* PC */}
            <div className="hidden md:block">
                <DefaultSidebar />
            </div>
            
            <main className="flex-1 justify-center p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to the dashboard!</p>
            </main>

            {/* Mobile */}
            <div className="fixed bottom-0 w-full md:hidden">
                <MobileNavbar />
            </div>
        </div>
    );  
}
