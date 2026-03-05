import { useContext, useState } from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { LocationContext } from "../context/LocationContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "#1e1e2f",
  color: "white",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const indianDistricts = [
  "Agra",
  "Ahmedabad",
  "Ajmer",
  "Alappuzha",
  "Aligarh",
  "Allahabad",
  "Amritsar",
  "Anantapur",
  "Aurangabad",
  "Bangalore",
  "Bareilly",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Darjeeling",
  "Dehradun",
  "Delhi",
  "Dhanbad",
  "Ernakulam",
  "Faridabad",
  "Gaya",
  "Ghaziabad",
  "Guntur",
  "Gurgaon",
  "Guwahati",
  "Gwalior",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Jalandhar",
  "Jammu",
  "Jamshedpur",
  "Jhansi",
  "Jodhpur",
  "Kanpur",
  "Kochi",
  "Kolkata",
  "Kota",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Meerut",
  "Mumbai",
  "Mysore",
  "Nagpur",
  "Nashik",
  "Noida",
  "Patna",
  "Pune",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Shimla",
  "Surat",
  "Thane",
  "Trichy",
  "Udaipur",
  "Vadodara",
  "Varanasi",
  "Vijayawada",
  "Visakhapatnam",
].sort();

function LocationSelector() {
  const { city, setCity } = useContext(LocationContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      );

      const data = await res.json();
      const detectedCity =
        data.address.city || data.address.town || data.address.state;

      setCity(detectedCity);
      setOpen(false);
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const match = indianDistricts.find(
      (district) => district.toLowerCase() === value.toLowerCase(),
    );

    if (match) {
      setCity(match);
    }
  };

  const filteredDistricts = indianDistricts.filter((district) =>
    district.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Navbar Button */}
      <Box
        onClick={() => setOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          background: "rgba(255,255,255,0.15)",
          px: 2,
          py: 1,
          borderRadius: "20px",
          transition: "0.3s",
          "&:hover": { background: "rgba(255,255,255,0.3)" },
        }}
      >
        <RoomIcon sx={{ mr: 1 }} />
        <Typography>{city ? city : "Select City"}</Typography>
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Select Your City
          </Typography>

          {/* Detect Button */}
          <Button
            fullWidth
            startIcon={<MyLocationIcon />}
            sx={{
              mb: 2,
              background: "linear-gradient(90deg,#6a11cb,#ff416c)",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={detectLocation}
          >
            Detect My Current Location
          </Button>

          {/* Search Field */}
          <TextField
            fullWidth
            placeholder="Search city..."
            variant="outlined"
            size="small"
            value={search}
            sx={{
              mb: 2,
              background: "white",
              borderRadius: "5px",
              "& input": {
                color: "black",
              },
            }}
            InputProps={{
              style: { color: "black" },
            }}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (search) {
                  setCity(search);
                  setOpen(false);
                }
              }
            }}
          />

          {/* City List */}
          <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((district) => (
                <Typography
                  key={district}
                  sx={{
                    p: 1,
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "0.2s",
                    "&:hover": {
                      background: "linear-gradient(90deg,#6a11cb,#ff416c)",
                    },
                  }}
                  onClick={() => {
                    setCity(district);
                    setOpen(false);
                  }}
                >
                  {district}
                </Typography>
              ))
            ) : (
              <Typography sx={{ color: "gray", mt: 1 }}>
                No results found
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default LocationSelector;
