"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@material-tailwind/react";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
// import backgroundImage from "../assets/images";
import conf from "../conf/main";
import ax from "../conf/ax";
import { ContextProvider } from "../contexts/Auth.context";
import { FaPhoneSquareAlt, FaRegEyeSlash } from "react-icons/fa";
// import { HiOutlineEye } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import { TextInput, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
// import { AiOutlineUser } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phonenum: string;
}

export default function RegisterAccount() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenum: "",
  });

  //   const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowPassword1(!showPassword1);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitEnabled(false);
    setLoading(true);

    try {
      if (formData.password === formData.confirmPassword) {
        const postData = {
          username: formData.username,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
          phonenum: formData.phonenum,
        };

        const result = await ax.post(
          `${conf.apiUrlPrefix}${conf.registerEndpoint}`,
          postData
        );
        console.log("สมัครข้อมูล:", result.data);
        console.log(postData);
        toast.success("สมัครสมาชิกสำเร็จ!");
        // setTimeout(() => {
        //   navigate("/login");
        // });
      } else {
        console.error("รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านใหม่ให้ตรงกัน");
        toast.error("รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านใหม่ให้ตรงกัน");
        setPasswordError(true);
      }
    } catch (error: any) {
      console.error("ข้อมูลสมัครไม่สำเร็จ:", error.response.data);
      toast.error("การสมัครไม่สำเร็จ กรุณาติดต่อเจ้าหน้าที่");
      console.log(formData);
    } finally {
      setLoading(false);
      setSubmitEnabled(true);
    }
  };

  return (
    <ContextProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="flex items-center justify-center h-screen w-screen"
        style={{
          backgroundImage: `url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXd5Ynltczllenpub28wbGc3OWU5dWh0bHhuYTkzNW1ibXFocGxwNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BHNfhgU63qrks/giphy.gif)`,
          //   backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white border-2 rounded-lg shadow-2xl p-6 mx-auto">
          <p className="text-lg font-bold mb-4 text-center">
            สมัครบัญชีผู้ใช้ด้วยอีเมล
          </p>
          <p className="text-sm mb-5 text-center">กรุณากรอกข้อมูลให้ครบถ้วน</p>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
            <div className="w-full">
              <Label htmlFor="email" value="อีเมล" className="text-sm" />
              <TextInput
                id="email"
                type="email"
                placeholder="name@teamsurvey.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                icon={HiMail}
                // fullWidth
                // InputProps={{
                //   startAdornment: <HiMail style={{ marginRight: 8 }} />,
                // }}
              />
            </div>

            <div className="flex-1 md:flex-2 mt-1">
              <Label htmlFor="firstName" value="ชื่อจริง" />
              <TextInput
                id="first_name"
                type="text"
                placeholder="John"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                // fullWidth
              />
            </div>

            <div className="flex-1 md:flex-2 mt-1">
              <Label htmlFor="lastName" value="นามสกุล" />
              <TextInput
                id="last_name"
                type="text"
                placeholder="Doe"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                // fullWidth
              />
            </div>

            <div className="flex-2 w-full mt-1">
              <Label htmlFor="username" value="ชื่อผู้ใช้" />
              <TextInput
                id="username"
                type="text"
                placeholder="johndoe"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                icon={FaUser}
                // fullWidth
                // InputProps={{
                //   startAdornment: <span>@</span>,
                // }}
              />
            </div>

            <div className="w-full mt-1">
              <Label htmlFor="phone_num" value="เบอร์โทรศัพท์" />
              <TextInput
                id="phonenum"
                type="text"
                placeholder="191"
                name="phonenum"
                value={formData.phonenum}
                icon={FaPhoneSquareAlt}
                onChange={handleChange}
                required
                // fullWidth
                // InputProps={{
                //   startAdornment: (
                //     <FaPhoneSquareAlt style={{ marginRight: 8 }} />
                //   ),
                // }}
              />
            </div>

            <div className="w-full relative mt-1">
              <Label htmlFor="first_password" value="รหัสผ่าน" />
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="123456"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                icon={RiLockPasswordFill}
                // fullWidth
                // InputProps={{
                //   endAdornment: (
                //     <button
                //       className="absolute right-2 top-2"
                //       onClick={togglePasswordVisibility}
                //     >
                //       {showPassword ? <FaRegEyeSlash /> : <HiOutlineEye />}
                //     </button>
                //   ),
                // }}
              />
            </div>

            <div className="w-full relative mt-1">
              <Label htmlFor="sec_password" value="ยืนยันรหัสผ่าน" />
              <TextInput
                id="confirmPassword"
                type={showPassword1 ? "text" : "password"}
                placeholder="123456"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                icon={RiLockPasswordFill}
                // fullWidth
                // InputProps={{
                //   endAdornment: (
                //     <button
                //       className="absolute right-2 top-2"
                //       onClick={togglePasswordVisibility1}
                //     >
                //       {showPassword1 ? <FaRegEyeSlash /> : <HiOutlineEye />}
                //     </button>
                //   ),
                // }}
              />
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm font-semibold w-full">
                รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านใหม่ให้ตรงกัน
              </div>
            )}

            <Button
              type="submit"
              className="flex-1 mt-4 mb-6 px-6 mx-auto"
              variant="contained"
              color="primary"
              disabled={!submitEnabled || loading}
            >
              สมัครบัญชีผู้ใช้
            </Button>
          </form>

          <p className="text-sm text-center cursor-pointer font-medium mb-4">
            หากคุณมีบัญชีผู้ใช้งานแล้ว{" "}
            <span className="text-blue-700 underline" onClick={handleLogin}>
              เข้าสู่ระบบ
            </span>
          </p>
        </div>
      </div>
    </ContextProvider>
  );
}
