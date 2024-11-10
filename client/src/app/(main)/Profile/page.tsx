"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";
<<<<<<< HEAD

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
=======
import { AuthContext } from "@/contexts/Auth.context";
import { useContext } from "react";
import { any } from "zod";

export default function Profile() {
  const router = useRouter();
  const context = useContext(AuthContext);
  const ContextState = context ? context.state : null;
  const logout = context ? context.logout : any;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
      <Navbar />
      <main className="md:ml-auto flex gap-4 flex-wrap flex-col self-center contanier mx-auto p-4 mt-2">
        <div className="bg-white rounded-lg p-4 shadow-lg border-2 ">
          <div className="flex w-full h-full relative">
            <img
              className="w-32 h-32 m-auto rounded-full border-4"
              src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
              alt="Profile illustration"
            />
          </div>
        </div>
        <div className="bg-white flex flex-col p-4 rounded-lg gap-2 border-2 border-gray-300">
          <div className="flex rounded-md">
            <div className="border-4 py-2 px-4 font-bold bg-blue-gray-50 w-24">
              NAME:{" "}
            </div>
            <div className="border-4 p-2 font-bold border-l-0 w-44">
              {`${ContextState?.user?.first_name} ${ContextState?.user?.last_name}`}
            </div>
          </div>
          <div className="flex rounded-md">
            <div className="border-4 py-2 px-4 font-bold bg-blue-gray-50 w-24">
              EMAIL:{" "}
            </div>
            <div className="border-4 p-2 font-bold border-l-0 w-44">
              {ContextState?.user?.email}
            </div>
          </div>
          <div className="flex rounded-md">
            <div className="border-4 py-2 px-4 font-bold bg-blue-gray-50 w-24">
              PHONE:{" "}
            </div>
            <div className="border-4 p-2 font-bold border-l-0 w-44">
              {ContextState?.user?.phoneNumber}
            </div>
          </div>
          <div className="flex rounded-md">
            <div className="border-4 py-2 px-4 font-bold bg-blue-gray-50 w-24">
              ROLE:{" "}
            </div>
            <div className="border-4 p-2 font-bold border-l-0 w-44">
              {ContextState?.userRole}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 rounded-md text-white font-bold p-2 text-xl hover:bg-red-400 shadow-lgs hover:shadow-lg"
        >
          logout
        </button>
      </main>
      <div className="fixed bottom-0 w-full md:hidden">
        {/* <MobileNavbar /> */}
      </div>
    </div>
  );
>>>>>>> 2b5b3a59a377621715c03b05516099c5c3eec1ca
}
