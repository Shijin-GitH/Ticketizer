import React from "react";
import Logo from "../assets/Logo.svg";
import { LuLogIn } from "react-icons/lu";

function Navbar() {
  const navlinks = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "About",
      link: "#about",
    },
    {
      text: "Events",
      link: "#events",
    },
    {
      text: "Contact",
      link: "/contact",
    },
  ];
  return (
    <nav className="w-screen bg-black fixed h-26 px-3 justify-around drop-shadow-xl text-white flex items-center">
      <img src={Logo} alt="Ticketizer Logo" className="w-40" />
      <div className="flex w-fit gap-16">
        {navlinks.map((link, index) => (
          <a key={index} href={link.link} className="text-2xl font-semibold">
            {link.text}
          </a>
        ))}
      </div>
      <button
      className={`bg-[#90FF00] w-40 text-black flex group justify-between items-center px-5 rounded-lg h-12 cursor-pointer text-xl font-bold hover:bg-black hover:text-white border-2 border-transparent hover:border-[#90FF00] transition ease-in-out duration-300`}
      onClick={() => window.location.href = "/login"}
    >
      <span className="translate-x-[50%] group-hover:translate-x-0 transition duration-300 ease-in-out text-black group-hover:text-white">Login</span>
      <LuLogIn className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out translate-x-5" />
    </button>
    </nav>
  );
}

export default Navbar;
