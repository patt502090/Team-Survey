"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Others/Navbar";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
export default function Profile() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [editData, setEditData] = useState({
        first: "",
        last: "",
        phone: "",
        picture: null,
    });
    const Logout = () => {
        sessionStorage.clear();
        router.push("/");
    };

    const GetProfile = async () => {
        try {
            setLoading(true)
            const token = sessionStorage.getItem("auth.jwt");
            const response = await axios.get(`http://localhost:1337/api/users/me?populate=*`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            setProfile(response.data);
            setEditData({
                first: response.data.first_name,
                last: response.data.last_name,
                phone: response.data.phoneNumber,
                picture: response.data?.picture?.url
            });
        } catch (error) {
            console.log("Error fetching profile:", error);
        }
        setLoading(false)
    };
    
    const EditProfile = async () => {
        try {
            const token = sessionStorage.getItem("auth.jwt");
            let pictureId = profile?.picture?.id;
            if (editData.picture) {
                const formData = new FormData();
                formData.append("files", editData.picture);
                const uploadResponse = await axios.post("http://localhost:1337/api/upload", formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                pictureId = uploadResponse.data[0]?.id;
            }
            const response = await axios.put(
                `http://localhost:1337/api/users/${profile.id}`,
                {
                    first_name: editData.first,
                    last_name: editData.last,
                    phoneNumber: editData.phone,
                    picture: pictureId || profile?.picture?.id
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
    
            setProfile(response.data);
            console.log("Profile updated successfully:", response.data);
    
        } catch (error) {
            console.error("Error editing profile:", error);
        }
    };

    useEffect(() => {
        GetProfile();
    }, [profile?.picture?.url]);
    
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <Navbar />
            {loading ? (
                <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                    <span className='sr-only'>Loading...</span>
                    <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                </div>
            ) : (
                <main className="flex flex-col justify-center items-center h-screen container mx-auto p-4 ">
                <div className="bg-white rounded-lg p-6 shadow-lg border-2 w-full max-w-md flex flex-col hover:scale-105 transition-transform duration-300">
                
                    <dialog id="editProfileModal" className="modal">
                        <div className="modal-box p-8">
                            <form method="dialog" className="space-y-4" onSubmit={(e) => { e.preventDefault(); EditProfile(); }}>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('editProfileModal').close()}>✕</button>
                                <h3 className="font-bold text-lg">แก้ไขข้อมูล</h3>
                                <div>
                                    <label className="block font-semibold">รูปโปรไฟล์</label>
                                    <input type="file" onChange={(e) => setEditData({ ...editData, picture: e.target.files[0] })} className="file-input file-input-bordered file-input-info w-full max-w-xs p-2" />
                                </div>
                                <div>
                                    <label className="block font-semibold">ชื่อจริง</label>
                                    <input type="text" value={editData.first} onChange={(e) => setEditData({ ...editData, first: e.target.value })} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="block font-semibold">นานสกุล</label>
                                    <input type="text" value={editData.last} onChange={(e) => setEditData({ ...editData, last: e.target.value })} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="block font-semibold">เบอร์โทร</label>
                                    <input type="text" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className="input input-bordered w-full" />
                                </div>
                                <Button type="submit" className="btn btn-primary mt-4 w-full bg-blue-500 p-3 text-white" onClick={() => document.getElementById('editProfileModal').close()}>บันทึก</Button>
                            </form>
                        </div>
                    </dialog>
                    <div className="self-end">
                      <button className="btn" onClick={() => document.getElementById('editProfileModal').showModal()}>
                      <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z"/>
                          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                          <line x1="16" y1="5" x2="19" y2="8" />
                      </svg>
                    </button>
                    </div>
                    <div className="min-[0px]:grid min-[0px]:justify-center min-[0px]:items-center">
                      <div className="justify-self-center">
                        <img
                        className="w-[150px] h-[150px] rounded-full border-4 p-[4px] border-gray-50 shadow-sm mb-4"
                        src={`http://localhost:1337${profile?.picture?.url}`}
                        alt="Profile illustration"
                        />
                      </div>
                      <div>
                          <div className="w-full flex flex-col gap-4">
                          <ProfileItem label="ชื่อผู้ใช้" value={`${profile?.first_name} ${profile?.last_name}`} />
                          <ProfileItem label="ตำแหน่ง" value={profile?.role?.name} />
                              <ProfileItem label="อีเมล" value={profile?.email} />
                              <ProfileItem label="เบอร์โทร" value={profile?.phoneNumber} />
                          </div>
                      </div>
                    </div>

                </div>
                <div className="rounded-lg shadow-lg w-full max-w-md flex flex-col items-center mb-16">
                  <button onClick={Logout} className="mt-6 w-full bg-red-500 rounded-md text-white font-bold py-2 px-4 text-xl hover:bg-red-400 transition-shadow duration-200 shadow-md hover:shadow-lg">
                      ออกจากระบบ
                  </button>
                </div>
            </main>
        )}
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