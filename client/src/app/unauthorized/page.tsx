"use client"
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const PendingStatusPage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: "คุณ จอห์น โด",
    status: "รอดำเนินการ",
    lastUpdated: "2024-01-20T10:30:00"
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl transition-all duration-300 hover:shadow-lg">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-blue-500 text-4xl" aria-label="กำลังโหลด" />
          </div>
        ) : (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800" tabIndex="0">
                  ยินดีต้อนรับ, {userData.username}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  อัปเดตล่าสุด: {new Date(userData.lastUpdated).toLocaleString("th-TH")}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <IoMdCheckmarkCircleOutline className="text-yellow-600 text-2xl" aria-hidden="true" />
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded" role="alert">
              <div className="flex">
                <div>
                  <p className="text-yellow-700 font-medium" tabIndex="0">
                    รอการอนุมัติ
                  </p>
                  <p className="text-yellow-600 text-sm mt-1" tabIndex="0">
                    บัญชีของคุณกำลังรอการจัดสรรบทบาทในทีม ผู้ดูแลระบบของเราจะตรวจสอบการสมัครของคุณในเร็วๆ นี้
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2" tabIndex="0">
                  ข้อมูลสถานะ
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-32">สถานะบัญชี:</span>
                    <span className="font-medium text-yellow-600">รอดำเนินการ</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32">บทบาทในทีม:</span>
                    <span className="font-medium text-gray-800">ยังไม่ได้กำหนด</span>
                  </li>
                </ul>
              </div>

              <button
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => alert("กำลังนำทางไปยังแดชบอร์ด...")} 
                disabled={userData.status === "รอดำเนินการ"}
                aria-label="เข้าสู่แดชบอร์ด"
              >
                เข้าสู่แดชบอร์ด
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                ต้องการความช่วยเหลือ? กรุณาติดต่อ{" "}
                <button 
                  className="text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
                  onClick={() => alert("กำลังเปิดแชทสนับสนุน...")} 
                >
                  ฝ่ายสนับสนุน
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingStatusPage;