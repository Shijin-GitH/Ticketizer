import React from "react";

function Button({handleLogin, text, iconleft, iconright, width}) {
  return (
    <div className="h-16 w-full flex my-5 justify-center">
      <button
        className={`bg-white text-black flex group justify-between items-center px-5 rounded-lg h-12 w-[${width}] cursor-pointer text-xl font-bold hover:bg-black hover:text-white border border-white hover:border-white transition ease-in-out duration-300`}
        onClick={handleLogin}
      >
        {iconleft}
        {text}
        {iconright}
      </button>
    </div>
  );
}

export default Button;
