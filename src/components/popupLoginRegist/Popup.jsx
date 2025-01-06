"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Popup = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <div className="flex justify-center">
          {type === "success" ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="text-green-500"
            >
              <CheckCircleIcon className="w-16 h-16" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="text-red-500"
            >
              <XCircleIcon className="w-16 h-16" />
            </motion.div>
          )}
        </div>
        <h2
          className={`text-center text-lg font-bold mt-4 ${
            type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {type === "success" ? "Berhasil" : "Gagal"}
        </h2>
        <p className="text-center mt-2 text-gray-600">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;
