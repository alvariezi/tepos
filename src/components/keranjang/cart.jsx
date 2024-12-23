"use client";

import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import { TrashIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Cart = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#EEF0F1]">
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
          <p className="font-[600] text-[18px]">Posify</p>
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
          <h2 className="text-[15px] font-[500] text-[#1E1E1E]">Cart</h2>
        </div>

        {/* Cart List */}
        <div
          className="bg-white rounded-md shadow-md p-4 grid grid-cols-1 gap-4 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <div className="bg-white border rounded-md shadow-sm p-4 flex flex-col relative">
            <div className="flex items-center">
              <img
                src="/logn&regist.png"
                alt="Americano"
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex flex-col">
                <p className="text-lg font-semibold mb-1">Americano</p>
                <p className="text-sm font-medium">Rp 50,000</p>
              </div>
            </div>

            {/* Delete Button */}
            <button className="bg-[#FF0000] text-white p-1 rounded-md hover:bg-red-600 absolute right-2 bottom-[8px] lg:bottom-[90px] md:mr-[10px]">
              <TrashIcon className="h-[18px] w-[18px] md:h-[25px] md:w-[25px]" />
            </button>

            {/* Qty Controller */}
            <div className="flex items-center md:ml-[80px] mt-2 space-x-2">
              <button
                className="bg-[#205FFF] text-white md:text-[25px] font-[600] px-2 py-1 md:px-3 md:py-2 rounded-md hover:bg-gray-300 hover:text-black text-sm"
                onClick={handleDecrement}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleChange}
                className="text-center w-[50px] md:w-[60px] border rounded-md text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#205FFF]"
              />
              <button
                className="bg-[#205FFF] text-white md:text-[25px] font-[600] px-2 py-1 md:px-3 md:py-2 rounded-md hover:bg-gray-300 hover:text-black text-sm"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="fixed md:ml-[250px] bottom-0 left-0 w-full bg-white py-[16px] px-[20px] rounded-t-md shadow-md flex justify-between items-center z-50">
          <div className="flex items-center space-x-1 md:space-x-2">
            <p className="text-[14px] md:text-[20px] font-[600]">
              Total Payment :
            </p>
            <p className="text-[14px] text-[#205FFF] md:text-[20px] font-[600]">
              {" "}
              Rp. 10.000
            </p>
          </div>
          <Link href="/payment">
            <button className="bg-[#205FFF] text-white lg:mr-[250px] md:mr-[250px] px-4 lg:px-[200px] md:px-[50px] py-2 rounded-md hover:bg-blue-500">
              Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
