import React, { useState } from "react";
import axios from "axios";
import { IoChevronForward } from "react-icons/io5";
import { MdOutlinePersonAddAlt, MdPerson } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillPersonCheckFill, BsPencil, BsPersonBadge } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../Components/Modal/Modal";
import Header from "../Components/Modal/Header";
import Field from "../Components/Input/Field";
import Password from "../Components/Input/Password";
import Button from "../Components/Button/Button";
import { BiPhone } from "react-icons/bi";

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!phone) {
      toast.error("Phone number is required");
      return;
    }
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
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain letters, numbers, and special characters"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .post("/signup", {
        name,
        phone,
        email: email.toLowerCase(),
        password,
      })
      .then((res) => {
        toast.success("Signup Successful");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000); 
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 400:
              toast.error("Bad Request");
              break;
            case 401:
              toast.error("Unauthorized");
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
          text="Hello there!"
          icon={<BsFillPersonCheckFill />}
          link_text="Already have an account?"
          title="Sign up"
          subtitle="Enter your details to create an account"
          onclick={() => (window.location.href = "/login")}
        />
        <Field
          state={name}
          setState={setName}
          text="Name"
          required
          icon={<BsPersonBadge />}
          placeholder="John Doe"
        />
        <Field
          state={phone}
          setState={setPhone}
          text="Phone Number"
          required
          icon={<BiPhone />}
          placeholder="1234567890"
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
        <Password
          password={confirmPassword}
          setPassword={setConfirmPassword}
          text="Confirm Password"
        />
        <div className="h-16 w-full flex my-5 justify-center">
          <Button
            text="Sign up"
            width={"50%"}
            iconleft={
              <MdOutlinePersonAddAlt className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out -translate-x-5 text-xl" />
            }
            iconright={
              <IoChevronForward className="text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-300 ease-in-out translate-x-5" />
            }
            handleLogin={handleSignup}
          />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Signup;
