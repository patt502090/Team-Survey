"use client";
import DefaultSidebar from "../components/Sidebar";

export default function Dashboard() {
    return (
        <div className="flex">
            <DefaultSidebar />
            <main className="ml-80 p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to the dashboard!</p>
            </main>
        </div>
    );
}
