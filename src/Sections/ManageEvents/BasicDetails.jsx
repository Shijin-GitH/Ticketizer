import React, { useState, useEffect } from "react";
import Dropdown from "../../Components/Dropdown";
import { FaInfoCircle } from "react-icons/fa";
import { DateTimeField, InputField, SelectField } from "../../Pages/EventForm";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";

function BasicDetails() {
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState("");
  const [method, setMethod] = useState("");
  const [privacyType, setPrivacyType] = useState("");
  const [logo, setLogo] = useState(sessionStorage.getItem("eventLogo") || null);

  const PRIVACY_TYPES = ["Public", "Private", "Invite Only"];
  const METHOD_TYPES = ["In Person", "Virtual", "Hybrid"];

  useEffect(() => {
    if (logo) {
      sessionStorage.setItem("eventLogo", logo);
    }
  }, [logo]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" });

  return (
    <Dropdown
      title="Event Details"
      description="Basic event details"
      icon={<FaInfoCircle />}
    >
      <InputField label="Event Name" />
      <ReactQuill
        placeholder="Please enter Event Description"
        className="bg-white p-5 rounded-2xl text-black break-all h-74"
      />
      <div className="flex gap-3 my-10 items-center">
        <div className="flex flex-col w-1/2 gap-10">
          <DateTimeField
            label={"Start"}
            startDate={startDate}
            startTime={startTime}
            onDateChange={setStartDate}
            onTimeChange={setStartTime}
          />
          <DateTimeField
            label={"End"}
            startDate={endDate}
            startTime={endTime}
            onDateChange={setEndDate}
            onTimeChange={setEndTime}
          />
          <div className="flex flex-wrap gap-5 w-full">
            <SelectField
              label="Privacy type"
              options={PRIVACY_TYPES}
              value={privacyType}
              onChange={(e) => setPrivacyType(e.target.value)}
            />
            <SelectField
              label="Method"
              options={METHOD_TYPES}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 w-1/2 px-5">
          <div
            {...getRootProps()}
            className="border-dashed border-2 flex justify-center items-center w-full h-40 border-gray-300 rounded-lg p-5 text-center cursor-pointer hover:border-gray-500"
            style={{ backgroundImage: logo ? `url(${logo})` : "none", backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <input {...getInputProps()} />
            {!logo && <p className="cursor-pointer">Add Event Logo</p>}
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export default BasicDetails;
