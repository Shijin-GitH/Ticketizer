import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      try {
        const response = await axios.get("/payment_callback");
        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url; // Redirect to success page
        } else {
          navigate("/payment-failed"); // Handle failure case
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        navigate("/payment-failed");
      }
    };

    fetchTransactionStatus();
  }, [navigate]);

  return <h2>Processing Payment...</h2>;
};

export default PaymentCallback;
