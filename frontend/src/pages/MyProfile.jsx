import { Box, Typography, Paper, Avatar, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const MyProfile = () => {
  const storedUser = localStorage.getItem("user");
  const user =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  if (!user) return null;

  const joinDate = new Date().toLocaleDateString();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 4,
          overflow: "hidden",
          background: "white",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            background: "linear-gradient(90deg,#6a11cb,#ff416c)",
            color: "white",
            textAlign: "center",
            p: 5,
          }}
        >
          <Avatar
            sx={{
              width: 110,
              height: 110,
              margin: "0 auto",
              background: "white",
              color: "#6a11cb",
              mb: 2,
            }}
          >
            <PersonIcon sx={{ fontSize: 60 }} />
          </Avatar>

          <Typography variant="h4" fontWeight={700}>
            {user.name}
          </Typography>

          <Typography sx={{ opacity: 0.9 }}>{user.email}</Typography>
        </Box>

        {/* DETAILS */}
        <Box sx={{ p: 5 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Account Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography color="text.secondary">Full Name</Typography>
                <Typography fontWeight={600} fontSize={18}>
                  {user.name}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography color="text.secondary">Email Address</Typography>
                <Typography fontWeight={600} fontSize={18}>
                  {user.email}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography color="text.secondary">User ID</Typography>
                <Typography fontSize={15} sx={{ wordBreak: "break-all" }}>
                  {user._id}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography color="text.secondary">Account Type</Typography>
                <Typography fontWeight={600} fontSize={18}>
                  Member
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography color="text.secondary">Member Since</Typography>
                <Typography fontWeight={600} fontSize={18}>
                  {joinDate}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography color="text.secondary">Account Status</Typography>
                <Typography fontWeight={600} fontSize={18}>
                  Active
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default MyProfile;
