import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function SeatGrid() {
  const navigate = useNavigate();
  const { id } = useParams();

  const rows = 10;
  const cols = 10;
  const totalSeats = rows * cols;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [event, setEvent] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (!id || id === "all" || id === "undefined") return;

    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `https://gotixnow-backend.onrender.com/api/events/${id}`,
        );
        setEvent(res.data.event);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvent();
  }, [id]);

  const fetchBookedSeats = async () => {
    try {
      const res = await axios.get(
        `https://gotixnow-backend.onrender.com/api/bookings/event/${id}`,
      );
      setBookedSeats(res.data.bookedSeats || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookedSeats();
  }, [id]);

  const getSeatPrice = (seatNumber) => {
    if (!event) return 0;

    if (event.vipPrice != null && event.regularPrice != null) {
      return seatNumber <= 20
        ? Number(event.vipPrice)
        : Number(event.regularPrice);
    }

    return Number(event.price) || 0;
  };

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber],
    );
  };

  const totalAmount = selectedSeats.reduce(
    (sum, seat) => sum + getSeatPrice(seat),
    0,
  );

  // ✅ Only change: navigate to payment page
  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      user = null;
    }

    if (!user || !user._id) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    navigate("/payment", {
      state: {
        user: user._id,
        event: id,
        seats: selectedSeats,
        totalAmount,
      },
    });
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        🎟 {event?.title}
      </h2>

      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          padding: "12px",
          background: "linear-gradient(90deg,#6a11cb,#ff416c)",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        🎬 SCREEN THIS SIDE
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "12px",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {Array.from({ length: totalSeats }, (_, i) => {
          const seatNumber = i + 1;
          const rowLetter = String.fromCharCode(65 + Math.floor(i / cols));
          const seatLabel = `${rowLetter}${(i % cols) + 1}`;

          const isSelected = selectedSeats.includes(seatNumber);
          const isVIP = seatNumber <= 20;
          const isBooked = bookedSeats.includes(seatNumber);

          return (
            <div
              key={seatNumber}
              onClick={() => toggleSeat(seatNumber)}
              style={{
                height: "45px",
                backgroundColor: isBooked
                  ? "#555"
                  : isSelected
                    ? "#ff416c"
                    : isVIP
                      ? "#6a11cb"
                      : "#1e293b",
                opacity: isBooked ? 0.5 : 1,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                cursor: isBooked ? "not-allowed" : "pointer",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {seatLabel}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <h3>Selected Seats:</h3>
        <p>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</p>
        <h2>Total Amount: ₹{totalAmount}</h2>

        <button
          onClick={handleProceed}
          style={{
            marginTop: "20px",
            padding: "14px 25px",
            background: "linear-gradient(90deg,#6a11cb,#ff416c)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            width: "100%",
          }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default SeatGrid;
