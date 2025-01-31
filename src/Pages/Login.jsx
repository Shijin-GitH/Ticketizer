import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { TbLockQuestion } from "react-icons/tb";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import Logo from "../assets/Logo.svg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleStayLoggedIn = () => {
    setStayLoggedIn(!stayLoggedIn);
  };

  return (
    <div className="absolute select-none flex justify-center items-center inset-0 h-screen w-screen bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="h-fit py-10 w-[30%] z-50 backdrop-blur-3xl bg-[#00011] flex justify-center items-center rounded-4xl drop-shadow-lg">
        <div className="h-fit w-[90%] rounded-4xl flex flex-col gap-8">
          <div className="header flex justify-between items-center">
            <div className="flex gap-3 items-center cursor-pointer text-white hover:text-gray-400 transition ease-in-out duration-300">
              <CiLogout className="text-xl" />
              <p className="text-">Go Back</p>
            </div>
            <img src={Logo} alt="Logo" className="w-36" />
          </div>
          <div className="flex justify-between items-center text-white text-xl">
            <p>Welcome Back!</p>
            <div className="flex gap-3 items-center cursor-pointer text-white hover:text-gray-400 transition ease-in-out duration-300">
              <MdOutlinePersonAddAlt />
              <p className="text-xl">Create an account</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-white text-5xl font-bold">Login</h1>
            <p className="text-white text-xl">
              Enter your credentials to login
            </p>
          </div>
          <div className="flex flex-col gap-3 text-white text-xl">
            <div className="flex gap-3 items-center">
              <MdAlternateEmail />
              <p>
                Email Address <span className="text-red-500">*</span>
              </p>
            </div>
            <input
              type="email"
              className="bg-white rounded-lg h-12 outline-0 text-black px-5"
              placeholder="abc@xyz.com"
            />
          </div>
          <div className="flex flex-col gap-3 text-white text-xl">
            <div className="flex gap-3 items-center">
              <MdOutlinePassword />
              <p>
                Password <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-white rounded-lg h-12 outline-0 text-black px-5 w-full"
                placeholder="********"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <MdOutlineVisibilityOff className="text-black" />
                ) : (
                  <MdOutlineVisibility className="text-black" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-white text-xl">
            <div className="flex gap-3 items-center cursor-pointer text-white hover:text-gray-400 transition ease-in-out duration-300">
              <TbLockQuestion />
              <p className="text-xl">Forgot Password?</p>
            </div>
            <div className="flex gap-3 items-center cursor-pointer" onClick={toggleStayLoggedIn}>
              {stayLoggedIn ? (
                <MdOutlineCheckBox className="text-white" />
              ) : (
                <MdOutlineCheckBoxOutlineBlank className="text-white" />
              )}
              <p className="text-xl">Stay Logged in?</p>
            </div>
          </div>
          <div className="h-16 w-full flex my-5 justify-center">
            <button className="bg-white text-black flex group justify-between items-center px-5 rounded-lg h-12 w-60 cursor-pointer text-xl font-bold hover:bg-black hover:text-white border border-white hover:border-white transition ease-in-out duration-300">
                <BsFillPersonCheckFill className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out -translate-x-5 text-xl" />
              Login
                <IoChevronForward className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out translate-x-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
