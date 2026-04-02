import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";

import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const currentRoute = useLocation().pathname;

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return null;

  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isHome = currentRoute === "/home";

  return (
    <>
      {/* NAVBAR */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "1200px",
            background: "white",
            borderRadius: "20px",
            px: 4,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          {/* LOGO */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          >
            <ConfirmationNumberIcon sx={{ color: "#e74c3c" }} />
            <Typography variant="h6" fontWeight={700}>
              <span style={{ color: "#e74c3c" }}>Gotix</span>
              <span style={{ color: "#2c7a7b" }}>Now</span>
            </Typography>
          </Box>

          {/* NAV BUTTONS */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Home */}
            <Button
              onClick={() => navigate("/home")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "20px",
                px: 3,
                background: isHome ? "#2c7a7b" : "#f5f5f5",
                color: isHome ? "white" : "#333",
                ":hover": {
                  background: isHome ? "#256d6d" : "#eaeaea",
                },
              }}
            >
              Home
            </Button>

            {/* Events */}
            {!isHome && (
              <Button
                onClick={() => navigate("/dashboard")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "20px",
                  px: 3,
                  background:
                    currentRoute === "/dashboard" ? "#2c7a7b" : "#f5f5f5",
                  color: currentRoute === "/dashboard" ? "white" : "#333",
                  ":hover": {
                    background:
                      currentRoute === "/dashboard" ? "#256d6d" : "#eaeaea",
                  },
                }}
              >
                Events
              </Button>
            )}

            {/* Admin */}
            {user.role === "admin" && (
              <Button
                onClick={() => navigate("/admin-create-event")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "20px",
                  px: 3,
                  background:
                    currentRoute === "/admin-create-event"
                      ? "#e74c3c"
                      : "#ffe5e0",
                  color:
                    currentRoute === "/admin-create-event"
                      ? "white"
                      : "#e74c3c",
                  ":hover": {
                    background:
                      currentRoute === "/admin-create-event"
                        ? "#c0392b"
                        : "#ffd6cf",
                  },
                }}
              >
                Admin
              </Button>
            )}
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isHome && (
              <>
                <IconButton
                  onClick={() => navigate("/bookings")}
                  sx={{
                    background: "#f5f5f5",
                    ":hover": { background: "#eee" },
                  }}
                >
                  <BookOnlineIcon />
                </IconButton>

                <IconButton
                  onClick={() => navigate("/profile")}
                  sx={{
                    background: "#f5f5f5",
                    ":hover": { background: "#eee" },
                  }}
                >
                  <PersonIcon />
                </IconButton>
              </>
            )}

            {/* Logout */}
            <Button
              onClick={() => setOpenDialog(true)}
              sx={{
                background: "black",
                color: "white",
                borderRadius: "30px",
                px: 3,
                fontWeight: 600,
                ":hover": {
                  background: "#333",
                },
              }}
            >
              LOGOUT
            </Button>
          </Box>
        </Box>
      </Box>

      {/* LOGOUT DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout from GotixNow?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
