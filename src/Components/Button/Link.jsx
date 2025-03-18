import React from "react";

function Link({ text = "Create an account", icon, onClick }) {
  return (
    <div onClick={onClick} className="flex gap-3 items-center cursor-pointer text-white hover:text-gray-400 transition ease-in-out duration-300">
      {icon}
      <p className="text-[1.1vw]">{text}</p>
    </div>
  );
}

export default Link;
