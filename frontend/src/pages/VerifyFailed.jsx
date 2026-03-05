import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const VerifyFailed = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f44336, #b71c1c)",
        color: "white",
        textAlign: "center",
      }}
    >
      <ErrorIcon sx={{ fontSize: 100 }} />

      <Typography variant="h4" sx={{ mt: 2 }}>
        Invalid or Expired Link ❌
      </Typography>

      <Typography sx={{ mt: 1 }}>Please register again.</Typography>
    </Box>
  );
};

export default VerifyFailed;
