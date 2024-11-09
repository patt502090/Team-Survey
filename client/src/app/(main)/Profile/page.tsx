"use client";
import Navbar from "../../../components/Navbar";
import { useRouter  } from "next/navigation";

export default function Profile() {
    const router = useRouter()

    const Logout = () => {
        sessionStorage.clear();
        // localStorage.clear();
        router.push("/");
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
        <Navbar/>
        <main className="flex gap-4 flex-wrap flex-col self-center contanier mx-auto p-4 mt-2 md:hidden">
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
                    <div className="border-4 py-2 px-4 font-bold bg-blue-gray-50 w-24">NAME: </div>
                    <div className="border-4 p-2 font-bold border-l-0 w-44">Firstname Lastname</div>
                </div>
                <div className="flex rounded-md">
                    <div className="border-4 py-2 px-4 font-bold bg-blue-gray-50 w-24">EMAIL: </div>
                    <div className="border-4 p-2 font-bold border-l-0 w-44">email@email.com</div>
                </div>
                <div className="flex rounded-md">
                    <div className="border-4 py-2 px-4 font-bold bg-blue-gray-50 w-24">ROLE: </div>
                    <div className="border-4 p-2 font-bold border-l-0 w-44">Admin</div>
                </div>
            </div>
            <button onClick={Logout} className="bg-red-500 rounded-md text-white font-bold p-2 text-xl hover:bg-red-400 shadow-lgs hover:shadow-lg">logout</button>
        </main>
        <div className="fixed bottom-0 w-full md:hidden">
          {/* <MobileNavbar /> */}
        </div>
      </div>
    );
}
