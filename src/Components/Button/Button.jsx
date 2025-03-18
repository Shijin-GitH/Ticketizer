import React from "react";

function Button({ handleLogin, text, iconleft, iconright, width }) {
  return (
    <button
      className={`bg-white text-black flex group justify-between items-center px-5 rounded-lg h-[5vh] cursor-pointer text-[1.1vw] font-bold hover:bg-black hover:text-white border border-white hover:border-white transition ease-in-out duration-300`}
      onClick={handleLogin}
      style={{ width: width }}
    >
      {iconleft && iconleft}
      {text}
      {iconright}
    </button>
  );
}

export default Button;
