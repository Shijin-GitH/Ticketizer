import React, { useState, useEffect } from "react";
import Dropdown from "../../Components/Dropdown";
import { FaUsers } from "react-icons/fa";
import LoadingSpinner from "../../Components/LoadingSpinner"; // Import LoadingSpinner

function AddAdmin() {
  const [email, setEmail] = useState("");
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate fetching admin data
    setTimeout(() => {
      setAdmins([
        { id: 1, email: "admin1@example.com", name: "Admin One" },
        { id: 2, email: "admin2@example.com", name: "Admin Two" },
      ]);
      setIsLoading(false); // Set loading to false after fetching
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  const handleAddAdmin = () => {
    if (email.trim() === "") {
      alert("Please enter a valid email.");
      return;
    }
    setAdmins([...admins, { id: admins.length + 1, email }]);
    setEmail("");
  };

  return (
    <Dropdown title="Add Admin" description={"Manage Event"} icon={<FaUsers />}>
      {/* Add Admin Section */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="email"
          placeholder="Enter admin email"
          className="flex-grow p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-[#90FF00] hover:bg-green-600 text-black px-4 py-2 rounded"
          onClick={handleAddAdmin}
        >
          Add
        </button>
      </div>

      {/* Admins Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-black border-b border-gray-200">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b border-gray-200">
                <td className="p-3">{admin.id}</td>
                <td className="p-3">{admin.name}</td>
                <td className="p-3">{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dropdown>
  );
}

export default AddAdmin;
