import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createPayment, confirmDeposit } from "../services/api";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Payment() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, refreshUser } = useContext(AuthContext);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      setLoading(false);
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError("Failed to load Razorpay SDK. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await createPayment({ amount: parseFloat(amount) });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Investment Banking",
        description: "Deposit Funds",
        handler: async (response) => {
          try {
            await confirmDeposit({
              amount: parseFloat(amount),
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            await refreshUser();
            alert("Deposit successful!");
            setAmount("");
          } catch (error) {
            setError(
              error.response?.data?.message || "Payment confirmation failed"
            );
          }
        },
        prefill: {
          email: user?.email || "",
          name: user?.name || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="centered-message">Loading user data...</div>;
  }

  return (
    <div className="payment-container">
      <h2 className="section-title">Deposit Funds</h2>
      <p className="balance-text">
        Current Balance: ₹{user.balance ? user.balance.toFixed(2) : "0.00"}
      </p>
      <form onSubmit={handlePayment} className="form">
        <div className="form-group">
          <label className="form-label">Amount (INR):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input"
            required
            min="1"
            step="0.01"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

export default Payment;
