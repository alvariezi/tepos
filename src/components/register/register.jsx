"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation"; 

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigateTologin = () => {
    router.push("/login-page");  
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="md:w-[50%] bg-blue-500 lg:flex md:flex justify-center items-center p-4 hidden">
        <img
          src="/logn&regist.png"
          alt="Register"
          className="w-full max-w-[420px] h-auto"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center p-4">
        <h1 className="text-[40px] md:text-[60px] leading-[72.3px] text-[#205FFF] font-[600] font-russo text-center mb-[20px]">
          tePOS
        </h1>
        <p className="mb-[10px] text-[16px] md:text-[18px] font-bold text-center">
          Create your account
        </p>
        <form className="space-y-4 mx-auto max-w-[400px] w-full">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              className="mt-1 block w-full p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              className="mt-1 block w-full p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              required
              className="mt-1 block w-full mb-[20px] p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="mt-1 block w-full mb-[20px] p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-[#090A0A]" />
              ) : (
                <EyeIcon className="h-5 w-5 text-[#090A0A]" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#205FFF] text-white font-[600] text-[15px] p-[8px] rounded-[10px] hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            Register
          </button>
          <p className="mt-4 text-[14px] font-[600] text-[#000000]">
            Already have an account?
          </p>
          <button
            type="button"
            onClick={navigateTologin} 
            className="w-full bg-[#000000] text-white font-[600] text-[15px] p-[8px] rounded-[10px] hover:bg-gray-700 transition-all duration-300 ease-in-out border-[2px]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;