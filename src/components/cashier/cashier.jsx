"use client";

import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import { ArrowPathIcon, Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Cashier = () => {
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
          <h1 className="text-[20px] font-semibold text-gray-800">Cashier</h1>
          <div className="text-right">
            <p className="text-[#1E1E1E] text-[14px] font-[600]">ShopName</p>
            <p className="text-[#6E6E6E] text-[14px] font-[500]">Username</p>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-white p-[10px] md:p-[15px] rounded-md shadow-sm mb-[20px] flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0 ml-[7px]">
            <h2 className="text-[16px] font-[500] text-[#1E1E1E]">List Menu</h2>
          </div>
          <div className="flex items-center space-x-4">

            {/* Filter Category */}
            <div className="bg-white p-[8px] rounded-md shadow-sm">
              <select className="border border-[#D0D0D0] text-[12px] md:text-[16px] rounded-md px-[12px] lg:px-[16px] py-[8px] text-[#1E1E1E] font-[500] focus:outline-none focus:ring-2 focus:ring-[#205FFF] lg:w-[400px]">
                <option className="py-2">All Category</option>
                <option className="py-2">Drinks</option>
                <option className="py-2">Food</option>
              </select>
            </div>
            
            {/* Refresh Icon */}
            <button className="bg-gray-100 p-2 rounded-md hover:bg-gray-200">
              <ArrowPathIcon className="h-5 w-5 text-[#1E1E1E]" />
            </button>

            {/* Cart */}
            <Link href="/cart-page">
              <button className="bg-[#205FFF] text-white px-[16px] py-[8px] rounded-md text-[12px] md:text-[14px] font-[500] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center space-x-2">
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Cart</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Product List */}
        <div
          className="bg-white rounded-md shadow-md p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
        >
          <div className="bg-white border rounded-md shadow-sm p-4 flex flex-col relative h-[100px]">
            <div className="flex items-center flex-grow">
              <img
                src="/logn&regist.png"
                alt="Americano"
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex flex-col"> 
                <p className="text-lg font-semibold mb-1">Americano</p>
                <p className="text-sm font-medium mb-2">Rp 50,000</p>
              </div>
            </div>
            <button className="bg-[#205FFF] text-white px-3 py-1 rounded-md hover:bg-[#154FCC] absolute bottom-2 right-2">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashier;