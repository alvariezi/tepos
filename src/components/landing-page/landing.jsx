"use client";

import { useState, useEffect } from "react";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Move event listener to useEffect to prevent memory leaks
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white text-gray-800">
      {/* Navbar Section */}
      <nav
        className={`fixed w-full top-0 z-50 bg-white shadow-sm transition-all duration-300`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center py-4 lg:py-5">
          {/* Logo */}
          <Image
            src="/logo.svg"
            alt="Posify Logo"
            width={128}
            height={48}
            className="h-8 lg:h-12 w-auto"
          />

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden p-2 rounded-md text-[#205FFF] hover:bg-gray-100 transition-colors"
            aria-label="Menu"
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link href="/login" className="flex">
              <button className="px-6 py-2 rounded-full border border-[#205FFF] text-[#205FFF] font-semibold hover:bg-gray-50 transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/register" className="flex">
              <button className="px-6 py-2 rounded-full bg-[#205FFF] text-white font-semibold hover:bg-[#1a4cd4] transition duration-300">
                Registration
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-[280px] bg-[#205FFF] text-white transform transition-transform duration-300 ease-in-out z-50 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col space-y-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-white hover:text-gray-200 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link href="/login" className="w-full">
              <button className="w-full py-3 px-4 bg-white text-[#205FFF] rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/register" className="w-full">
              <button className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-lg font-semibold hover:bg-white/10 transition duration-300">
                Registration
              </button>
            </Link>
          </div>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-[#205FFF] pt-24 lg:pt-32 pb-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <Image
            src="/hero.png"
            alt="Team Collaboration"
            width={800}
            height={600}
            className="w-full md:w-1/2 lg:w-[58%] mb-6 md:mb-0"
            priority
          />
          <div className="md:w-[40%] text-white">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-4">
              Best Friends for a Great Business
            </h1>
            <p className="text-sm md:text-base lg:text-lg opacity-90">
              Point Of Sale with full and accurate feature presentation. Come
              feel the ease of using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Cashier Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold mb-6 text-gray-900">
              Cashier application for{" "}
              <span className="text-[#205FFF]">all types of businesses</span>
            </h2>
            <ul className="space-y-3 text-sm md:text-base lg:text-lg text-gray-800">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#205FFF] rounded-full mr-3"></span>
                Easy and fast registration process
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#205FFF] rounded-full mr-3"></span>
                Dynamic and easy-to-use display
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#205FFF] rounded-full mr-3"></span>
                Multiple payment method options
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#205FFF] rounded-full mr-3"></span>
                Top features to maximize business
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#205FFF] rounded-full mr-3"></span>
                Monitor sales anytime, anywhere
              </li>
            </ul>
          </div>
          <Image
            src="/cashier.png"
            alt="Cashier System Interface"
            width={600}
            height={400}
            className="w-full md:w-[45%] lg:w-[40%] mt-6 md:mt-0"
          />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-gray-900">
            Why Choose <span className="text-[#205FFF]">Posify</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Find out why Posify Cashier is suitable for your business, here!
          </p>
          <div className="flex justify-center">
            <Image
              src="/vid.png"
              alt="Video Preview"
              width={1000}
              height={562}
              className="w-full md:w-2/3 rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-8">
            Now It's{" "}
            <span className="text-[#205FFF]">Your Turn to Decide!</span>
          </h2>
          <div className="flex justify-center mb-12">
            <Link href="/register">
              <button className="px-8 py-3 bg-[#FF9B20] text-white font-semibold rounded-full hover:bg-[#FF8C00] transition duration-300 text-base md:text-lg">
                Register Now!
              </button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
            <Image
              src="/help.png"
              alt="Customer Support"
              width={600}
              height={400}
              className="w-full md:w-[45%]"
            />
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
                How Can <span className="text-[#205FFF]">We Help?</span>
              </h2>
              <p className="text-gray-700 text-base lg:text-lg mb-8">
                Have questions about our complete point of sale features? Don't
                hesitate to contact us!
              </p>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex items-center">
                  <div className="bg-[#205FFF] p-3 rounded-lg">
                    <PhoneIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3 text-gray-900 font-medium">
                    1500 360
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#205FFF] p-3 rounded-lg">
                    <EnvelopeIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3 text-gray-900 font-medium">
                    Posify@gmail.com
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-base lg:text-lg">
                Want to see firsthand how the Posify cashier application can
                help you develop your business?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
