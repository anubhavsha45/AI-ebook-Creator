import React from "react";

const InputField = ({ label, type = "text", className = "", ...props }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <input
        type={type}
        className={`px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition ${className}`}
        {...props}
      />
    </div>
  );
};

export default InputField;
