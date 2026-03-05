import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import SeatGrid from "../components/SeatGrid";

function EventDetails() {
  const { id } = useParams();

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Event ID: {id}
      </Typography>

      <Typography sx={{ mb: 3 }}>Select your seats below:</Typography>

      <SeatGrid totalSeats={40} />
    </Container>
  );
}

export default EventDetails;
