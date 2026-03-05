import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Payment({ selectedEvent }) {
  const { user } = useContext(AuthContext);

  const handleBooking = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings/create",
        {
          userId: user.id, // from login
          eventId: selectedEvent._id,
          seats: 2,
          totalAmount: 1000,
        },
      );

      alert("Booking Successful 🎉");
      console.log(res.data);
    } catch (err) {
      alert("Booking Failed ❌");
    }
  };

  return (
    <div>
      <h2>Payment Page 💳</h2>
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default Payment;
