import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Dropdown from "../../Components/Dropdown";
import { FaTicketAlt } from "react-icons/fa";
import axios from "axios";
import LoadingSpinner from "../../Components/LoadingSpinner"; // Import LoadingSpinner

function AddTicketSidebar({ closeSidebar, ticketToEdit, refreshTickets }) {
  const [ticketName, setTicketName] = useState(ticketToEdit?.name || "");
  const [price, setPrice] = useState(ticketToEdit?.price || "");
  const [quantity, setQuantity] = useState(ticketToEdit?.quantity || "");
  const { eventToken } = useParams();
  const authToken = localStorage.getItem("token"); // Retrieve token from localStorage or other storage

  useEffect(() => {
    if (ticketToEdit) {
      setTicketName(ticketToEdit.name);
      setPrice(ticketToEdit.price);
      setQuantity(ticketToEdit.quantity);
    }
  }, [ticketToEdit]);

  const handleSave = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      if (ticketToEdit) {
        // Update ticket
        await axios.put(
          `/${ticketToEdit.ticket_id}/edit_ticket`,
          { name: ticketName, price, quantity },
          config
        );
      } else {
        // Add new ticket
        await axios.post(
          `/${eventToken}/create_ticket`,
          { name: ticketName, price, quantity },
          config
        );
      }
      refreshTickets();
      closeSidebar();
    } catch (error) {
      console.error("Error saving ticket:", error);
    }
  };

  return (
    <div className="fixed top-24 right-0 w-1/3 h-full py-10 bg-black shadow-lg border-l border-[#90FF00] flex flex-col p-6 z-50">
      {/* Sidebar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          {ticketToEdit ? "Edit Ticket" : "Add Ticket"}
        </h2>
        <button
          className="text-white cursor-pointer hover:text-gray-800"
          onClick={closeSidebar}
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Ticket Form */}
      <div className="flex flex-col gap-4 text-white">
        <div>
          <label className="block text-sm font-medium text-white">
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
          <label className="block text-sm font-medium text-white">Price</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Quantity
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button
          className="bg-[#90FF00] border boder-transparent transition duration-300 ease-in-out hover:text-white cursor-pointer hover:bg-black hover:border-[#90FF00] text-black px-4 py-2 rounded mt-4"
          onClick={handleSave}
        >
          Save Ticket
        </button>
      </div>
    </div>
  );
}

function Ticketing() {
  const [tickets, setTickets] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { eventToken } = useParams();
  const authToken = localStorage.getItem("authToken"); // Retrieve token from localStorage or other storage

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`/${eventToken}/tickets`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTickets(response.data);
      setIsLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setIsLoading(false); // Set loading to false even on error
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [eventToken]);

  if (isLoading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  const handleEdit = (ticket) => {
    setTicketToEdit(ticket);
    setIsSidebarOpen(true);
  };

  const handleDelete = async (ticketId) => {
    try {
      await axios.delete(`/${ticketId}/delete_ticket`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

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
            onClick={() => {
              setTicketToEdit(null);
              setIsSidebarOpen(true);
            }}
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
              <tr
                key={ticket.ticket_id}
                className="border-b border-gray-200 hover:bg-gray-900 text-white"
              >
                <td className="p-3">{ticket.name} </td>
                <td className="p-3">{ticket.price}</td>
                <td className="p-3">{ticket.quantity}</td>
                <td className="p-3">{ticket.sold}</td>
                <td className="p-3 flex gap-3">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleEdit(ticket)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(ticket.ticket_id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Dropdown>
      {isSidebarOpen && (
        <AddTicketSidebar
          closeSidebar={() => setIsSidebarOpen(false)}
          ticketToEdit={ticketToEdit}
          refreshTickets={fetchTickets}
        />
      )}
    </>
  );
}

export default Ticketing;
