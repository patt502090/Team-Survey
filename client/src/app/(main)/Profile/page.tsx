"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        phone: ""
    });

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
            setEditData({
                name: response.data.username,
                email: response.data.email,
                phone: response.data.phoneNumber || ""
            });
        } catch (error) {
            console.log("Error fetching profile:", error);
        }
    };

    const EditProfile = async () => {
        try {
            const token = sessionStorage.getItem("auth.jwt");
            const response = await axios.put(`http://localhost:1337/api/users/${profile.id}`, {
                username: editData.name,
                email: editData.email,
                phoneNumber: editData.phone
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            setProfile(response.data);
            console.log("Profile updated successfully:", response.data);
        } catch (error) {
            console.log("Error editing profile:", error);
        }
    };

    useEffect(() => {
        GetProfile();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <Navbar />
            <main className="flex flex-col items-center container mx-auto p-4">
                <div className="bg-white rounded-lg p-6 shadow-lg border-2 w-full max-w-md flex flex-col  items-center ">
                    <button className="btn self-end" onClick={() => document.getElementById('editProfileModal').showModal()}>
                      <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z"/>
                          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                          <line x1="16" y1="5" x2="19" y2="8" />
                      </svg>
                    </button>
                    <dialog id="editProfileModal" className="modal">
                        <div className="modal-box p-8">
                            <form method="dialog" className="space-y-4" onSubmit={(e) => { e.preventDefault(); EditProfile(); }}>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('editProfileModal').close()}>✕</button>
                                <h3 className="font-bold text-lg">Edit Profile</h3>
                                <div>
                                    <label className="block font-semibold">Name</label>
                                    <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="block font-semibold">Email</label>
                                    <input type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="block font-semibold">Phone</label>
                                    <input type="text" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className="input input-bordered w-full" />
                                </div>
                                <button type="submit" className="btn btn-primary mt-4 w-full bg-blue-500 p-2 text-white" onClick={() => document.getElementById('editProfileModal').close()}>Save Changes</button>
                            </form>
                        </div>
                    </dialog>
                    <img
                        className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-md mb-4"
                        src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
                        alt="Profile illustration"
                    />
                    {profile ? (
                        <div className="w-full flex flex-col gap-4">
                            <ProfileItem label="Name" value={profile.username} />
                            <ProfileItem label="Username" value={profile.username} />
                            <ProfileItem label="Role" value={profile.role?.name} />
                            <ProfileItem label="Email" value={profile.email} />
                            <ProfileItem label="Phone" value={profile.phoneNumber} />
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">Loading profile...</p>
                    )}
                </div>
                <div className="rounded-lg shadow-lg w-full max-w-md flex flex-col items-center mb-16">
                  <button onClick={Logout} className="mt-6 w-full bg-red-500 rounded-md text-white font-bold py-2 px-4 text-xl hover:bg-red-400 transition-shadow duration-200 shadow-md hover:shadow-lg">
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
