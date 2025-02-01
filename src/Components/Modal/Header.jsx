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
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="header flex justify-between items-center">
        <div
          className="flex gap-3 items-center cursor-pointer text-white hover:text-gray-400 transition ease-in-out duration-300"
          onClick={() => window.history.back()}
        >
          <CiLogout className="text-xl" />
          <p className="">Go Back</p>
        </div>
        <img src={Logo} alt="Logo" className="w-36" />
      </div>
      <div className="flex justify-between items-center text-white text-xl">
        <p>{text}</p>
        <Link text={link_text} icon={icon} />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-white text-5xl font-bold">{title}</h1>
        <p className="text-white text-xl">{subtitle}</p>
      </div>
    </div>
  );
}

export default Header;
