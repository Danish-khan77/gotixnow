require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// 🔥 Connect Database
connectDB();

/* ================= CORS FIX ================= */

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://monumental-macaron-fa6c3a.netlify.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// 🔥 Explicitly allow preflight requests
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://monumental-macaron-fa6c3a.netlify.app",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ================= BODY PARSER ================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api", require("./routes/testRoutes"));

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

/* ================= SERVER START ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
