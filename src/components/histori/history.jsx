"use client";

import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import { Bars3Icon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'; // Import TrashIcon
import Link from "next/link";

const History = () => {
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
            History
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

        {/* Buttons Section */}
        <div className="flex justify-between bg-white py-[12px] px-[20px] rounded-md shadow-sm space-x-3 mb-[20px]">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              id="searchDate"
              placeholder="Search Date"
              className="w-3/4 p-[8px] text-[12px] px-[16px] md:text-[16px] placeholder:text-[#1E1E1E] placeholder:font-[500] md:ml-0 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="bg-white p-[8px] rounded-md shadow-sm">
              <select className="border border-[#D0D0D0] rounded-md px-[16px] text-[12px] md:text-[16px] py-[8px] focus:outline-none text-[#1E1E1E] font-[500] focus:ring-2 focus:ring-[#205FFF] lg:w-[880px] md:w-[280px] w-[140px]">
                <option>All Status</option>
                <option>Status 1</option>
                <option>Status 2</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-md shadow-md overflow-x-auto">
          <table className="hidden md:table table-auto w-full border-collapse">
            {/* Title Table */}
            <thead>
              <tr className="bg-[#EEF0F1] border-b">
                <th className="p-4 text-left text-[14px] font-medium text-gray-800">Product</th>
                <th className="p-4 text-left text-[14px] font-medium text-gray-800">Date</th>
                <th className="p-4 text-left text-[14px] font-medium text-gray-800">Time</th>
                <th className="p-4 text-left text-[14px] font-medium text-gray-800">Price</th>
                <th className="p-4 text-left text-[14px] font-medium text-gray-800">Actions</th>
              </tr>
            </thead>

            {/* Dekstop Table */}
            <tbody>
              <tr className="border-b hover:bg-gray-100">
                <td className="p-4 text-sm text-gray-800 flex items-center space-x-3">
                  <img
                    src="/logn&regist.png"
                    alt="Product"
                    className="w-10 h-10 rounded-md"
                  />
                  <span>Seblak</span>
                </td>
                <td className="p-4 text-sm text-gray-600">2024-11-05</td>
                <td className="p-4 text-sm text-gray-600">09:37</td>
                <td className="p-4 text-sm text-[#205FFF]">Rp. 10.000</td>
                <td className="p-4 text-sm text-center">
                  <button
                    className="text-[#FF0000] hover:text-gray-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Mobile Table */}
          <div className="grid gap-4 md:hidden bg-white p-4">
            <div className="bg-gray-50 border rounded-md shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="/logn&regist.png"
                    alt="Seblak"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-800">Seblak</p>
                    <p className="text-sm text-gray-600">2024-11-05 | 09:37</p>
                    <p className="text-sm font-medium text-[#205FFF]">Rp. 10.000</p>
                  </div>
                </div>
                <button
                  className="bg-[#FF0000] text-white p-2 rounded-md hover:bg-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;