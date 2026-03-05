import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 6,
        p: 3,
        textAlign: "center",
        background: "linear-gradient(90deg,#6a11cb,#ff416c)",
      }}
    >
      <Typography>© 2026 GotixNow. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
