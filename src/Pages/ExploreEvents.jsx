import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Banner from "../assets/banner.png";

function EventCard({ regStartDate, regEndDate }) {
  const [status, setStatus] = useState("Open");

  useEffect(() => {
    const currentDate = new Date();
    if (currentDate < new Date(regStartDate)) {
      setStatus("Opening Soon");
    } else if (currentDate > new Date(regEndDate)) {
      setStatus("Closed");
    }
  }, [regStartDate, regEndDate]);

  return (
    <div className="relative h-fit w-fit">
      <img
        src={Banner}
        className={`w-[75vw] rounded-3xl ${status === "Closed" ? "grayscale" : ""}`}
        alt=""
      />
      <div className="flex absolute top-10 right-10 items-center gap-5">
        <div
          className={`h-8 w-8 rounded-full ${
            status === "Closed" ? "bg-red-500" : status === "Opening Soon" ? "bg-yellow-500" : "bg-[#90FF00]"
          } flex justify-center items-center`}
        >
          <div className="border-2 border-black h-7 w-7 rounded-full"></div>
        </div>
        <p className="text-white font-bold text-xl">
          {status === "Closed" ? "Registrations Closed" : status === "Opening Soon" ? "Registration Opening Soon" : "Registrations Open"}
        </p>
      </div>
    </div>
  );
}

function ExploreEvents() {
  return (
    <div className="w-screen h-screen flex flex-col items-center z-50">
      <Navbar />
      <div className="mt-40 flex flex-col items-center">
        <h1 className="text-white text-9xl font-bold">Events</h1>
        <div className="flex flex-col gap-10">
          <EventCard regStartDate="2025-01-01" regEndDate="2025-02-19" />
          <EventCard regStartDate="2025-11-01" regEndDate="2025-11-30" />
          <EventCard regStartDate="2023-09-01" regEndDate="2023-10-31" />
        </div>
      </div>
    </div>
  );
}

export default ExploreEvents;
