import React, { useEffect } from "react";
import {
  FaInfoCircle,
  FaTicketAlt,
  FaWpforms,
  FaUsers,
  FaMoneyCheckAlt,
  FaClipboardCheck,
  FaBullhorn,
  FaTools,
  FaListUl,
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import UserDropdown from "../Components/UserMenu";

function Sidebar() {
  const location = useLocation();

  const sidebarLinks = [
    {
      text: "Event Details",
      link: "/manage-event/event-details",
      icon: <FaInfoCircle />,
    },
    {
      text: "Ticketing",
      link: "/manage-event/ticketing",
      icon: <FaTicketAlt />,
    },
    { text: "Forms", link: "/manage-event/forms", icon: <FaWpforms /> },
    { text: "Attendees", link: "/manage-event/attendees", icon: <FaUsers /> },
    {
      text: "Transactions",
      link: "/manage-event/transactions",
      icon: <FaMoneyCheckAlt />,
    },
    {
      text: "Advanced",
      link: "/manage-event/advanced",
      icon: <IoSettingsSharp />,
    },
  ];

  return (
    <div className="h-screen w-64 fixed bg-[#000] border-r border-[#90FF00] text-white flex flex-col">
      <div className="flex justify-center p-5">
        <img src={Logo} className="w-[90%] py-5" alt="Logo" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        {sidebarLinks.map((link, index) => (
          <a
            key={index}
            href={link.link}
            className={`flex items-center gap-3 text-lg p-3 rounded-md transition-all duration-300 ${
              location.pathname === link.link
                ? "bg-gray-700 text-[#90FF00]"
                : "hover:bg-gray-700 hover:text-[#90FF00]"
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="hidden md:inline">{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <div className="topbar fixed h-24 bg-[#000] border-b left-64 -ml-0.5 border-l border-l-black border-b-[#90FF00] text-white shadow-md flex items-center px-6 justify-between">
      <div className="flex gap-10">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">aanga</h1>
          <span className="text-yellow-500 text-sm font-medium">
            ● NOT PUBLISHED
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer">
            Preview
          </button>
          <button className="px-4 py-2 bg-[#90FF00] text-black rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00] cursor-pointer">
            Publish
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <UserDropdown />
      </div>
    </div>
  );
}

function ManageEvent() {
  return (
    <div className="h-screen flex w-screen overflow-x-hidden z-50">
      <Sidebar />
      <div className="ml-64 grow flex flex-col">
        <Topbar />
        <div className="flex flex-col mt-24 gap-3 overflow-y-auto overflow-x-hidden p-5 scrollbar-none">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ManageEvent;
