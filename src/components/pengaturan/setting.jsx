"use client";

import { useState } from "react";
import Sidebar from '../sidebar/sidebar';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [storeName, setStoreName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 ml-[300px] p-[24px]"> 
        {/* Header */}
        <div className="flex bg-white py-[15px] p-[16px] rounded-md shadow-sm justify-between items-center mb-[10px]">
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
          <div className="text-right">
            <p className="text-[#1E1E1E] text-[18px] font-[600]">UserShop</p>
            <p className="text-[#6E6E6E] text-[14px] font-[500]">Username</p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="flex items-center">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 w-1/3 mr-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-2/3 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 w-1/3 mr-2">
              Store Name
            </label>
            <input
              type="text"
              id="storeName"
              onChange={(e) => setStoreName(e.target.value)}
              required
              className="block w-2/3 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 w-1/3 mr-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-2/3 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py -2 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;