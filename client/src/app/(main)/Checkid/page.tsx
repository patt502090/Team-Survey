"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaIdCard } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import ax from "@/conf/ax";

const IDCheckPage: React.FC = () => {
  const [idInput, setIdInput] = useState<string>("");
  const [status, setStatus] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      
      const response = await ax.get(`/customers?filters[Id_Number][$eq]=${idInput}`);
      console.log(response.data.data);
      const data = response.data.data

      if (data.length > 0) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (err) {
      setError("ไม่สามารถตรวจสอบได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 md:ml-64">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto mt-20 md:mt-8">
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
                        <span className="text-lg font-medium text-green-700">มีข้อมูลในระบบแล้ว</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="h-12 w-12 text-red-500" />
                        <span className="text-lg font-medium text-red-700">ยังไม่มีข้อมูลในระบบ</span>
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
