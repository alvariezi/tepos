"use client";

import { useState } from "react";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  return (
    <div className="bg-white text-gray-800">
      {/* Navbar Section */}
      <nav
        className={`fixed w-full top-0 transition-all duration-300 z-50 ${
          isScrolled ? "bg-[#205fffe0] shadow-lg" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center py-[15px] lg:py-[20px]">
          {/* Logo */}
          <h1
            className={`text-[16px] lg:text-[30px] md:text-[18px] font-[800] ${
              isScrolled ? "text-white" : "text-[#205FFF]"
            }`}
          >
            tePOS
          </h1>

          {/* Hamburger Menu */}
          <div className="block md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-[5px] rounded-md transition-all duration-300 ${
                isScrolled
                  ? "bg-white text-[#205FFF]"
                  : "bg-[#205FFF] text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Buttons Desktop */}
          <div className="hidden md:flex space-x-4">
            <Link href="/login-page">
              <button
                className={`px-6 py-2 rounded-[20px] border font-[600] transition duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? "bg-white text-[#205FFF] border-white hover:bg-[#f5f5f5]"
                    : "bg-white text-[#205FFF] border-[#205FFF] hover:bg-[#f5f5f5]"
                }`}
              >
                Login
              </button>
            </Link>
            <Link href="/register-page">
              <button
                className={`px-6 py-2 rounded-[20px] border font-[600] transition duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? "bg-[#205FFF] text-white border-white hover:bg-[#f5f5f5]"
                    : "bg-[#205FFF] text-white hover:bg-[#205fffc7]"
                }`}
              >
                Registration
              </button>
            </Link>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`fixed top-0 right-0 h-screen max-w-[280px] bg-[#205FFF] text-white transition-transform duration-500 z-50 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-[20px] flex flex-col space-y-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-white text-[20px] mr-[15px]"
            >
              ✕
            </button>
            <Link href="/login-page">
              <button className="text-[16px] w-full py-[10px] px-[20px] bg-white text-[#205FFF] rounded-[10px] border font-[600] transition duration-300 transform hover:scale-105 hover:bg-[#f5f5f5]">
                Login
              </button>
            </Link>
            <Link href="/register-page">
              <button className="text-[16px] w-full py-[10px] px-[20px] bg-[#205FFF] text-white rounded-[10px] border font-[600] transition duration-300 transform hover:scale-105 hover:bg-[#205fffc7]">
                Registration
              </button>
            </Link>
          </div>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-80"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-[#205FFF] pt-[100px] lg:mt-[100px] py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <img
            src="/hero.png"
            alt="Team"
            className="w-full md:w-[50%] lg:w-[58%] mb-6 md:mb-0"
          />
          <div className="text-left md:w-[40%]">
            <h2 className="text-[28px] md:text-[22px] lg:text-[48px] text-white font-[800] mb-4">
              Best Friends for a Great Business
            </h2>
            <p className="text-[14px] md:text-[12px] lg:text-[18px] font-[400] text-white mb-4">
              Point Of Sale with full and accurate feature presentation. Come
              feel the ease of using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Cashier Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="text-left md:w-[50%]">
            <h2 className="text-[20px] mt-[25px] md:mt-0 lg:text-[36px] md:text-[22px] text-[#1E1E1E] font-extrabold mb-6">
              Cashier application for{" "}
              <span className="text-[#205FFF]">all types of businesses</span>
            </h2>
            <ul className="list-disc list-inside text-[14px] md:text-[12px] lg:text-[20px] text-[#1E1E1E] font-medium space-y-3">
              <li>Easy and fast registration process</li>
              <li>Dynamic and easy-to-use display</li>
              <li>Multiple payment method options to make transactions easy</li>
              <li>Top features to maximize any kind of business</li>
              <li>Monitor online and offline sales anytime, anywhere</li>
            </ul>
          </div>
          <img
            src="/cashier.png"
            alt="Cashier System"
            className="w-full md:w-[45%] lg:w-[40%] mt-6 md:mt-0"
          />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-[24px] lg:text-[36px] md:text-[22px] text-[#1E1E1E] font-extrabold mb-4">
            Why Choose <span className="text-[#205FFF]">tePOS?</span>
          </h2>
          <p className="text-[14px] lg:text-[18px] md:text-[14px] text-[#5F5F5F] font-[500] mb-10">
            Find out why tePOS Cashier is suitable for your business, here!
          </p>
          <div className="flex justify-center">
            <img
              src="/vid.png"
              alt="Video Preview"
              className="w-full md:w-2/3"
            />
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-white py-12">
        <h2 className="text-[20px] lg:text-[36px] md:text-[22px] text-[#1E1E1E] font-extrabold text-center mb-6">
          Now It's <span className="text-[#205FFF]">Your Turn to Decide!</span>
        </h2>
        <div className="flex justify-center mb-10">
          <Link href="/register-page">
            <button className="bg-[#FF9B20] text-white text-[14px] lg:text-[18px] md:text-[16px] font-[600] px-[22px] py-[12px] lg:px-[24px] lg:py-[12px] rounded-full transition duration-300 transform hover:scale-105 hover:bg-[#FF8C00]">
              Register Now!
            </button>
          </Link>
        </div>
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
          <img
            src="/help.png"
            alt="Help"
            className="w-full lg:w-[40%] md:w-[42%] mt-[24px] mb-[30px] md:mb-0 md:mt-0"
          />
          <div className="text-left lg:ml-[300px] md:ml-[24px]">
            <h2 className="text-[28px] lg:text-[36px] md:text-[22px] text-[#1E1E1E] font-[800] mb-6">
              How Can <span className="text-[#205FFF]">We Help?</span>
            </h2>
            <p className="text-[15px] lg:text-[18px] lg:w-[450px] md:text-[14px] md:w-[350px] text-[#1E1E1E] font-[400] mb-6">
              Have questions or want to know more about Pawoon’s complete point
              of sale features? Don’t hesitate to contact us!
            </p>
            <div className="flex flex-col md:flex-row mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-[#205FFF] p-3 rounded-lg">
                  <PhoneIcon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <span className="text-[15px] lg:text-[20px] text-[#1E1E1E] ml-3">
                  1500 360
                </span>
              </div>
              <div className="flex items-center md:ml-12">
                <div className="bg-[#205FFF] p-3 rounded-lg">
                  <EnvelopeIcon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <span className="text-[15px] lg:text-[20px] text-[#1E1E1E] ml-3">
                  tePOS@gmail.com
                </span>
              </div>
            </div>
            <p className="text-[15px] w-[300px] lg:w-[400px] lg:text-[18px] md:text-[14px] md:w-[350px] text-[#1E1E1E] font-[400]">
              Want to see firsthand how the Flowpos cashier application can help
              you develop your business?
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
