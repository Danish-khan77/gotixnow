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
        background: "linear-gradient(135deg, #667eea, #764ba2, #6B73FF)",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.95)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Welcome Back 👋
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 3, color: "gray" }}
          >
            Login to continue your journey with GotixNow
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
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: 600,
                borderRadius: 3,
                background: "linear-gradient(90deg,#6a11cb,#ff416c)",
              }}
            >
              Login
            </Button>

            <Button
              fullWidth
              sx={{ mt: 2, fontWeight: 500 }}
              onClick={() => navigate("/register")}
            >
              Don’t have an account? Register
            </Button>
          </form>
        </Paper>
      </Container>

      {/* Snackbar UI Message */}
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
