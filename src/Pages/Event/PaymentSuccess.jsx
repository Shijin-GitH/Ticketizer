"use client";
import { FaCheckCircle, FaDownload, FaHome } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { toBlob } from "html-to-image";
import LoadingSpinner from "../../Components/LoadingSpinner";

function PaymentSuccess() {
  const navigate = useNavigate();
  const { transactionID } = useParams();
  console.log(transactionID);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transaction details from the backend
    const fetchTransactionDetails = async () => {
      try {
        const response = await axios.get(`/transaction/${transactionID}`);
        setTransactionDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transaction details.");
        setLoading(false);
      }
    };
    fetchTransactionDetails();
  }, [transactionID]);

  const handleDownloadTicket = () => {
    const container = document.getElementById("ticket-container");
    if (container) {
      toBlob(container, {
        width: container.scrollWidth,
        height: container.scrollHeight,
        backgroundColor: "#1a202c",
      })
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "ticket.png";
          link.click();
        })
        .catch((err) => {
          console.error("Failed to capture ticket as image:", err);
        });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="h-screen w-screen z-50 text-white flex flex-col items-center">
      {/* Header */}
      <header className="bg-black border-b w-full border-[#90FF00] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src={Logo || "/placeholder.svg"}
            alt="Logo"
            className="h-12"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <div className="text-xl font-semibold">Registration Confirmed</div>
        </div>
      </header>

      <div className="container flex justify-center px-4 py-12">
        <div
          id="ticket-container"
          className="max-w-2xl bg-gray-900 rounded-lg border border-gray-800 p-8 text-center"
        >
          <FaCheckCircle className="text-[#90FF00] text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
          <p className="text-xl mb-8">
            Thank you for registering for the event.
          </p>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Confirmation Details</h2>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Confirmation Number:</span>
              <span>{transactionID}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Event:</span>
              <span>{transactionDetails?.event_name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Date:</span>
              <span>{transactionDetails?.event_date}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Ticket Type:</span>
              <span>{transactionDetails?.ticket_name}</span>
            </div>
          </div>

          <p className="mb-6 text-gray-400">
            A confirmation email has been sent to your registered email address
            with all the details.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center justify-center"
              onClick={handleDownloadTicket}
            >
              <FaDownload className="mr-2" /> Download Ticket
            </button>
            <button
              className="px-6 py-3 bg-[#90FF00] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00] flex items-center justify-center"
              onClick={() => navigate("/")}
            >
              <FaHome className="mr-2" /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
