import { useContext, useEffect } from "react";
import { LocationContext } from "../context/LocationContext";
import { Box, Typography, Button, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const Home = () => {
  const { location, setLocation, districts } = useContext(LocationContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handleBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleContinue = () => {
    if (!location) return;
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          height: "500px",
          display: "flex",
          borderRadius: 5,
          overflow: "hidden",
          boxShadow: "0 25px 70px rgba(0,0,0,0.2)",
          background: "white",
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            width: "50%",
            background: "#f1f1f1",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* COLORED LOGO + ICON */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ConfirmationNumberIcon sx={{ color: "#e74c3c", fontSize: 32 }} />
            <Typography variant="h4" fontWeight={700}>
              <span style={{ color: "#e74c3c" }}>Gotix</span>
              <span style={{ color: "#2c7a7b" }}>Now</span>
            </Typography>
          </Box>

          <Typography mt={2} color="text.secondary">
            Book Events. Experience Moments.
          </Typography>

          <Typography mt={5} fontWeight={600}>
            Select Your District 📍
          </Typography>

          <TextField
            select
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{
              mt: 2,
              background: "white",
              borderRadius: 1,
            }}
          >
            {districts.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* RIGHT PANEL */}
        <Box
          sx={{
            width: "50%",
            background: "#e74c3c",
            color: "white",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" fontWeight={700}>
            Discover Events
          </Typography>

          <Typography mt={2}>
            Choose your location and explore amazing events happening around
            you.
          </Typography>

          <Button
            variant="contained"
            onClick={handleContinue}
            disabled={!location}
            sx={{
              mt: 5,
              background: "black",
              borderRadius: "30px",
              px: 4,
              fontWeight: 600,
              ":hover": {
                background: "#333",
              },
            }}
          >
            EXPLORE EVENTS
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
