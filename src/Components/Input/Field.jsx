import React from "react";

function Field({ state, setState, text, required = false, icon, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-3 text-white text-xl">
      <div className="flex gap-3 items-center">
        {icon}
        <p>
          {text} {required && <span className="text-red-500">*</span>}
        </p>
      </div>
      <input
        type={type}
        className="bg-white rounded-lg h-12 outline-0 text-black px-5"
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}

export default Field;
