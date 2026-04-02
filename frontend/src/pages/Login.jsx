import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showSnackbar = (msg, type = "success") => {
    setSnackbarMessage(msg);
    setSnackbarType(type);
    setOpenSnackbar(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://gotixnow-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!data.user) {
        showSnackbar(data.message || "Invalid credentials ❌", "error");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      showSnackbar("Login successful 🎉");

      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } catch (error) {
      console.error("Login Error:", error);
      showSnackbar("Server not responding ❌", "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#e74c3c,#2c7a7b,#e6b566)",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          sx={{
            p: 5,
            borderRadius: 4,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 800,
              color: "#e74c3c",
              letterSpacing: 1,
            }}
          >
            GotixNow
          </Typography>

          <Typography align="center" sx={{ mt: 1, mb: 3, color: "gray" }}>
            Welcome back, login to continue
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                fontWeight: 700,
                borderRadius: "30px",
                background: "#e74c3c",
                color: "white",
                ":hover": {
                  background: "#c0392b",
                },
              }}
            >
              Login
            </Button>

            <Button
              fullWidth
              sx={{ mt: 2, color: "#2c7a7b", fontWeight: 600 }}
              onClick={() => navigate("/register")}
            >
              Don’t have an account? Register
            </Button>
          </form>
        </Paper>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
