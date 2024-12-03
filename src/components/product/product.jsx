"use client";

import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import { Bars3Icon, XMarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'; // Mengganti TrashIcon dengan EllipsisHorizontalIcon
import Link from "next/link";

const Product = () => {
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
          <h1 className="text-xl font-semibold text-gray-800">
            Product
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
            <div className="bg-white p-[8px] rounded-md shadow-sm">
              <select className="border border-[#D0D0D0] rounded-md px-[16px] py-[8px] focus:outline-none focus:ring-2 focus:ring-[#205FFF]">
                <option>All Category</option>
                <option>Snack</option>
                <option>Main Course</option>
              </select>
            </div>
            <Link
              href="/add-product-page"
              className="bg-[#205FFF] text-white px-[16px] py-[8px] rounded-md text-[14px] font-[500px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Product
            </Link>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-md shadow-md overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-[#EEF0F1] border-b">
                <th className="p-[16px] text-left text-[14px]">Product</th>
                <th className="p-[16px] text-left text-[14px]">Category</th>
                <th className="p-[16px] text-left text-[14px]">Price</th>
                <th className="p-[16px] text-left text-[14px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 text-sm flex items-center space-x-3 border-b space-y-2">
                  <img
                    src="/logn&regist.png"
                    alt="product"
                    className="w-10 h-10 rounded-md"
                  />
                  <span className="text-gray-800 word-break">
                    Seblak
                  </span>
                </td>
                <td className="p-[16px] text-[14px] border-b space-y-2">Snack</td>
                <td className="p-[16px] text-[14px] text-[#205FFF] border-b space-y-2">Rp. 10.000</td>
                <td className="p-[16px] text-[14px] space-y-2">
                  <Link 
                  href="/edit-product-page"
                  className="text-[#747474] hover:text-gray-700">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;