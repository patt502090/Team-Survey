"use client";

import React, { useState, useContext } from "react";
import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
// import backgroundImage from "../assets/background.png";
import conf from "../conf/main";
import ax from "../conf/ax";
import { AuthContext, ContextProvider } from "../contexts/Auth.context";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const authContext = useContext(AuthContext);
  const { login } = authContext || {};
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitEnabled(false);
    setLoading(true);
    // login(email, password);

    try {
      delete ax.defaults.headers.common["Authorization"];
      let result = await ax.post(`${conf.apiUrlPrefix}${conf.loginEndpoint}`, {
        identifier: email,
        password: password,
      });

      result = await ax.get(`${conf.apiUrlPrefix}${conf.jwtUserEndpoint}`);
      if (result.data.image) {
        sessionStorage.setItem(
          "profileURL",
          `${conf.urlPrefix}${result.data.image.url}`
        );
      }
      setLoading(false);
      const roleName = result.data.role.name;
      if (roleName) {
        sessionStorage.setItem(
          conf.roleSessionStorageKey,
          roleName === "member" ? conf.memberStorageKey : conf.adminStorageKey
        );
        // navigate(roleName === "member" ? "/" : "/admin");
        toast.success("เข้าสู่ระบบสำเร็จ!");
      }
    } catch (error) {
      setPasswordError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
      setSubmitEnabled(true);
    }
  };

  //   const handleGoogleLoginClick = () => {
  //     window.location.href = `${conf.apiUrlPrefix}${conf.googleConnectEndpoint}`;
  //   };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <ContextProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="flex items-center justify-center h-screen w-screen "
        style={{
            backgroundImage: `url(https://plus.unsplash.com/premium_photo-1664443577580-dd2674e9d359?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-xs md:max-w-md bg-white border-2 rounded-lg shadow-2xl p-6  ">
          <p className="text-lg font-bold mb-4 mt-3 text-center">
            ลงชื่อเข้าใช้
          </p>
          <p className="text-base mb-5 text-center">
            ยินดีต้อนรับเข้าสู่บัญชีผู้ใช้ Team Survey
          </p>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="max-w-md items-center relative">
              <div className="mb-2 block">
                <Label htmlFor="email4" value="อีเมล" className="text-left " />
              </div>
              <TextInput
                id="email4"
                type="email"
                icon={HiMail}
                placeholder="name@teamsurvey.com"
                value={email}
                onChange={handleEmailChange}
                required
                size={27}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div className="max-w-md relative">
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="รหัสผ่าน"
                  className="text-left"
                />
              </div>
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                icon={RiLockPasswordFill}
                placeholder="123456"
                value={password}
                onChange={handlePasswordChange}
                required
                size={27}
              />
              <button
                className="absolute top-[3.35rem] right-2 transform -translate-y-1/2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEyeSlash /> : <HiOutlineEye />}
              </button>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <p
              className="text-sm text-right hover:underline cursor-pointer text-purple-700 gap-2 mb-1 "
              onClick={handleRegister}
            >
              ลืมรหัสผ่าน ?
            </p>

            <Button type="submit" color="purple" size="md">
              เข้าสู่ระบบ
            </Button>
          </form>
          {/* <div className="relative my-6">
            <hr className="absolute w-full border-t-2 border-gray-1000" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 bg-white text-gray-1000 text-xs ">
              หรือ
            </span>
          </div> */}

          {/* <button
            className="px-6 py-2.5 mb-5 mt-12 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 items-center mx-auto"
            onClick={handleGoogleLoginClick}
          >
            <img
              className="w-4 h-4 items-center justify-center"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="text-sm">ดำเนินการต่อด้วย Google</span>
          </button> */}

          <p className="text-sm text-center cursor-pointer font-medium mb-2 mt-6">
            ยังไม่เป็นสมาชิก{" "}
            <span
              className="text-purple-700 underline"
              onClick={handleRegister}
            >
              คลิกเพื่อสมัครสมาชิก
            </span>
          </p>
        </div>
      </div>
    </ContextProvider>
  );
}
