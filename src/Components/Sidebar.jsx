import React from "react";
import {
  FaInfoCircle,
  FaUser,
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
import Logo from "../assets/Logo.svg";

function Sidebar() {
  const sidebarLinks = [
    { text: "Event Details", link: "/manage-event/event-details", icon: <FaInfoCircle /> },
    { text: "Event Organizer", link: "/manage-event/event-organizer", icon: <FaUser /> },
    { text: "Ticketing", link: "/manage-event/ticketing", icon: <FaTicketAlt /> },
    { text: "Forms", link: "/manage-event/forms", icon: <FaWpforms /> },
    { text: "Attendees", link: "/manage-event/attendees", icon: <FaUsers /> },
    { text: "Transactions", link: "/manage-event/transactions", icon: <FaMoneyCheckAlt /> },
    { text: "Advanced", link: "/manage-event/advanced", icon: <IoSettingsSharp /> },
  ];

  return (
    <div className="h-screen w-64 fixed bg-[#1E1E1E] text-white md:w-64 sm:w-20 flex flex-col">
      <div className="flex justify-center p-5 border-b border-gray-700">
        <img src={Logo} className="w-[90%] py-5" alt="Logo" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        {sidebarLinks.map((link, index) => (
          <a
            key={index}
            href={link.link}
            className="flex items-center gap-3 text-lg p-3 rounded-md transition-all duration-300 hover:bg-gray-700 hover:text-[#90FF00]"
          >
            <span className="text-xl">{link.icon}</span>
            <span className="hidden md:inline">{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
