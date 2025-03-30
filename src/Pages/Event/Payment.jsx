"use client";

import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCreditCard,
  FaPaypal,
  FaGooglePay,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg";

function Payment() {
  const [registrationData, setRegistrationData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Load registration data from sessionStorage
    const data = sessionStorage.getItem("registrationData");
    if (data) {
      setRegistrationData(JSON.parse(data));
    } else {
      // Redirect to registration if no data is found
      navigate("/register");
    }
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setCardDetails({
      ...cardDetails,
      [field]: value,
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate card details
    if (paymentMethod === "card") {
      if (
        !cardDetails.cardNumber ||
        !cardDetails.cardName ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv
      ) {
        alert("Please fill in all card details.");
        return;
      }
    }

    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentComplete(true);

      // Clear registration data after successful payment
      setTimeout(() => {
        sessionStorage.removeItem("registrationData");
        navigate("/payment-success");
      }, 2000);
    }, 2000);
  };

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#90FF00]"></div>
      </div>
    );
  }

  const { formValues, selectedTicket } = registrationData;

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
          <div className="text-xl font-semibold">Payment</div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-8">
          {["Personal Info", "Team Details", "Ticket Selection", "Payment"].map(
            (label, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index < 3 || isPaymentComplete
                        ? "bg-[#90FF00] text-black"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-2 text-sm">{label}</span>
                </div>
                {index < 3 && (
                  <div className="flex-1 h-1 bg-gray-700 mx-2">
                    <div
                      className={`h-full ${
                        index < 2 || isPaymentComplete
                          ? "bg-[#90FF00]"
                          : "bg-gray-700"
                      }`}
                      style={{
                        width: index < 2 || isPaymentComplete ? "100%" : "0%",
                      }}
                    ></div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {isPaymentComplete ? (
          <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
            <FaCheckCircle className="text-[#90FF00] text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-gray-400 mb-6">
              Your registration has been confirmed.
            </p>
            <p className="text-gray-400">Redirecting to confirmation page...</p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Order Summary */}
              <div className="md:col-span-1 bg-gray-900 rounded-lg border border-gray-800 p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="border-b border-gray-800 pb-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Ticket</span>
                    <span>{selectedTicket.name}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Price</span>
                    <span>₹ {selectedTicket.price}</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹ {selectedTicket.price}</span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="md:col-span-2 bg-gray-900 rounded-lg border border-gray-800 p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                {/* Payment Method Selection */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                      paymentMethod === "card"
                        ? "bg-[#90FF00] text-black"
                        : "bg-gray-800 text-white"
                    }`}
                    onClick={() => handlePaymentMethodChange("card")}
                  >
                    <FaCreditCard /> Credit Card
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                      paymentMethod === "paypal"
                        ? "bg-[#90FF00] text-black"
                        : "bg-gray-800 text-white"
                    }`}
                    onClick={() => handlePaymentMethodChange("paypal")}
                  >
                    <FaPaypal /> PayPal
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                      paymentMethod === "gpay"
                        ? "bg-[#90FF00] text-black"
                        : "bg-gray-800 text-white"
                    }`}
                    onClick={() => handlePaymentMethodChange("gpay")}
                  >
                    <FaGooglePay /> Google Pay
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={(e) =>
                            handleInputChange("cardNumber", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                          placeholder="John Doe"
                          value={cardDetails.cardName}
                          onChange={(e) =>
                            handleInputChange("cardName", e.target.value)
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={(e) =>
                              handleInputChange("expiryDate", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              handleInputChange("cvv", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {paymentMethod === "paypal" && (
                  <div className="text-center p-6">
                    <FaPaypal className="text-4xl mx-auto mb-4 text-blue-400" />
                    <p className="text-gray-400">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                  </div>
                )}

                {paymentMethod === "gpay" && (
                  <div className="text-center p-6">
                    <FaGooglePay className="text-4xl mx-auto mb-4 text-white" />
                    <p className="text-gray-400">
                      You will be redirected to Google Pay to complete your
                      payment.
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center"
                    onClick={() => navigate("/register")}
                    disabled={isProcessing}
                  >
                    <FaArrowLeft className="mr-2" /> Back
                  </button>
                  <button
                    className={`px-6 py-2 bg-[#90FF00] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00] flex items-center ${
                      isProcessing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleSubmit}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>Complete Payment</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
