import { useContext, useEffect } from "react";
import { LocationContext } from "../context/LocationContext";
import {
  Box,
  Typography,
  Button,
  Paper,
  MenuItem,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { location, setLocation, districts } = useContext(LocationContext);
  const navigate = useNavigate();

  // 🔒 Disable browser back button on Home
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
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        background: "linear-gradient(135deg, #667eea, #764ba2, #6B73FF)",
        px: 3,
      }}
    >
      {/* Hero Section */}
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
        GotixNow 🎟
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
        Book Events. Experience Moments.
      </Typography>

      {/* Location Selection Card */}
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "white",
          color: "#333",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h6" mb={2}>
          Select Your District 📍
        </Typography>

        <TextField
          select
          fullWidth
          label="Choose District"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 3 }}
        >
          {districts.map((district) => (
            <MenuItem key={district} value={district}>
              {district}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          fullWidth
          disabled={!location}
          onClick={handleContinue}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Explore Events
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
