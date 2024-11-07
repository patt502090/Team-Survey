"use client";

import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => setIsLoggingIn(false), 2000);
    router.push("/login");
  };

  const handleRegister = () => {
    setIsRegistering(true);
    setTimeout(() => setIsRegistering(false), 2000);
    router.push("/register");
  };

  const router = useRouter();

  return (
    <div
      className="hero min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1602498456745-e9503b30470b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 absolute inset-0"></div>
      <div className="relative z-10 text-center text-white p-8 max-w-md bg-black bg-opacity-50 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-extrabold mb-6">Team Survey</h1>
        <p className="mb-8 text-md text-white opacity-80 leading-relaxed">
          สร้างประสบการณ์การสำรวจทีมของคุณให้ง่ายและรวดเร็ว
          พร้อมข้อมูลสรุปผลการทำงานที่ครบถ้วน.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            color="purple"
            variant="filled"
            size="md"
            onClick={handleLogin}
            loading={isLoggingIn}
            className="shadow-lg transition duration-300 ease-in-out transform hover:scale-105 min-w-[120px]"
          >
            เข้าสู่ระบบ
          </Button>
          <Button
            color="blue"
            variant="outlined"
            size="md"
            onClick={handleRegister}
            loading={isRegistering}
            className="shadow-lg text-white border-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700 min-w-[120px]"
          >
            ลงทะเบียน
          </Button>
        </div>
      </div>
    </div>
  );
}
