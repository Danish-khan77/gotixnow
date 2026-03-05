import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifySuccess = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ IMPORTANT FIX
    localStorage.removeItem("user");

    setTimeout(() => {
      setAnimate(true);
    }, 200);

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
        color: "white",
        textAlign: "center",
      }}
    >
      <CheckCircleIcon
        sx={{
          fontSize: 110,
          transform: animate ? "scale(1)" : "scale(0)",
          transition: "all 0.6s ease-in-out",
        }}
      />

      <Typography
        variant="h4"
        sx={{
          mt: 3,
          opacity: animate ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        Email Verified Successfully 🎉
      </Typography>

      <Typography
        sx={{
          mt: 1,
          opacity: animate ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      >
        Redirecting to Login...
      </Typography>
    </Box>
  );
};

export default VerifySuccess;
