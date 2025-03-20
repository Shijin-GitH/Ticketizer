import React, { useState } from "react";
import axios from "axios";
import { IoChevronForward } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { TbLockQuestion } from "react-icons/tb";
import { BsFillPersonCheckFill } from "react-icons/bs";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../Components/Modal/Modal";
import Header from "../Components/Modal/Header";
import Link from "../Components/Button/Link";
import Field from "../Components/Input/Field";
import Password from "../Components/Input/Password";
import Button from "../Components/Button/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userslice";

function Login() {
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const toggleStayLoggedIn = () => {
    setStayLoggedIn(!stayLoggedIn);
  };

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
    //   toast.error("Password must be at least 8 characters long and contain letters, numbers, and special characters");
    //   return;
    // }

    axios
      .post("/login", {
        email: email.toLowerCase(),
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        axios
          .get("/user_details", {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((resp) => {
            dispatch(setUser(resp.data));
          });
        toast.success("Login Successful");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
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
    <>
      <Modal>
        <Header
          text="Welcome Back!"
          icon={<MdOutlinePersonAddAlt />}
          link_text="Create an account"
          title="Login"
          subtitle="Enter your credentials to continue"
          onclick={() => (window.location.href = "/signup")}
          k
        />
        <Field
          state={email}
          setState={setEmail}
          text="Email"
          required
          icon={<MdAlternateEmail />}
          placeholder="abc@xyz"
        />
        <Password
          password={password}
          setPassword={setPassword}
          text="Password"
        />
        <div className="flex justify-between items-center text-white">
          <Link text="Forgot Password?" icon={<TbLockQuestion />} />
          <Link
            text="Stay Logged In"
            icon={
              stayLoggedIn ? (
                <MdOutlineCheckBox />
              ) : (
                <MdOutlineCheckBoxOutlineBlank />
              )
            }
            onClick={toggleStayLoggedIn}
          />
        </div>
        <div className="h-16 w-full flex my-5 justify-center">
          <Button
            text="Login"
            width={"50%"}
            iconleft={
              <BsFillPersonCheckFill className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out -translate-x-5 " />
            }
            iconright={
              <IoChevronForward className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out translate-x-5" />
            }
            handleLogin={handleLogin}
          />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Login;
