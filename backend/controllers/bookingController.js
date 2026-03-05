const Booking = require("../models/Booking");
const { sendEmail } = require("../utils/emailService");

/* ==========================================
   GET ALL BOOKED SEATS FOR A SPECIFIC EVENT
========================================== */
const getBookedSeats = async (req, res) => {
  try {
    const { eventId } = req.params;

    const bookings = await Booking.find({ event: eventId });

    const bookedSeats = bookings.flatMap((booking) =>
      booking.seats.map(Number),
    );

    res.status(200).json({
      success: true,
      bookedSeats,
    });
  } catch (error) {
    console.error("FETCH BOOKED SEATS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching booked seats",
    });
  }
};

/* ==========================================
   CREATE BOOKING
========================================== */
const createBooking = async (req, res) => {
  try {
    const { user, event, seats, totalAmount, email } = req.body;

    if (!user || !event || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking data",
      });
    }

    const normalizedSeats = seats.map(Number);

    const existingBookings = await Booking.find({ event });

    const bookedSeats = existingBookings.flatMap((booking) =>
      booking.seats.map(Number),
    );

    const conflictSeats = normalizedSeats.filter((seat) =>
      bookedSeats.includes(seat),
    );

    if (conflictSeats.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Seats already booked: ${conflictSeats.join(", ")}`,
      });
    }

    const newBooking = new Booking({
      user,
      event,
      seats: normalizedSeats,
      totalAmount,
    });

    await newBooking.save();

    /* ========= SEND EMAIL ========= */
    if (email) {
      const htmlContent = `
        <h2>🎟️ Booking Confirmed</h2>
        <p>Your booking has been successfully completed.</p>
        <p><b>Seats:</b> ${normalizedSeats.join(", ")}</p>
        <p><b>Total Amount:</b> ₹${totalAmount}</p>
        <p>Thank you for using GotixNow.</p>
      `;

      try {
        await sendEmail(email, "GotixNow Ticket Confirmation 🎟️", htmlContent);
      } catch (emailError) {
        console.error("EMAIL SEND ERROR:", emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: "Booking successful",
      booking: newBooking,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error creating booking",
    });
  }
};

/* ==========================================
   GET BOOKINGS OF A USER
========================================== */
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ user: userId })
      .populate("event")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("GET USER BOOKINGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
    });
  }
};

module.exports = {
  getBookedSeats,
  createBooking,
  getUserBookings,
};
