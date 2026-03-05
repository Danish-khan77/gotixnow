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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      const res = await fetch(
        "https://gotixnow-backend.onrender.com/api/auth/register", // ✅ fixed backend URL
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
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <Paper elevation={6} sx={{ p: 5, width: 400, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} mb={3} textAlign="center">
          Create Account
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.2, fontWeight: 600 }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography mt={3} textAlign="center">
          Already have an account?{" "}
          <span
            style={{
              color: "#6c63ff",
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
