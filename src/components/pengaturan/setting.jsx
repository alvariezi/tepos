"use client";

import { useState, useEffect } from "react"; 
import Sidebar from "../sidebar/sidebar";
import { Bars3Icon, EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Settings = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#EEF0F1]">
      {/* Sidebar */}
      <Sidebar
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {isMobile && (
        <div className="fixed top-0 left-0 w-full bg-[#205FFF] text-white py-[12px] px-[16px] flex justify-between items-center z-50">
          <button
            className="text-white text-[18px] flex items-center"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-[24px] w-[24px]" />
            ) : (
              <Bars3Icon className="h-[24px] w-[24px]" />
            )}
          </button>
          <p className="font-[600] text-[18px]">tePOS</p>
        </div>
      )}

      <div
        className={`flex-1 ${isMobile ? "ml-0 mt-[40px]" : "md:ml-[250px]"} p-6`}
      >
        {/* Header */}
        <div className="flex bg-white py-[16px] px-[20px] rounded-md shadow-sm justify-between items-center mb-[40px]">
          <h1 className="text-[20px] font-semibold text-gray-800">Settings</h1>
          <div className="text-right">
            <p className="text-[#1E1E1E] text-[14px] font-[600]">ShopName</p>
            <p className="text-[#6E6E6E] text-[14px] font-[500]">Username</p>
          </div>
        </div>

        <form className="space-y-4">
          {/* Username & Store Name */}
          <div className={`flex ${isMobile ? 'flex-col' : 'space-x-4'}`}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              className="block w-full md:w-1/2 p-2 mb-[18px] md:mb-0 border text-[#BFBFBF] font-[500] border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              id="store Name"
              placeholder="Store Name"
              required
              className="block w-full md:w-1/2 p-2 border text-[#BFBFBF] font-[500] border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password & Save Button */}
          <div className={`flex ${isMobile ? 'flex-col' : 'space-x-4'} items-center`}>
            <div className="relative w-full md:w-1/2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                required
                className="block w-full p-2 mb-[18px] md:mb-0 border text-[#BFBFBF] font-[500] border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <button
              type="button"
              className="w-full md:w-1/2 bg-[#205FFF] text-white font-[500] px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;