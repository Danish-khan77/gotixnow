import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Chip, Stack } from "@mui/material";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `https://gotixnow-backend.onrender.com/api/bookings/user/${user._id}`,
        );

        setBookings(res.data.bookings);
      } catch (err) {
        console.log("Error fetching bookings");
      }
    };

    if (user) {
      fetchBookings();
    }
  }, []);

  return (
    <Box
      sx={{
        p: 5,
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 5,
          fontWeight: 700,
          color: "white",
        }}
      >
        🎟 My Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Typography color="white">No bookings yet.</Typography>
      ) : (
        bookings.map((booking) => (
          <Paper
            key={booking._id}
            elevation={10}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 4,
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.9)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 16,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              🎬 {booking.event?.title}
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "gray",
                mb: 2,
              }}
            >
              Booked on {new Date(booking.createdAt).toLocaleString()}
            </Typography>

            <Typography fontWeight={600} mb={1}>
              Seats
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
              {booking.seats.map((seat, index) => (
                <Chip
                  key={index}
                  label={`Seat ${seat}`}
                  sx={{
                    background: "linear-gradient(90deg,#6a11cb,#ff416c)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                color: "#6a11cb",
              }}
            >
              Amount Paid: ₹{booking.totalAmount}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default MyBookings;
