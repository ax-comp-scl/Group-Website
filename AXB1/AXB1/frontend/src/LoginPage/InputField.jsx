import React, { useState } from 'react';

function InputField({ label, type, id, placeholder, showPasswordToggle }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col mb-6 w-full relative">
      <label htmlFor={id} className="text-lg font-medium mb-1">
        {label}
      </label>
      <input
        type={showPasswordToggle && isPasswordVisible ? 'text' : type}
        id={id}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md text-lg mt-2"  
      />
      {showPasswordToggle && type === "password" && (
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            right: '10px',
            top: '69%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '20px'
          }}
        >
          {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
        </span>
      )}
    </div>
  );
}

export default InputField;
