import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // ✅ added

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true); // ✅ start loading

      const res = await fetch(
        "https://gotixnow-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful 🎉\nCheck your email to verify.");

      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      alert(error.message || "Server not responding");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#e74c3c,#2c7a7b,#e6b566)",
        px: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: "420px",
          borderRadius: 4,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
        }}
      >
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
          Create your account 🚀
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={form.password}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <Button
          fullWidth
          disabled={loading} // ✅ prevent multiple clicks
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
          onClick={handleRegister}
        >
          {loading ? "Registering..." : "Register"} {/* ✅ UX improvement */}
        </Button>

        <Typography mt={3} textAlign="center">
          Already have an account?{" "}
          <span
            style={{
              color: "#2c7a7b",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
