import React, { useEffect } from "react";
import axios from "axios";
import {
  FaInfoCircle,
  FaTicketAlt,
  FaWpforms,
  FaUsers,
  FaMoneyBill,
} from "react-icons/fa";
import { IoCash, IoSettingsSharp } from "react-icons/io5";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import UserDropdown from "../Components/UserMenu";
import { TbCashBanknote } from "react-icons/tb";
import { BiBriefcase, BiPhoneCall } from "react-icons/bi";
import LoadingSpinner from "../Components/LoadingSpinner";

function Sidebar() {
  const location = useLocation();
  const { eventToken } = useParams(); // Access the dynamic eventToken parameter

  const sidebarLinks = [
    {
      text: "Event Details",
      link: `/manage-event/${eventToken}/basic-details`,
      icon: <FaInfoCircle />,
    },
    {
      text: "Ticketing",
      link: `/manage-event/${eventToken}/ticketing`,
      icon: <FaTicketAlt />,
    },
    {
      text: "Forms",
      link: `/manage-event/${eventToken}/forms`,
      icon: <FaWpforms />,
    },
    {
      text: "Attendees",
      link: `/manage-event/${eventToken}/attendees`,
      icon: <FaUsers />,
    },
    {
      text: "Add Admin",
      link: `/manage-event/${eventToken}/add-admin`,
      icon: <IoSettingsSharp />,
    },
    {
      text: "Bank Details",
      link: `/manage-event/${eventToken}/bank-details`,
      icon: <FaMoneyBill />,
    },
    {
      text: "Contacts",
      link: `/manage-event/${eventToken}/contacts`,
      icon: <BiPhoneCall />,
    },
    {
      text: "Terms & Conditions",
      link: `/manage-event/${eventToken}/terms-and-conditions`,
      icon: <BiBriefcase />,
    },
  ];

  return (
    <div className="h-screen w-64 fixed bg-[#000] border-r border-[#90FF00] text-white flex flex-col">
      <div className="flex justify-center p-5">
        <img
          src={Logo}
          className="w-[90%] py-5 cursor-pointer"
          alt="Logo"
          onClick={() => {
            window.location.href = "/";
          }}
        />
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
  const { eventToken } = useParams();
  const [eventStatus, setEventStatus] = React.useState("");
  const [name, setName] = React.useState("");
  useEffect(() => {
    async function fetchEventStatus() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/fetch_event_status/${eventToken}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEventStatus(response.data.status[0]);
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching event status:", error);
      }
    }

    fetchEventStatus();
  }, []);

  const updateEventStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        status === "Published"
          ? `/update_event_status/${eventToken}`
          : `/update_event_status_unpublished/${eventToken}`;
      await axios.put(
        endpoint,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEventStatus(status);
      console.log(`Event status updated to: ${status}`); // Debugging log
    } catch (error) {
      console.error(`Error updating event status to ${status}:`, error);
    }
  };

  console.log(eventStatus);
  return (
    <div className="topbar fixed h-24 bg-[#000] border-b left-64 -ml-0.5 border-l border-l-black border-b-[#90FF00] text-white shadow-md flex items-center px-6 justify-between">
      <div className="flex gap-10">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{name}</h1>
          <span
            className={`text-sm font-medium ${
              eventStatus === "Published" ? "text-green-500" : "text-yellow-500"
            }`}
          >
            ● {eventStatus}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => console.log("Preview clicked")}
          >
            Preview
          </button>
          <button
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              eventStatus === "Published"
                ? "bg-red-500 text-white hover:bg-red-700"
                : "bg-[#90FF00] text-black hover:bg-black hover:text-white"
            }`}
            onClick={() =>
              updateEventStatus(
                eventStatus === "Published" ? "Unpublished" : "Published"
              )
            }
          >
            {eventStatus === "Published" ? "Unpublish" : "Publish"}
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
  const { eventToken } = useParams();

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const response = await axios.get(`/get_event_by_token/${eventToken}`);
        sessionStorage.setItem("eventDetails", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    }

    fetchEventDetails();
  }, [eventToken]);

  // if (!sessionStorage.getItem("eventDetails")) {
  //   return <LoadingSpinner />;
  // }

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
