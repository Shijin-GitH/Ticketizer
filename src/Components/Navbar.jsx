import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { BiBell, BiPlus, BiPlusCircle, BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userslice";
import UserDropdown from "./UserMenu";

function Navbar() {
  const containerRef = useRef(null);
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navlinks = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "About",
      link: "/#about",
    },
    {
      text: "Discover Events",
      link: "/events",
    },
    {
      text: "Contact",
      link: "/contact",
    },
  ];

  const handleButtonClick = () => {
    if (token) {
      window.location.href = "/create-event";
    } else {
      window.location.href = "/login";
    }
  };
  
  return (
    <nav className="w-screen bg-black fixed h-26 z-50 px-3 justify-around drop-shadow-xl text-white flex items-center">
      <img src={Logo} alt="Ticketizer Logo" className="w-40" />
      <div className="flex w-fit gap-16">
        {navlinks.map((link, index) => (
          <Link key={index} to={link.link} className="text-2xl font-semibold">
            {link.text}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 relative">
        <button
          className={`bg-[#90FF00] w-fit gap-5 text-black flex group justify-between items-center px-5 rounded-lg h-12 cursor-pointer text-xl font-bold hover:bg-black hover:text-white border-2 border-transparent hover:border-[#90FF00] transition ease-in-out duration-300`}
          onClick={handleButtonClick}
        >
          <span className="transition duration-300 ease-in-out text-black group-hover:text-white">
            {token ? "Create Event" : "Login"}
          </span>
          {token ? (
            <BiPlusCircle className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out translate-x-5" />
          ) : (
            <LuLogIn className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out translate-x-5" />
          )}
        </button>
        <UserDropdown />
      </div>
    </nav>
  );
}

export default Navbar;
