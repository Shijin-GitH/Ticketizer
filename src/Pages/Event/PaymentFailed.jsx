"use client"
import { FaTimesCircle, FaRedo, FaHome } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Logo from "../../assets/Logo.svg"

function PaymentFailed() {
  const navigate = useNavigate()
  const { transactionID } = useParams()
  const [transactionDetails, setTransactionDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch transaction details from the backend
    const fetchTransactionDetails = async () => {
      try {
        if (transactionID) {
          const response = await axios.get(`/transaction/${transactionID}`)
          setTransactionDetails(response.data)
        } else {
          // If no transaction ID, use data from session storage
          const data = sessionStorage.getItem("registrationData")
          if (data) {
            setTransactionDetails({
              event_name: JSON.parse(data).selectedTicket?.name || "Event",
              event_date: "Upcoming Event",
              ticket_name: JSON.parse(data).selectedTicket?.name || "Ticket",
            })
          }
        }
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch transaction details.")
        setLoading(false)
      }
    }
    fetchTransactionDetails()
  }, [transactionID])

  const handleRetryPayment = () => {
    navigate("/payment")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#90FF00]"></div>
      </div>
    )
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
          <div className="text-xl font-semibold">Payment Failed</div>
        </div>
      </header>

      <div className="container mx-auto flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
          <p className="text-xl mb-8">
            We were unable to process your payment. Please try again or use a different payment method.
          </p>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
            {error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <>
                {transactionID && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Transaction ID:</span>
                    <span>{transactionID}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Event:</span>
                  <span>{transactionDetails?.event_name || "Event"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Date:</span>
                  <span>{transactionDetails?.event_date || "Upcoming Event"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Ticket Type:</span>
                  <span>{transactionDetails?.ticket_name || "Ticket"}</span>
                </div>
              </>
            )}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-2">Possible Reasons for Failure:</h3>
            <ul className="text-left text-gray-300 list-disc pl-6 space-y-1">
              <li>Insufficient funds in your account</li>
              <li>Card declined by your bank</li>
              <li>Incorrect payment details</li>
              <li>Network or connectivity issues</li>
              <li>Transaction timeout</li>
            </ul>
          </div>

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
              <FaRedo className="mr-2" /> Retry Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailed

