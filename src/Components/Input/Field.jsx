import React from "react";

function Field({ state, setState, text, required = false, icon, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-3 text-white text-[1.1vw]">
      <div className="flex gap-3 items-center">
        {icon}
        <p>
          {text} {required && <span className="text-red-500">*</span>}
        </p>
      </div>
      <input
        type={type}
        className="bg-white rounded-[1vh] h-[5vh] outline-0 text-black px-5"
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}

export default Field;
