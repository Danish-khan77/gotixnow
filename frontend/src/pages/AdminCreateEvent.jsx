import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function AdminCreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    date: "",
    price: "",
    city: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const showSnackbar = (msg, type = "success") => {
    setSnackbarMessage(msg);
    setSnackbarType(type);
    setOpenSnackbar(true);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        "https://gotixnow-backend.onrender.com/api/events/all",
      );
      const data = await res.json();
      setEvents(data.events || []);
    } catch {
      console.log("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (image) data.append("image", image);

    let url = "https://gotixnow-backend.onrender.com/api/events/create";
    let method = "POST";

    if (editId) {
      url = `https://gotixnow-backend.onrender.com/api/events/update/${editId}`;
      method = "PUT";
    }

    try {
      const res = await fetch(url, {
        method,
        body: data,
      });

      if (!res.ok) throw new Error();

      showSnackbar(
        editId
          ? "Event Updated Successfully 🎉"
          : "Event Created Successfully 🎉",
      );

      setFormData({
        title: "",
        venue: "",
        date: "",
        price: "",
        city: "",
      });

      setImage(null);
      setPreview(null);
      setEditId(null);

      fetchEvents();
    } catch {
      showSnackbar("Something went wrong ❌", "error");
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(
        `https://gotixnow-backend.onrender.com/api/events/${deleteId}`,
        {
          method: "DELETE",
        },
      );

      setDeleteOpen(false);
      fetchEvents();
      showSnackbar("Event Deleted Successfully 🗑");
    } catch {
      showSnackbar("Delete failed ❌", "error");
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      venue: event.venue,
      date: event.date.split("T")[0],
      price: event.price,
      city: event.city,
    });

    setPreview(`https://gotixnow-backend.onrender.com/uploads/${event.image}`);
    setEditId(event._id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
        p: 5,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={12}
          sx={{ p: 5, borderRadius: 4, background: "white", mb: 6 }}
        >
          <Typography variant="h4" textAlign="center" mb={4}>
            {editId ? "Edit Event" : "Create Event"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Event Title"
              name="title"
              margin="normal"
              value={formData.title}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Venue"
              name="venue"
              margin="normal"
              value={formData.venue}
              onChange={handleChange}
            />

            <TextField
              type="date"
              fullWidth
              name="date"
              margin="normal"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label="Price"
              name="price"
              margin="normal"
              value={formData.price}
              onChange={handleChange}
            />

            <TextField
              select
              fullWidth
              label="City"
              name="city"
              margin="normal"
              value={formData.city}
              onChange={handleChange}
            >
              <MenuItem value="Bhopal">Bhopal</MenuItem>
              <MenuItem value="Indore">Indore</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
            </TextField>

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 3 }}
            >
              Browse Event Image
              <input hidden type="file" onChange={handleImageChange} />
            </Button>

            {preview && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={preview}
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
                />
              </Box>
            )}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
              {editId ? "Save Changes" : "Create Event"}
            </Button>
          </form>
        </Paper>

        <Typography variant="h4" color="white" mb={4}>
          Manage Events
        </Typography>

        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={6} key={event._id}>
              <Card>
                <Box
                  component="img"
                  src={`https://gotixnow-backend.onrender.com/uploads/${event.image}`}
                  sx={{ width: "100%", height: 200, objectFit: "cover" }}
                />

                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>

                  <Typography>📍 {event.venue}</Typography>
                  <Typography>💰 ₹{event.price}</Typography>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={() => handleEdit(event)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => openDeleteDialog(event._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle>Delete Event</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this event?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>

            <Button color="error" variant="contained" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

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
      </Container>
    </Box>
  );
}

export default AdminCreateEvent;
