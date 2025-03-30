import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import Dropdown from "../../Components/Dropdown";
import { FaTicketAlt } from "react-icons/fa";

const tickets = [
  {
    id: 1,
    name: "IAS / WIE Members (Early Bird)",
    price: "₹ 549",
    quantity: 10,
    sold: 4,
    status: "Sale Ended",
  },
  {
    id: 2,
    name: "IEEE Members (Early Bird)",
    price: "₹ 669",
    quantity: 10,
    sold: 4,
    status: "Sale Ended",
  },
  {
    id: 3,
    name: "Non-IEEE Members (Early Bird)",
    price: "₹ 919",
    quantity: 25,
    sold: 2,
    status: "Sale Ended",
  },
  {
    id: 4,
    name: "IAS / WIE Members",
    price: "₹ 849",
    quantity: 100,
    sold: 71,
    status: "Sale Ended",
  },
  {
    id: 5,
    name: "IEEE Members",
    price: "₹ 969",
    quantity: 100,
    sold: 8,
    status: "Sale Ended",
  },
  {
    id: 6,
    name: "Non-IEEE Members",
    price: "₹ 1289",
    quantity: 100,
    sold: 27,
    status: "Sale Ended",
  },
];

function AddTicketSidebar({ closeSidebar }) {
  const [ticketName, setTicketName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg border-l border-gray-200 flex flex-col p-6 z-50">
      {/* Sidebar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add Ticket</h2>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={closeSidebar}
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Ticket Form */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ticket Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button className="bg-[#90FF00] hover:bg-green-600 text-white px-4 py-2 rounded mt-4">
          Save Ticket
        </button>
      </div>
    </div>
  );
}

function Ticketing() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Dropdown
        title="Tickets"
        description="Add, Edit and Remove tickets for your event"
        icon={<FaTicketAlt />}
      >
        <div className="flex justify-end mb-4">
          <button
            className="bg-[#90FF00] hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00] cursor-pointer text-black px-4 py-2 rounded flex items-center gap-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaPlus /> Add Ticket
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="p-3">Ticket Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Sold</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-900">
                <td className="p-3">
                  {ticket.name}{" "}
                  <span className="text-red-500 text-xs ml-2">
                    {ticket.status}
                  </span>
                </td>
                <td className="p-3">{ticket.price}</td>
                <td className="p-3">{ticket.quantity}</td>
                <td className="p-3">{ticket.sold}</td>
                <td className="p-3 flex gap-3">
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Dropdown>
      {isSidebarOpen && (
        <AddTicketSidebar closeSidebar={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
}

export default Ticketing;
