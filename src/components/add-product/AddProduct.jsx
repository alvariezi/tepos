"use client";

import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const AddProduct = () => {
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
          <h2 className="text-[15px] font-[500] text-[#1E1E1E]">Add Product</h2>
        </div>

        {/* Product Form */}
        <div className="bg-white rounded-md shadow-md p-[16px]">
          <form>
            {/* Name Product */}
            <div className="flex items-center mb-[16px]">
              <label
                htmlFor="nameProduct"
                className="w-1/4 text-[#5F5F5F] font-[600] text-[14px]"
              >
                Name Product
              </label>
              <input
                type="text"
                id="nameProduct"
                placeholder=""
                className="w-3/4 p-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>

            {/* Selling Price */}
            <div className="flex items-center mb-[16px]">
              <label
                htmlFor="sellingPrice"
                className="w-1/4 text-[#5F5F5F] font-[600] text-[14px]"
              >
                Selling Price
              </label>
              <input
                type="text"
                id="sellingPrice"
                placeholder=""
                className="w-3/4 p-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-[14px]"
              />
            </div>

            {/* Description Product */}
            <div className="flex items-start mb-4">
              <label
                htmlFor="DescriptionProduct"
                className="w-1/4 text-[#5F5F5F] font-[600] text-[14px]"
              >
                Description Product
              </label>
              <textarea
                id="DescriptionProduct"
                rows="4"
                placeholder=""
                className="w-3/4 p-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-[14px]"
              ></textarea>
            </div>

            {/* Category */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="Category"
                className="w-1/4 text-[#5F5F5F] font-[600] text-[14px]"
              >
                Category
              </label>
              <select
                id="Category"
                className="w-3/4 p-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-[14px]"
              >
                <option>Pilih Kategori</option>
                <option>Kategori 1</option>
                <option>Kategori 2</option>
              </select>
            </div>

            {/* Upload Image */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="imageUpload"
                className="w-1/4 text-[#5F5F5F] font-[600] text-[14px]"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="w-3/4 p-[8px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-[14px]"
              />
            </div>

            {/* Button Save dan Delete */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-[#205FFF] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
