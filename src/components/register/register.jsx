"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation"; 

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigateToLogin = () => {
    router.push("/login-page");  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setTimeout(() => {
          navigateToLogin();
        }, 2000);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Img Section */}
      <div className="md:w-[50%] bg-blue-500 lg:flex md:flex justify-center items-center p-4 hidden">
        <img
          src="/logn&regist.png"
          alt="Register"
          className="w-full max-w-[420px] h-auto"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center p-4">
        <h1 className="text-[40px] md:text-[60px] leading-[72.3px] text-[#205FFF] font-[600] font-russo text-center mb-[20px]">
          tePOS
        </h1>
        <p className="mb-[10px] text-[16px] md:text-[18px] font-bold text-center">
          Create your account
        </p>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        <form className="space-y-4 mx-auto max-w-[400px] w-full" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full mb-[20px] p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-[#090A0A]" />
              ) : (
                <EyeIcon className="h-5 w-5 text-[#090A0A]" />
              )}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full mb-[20px] p-[12px] border font-[400] text-[#000] border-[#ACACAC] rounded-[10px]"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-[#090A0A]" />
              ) : (
                <EyeIcon className="h-5 w-5 text-[#090A0A]" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#205FFF] text-white font-[600] text-[15px] p-[8px] rounded-[10px] hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            Register
          </button>
          <p className="mt-4 text-[14px] font-[600] text-[#000000]">
            Already have an account?
          </p>
          <button
            type="button"
            onClick={navigateToLogin} 
            className="w-full bg-[#000000] text-white font-[600] text-[15px] p-[8px] rounded-[10px] hover:bg-gray-700 transition-all duration-300 ease-in-out border-[2px]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;