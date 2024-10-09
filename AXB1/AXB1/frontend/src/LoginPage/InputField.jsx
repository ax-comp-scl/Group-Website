import React, { useState } from "react";

function InputField({error, setField, label, type, id, placeholder, showPasswordToggle }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  if (error) {
    return (
      <div className="flex flex-col mb-6 w-full relative">
        <label htmlFor={id} className="text-lg font-medium mb-1 text-left">
          {label}
        </label>
        <input
          type={showPasswordToggle && isPasswordVisible ? "text" : type}
          id={id}
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded-md text-lg mt-2 bg-[#FFE3E3] border-[#FF0000] border-opacity-50 text-[#000000] placeholder-[#000000]"
          onChange={(e) => setField(e.target.value)} // Atualiza o estado do e-mail
        />
        {showPasswordToggle && type === "password" && (
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "69%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-6 w-full relative">
      <label htmlFor={id} className="text-lg font-medium mb-1 text-left">
        {label}
      </label>
      <input
        type={showPasswordToggle && isPasswordVisible ? "text" : type}
        id={id}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md text-lg mt-2 bg-[#F7FFFD]"
        onChange={(e) => setField(e.target.value)} // Atualiza o estado do e-mail
      />
      {showPasswordToggle && type === "password" && (
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "10px",
            top: "69%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
        </span>
      )}
    </div>
  );
}

export default InputField;
