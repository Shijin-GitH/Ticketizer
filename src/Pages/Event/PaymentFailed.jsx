"use client";
import { FaTimesCircle, FaRedo, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg";

function PaymentFailed() {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-[#FF0000] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src={Logo || "/placeholder.svg"}
            alt="Logo"
            className="h-12"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <div className="text-xl font-semibold">Payment Failed</div>
        </div>
      </header>

      <div className="container mx-auto flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
          <p className="text-xl mb-8">
            Your payment process failed. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center justify-center"
              onClick={() => navigate("/")}
            >
              <FaHome className="mr-2" /> Back to Home
            </button>
            <button
              className="px-6 py-3 bg-[#FF0000] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#FF0000] flex items-center justify-center"
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

export default PaymentFailed;
