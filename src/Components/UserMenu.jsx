import React, { useState, useRef, useEffect } from "react";
import { BiBell, BiUser } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userslice";

const UserDropdown = () => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const dispatch = useDispatch();  
  const user = useSelector((state) => state.user.user);

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
    <div className="relative">
      {user && (
        <div
          className="h-11 w-11 font-bold rounded-full cursor-pointer bg-[#90FF00] flex items-center justify-center text-black"
          onClick={() => setVisible(!visible)}
        >
          {user?.name?.split(" ").slice(0, 2).map((name) => name[0].toUpperCase())}
        </div>
      )}
      {visible && (
        <div
          ref={containerRef}
          className="absolute w-68 z-50 h-fit right-0 bg-black top-15 border-2 rounded-md border-[#fff] hover:border-[#90FF00] transition duration-300 ease-in-out flex flex-col items-center p-5 gap-5"
        >
          <div className="h-12 w-12 rounded-full bg-[#90FF00] flex items-center justify-center font-bold text-black">
            {user?.name?.split(" ").slice(0, 2).map((name) => name[0].toUpperCase())}
          </div>
          <div className="flex flex-col items-center">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
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
      )}
    </div>
  );
};

export default UserDropdown;
