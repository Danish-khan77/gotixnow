import {
  AppBar,
  Toolbar,
  Typography,
  Box,
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
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg,#6a11cb,#ff416c)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 1,
            }}
            onClick={() => navigate("/home")}
          >
            🎟 GotixNow
          </Typography>

          {/* Right Side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Admin Panel */}
            {user.role === "admin" && (
              <Button
                color="inherit"
                onClick={() => navigate("/admin-create-event")}
              >
                Admin Panel
              </Button>
            )}

            {/* Show only after home */}
            {!isHome && (
              <>
                {/* My Bookings Icon */}
                <IconButton
                  color="inherit"
                  onClick={() => navigate("/bookings")}
                >
                  <BookOnlineIcon />
                </IconButton>

                {/* Profile Icon */}
                <IconButton
                  color="inherit"
                  onClick={() => navigate("/profile")}
                >
                  <PersonIcon />
                </IconButton>
              </>
            )}

            {/* Logout */}
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDialog(true)}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
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
