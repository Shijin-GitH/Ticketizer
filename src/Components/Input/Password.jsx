import React, { useState } from "react";
import { MdOutlinePassword, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

function Password({ password, setPassword, text="Password" }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col gap-3 text-white text-xl">
      <div className="flex gap-3 items-center">
        <MdOutlinePassword />
        <p>
          {text} <span className="text-red-500">*</span>
        </p>
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="bg-white rounded-lg h-12 outline-0 text-black px-5 w-full"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <MdOutlineVisibility className="text-black" />
          ) : (
            <MdOutlineVisibilityOff className="text-black" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Password;
