import React from "react";
import Link from "../Button/Link";
import { CiLogout } from "react-icons/ci";
import Logo from "../../assets/Logo.svg";

function Header({
  text = "Welcome Back!",
  icon,
  link_text = "Create an account",
  title,
  subtitle,
  onclick,
  action = true,
}) {
  return (
    <div className="flex flex-col gap-[1vw]">
      <div className="header flex justify-between items-center">
        <div
          className="flex gap-3 items-center cursor-pointer text-white hover:text-gray-400 transition ease-in-out duration-300"
          onClick={() => window.history.back()}
        >
          <CiLogout className="text-[1.5vw]" />
          <p className="text-[1vw]">Go Back</p>
        </div>
        <img src={Logo} alt="Logo" className="w-1/3" />
      </div>
      {action && (
        <div className="flex justify-between items-center text-white text-[1.1vw]">
          <p>{text}</p>
          <Link text={link_text} icon={icon} onClick={onclick} />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h1 className="text-white text-[2.5vw] font-bold">{title}</h1>
        <p className="text-white text-[1.1vw]">{subtitle}</p>
      </div>
    </div>
  );
}

export default Header;
