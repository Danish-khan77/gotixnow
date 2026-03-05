const express = require("express");
const router = express.Router();

const {
  getBookedSeats,
  createBooking,
  getUserBookings,
} = require("../controllers/bookingController");

/* ==========================================
   GET ALL BOOKED SEATS FOR A SPECIFIC EVENT
========================================== */
router.get("/event/:eventId", getBookedSeats);

/* ==========================================
   CREATE BOOKING
========================================== */
router.post("/create", createBooking);

/* ==========================================
   GET ALL BOOKINGS OF A USER
========================================== */
router.get("/user/:userId", getUserBookings);

module.exports = router;
