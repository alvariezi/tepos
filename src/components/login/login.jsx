"use client";

import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Popup from "../popupLoginRegist/Popup";

const LoginForm = ({ initialToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(initialToken || "");
  const router = useRouter();

  useEffect(() => {
    const tokenFromCookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (tokenFromCookies) {
      setToken(tokenFromCookies.split("=")[1]);
    }
  }, []);

  useEffect(() => {
    if (token) {
      document.cookie = `token=${token}; path=/`;
      router.push("/product");
    }
  }, [token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateToRegister = () => {
    router.push("/register");
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    setIsLoading(true);

    try {
      await delay(2000);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      await delay(1500);

      if (response.ok) {
        setPopupMessage(result.message || "Login berhasil!");
        setPopupType("success");
        setShowPopup(true);
        setToken(result.token || "Token tidak tersedia");
      } else {
        setPopupMessage(result.error || "Login gagal, coba lagi!");
        setPopupType("error");
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage("Terjadi kesalahan saat login.");
      setPopupType("error");
      setShowPopup(true);
    } finally {
      await delay(1000);
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Img Section */}
      <div className="md:w-[50%] bg-blue-500 lg:flex md:flex justify-center items-center p-4 hidden">
        <img
          src="/logn&regist.png"
          alt="Login"
          className="w-full max-w-[420px] h-auto"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center p-4">
        <h1 className="text-[40px] md:text-[60px] leading-[72.3px] text-[#205FFF] font-[600] font-russo text-center mb-[20px]">
          Posify
        </h1>
        {token && (
          <p className="text-center text-[8px] text-gray-500 mt-2">
            Token: <span className="font-mono text-blue-600">{token}</span>
          </p>
        )}
        <p className="mb-[5px] text-[16px] md:text-[18px] font-bold text-center">
          Hi, Welcome Back to Posify!
        </p>
        <p className="mb-[50px] text-[12px] text-[#747474] md:text-[14px] font-bold text-center">
          Please login with your account
        </p>
        <form
          className="space-y-4 mx-auto max-w-[400px] w-full"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full mb-[20px] lg:mb-[70px] p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-[#090A0A]" />
              ) : (
                <EyeIcon className="h-5 w-5 text-[#090A0A]" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#205FFF] text-white font-[600] text-[15px] p-[8px] rounded-[10px] hover:bg-blue-700 transition-all duration-300 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p className="text-[12px] md:text-[14px] font-[600]">
            Don’t have an account?
          </p>
          <button
            type="button"
            onClick={navigateToRegister}
            className="w-full bg-[#000000] text-white font-[600] text-[15px] p-[8px] rounded-[10px] hover:bg-gray-700 transition-all duration-300 ease-in-out border-[2px]"
          >
            Registration
          </button>
        </form>
      </div>

      {/* Popup */}
      <Popup
        isOpen={showPopup}
        message={popupMessage}
        type={popupType}
        onClose={closePopup}
      />
    </div>
  );
};

export default LoginForm;
