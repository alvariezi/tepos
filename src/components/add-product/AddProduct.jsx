"use client";

import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Popup from "../popupLoginRegist/Popup";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [token, setToken] = useState("");
  const [idAdmin, setIdAdmin] = useState("");
  const [username, setUsername] = useState("");

  const [popup, setPopup] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const tokenFromCookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (tokenFromCookies) {
      const tokenValue = tokenFromCookies.split("=")[1];
      setToken(tokenValue);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setIdAdmin(decoded.idAdmin);
      setUsername(decoded.username);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tokenFromCookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (tokenFromCookies) {
      const tokenValue = tokenFromCookies.split("=")[1];
      const data = {
        name: name,
        category: category,
        price: price,
        description: description,
        image: image,
      };

      try {
        const response = await fetch("/api/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          setPopup({
            isOpen: true,
            type: "success",
            message: "Produk berhasil ditambahkan.",
          });
          setTimeout(() => {
            router.push("/product");
          }, 2000);
        } else {
          setPopup({
            isOpen: true,
            type: "error",
            message: result.message || "Gagal menambahkan produk.",
          });
        }
      } catch (error) {
        setPopup({
          isOpen: true,
          type: "error",
          message: "Terjadi kesalahan saat menambahkan produk.",
        });
      }
    } else {
      setPopup({
        isOpen: true,
        type: "error",
        message: "Token tidak ditemukan.",
      });
    }
  };

  return (
    <div className="flex h-screen bg-[#EEF0F1]">
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
        className={`flex-1 ${
          isMobile ? "ml-0 mt-10" : "md:ml-[250px]"
        } p-6`}
      >
        {/* Header */}
        <div className="flex bg-white py-[16px] px-[20px] rounded-md shadow-sm justify-between items-center mb-[20px]">
          <h1 className="text-[20px] font-semibold text-gray-800">Produk</h1>
          <div className="text-right">
          <p className="text-[#1E1E1E] text-[14px] lg:text-[17px] font-[600]">{username}</p>
          <p className="text-[#6E6E6E] text-[14px] font-[500]">Shop</p>
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
          <h2 className="text-[15px] font-[500] text-[#1E1E1E]">Tambah Produk</h2>
        </div>

        {/* Product Form */}
        <div className="bg-white rounded-md shadow-md p-4">
          <form onSubmit={handleSubmit}>
            {/* Name Product */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="name"
                className="w-1/4 text-gray-700 font-semibold"
              >
                Nama Produk :
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-3/4 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Category */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="category"
                className="w-1/4 text-gray-700 font-semibold"
              >
                Kategori :
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-3/4 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Selling Price */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="price"
                className="w-1/4 text-gray-700 font-semibold"
              >
                Harga Jual :
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-3/4 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Description Product */}
            <div className="flex items-start mb-4">
              <label
                htmlFor="description"
                className="w-1/4 text-gray-700 font-semibold"
              >
                Deskripsi Produk :
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-3/4 p-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>

            {/* Image URL */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="imageUrl"
                className="w-1/4 text-gray-700 font-semibold"
              >
                Gambar :
              </label>
              <input
                type="text"
                id="imageUrl"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-3/4 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Render Popup */}
      <Popup
        isOpen={popup.isOpen}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup({ ...popup, isOpen: false })}
      />
    </div>
  );
};

export default AddProduct;