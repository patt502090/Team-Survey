"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaIdCard } from "react-icons/fa";
import { BiError } from "react-icons/bi";

const IDCheckPage: React.FC = () => {
  const [idInput, setIdInput] = useState<string>("");
  const [status, setStatus] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateThaiID = (id: string): boolean => {
    if (id.length !== 13) return false;
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseFloat(id.charAt(i)) * (13 - i);
    }
    const mod = sum % 11;
    const check = (11 - mod) % 10;
    return check === parseFloat(id.charAt(12));
  };

  const handleIdCheck = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!idInput.trim()) {
      setError("กรุณากรอกเลขบัตรประชาชน 13 หลัก");
      setLoading(false);
      return;
    }

    if (!/^[0-9]{13}$/.test(idInput)) {
      setError("เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลักเท่านั้น");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const isValid = validateThaiID(idInput);
      setStatus(isValid);
    } catch (err) {
      setError("ไม่สามารถตรวจสอบได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex">
      {/* Sidebar placeholder */}
      {/* <div className="w-64 bg-gray-200 min-h-screen"></div> */}

      {/* Main content with left margin for sidebar */}
      <div className="flex-1 md:ml-64 ">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto mt-36 md:mt-20">
            <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <FaIdCard className="h-16 w-16 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  ตรวจสอบบัตรประชาชน
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  กรุณากรอกเลขบัตรประชาชน 13 หลัก เพื่อตรวจสอบ
                </p>
              </div>

              <form onSubmit={handleIdCheck} className="mt-8 space-y-6">
                <div className="relative">
                  <label htmlFor="id-input" className="block text-sm font-medium text-gray-700">
                    เลขบัตรประชาชน
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-indigo-400" />
                    </div>
                    <input
                      type="text"
                      id="id-input"
                      maxLength={13}
                      className="mt-4 block w-full pl-10 pr-3 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg tracking-wider"
                      placeholder="x-xxxx-xxxxx-xx-x"
                      value={idInput}
                      onChange={(e) => setIdInput(e.target.value.replace(/[^0-9]/g, ""))}
                      aria-label="ID input field"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Check ID button"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      กำลังตรวจสอบ...
                    </div>
                  ) : (
                    "ตรวจสอบ"
                  )}
                </button>
              </form>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-bounce" role="alert">
                  <div className="flex items-center">
                    <BiError className="h-6 w-6 text-red-400" />
                    <p className="ml-3 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {status !== null && !error && (
                <div className={`mt-4 p-6 rounded-lg ${status ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"} border-2 animate-fade-in-down`} role="status">
                  <div className="flex items-center justify-center flex-col space-y-2">
                    {status ? (
                      <>
                        <FaCheckCircle className="h-12 w-12 text-green-500" />
                        <span className="text-lg font-medium text-green-700">เคยมีประวัติการใช้งาน</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="h-12 w-12 text-red-500" />
                        <span className="text-lg font-medium text-red-700">ไม่เคยมีประวัติการใช้งาน</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                  ต้องการความช่วยเหลือ? ติดต่อเจ้าหน้าที่
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCheckPage;


// import Navbar from "../../../components/Navbar"
// export default function Checkid(){
//     return(
//         <div>
//             <Navbar/>
//             <main className="bg-gray-100 h-screen w-full flex flex-col p-4">
//                 <form className="max-w-md mx-auto w-full py-4 mb-8">   
//                     <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//                     <div className="relative shadow-md">
//                         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
//                             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                             </svg>
//                         </div>
//                         <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
//                         <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//                     </div>
//                 </form>
//                 <div className="bg-white w-full rounded-lg shadow-md p-4 flex flex-col gap-4">
//                     <div className="w-full border-4 rounded-xl border-gray-300 flex items-center p-2">
//                         <div className="border-r-4 p-2">
//                             <div className="rounded-full w-12 h-12 bg-gray-400"></div>
//                         </div>
//                         <div className="p-2">
//                             <div className="text-sm font-extrabold">Firstname Lastname</div>
//                             <div className="font-thin text-sm">Nickname</div>
//                         </div>
//                     </div>
//                     <div className="w-full border-4 rounded-xl border-gray-300 flex items-center p-2">
//                         <div className="border-r-4 p-2">
//                             <div className="rounded-full w-12 h-12 bg-gray-400"></div>
//                         </div>
//                         <div className="p-2">
//                             <div className="text-sm font-extrabold">Firstname Lastname</div>
//                             <div className="font-thin text-sm">Nickname</div>
//                         </div>
//                     </div>
//                     <div className="w-full border-4 rounded-xl border-gray-300 flex items-center p-2">
//                         <div className="border-r-4 p-2">
//                             <div className="rounded-full w-12 h-12 bg-gray-400"></div>
//                         </div>
//                         <div className="p-2">
//                             <div className="text-sm font-extrabold">Firstname Lastname</div>
//                             <div className="font-thin text-sm">Nickname</div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     )
// }
