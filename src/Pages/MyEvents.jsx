import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import banner from "../assets/banner.png";
import axios from "axios";
import { TbCalendarTime, TbLocation } from "react-icons/tb";

function EventCard({ event }) {
  return (
    <div className="h-80 w-100 bg-[#040404] z-50 flex flex-col gap-2 border-4 rounded-md border-white hover:scale-[101%] cursor-pointer hover:border-[#90FF00] transition ease-in-out duration-300">
      <img src={event.banner} className="rounded-t-md h-[60%]" alt="" />
      <div className="grow flex flex-col gap-4 px-3 text-white">
        <h1 className="text-xl">{event.name}</h1>
        <div className="flex items-center gap-2">
          <TbLocation className="text-xl" />
          <p className="">{event.venue}</p>
        </div>
        <div className="flex items-center gap-2">
          <TbCalendarTime className="text-xl" />
          <p>
            {event.start_date}, {event.start_time.slice(0, -3)}
          </p>
        </div>
      </div>
    </div>
  );
}

function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/get_events_by_user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEvents(res.data);
      });
  }, []);

  return (
    <div className="h-screen w-sccreen overflow-x-hidden overflow-y-auto">
      <Navbar />
      <div className=" flex flex-col h-fit w-full items-center mt-26 gap-10 p-10">
        <h1 className="text-white text-5xl z-50">My Events</h1>
        <div className="flex flex-wrap justify-center gap-10 h-fit w-full">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyEvents;
