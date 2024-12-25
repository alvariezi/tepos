"use client";

import { useState } from "react";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleInputChange = (value, index) => {
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Img Section */}
      <div className="md:w-[50%] bg-blue-500 lg:flex md:flex justify-center items-center p-4 hidden">
        <img
          src="/logn&regist.png"
          alt="Login"
          className="w-full max-w-[420px] h-auto"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center p-6 lg:p-0">
        <h1 className="text-[40px] md:text-[60px] text-[#205FFF] font-[600] font-russo text-center lg:mb-[50px] md:mb-[50px] mb-[30px]">
          Posify
        </h1>
        <div className="text-center md:text-left md:w-[320px] lg:w-auto md:ml-[10px] lg:text-left lg:ml-[130px] lg:mb-[100px] md:mb-[70px] mb-[50px]">
          <p className="text-[#747474] lg:text-[22px] md:text-[20px] text-[18px] lg:mb-[7px] md:mb-[10px] font-[500]">
            Verification
          </p>
          <p className="text-[#BFBFBF] lg:text-[16px] md:text-[18px] text-[14px] font-[500]">
            We have sent a verification code to your email address
          </p>
        </div>

        <div className="mx-auto w-full max-w-[350px] lg:max-w-[400px] md:max-w-[400px] md:ml-[0px] lg:ml-[130px]">
          {/* OTP Input */}
          <div className="flex justify-between lg:mb-[50px] gap-4 lg:gap-[35px]">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-16 h-16 lg:w-[70px] lg:h-[70px] md:w-[50px] md:h-[50px] text-center text-[24px] text-[#205FFF] font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-[#205FFF] border-2 transition-all duration-200 ${
                  value ? "border-[#205FFF]" : "border-[#ACACAC]"
                }`}
              />
            ))}
          </div>
          {/* Button */}
          <button
            type="button"
            className="w-full lg:mt-[50px] mt-[100px] bg-[#205FFF] text-white font-[600] text-[15px] lg:text-[18px] py-[12px] rounded-[10px] hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
