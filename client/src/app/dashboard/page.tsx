// Dashboard.tsx
"use client";
import DefaultSidebar from "../components/Sidebar";

export default function Dashboard() {
    return (
        <div className="flex">
            <DefaultSidebar />
            <main style={{ marginLeft: '20rem', padding: '1rem' }}>
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard!</p>
            </main>
        </div>
    );
}
