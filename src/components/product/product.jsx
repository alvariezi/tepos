"use client";

import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import {
  Bars3Icon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
        <div className="fixed top-0 left-0 w-full bg-[#205FFF] text-white py-3 px-4 flex justify-between items-center z-50">
          <button
            className="text-white flex items-center"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <p className="font-semibold text-lg">Posify</p>
        </div>
      )}

      <div
        className={`flex-1 ${isMobile ? "ml-0 mt-10" : "md:ml-[250px]"} p-6`}
      >
        {/* Header */}
        <div className="flex bg-white py-4 px-5 rounded-md shadow-sm justify-between items-center mb-5">
          <h1 className="text-lg font-semibold text-gray-800">Product</h1>
          <div className="text-right">
            <p className="text-gray-900 text-sm font-semibold">ShopName</p>
            <p className="text-gray-600 text-sm font-medium">Username</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between bg-white py-3 px-5 rounded-md shadow-sm mb-5">
          <div className="flex items-center space-x-3">
            <div>
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#205FFF] lg:w-[880px] md:w-[280px] w-[140px] truncate">
                <option>All Category</option>
                <option>Snack</option>
                <option>Main Course</option>
                <option>
                  Very Long Category Name That Should Be Truncated
                </option>
              </select>
            </div>
            <Link
              href="/addProduct"
              className="bg-[#205FFF] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Product
            </Link>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-md shadow-md overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-left text-sm font-semibold">Product</th>
                <th className="p-4 text-left text-sm font-semibold hidden md:table-cell">
                  Category
                </th>
                <th className="p-4 text-left text-sm font-semibold">Price</th>
                <th className="p-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 text-sm flex items-center space-x-3">
                  <img
                    src="/logn&regist.png"
                    alt="Seblak product"
                    className="w-10 h-10 rounded-md"
                  />
                  <span className="text-gray-800">Seblak</span>
                </td>
                <td className="p-4 text-sm hidden md:table-cell">Snack</td>
                <td className="p-4 text-sm text-blue-600">Rp. 10.000</td>
                <td className="p-4 text-sm">
                  <Link href="#" className="text-gray-500 hover:text-gray-700">
                    <PencilSquareIcon className="h-5 w-5" />
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
