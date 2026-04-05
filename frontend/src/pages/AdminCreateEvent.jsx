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

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://monumental-macaron-fa6c3a.onrender.com";

function AdminCreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    date: "",
    vipPrice: "",
    regularPrice: "",
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
      const res = await fetch(`${API_BASE}/api/events/all`);
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

    // ✅ Frontend validation
    if (!formData.title || !formData.date || !formData.city) {
      showSnackbar("Title, date and city are required ❌", "error");
      return;
    }
    if (!formData.regularPrice) {
      showSnackbar("Regular price is required ❌", "error");
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "") {
        data.append(key, formData[key]);
      }
    });

    if (image) data.append("image", image);

    let url = `${API_BASE}/api/events/create`;
    let method = "POST";

    if (editId) {
      url = `${API_BASE}/api/events/update/${editId}`;
      method = "PUT";
    }

    try {
      const res = await fetch(url, {
        method,
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      showSnackbar(
        editId
          ? "Event Updated Successfully 🎉"
          : "Event Created Successfully 🎉",
      );

      setFormData({
        title: "",
        venue: "",
        date: "",
        vipPrice: "",
        regularPrice: "",
        city: "",
      });

      setImage(null);
      setPreview(null);
      setEditId(null);

      fetchEvents();
    } catch (error) {
      showSnackbar(error.message || "Something went wrong ❌", "error");
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/events/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

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
      vipPrice: event.vipPrice ?? "",
      regularPrice: event.regularPrice ?? "",
      city: event.city,
    });

    setPreview(event.image ? `${API_BASE}/uploads/${event.image}` : null);
    setEditId(event._id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#1f4037,#99f2c8)",
        p: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: "20px 0 0 20px" }}>
              <Typography variant="h5" fontWeight="bold" mb={3}>
                {editId ? "Edit Event" : "Create Event"}
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Title"
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
                  label="VIP Price"
                  name="vipPrice"
                  margin="normal"
                  value={formData.vipPrice}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Regular Price *"
                  name="regularPrice"
                  margin="normal"
                  value={formData.regularPrice}
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
                  sx={{ mt: 2 }}
                >
                  Upload Image
                  <input hidden type="file" onChange={handleImageChange} />
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, borderRadius: "30px", background: "#ff4b2b" }}
                >
                  {editId ? "Update Event" : "Create Event"}
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: "#ff4b2b",
                color: "white",
                p: 4,
                borderRadius: "0 20px 20px 0",
              }}
            >
              <Typography variant="h4">Preview</Typography>
              {preview && (
                <img
                  src={preview}
                  style={{ width: "100%", marginTop: 20, borderRadius: 12 }}
                />
              )}
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h4" mt={6} mb={3} color="white">
          Manage Events
        </Typography>

        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={4} key={event._id}>
              <Card sx={{ borderRadius: 4 }}>
                <Box
                  component="img"
                  src={
                    event.image
                      ? `${API_BASE}/uploads/${event.image}`
                      : "/placeholder.jpg"
                  }
                  sx={{ height: 180, width: "100%", objectFit: "cover" }}
                />

                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography>📍 {event.venue}</Typography>

                  <Typography>
                    VIP: ₹{event.vipPrice ?? event.regularPrice} | Regular: ₹
                    {event.regularPrice}
                  </Typography>

                  <Box display="flex" justifyContent="flex-end">
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
            <DialogContentText>Are you sure?</DialogContentText>
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
        >
          <Alert severity={snackbarType}>{snackbarMessage}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default AdminCreateEvent;
