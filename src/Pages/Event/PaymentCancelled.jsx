"use client";
import { FaBan, FaRedo, FaHome } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../assets/Logo.svg";

function PaymentCancelled() {
  const navigate = useNavigate();
  const { transactionID } = useParams();
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transaction details from the backend
    const fetchTransactionDetails = async () => {
      try {
        if (transactionID) {
          const response = await axios.get(`/transaction/${transactionID}`);
          setTransactionDetails(response.data);
        } else {
          // If no transaction ID, use data from session storage
          const data = sessionStorage.getItem("registrationData");
          if (data) {
            setTransactionDetails({
              event_name: JSON.parse(data).selectedTicket?.name || "Event",
              event_date: "Upcoming Event",
              ticket_name: JSON.parse(data).selectedTicket?.name || "Ticket",
            });
          }
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transaction details.");
        setLoading(false);
      }
    };
    fetchTransactionDetails();
  }, [transactionID]);

  const handleRetryPayment = () => {
    navigate("/payment");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#90FF00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-[#90FF00] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src={Logo || "/placeholder.svg"}
            alt="Logo"
            className="h-12"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <div className="text-xl font-semibold">Payment Cancelled</div>
        </div>
      </header>

      <div className="container mx-auto flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
          <FaBan className="text-yellow-500 text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-xl mb-8">
            Your payment process was cancelled. You can try again whenever
            you're ready.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center justify-center"
              onClick={() => navigate("/")}
            >
              <FaHome className="mr-2" /> Back to Home
            </button>
            <button
              className="px-6 py-3 bg-[#90FF00] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00] flex items-center justify-center"
              onClick={handleRetryPayment}
            >
              <FaRedo className="mr-2" /> Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentCancelled;
