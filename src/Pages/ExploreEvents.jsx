import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";

function EventCard({
  regStartDate,
  regStartTime,
  regEndDate,
  regEndTime,
  banner,
}) {
  const [status, setStatus] = useState("Open");

  useEffect(() => {
    const currentDate = new Date();
    const regStartDateTime = new Date(`${regStartDate}T${regStartTime}`);
    const regEndDateTime = new Date(`${regEndDate}T${regEndTime}`);

    if (currentDate < regStartDateTime) {
      setStatus("Opening Soon");
    } else if (currentDate > regEndDateTime) {
      setStatus("Closed");
    } else {
      setStatus("Open");
    }
  }, [regStartDate, regStartTime, regEndDate, regEndTime]);

  return (
    <div className="relative h-fit w-fit">
      <img
        src={banner}
        className={`w-[75vw] rounded-3xl ${
          status === "Closed" ? "grayscale" : ""
        }`}
        alt="Event Banner"
      />
      <div className="flex absolute top-10 right-10 items-center gap-5">
        <div
          className={`h-8 w-8 rounded-full ${
            status === "Closed"
              ? "bg-red-500"
              : status === "Opening Soon"
              ? "bg-yellow-500"
              : "bg-[#90FF00]"
          } flex justify-center items-center`}
        >
          <div className="border-2 border-black h-7 w-7 rounded-full"></div>
        </div>
        <p className="text-white font-bold text-xl">
          {status === "Closed"
            ? "Registrations Closed"
            : status === "Opening Soon"
            ? "Registration Opening Soon"
            : "Registrations Open"}
        </p>
      </div>
    </div>
  );
}

function ExploreEvents() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get("/fetch_banners").then((res) => {
      console.log(res.data);
      const sortedBanners = res.data.sort((a, b) => {
        const currentDate = new Date();
        const aStartDateTime = new Date(
          `${a.registration_start_date}T${a.registration_start_time}`
        );
        const aEndDateTime = new Date(
          `${a.registration_end_date}T${a.registration_end_time}`
        );
        const bStartDateTime = new Date(
          `${b.registration_start_date}T${b.registration_start_time}`
        );
        const bEndDateTime = new Date(
          `${b.registration_end_date}T${b.registration_end_time}`
        );

        const aStatus =
          currentDate < aStartDateTime
            ? "Opening Soon"
            : currentDate > aEndDateTime
            ? "Closed"
            : "Open";
        const bStatus =
          currentDate < bStartDateTime
            ? "Opening Soon"
            : currentDate > bEndDateTime
            ? "Closed"
            : "Open";

        if (aStatus === "Open" && bStatus !== "Open") return -1;
        if (aStatus !== "Open" && bStatus === "Open") return 1;
        return 0;
      });
      setBanners(sortedBanners);
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center z-50">
      <Navbar />
      <div className="mt-40 flex flex-col items-center">
        <h1 className="text-white text-9xl font-bold">Events</h1>
        <div className="flex flex-col gap-10">
          {banners.map((banner, index) => (
            <EventCard
              key={index}
              regStartDate={banner.registration_start_date}
              regStartTime={banner.registration_start_time}
              regEndDate={banner.registration_end_date}
              regEndTime={banner.registration_end_time}
              banner={banner.banner}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreEvents;
