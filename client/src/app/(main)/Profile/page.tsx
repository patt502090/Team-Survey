"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);

    const Logout = () => {
        sessionStorage.clear();
        setProfile(null);
        router.push("/");
    };

    const GetProfile = async () => {
        try {
            const token = sessionStorage.getItem("auth.jwt");
            const response = await axios.get(`http://localhost:1337/api/users/me?populate=role`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        GetProfile();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <Navbar />
            <main className="flex flex-col items-center container mx-auto p-4 mt-4">
                <div className="bg-white rounded-lg p-6 shadow-lg border-2 w-full max-w-md flex flex-col items-center">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-md mb-4"
                        src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
                        alt="Profile illustration"
                    />
                    {profile ? (
                        <div className="w-full flex flex-col gap-4">
                            <ProfileItem label="Name" value={profile.username} />
                            <ProfileItem label="Email" value={profile.email} />
                            <ProfileItem label="Role" value={profile.role?.name} />
                            <ProfileItem label="Username" value={profile.username} />
                            <ProfileItem label="Phone" value={profile.phoneNumber} />
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">Loading profile...</p>
                    )}
                </div>
                <div className="flex gap-8">
                    <button className="mt-6 bg-blue-500 rounded-md text-white font-bold py-2 px-4 text-xl hover:bg-red-400 transition-shadow duration-200 shadow-md hover:shadow-lg">
                        Edit
                    </button>
                    <button onClick={Logout} className="mt-6 bg-red-500 rounded-md text-white font-bold py-2 px-4 text-xl hover:bg-red-400 transition-shadow duration-200 shadow-md hover:shadow-lg">
                        Logout
                    </button>
                </div>
            </main>
        </div>
    );
}

function ProfileItem({ label, value }: { label: string; value: string | undefined }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-500 font-semibold w-24">{label}:</span>
            <span className="flex-1 text-gray-700 font-medium bg-gray-100 py-2 px-4 rounded-lg shadow-sm">
                {value || "N/A"}
            </span>
        </div>
    );
}
