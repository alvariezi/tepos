"use client";

const Popup = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2
          className={`text-center text-lg font-bold ${
            type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {type === "success" ? "Berhasil" : "Gagal"}
        </h2>
        <p className="text-center mt-2">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
