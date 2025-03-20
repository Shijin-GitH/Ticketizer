import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { BiBell, BiPlus, BiPlusCircle, BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userslice";

function Navbar() {
  const containerRef = useRef(null);
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
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

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
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
        {token && (
          <div
            className="h-11 w-11 font-bold rounded-full cursor-pointer bg-[#90FF00] flex items-center justify-center text-black"
            onClick={() => setVisible(!visible)}
          >
            {user && user.name && user.name.split(' ').slice(0, 2).map((name) => name[0].toUpperCase())}
          </div>
        )}
        <div
          ref={containerRef}
          className={`absolute w-full h-fit bg-black top-15 border-2 rounded-md border-[#fff] hover:border-[#90FF00] transition duration-300 ease-in-out flex flex-col items-center p-5 gap-5 ${
            visible ? "visible" : "invisible"
          }`}
        >
          <div className="h-12 w-12 rounded-full bg-[#90FF00] flex items-center justify-center font-bold text-black">
          {user && user.name && user.name.split(' ').slice(0, 2).map((name) => name[0].toUpperCase())}
          </div>
          <div className="flex flex-col items-center">
            <p>{user && user.name}</p>
            <p>{user && user.email}</p>
          </div>
          <div
            className="bg-[#90FF00] w-full gap-5 text-black flex group justify-center items-center px-5 rounded-lg h-10 cursor-pointer text-lg font-bold hover:bg-black hover:text-white border-2 border-transparent hover:border-[#90FF00] transition ease-in-out duration-300"
            onClick={() => (window.location.href = "/my-events")}
          >
            My Events
          </div>
          <div className="flex flex-col gap-2 w-full items-start">
            <div className="flex w-full justify-start items-center gap-5 hover:text-[#90FF00] cursor-pointer transition duration-300 ease-in-out">
              <BiUser className="text-xl" />
              <p>Manage Profile</p>
            </div>
            <div className="flex w-full justify-start items-center gap-5 hover:text-[#90FF00] cursor-pointer transition duration-300 ease-in-out">
              <BiBell className="text-xl" />
              <p>Notifications</p>
            </div>
            <div
              className="flex w-full justify-start items-center gap-5 hover:text-[#90FF00] cursor-pointer transition duration-300 ease-in-out"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(clearUser());
                window.location.href = "/";
              }}
            >
              <LuLogOut className="text-xl" />
              <p className="text-lg">Logout</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
