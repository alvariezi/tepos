"use client";

import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Payment = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        className={`flex-1 ${
          isMobile ? "ml-0 mt-[40px]" : "md:ml-[250px]"
        } p-6`}
      >
        {/* Header */}
        <div className="flex bg-white py-[16px] px-[20px] rounded-md shadow-sm justify-between items-center mb-[20px]">
          <h1 className="text-[20px] font-semibold text-gray-800">
            Payment
          </h1>
          <div className="text-right">
            <p className="text-[#1E1E1E] text-[14px] font-[600]">
              ShopName
            </p>
            <p className="text-[#6E6E6E] text-[14px] font-[500]">
              Username
            </p>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-white p-[15px] rounded-md shadow-sm mb-[10px] flex items-center space-x-4">
          <button 
            className="flex items-center text-[#090A0A] hover:text-[#205FFF] focus:outline-none"
            onClick={() => window.history.back()} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h2 className="text-[15px] font-[500] text-[#1E1E1E]">Back</h2>
        </div>

        {/* Product Form */}
        <div className="bg-white rounded-md shadow-md p-[16px]">
          <form>
            {/* Pay */}
            <div className="flex items-center mb-[16px] lg:w-[950px] md:w-[400px] w-[270px]">
              <label
                htmlFor="pay"
                className="w-1/4 text-[#5F5F5F] font-[600] text-[13px] md:text-[14px]"
              >
                Pay
              </label>
              <input
                type="text"
                id="pay"
                placeholder=""
                className="w-3/4 ml-[30px] md:ml-0 p-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>

            {/* Retrun */}
            <div className="flex items-center mb-[16px] lg:w-[950px] md:w-[400px] w-[270px]">
              <label
                htmlFor="return"
                className="w-1/4 text-[#5F5F5F] font-[600] text-[13px] md:text-[14px]"
              >
                Retrun
              </label>
              <input
                type="text"
                id="return"
                placeholder=""
                className="w-3/4 p-[8px] ml-[30px] md:ml-0 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-[14px]"
              />
            </div>
            
            {/* Buyer Name */}
            <div className="flex items-center mb-[16px] lg:w-[950px] md:w-[400px] w-[270px]">
              <label
                htmlFor="buyerName"
                className="w-1/4 text-[#5F5F5F] font-[600] text-[13px] md:text-[14px]"
              >
                Buyer Name
              </label>
              <input
                type="text"
                id="buyerName"
                placeholder=""
                className="w-3/4 p-[8px] ml-[30px] md:ml-0 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-[14px]"
              />
            </div>

            {/* Information */}
            <div className="flex items-start mb-[16px] lg:w-[950px] md:w-[400px] w-[270px]">
              <label
                htmlFor="information"
                className="w-1/4 text-[#5F5F5F] font-[600] text-[13px] md:text-[14px]"
              >
                Information
              </label>
              <textarea
                id="information"
                rows="4"
                placeholder="Opsional"
                className="w-3/4 ml-[20px] md:ml-0 p-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-[14px]"
              ></textarea>
            </div>

            {/* Button Save dan Delete */}
            <div className="flex justify-end space-x-4 mr-[10px] lg:mr-[85px] md:mr-[35px]">
              <button
                type="button"
                className="bg-[#00A95A] text-white px-[16px] lg:px-[65px] py-[8px] md:px-[30px] rounded-md text-[14px] font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;