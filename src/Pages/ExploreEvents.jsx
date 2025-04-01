import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";

function EventCard({
  regStartDate,
  regStartTime,
  regEndDate,
  regEndTime,
  banner,
  token
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
    <div onClick={() => window.location.href = `/event/${token}`} className="relative group h-fit hover:scale-[101%] overflow-hidden transition duration-300 ease-in-out w-fit">
      <img
        src={banner}
        className={`w-[40vw] rounded-3xl border-2 cursor-pointer hover:border-[#90FF00] transition ease-in-out duration-300 border-white ${
          status === "Closed" ? "grayscale" : ""
        }`}
        alt="Event Banner"
      />
      <div className="flex absolute top-0 group-hover:translate-x-[105%] group-hover:border-t-0 group-hover:opacity-0 right-0 p-4 transition duration-300 ease-in-out bg-black border border-[#90FF00] rounded-tr-3xl rounded-bl-3xl items-center gap-5">
        <div
          className={`h-5 w-5 rounded-full ${
            status === "Closed"
              ? "bg-red-500"
              : status === "Opening Soon"
              ? "bg-yellow-500"
              : "bg-[#90FF00]"
          } flex justify-center items-center`}
        >
          <div className="border-2 border-black h-4 w-4 rounded-full"></div>
        </div>
        <p className="text-white font-bold text-md">
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
      <div className="mt-40 flex flex-col items-center gap-5">
        <h1 className="text-white text-9xl font-bold">Events</h1>
        <div className="flex flex-wrap justify-center gap-10">
          {banners.map((banner, index) => (
            <EventCard
              key={index}
              regStartDate={banner.registration_start_date}
              regStartTime={banner.registration_start_time}
              regEndDate={banner.registration_end_date}
              regEndTime={banner.registration_end_time}
              banner={banner.banner}
              token={banner.token} // Assuming you have a token for each banner
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreEvents;
