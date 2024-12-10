"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const navigateToLogin = () => {
    router.push("/login-page");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPopupMessage("Passwords do not match.");
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    const data = {
      username,
      email,
      password,
    };

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      setIsLoading(false);

      if (response.ok) {
        setPopupMessage(result.message);
        setPopupType("success");
        setShowPopup(true);
        setTimeout(() => {
          navigateToLogin();
        }, 2000);
      } else {
        setPopupMessage(result.message);
        setPopupType("error");
        setShowPopup(true);
      }
    } catch (error) {
      setIsLoading(false);
      setPopupMessage("Register Gagal, coba lagi!!");
      setPopupType("error");
      setShowPopup(true);
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
          alt="Register"
          className="w-full max-w-[420px] h-auto"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center p-4">
        <h1 className="text-[40px] md:text-[60px] leading-[72.3px] text-[#205FFF] font-[600] font-russo text-center mb-[20px]">
          tePOS
        </h1>
        <p className="mb-[10px] text-[16px] md:text-[18px] font-bold text-center">
          Create your account
        </p>
        <form className="space-y-4 mx-auto max-w-[400px] w-full" onSubmit={handleSubmit}>
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
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full mb-[20px] p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full mb-[20px] p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#205FFF] text-white font-[600] text-[15px] p-[8px] rounded-[10px] hover:bg-blue-700 transition-all duration-300 ease-in-out relative"
          >
            <span className={`${isLoading ? "absolute inset-0 flex items-center justify-center" : ""}`}>
              {isLoading ? "Loading..." : "Registration"}
            </span>
          </button>
          <p className="mt-4 text-[14px] font-[600] text-[#000000]">
            Already have an account?
          </p>
          <button
            type="button"
            onClick={navigateToLogin}
            className="w-full bg-[#000000] text-white font-[600] text-[15px] p-[8px] rounded-[10px] hover:bg-gray-700 transition-all duration-300 ease-in-out border-[2px]"
          >
            Login
          </button>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className={`text-center text-lg font-bold ${popupType === "success" ? "text-green-500" : "text-red-500"}`}>
              {popupType === "success" ? "Berhasil" : "Gagal"}
            </h2>
            <p className="text-center mt-2">{popupMessage}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={closePopup}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;