import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context/LocationContext";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { location } = useContext(LocationContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  if (!location) {
    return <Navigate to="/home" replace />;
  }

  useEffect(() => {
    if (!location) return;

    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `https://gotixnow-backend.onrender.com/api/events?location=${location}`,
        );

        setEvents(res.data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [location]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f0f9ff,#e6f0ff)",
        p: 4,
      }}
    >
      {events.length === 0 ? (
        <Typography align="center">No events available.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {events.map((event) => {
            const date = new Date(event.date);

            return (
              <Box
                key={event._id}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  background: "white",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  ":hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                {/* IMAGE */}
                <Box
                  sx={{
                    height: "180px",
                    background: "#fafafa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`https://gotixnow-backend.onrender.com/uploads/${event.image}`}
                    alt={event.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "160px",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* CONTENT */}
                <Box sx={{ p: 2, flexGrow: 1 }}>
                  <Typography fontWeight={700} fontSize="18px">
                    {event.title}
                  </Typography>

                  <Typography mt={1} fontSize="14px">
                    📍 {event.venue}
                  </Typography>

                  <Typography mt={1} fontSize="13px" color="gray">
                    📅 {date.toDateString()}
                  </Typography>

                  <Typography mt={1} fontSize="13px" color="gray">
                    📌 {location}
                  </Typography>
                </Box>

                {/* FOOTER */}
                <Box
                  sx={{
                    p: 2,
                    borderTop: "1px solid #eee",
                  }}
                >
                  <Typography>
                    VIP: ₹{event.vipPrice ?? event.price} | Regular: ₹
                    {event.regularPrice ?? event.price}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 1,
                      background: "#000",
                      borderRadius: "20px",
                      ":hover": { background: "#333" },
                    }}
                    onClick={() => navigate(`/seats/${event._id}`)}
                  >
                    🎟 Book
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
