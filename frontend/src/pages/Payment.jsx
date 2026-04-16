import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, event, seats, totalAmount } = location.state || {};

  const [method, setMethod] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔒 Protect route (no direct access)
  useEffect(() => {
    if (!location.state) {
      navigate("/home");
    }
  }, [location, navigate]);

  const handlePayment = async () => {
    if (!method) {
      alert("Select payment method");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://gotixnow-backend.onrender.com/api/bookings/create",
        {
          user,
          event,
          seats,
          totalAmount,
        },
      );

      if (res.data.success) {
        setShowPopup(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        💳 Secure Payment
      </h2>

      <div
        style={{
          maxWidth: "420px",
          margin: "auto",
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Total Amount: ₹{totalAmount}</h3>

        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Select Payment Method:
        </p>

        {/* Payment Options */}
        {["UPI", "Card", "NetBanking"].map((type) => (
          <label
            key={type}
            style={{
              display: "block",
              padding: "12px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              background: method === type ? "#e0f2fe" : "white",
              transition: "0.2s",
            }}
          >
            <input
              type="radio"
              name="payment"
              value={type}
              onChange={(e) => setMethod(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            {type}
          </label>
        ))}

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "14px",
            background: loading
              ? "#999"
              : "linear-gradient(90deg,#6a11cb,#ff416c)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              width: "320px",
              animation: "scaleIn 0.3s ease",
            }}
          >
            <h2 style={{ color: "green" }}>✅ Success</h2>
            <p style={{ marginTop: "10px" }}>
              Payment Successful & Booking Confirmed!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
