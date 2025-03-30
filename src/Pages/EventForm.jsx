import * as React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-clock/dist/Clock.css";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

export function InputField({ label, className = "", ...props }) {
  return (
    <div
      className={`flex flex-wrap grow gap-3.5 pr-9 bg-black border-4 border-white border-solid rounded-[55px] ${className}`}
    >
      <label className="px-10 py-2.5 bg-white text-black rounded-[55px_0px_55px_55px] w-fit max-md:px-5">
        {label}
      </label>
      <input
        {...props}
        className="grow bg-transparent text-white px-4 py-2 focus:outline-none"
        placeholder={`Enter ${label}`}
        aria-label={label}
      />
    </div>
  );
}

export function SelectField({ label, options, className = "", ...props }) {
  return (
    <div
      className={`flex flex-wrap gap-2 grow pr-9 bg-black border-4 border-white border-solid rounded-[55px] ${className}`}
    >
      <label className="px-10 py-2.5 bg-white text-black font-semibold rounded-[55px_0px_55px_55px] w-fit max-md:px-5">
        {label}
      </label>
      <select
        {...props}
        className="grow bg-black text-white px-4 py-2 focus:outline-none appearance-none"
        aria-label={label}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function DateTimeField({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
}) {
  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, "0");
        const minute = j.toString().padStart(2, "0");
        times.push(`${hour}:${minute}`);
      }
    }
    return times;
  };

  return (
    <div className="flex gap-3 w-full grow">
      <div className="flex w-1/2 gap-5 grow shrink rounded-none ">
        <div className="flex gap-2 grow bg-black border-4 border-white border-solid rounded-[55px]">
          <label className="bg-white font-semibold px-10 text-nowrap text-black py-2.5 rounded-[55px_0px_55px_55px]">
            {label} Date
          </label>
          <DatePicker
            selected={date}
            onChange={(date) =>
              onDateChange(date ? date.toISOString().split("T")[0] : "")
            }
            className="grow bg-transparent px-4 py-2 text-white focus:outline-none"
            placeholderText="Select date"
          />
        </div>
      </div>
      <div className="flex w-1/2 flex-col text-black font-semibold grow shrink self-stretch my-auto rounded-none">
        <SelectField
          label={`${label} Time`}
          options={generateTimeOptions()}
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="grow"
        />
      </div>
    </div>
  );
}

export default function EventForm() {
  const EVENT_TYPES = ["Conference", "Meeting", "Workshop", "Seminar", "Other"];

  const PRIVACY_TYPES = ["Public", "Private", "Invite Only"];

  const METHOD_TYPES = ["In Person", "Virtual", "Hybrid"];

  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    method: "",
    start_date: null,
    start_time: "",
    end_date: null,
    end_time: "",
    registrationStartDate: null,
    registrationStartTime: "",
    registrationEndDate: null,
    registrationEndTime: "",
    description: "",
    org_name: "",
    org_mail: "",
    type: "",
    privacy_type: "",
    banner: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (localStorage.getItem("token") === null) {
    window.location.href = "/login";
  }

  const handleSubmit = (data) => {
    const formattedData = {
      ...data,
      start_time: `${data.start_time}:00`,
      end_time: `${data.end_time}:00`,
      registrationStartTime: `${data.registrationStartTime}:00`,
      registrationEndTime: `${data.registrationEndTime}:00`,
    };
    console.log(formattedData);
    axios
      .post("/create_event", formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast("Event created successfully");
        setTimeout(() => {
          window.location.href = "/events";
        }, 500);
      })
      .catch((err) => {
        toast("An error occurred");
      });
  };

  return (
    <div className="h-screen w-screen z-50">
      <Navbar />
      <div className="flex flex-col gap-5 z-50 h-fit w-full overflow-auto scrollbar-none items-center font-semibold text-black mt-30 py-10">
        <h1 className="text-5xl font-bold text-white">Create Event</h1>
        <div className="flex backdrop-blur-3xl p-10 flex-col gap-5 w-[70vw] items-center h-fit rounded-[32px]">
          <div className="flex w-full justify-center flex-wrap gap-6 whitespace-nowrap">
            <InputField
              label="Event Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <InputField
              label="Venue"
              value={formData.venue}
              onChange={(e) => handleChange("venue", e.target.value)}
            />
          </div>

          <div className="flex w-full flex-col flex-wrap gap-6 items-center whitespace-nowrap ">
            <DateTimeField
              label="Start"
              date={formData.start_date}
              time={formData.start_time}
              onDateChange={(date) => handleChange("start_date", date)}
              onTimeChange={(time) => handleChange("start_time", time)}
            />
            <DateTimeField
              label="End"
              date={formData.end_date}
              time={formData.end_time}
              onDateChange={(date) => handleChange("end_date", date)}
              onTimeChange={(time) => handleChange("end_time", time)}
            />
          </div>

          <div className="w-full flex gap-5">
            <InputField
              label="Organizer's Name"
              className=""
              value={formData.org_name}
              onChange={(e) => handleChange("org_name", e.target.value)}
            />
            <InputField
              label="Organizer's Email"
              type="email"
              className=""
              value={formData.org_mail}
              onChange={(e) => handleChange("org_mail", e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-5 w-full">
            <SelectField
              label="Type"
              options={EVENT_TYPES}
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
            />
            <SelectField
              label="Method"
              options={METHOD_TYPES}
              value={formData.method}
              onChange={(e) => handleChange("method", e.target.value)}
              className=""
            />
            <SelectField
              label="Privacy type"
              options={PRIVACY_TYPES}
              value={formData.privacy_type}
              onChange={(e) => handleChange("privacy_type", e.target.value)}
            />
          </div>
          <button
            className="flex flex-wrap grow gap-3.5 bg-black border-4 border-[#90FF00] border-solid rounded-[55px] text-[#90FF00] px-10 py-2.5 w-[10vw] text-center cursor-pointer items-center justify-center hover:bg-[#90FF00] hover:text-black transition ease-in-out duration-300"
            onClick={() => handleSubmit(formData)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
