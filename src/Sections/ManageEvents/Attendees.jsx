import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEnvelope,
  FaFileExcel,
  FaChevronDown,
  FaUsers,
} from "react-icons/fa";
import Dropdown from "../../Components/Dropdown";
import LoadingSpinner from "../../Components/LoadingSpinner"; // Import LoadingSpinner

function Attendees() {
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [attendeesData, setAttendeesData] = useState([]); // Replace static data with state
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate fetching attendees data
    setTimeout(() => {
      setAttendeesData([]); // Replace with actual data fetching logic
      setIsLoading(false); // Set loading to false after fetching
    }, 1000);
  }, []);

  const exportToCSV = () => {
    if (attendeesData.length === 0) {
      alert("No data to export");
      return;
    }

    // Get headers from the first attendee object
    const headers = Object.keys(attendeesData[0]);

    // Convert data to CSV format
    let csvContent = headers.join(",") + "\n";

    attendeesData.forEach((attendee) => {
      const row = headers.map((header) => {
        // Wrap values with commas in quotes
        const cell = attendee[header] || "";
        return typeof cell === "string" && cell.includes(",")
          ? `"${cell}"`
          : cell;
      });
      csvContent += row.join(",") + "\n";
    });

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "attendees.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAttendees(attendeesData.map((a) => a.id));
    } else {
      setSelectedAttendees([]);
    }
  };

  const toggleSelectAttendee = (id) => {
    if (selectedAttendees.includes(id)) {
      setSelectedAttendees(
        selectedAttendees.filter((attendeeId) => attendeeId !== id)
      );
    } else {
      setSelectedAttendees([...selectedAttendees, id]);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  return (
    <Dropdown
      title={"Attendees"}
      description="Manage your event attendees"
      icon={<FaUsers />}
    >
      <div className="bg-black text-white">
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">111</h2>
            <p className="text-gray-400">Total Bookings</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500">116</h2>
            <p className="text-gray-400">Total Tickets Sold</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-orange-500">0</h2>
            <p className="text-gray-400">Yet To Pay</p>
          </div>
        </div>
        {/* Search and Filter Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search attendee"
              className="w-full p-2 pl-10 bg-gray-800 border border-gray-700 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md">
              All Attendees <FaChevronDown />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-[#90FF00]">
              <FaPlus /> Add Filter
            </button>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#90FF00] text-black rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00]">
              <FaPlus /> Add Attendee
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md">
              More Options <FaChevronDown />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md">
              <FaEnvelope /> Email Attendees
            </button>
            <button className="text-[#90FF00]">Select All</button>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700"
            onClick={exportToCSV}
          >
            <FaFileExcel /> Export Attendees
          </button>
        </div>
        {/* Attendees Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    className="w-4 h-4"
                  />
                </th>
                <th className="p-3 text-left">ACTIONS</th>
                <th className="p-3 text-left">REFERENCE ID</th>
                <th className="p-3 text-left">NAME</th>
                <th className="p-3 text-left">EMAIL</th>
                <th className="p-3 text-left">PAYMENT STATUS</th>
                <th className="p-3 text-left">PRICE</th>
                <th className="p-3 text-left">TICKETS</th>
              </tr>
            </thead>
            <tbody>
              {attendeesData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-400">
                    No attendees found. Data will be fetched from backend.
                  </td>
                </tr>
              ) : (
                attendeesData.map((attendee) => (
                  <tr
                    key={attendee.id}
                    className="border-b border-gray-800 hover:bg-gray-900"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedAttendees.includes(attendee.id)}
                        onChange={() => toggleSelectAttendee(attendee.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-3">
                      <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                        More Actions <FaChevronDown size={12} />
                      </button>
                    </td>
                    <td className="p-3">{attendee.referenceId}</td>
                    <td className="p-3">{attendee.name}</td>
                    <td className="p-3">{attendee.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          attendee.paymentStatus === "SUCCESS"
                            ? "bg-green-900 text-green-300"
                            : attendee.paymentStatus === "PENDING"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-red-900 text-red-300"
                        }`}
                      >
                        {attendee.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">₹ {attendee.price}</td>
                    <td className="p-3">{attendee.ticketType}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Dropdown>
  );
}

export default Attendees;
