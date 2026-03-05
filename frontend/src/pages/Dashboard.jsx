import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context/LocationContext";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
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
        p: 5,
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
        backgroundSize: "200% 200%",
        animation: "bgMove 12s ease infinite",

        "@keyframes bgMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Typography variant="h4" mb={4} fontWeight={700} color="white">
        📍 Events in {location}
      </Typography>

      {events.length === 0 ? (
        <Typography color="white">No events available.</Typography>
      ) : (
        <Grid container spacing={4}>
          {events.map((event) => {
            const date = new Date(event.date);
            const day = date.getDate();
            const month = date.toLocaleString("default", { month: "short" });

            return (
              <Grid item xs={12} md={6} key={event._id}>
                <Card
                  elevation={8}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "0.3s",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 16,
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    {/* IMAGE FIX */}
                    <Box
                      sx={{
                        width: "100%",
                        height: 220,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f5f5f5",
                      }}
                    >
                      <img
                        src={`https://gotixnow-backend.onrender.com/uploads/${event.image}`}
                        alt={event.title}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    {/* Date Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        left: 15,
                        background: "white",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        textAlign: "center",
                        boxShadow: 3,
                      }}
                    >
                      <Typography fontWeight="bold">{day}</Typography>
                      <Typography fontSize="12px">{month}</Typography>
                    </Box>

                    {/* Price Badge */}
                    <Chip
                      label={`₹${event.price}`}
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        background: "linear-gradient(90deg,#ff416c,#ff4b2b)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography variant="h6" fontWeight={700}>
                      {event.title}
                    </Typography>

                    <Typography mt={1} color="text.secondary">
                      📅{" "}
                      {date.toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Typography>

                    <Typography mt={1} color="text.secondary">
                      📍 {event.venue}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 3,
                        borderRadius: 3,
                        fontWeight: 600,
                        background: "linear-gradient(90deg,#ff416c,#ff4b2b)",
                      }}
                      onClick={() => navigate(`/seats/${event._id}`)}
                    >
                      🎟 Book Tickets
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
