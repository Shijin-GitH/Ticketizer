"use client"
import { FaCheckCircle, FaDownload, FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/Logo.svg"

function PaymentSuccess() {
  const navigate = useNavigate()

  // Generate a random confirmation number
  const confirmationNumber = Math.random().toString(36).substring(2, 10).toUpperCase()

  return (
    <div className="min-h-screen z-50 text-white">
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
          <div className="text-xl font-semibold">Registration Confirmed</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
          <FaCheckCircle className="text-[#90FF00] text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
          <p className="text-xl mb-8">Thank you for registering for the event.</p>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Confirmation Details</h2>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Confirmation Number:</span>
              <span>{confirmationNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Event:</span>
              <span>aanga</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Date:</span>
              <span>April 15-16, 2025</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Ticket Type:</span>
              <span>IEEE Members</span>
            </div>
          </div>

          <p className="mb-6 text-gray-400">
            A confirmation email has been sent to your registered email address with all the details.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center justify-center"
              onClick={() => window.print()}
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
  )
}

export default PaymentSuccess

