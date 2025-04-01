import { useState, useEffect } from "react";
import Dropdown from "../../Components/Dropdown";
import { FaInfoCircle, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../Components/LoadingSpinner"; // Import LoadingSpinner

function BasicDetails() {
  const token = useParams().eventToken; // Extract the token from the URL
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [method, setMethod] = useState("");
  const [privacyType, setPrivacyType] = useState("");
  const [logo, setLogo] = useState(sessionStorage.getItem("eventLogo") || null);
  const [venue, setVenue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [eventDetails, setEventDetails] = useState({});
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [registrationStartDate, setRegistrationStartDate] = useState("");
  const [registrationStartTime, setRegistrationStartTime] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [registrationEndTime, setRegistrationEndTime] = useState("");
  const userToken = localStorage.getItem("token"); // Get user token from local storage

  const PRIVACY_TYPES = ["Public", "Private", "Invite Only"];
  const METHOD_TYPES = ["In Person", "Virtual", "Hybrid"];

  // Mock location search results
  const mockLocations = [
    {
      id: 1,
      name: "Golden Eye Cricket Ground",
      address: "Kochi, Kerala, India",
      coordinates: { lat: 9.9312, lng: 76.2673 },
    },
    {
      id: 2,
      name: "Jawaharlal Nehru Stadium",
      address: "Kochi, Kerala, India",
      coordinates: { lat: 9.9871, lng: 76.2989 },
    },
    {
      id: 3,
      name: "Regional Sports Centre",
      address: "Kadavanthra, Kochi, India",
      coordinates: { lat: 9.9675, lng: 76.2924 },
    },
    {
      id: 4,
      name: "Rajiv Gandhi Indoor Stadium",
      address: "Kadavanthra, Kochi, India",
      coordinates: { lat: 9.968, lng: 76.293 },
    },
    {
      id: 5,
      name: "Lulu International Convention Centre",
      address: "Edappally, Kochi, India",
      coordinates: { lat: 10.0261, lng: 76.3125 },
    },
  ];

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `/get_event_by_token/${token}/basic_details`
        );

        const data = response.data;
        setEventName(data.name || "");
        setDescription(data.description || "");
        setStartDate(data.start_date || "");
        setStartTime(data.start_time || "");
        setEndDate(data.end_date || "");
        setEndTime(data.end_time || "");
        setMethod(data.method || "");
        setPrivacyType(data.privacy_type || "");
        setLogo(data.banner || "");
        setRegistrationStartDate(data.registration_start_date || ""); // Fetch registration start date
        setRegistrationStartTime(data.registration_start_time || ""); // Fetch registration start time
        setRegistrationEndDate(data.registration_end_date || ""); // Fetch registration end date
        setRegistrationEndTime(data.registration_end_time || ""); // Fetch registration end time
        if (data.venue) {
          setVenue(data.venue);
          setSelectedLocation({ name: data.venue, address: "" }); // Adjust as needed
        }
        setIsLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching event details:", error);
        setIsLoading(false); // Set loading to false even on error
      }
    };

    fetchEventDetails();
  }, [token]); // Add token as a dependency

  useEffect(() => {
    if (logo) {
      sessionStorage.setItem("eventLogo", logo);
    }
  }, [logo]);

  useEffect(() => {
    // Save event details to sessionStorage whenever they change
    const updatedEventDetails = {
      ...eventDetails,
      name: eventName,
      description,
      startDate,
      startTime,
      endTime,
      endDate,
      method,
      privacyType,
      venue: selectedLocation,
      location: selectedLocation
        ? `${selectedLocation.name}, ${selectedLocation.address}`
        : venue,
    };

    setEventDetails(updatedEventDetails);
    sessionStorage.setItem("eventDetails", JSON.stringify(updatedEventDetails));
  }, [
    eventName,
    description,
    startDate,
    startTime,
    endDate,
    endTime,
    method,
    privacyType,
    selectedLocation,
    venue,
  ]);

  const uploadBannerToServer = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("token", token); // Pass event_id

    try {
      const response = await axios.post("/upload_event_banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add Authorization if needed
        },
      });

      if (response.data.banner_url) {
        setLogo(response.data.banner_url);
      } else {
        console.error("Upload failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error uploading banner:", error.response?.data || error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      uploadBannerToServer(file); // Use the upload function
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setVenue(query);
    setIsSearchTriggered(false); // Reset search trigger on input change
  };

  const handleSearchClick = async () => {
    const query = searchQuery.trim(); // Trim whitespace
    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const locations = data.map((place) => ({
          id: place.place_id,
          name: place.display_name.split(",")[0], // Use only the first part of the name
          address: place.display_name,
          coordinates: {
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
          },
        }));

        setSearchResults(locations);
        setShowSearchResults(true);
        setIsSearchTriggered(true); // Mark search as triggered
      } catch (error) {
        console.error("Error fetching locations:", error);
        setSearchResults([]);
        setShowSearchResults(false);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleLocationSelect = (location) => {
    setVenue(`${location.name}, ${location.address}`);
    setSelectedLocation(location);
    setShowSearchResults(false);
  };

  const handleSave = async () => {
    try {
      const formattedStartDate = startDate; // Already in YYYY-MM-DD format
      const formattedEndDate = endDate; // Already in YYYY-MM-DD format
      const formattedStartTime = startTime; // Already in HH:MM format
      const formattedEndTime = endTime; // Already in HH:MM format
      const formattedRegStartDate = registrationStartDate; // Already in YYYY-MM-DD format
      const formattedRegEndDate = registrationEndDate; // Already in YYYY-MM-DD format
      const formattedRegStartTime = registrationStartTime; // Already in HH:MM format
      const formattedRegEndTime = registrationEndTime; // Already in HH:MM format

      const payload = {
        name: eventName,
        description,
        start_date: formattedStartDate,
        start_time: `${formattedStartTime}`, // Add seconds
        end_date: formattedEndDate,
        end_time: `${formattedEndTime}`, // Add seconds
        method,
        privacy_type: privacyType,
        venue,
        registration_start_date: formattedRegStartDate,
        registration_start_time: `${formattedRegStartTime}:00`, // Add seconds
        registration_end_date: formattedRegEndDate,
        registration_end_time: `${formattedRegEndTime}:00`, // Add seconds
      };

      console.log("Payload to be sent:", payload); // Log the payload

      const response = await axios.put(`/update_event/${token}`, payload, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        alert("Event updated successfully!");
      }
    } catch (error) {
      console.error("Error updating event:", error.response?.data || error);
      alert("Failed to update event. Please try again.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  return (
    <Dropdown
      title="Event Details"
      description="Basic event details"
      icon={<FaInfoCircle />}
      onClick={handleSave} // Pass handleSave to onClick
    >
      <div className="bg-black text-white p-6 rounded-lg">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Event Name</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Event Description
          </label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            placeholder="Please enter Event Description"
            className="bg-white p-5 rounded-md text-black h-fit break-all"
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Start Date & Time
            </label>
            <div className="flex space-x-4">
              <input
                type="date"
                className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="time"
                className="w-32 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              End Date & Time
            </label>
            <div className="flex space-x-4">
              <input
                type="date"
                className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="time"
                className="w-32 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Registration Start Date & Time
            </label>
            <div className="flex space-x-4">
              <input
                type="date"
                className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={registrationStartDate}
                onChange={(e) => setRegistrationStartDate(e.target.value)}
              />
              <input
                type="time"
                className="w-32 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={registrationStartTime}
                onChange={(e) => setRegistrationStartTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Registration End Date & Time
            </label>
            <div className="flex space-x-4">
              <input
                type="date"
                className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={registrationEndDate}
                onChange={(e) => setRegistrationEndDate(e.target.value)}
              />
              <input
                type="time"
                className="w-32 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={registrationEndTime}
                onChange={(e) => setRegistrationEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Venue</label>
          <div className="relative">
            <div className="flex items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-md text-white"
                placeholder="Search for a venue"
                value={venue}
                onChange={handleSearchChange}
              />
              <button
                className="ml-2 p-3 bg-[#90FF00] cursor-pointer hover:bg-black border border-transparent hover:border-[#90FF00] transition duration-300 ease-in-out hover:text-white text-black rounded-md"
                onClick={handleSearchClick}
              >
                Search
              </button>
            </div>

            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((location) => (
                  <div
                    key={location.id}
                    className="p-3 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-gray-400">
                      {location.address}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedLocation && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Location Preview
            </label>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                  `${selectedLocation.name} ${selectedLocation.address}`
                )}`}
                className="w-full h-60 rounded-lg"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Privacy Type
            </label>
            <select
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
              value={privacyType}
              onChange={(e) => setPrivacyType(e.target.value)}
            >
              <option value="" disabled>
                Select privacy type
              </option>
              {PRIVACY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Event Method
            </label>
            <select
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="" disabled>
                Select method
              </option>
              {METHOD_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Event Banner</label>
          <div
            {...getRootProps()}
            className="border-dashed border-2 flex justify-center items-center w-full h-60 border-gray-700 rounded-lg p-5 text-center cursor-pointer hover:border-[#90FF00] transition-colors"
            style={{
              backgroundImage: logo ? `url(${logo})` : "none",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <input {...getInputProps()} />
            {!logo && (
              <div className="text-gray-400">
                <div className="text-4xl mb-2">+</div>
                <p>Drag & drop an image here, or click to select one</p>
                <p className="text-sm mt-2">
                  Recommended size: 1200 x 630 pixels
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export default BasicDetails;
