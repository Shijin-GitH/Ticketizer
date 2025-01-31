import React, { useState } from "react";
import axios from "axios";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../assets/Logo.svg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleStayLoggedIn = () => {
    setStayLoggedIn(!stayLoggedIn);
  };

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    // if (!passwordRegex.test(password)) {
    //   toast.error("Password must be at least 8 characters long and contain both letters and numbers");
    //   return;
    // }

    axios
      .post("/login", {
        email: email.toLowerCase(),
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successful");
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 400:
              toast.error("Bad Request");
              break;
            case 401:
              toast.error("Unauthorized: Invalid credentials");
              break;
            case 403:
              toast.error("Forbidden");
              break;
            case 404:
              toast.error("Not Found");
              break;
            case 500:
              toast.error("Internal Server Error");
              break;
            default:
              toast.error("An error occurred");
          }
        } else {
          toast.error("Network Error");
        }
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <button
              className="bg-white text-black flex group justify-between items-center px-5 rounded-lg h-12 w-60 cursor-pointer text-xl font-bold hover:bg-black hover:text-white border border-white hover:border-white transition ease-in-out duration-300"
              onClick={handleLogin}
            >
              <BsFillPersonCheckFill className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out -translate-x-5 text-xl" />
              Login
              <IoChevronForward className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out translate-x-5" />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
