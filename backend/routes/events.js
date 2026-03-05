const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const Event = require("../models/Event");

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= CREATE EVENT ================= */

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, venue, date, price, city } = req.body;

    const newEvent = new Event({
      title,
      venue,
      date,
      price,
      city,
      image: req.file ? req.file.filename : null,
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error creating event",
    });
  }
});

/* ================= GET EVENTS BY CITY (USER) ================= */

router.get("/", async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }

    const events = await Event.find({
      city: location,
    });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events",
    });
  }
});

/* ================= GET ALL EVENTS (ADMIN) ================= */

router.get("/all", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("FETCH ALL ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events",
    });
  }
});

/* ================= GET EVENT BY ID ================= */

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("FETCH EVENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching event",
    });
  }
});

/* ================= UPDATE EVENT ================= */

router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, venue, date, price, city } = req.body;

    const updateData = {
      title,
      venue,
      date,
      price,
      city,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error updating event",
    });
  }
});

/* ================= DELETE EVENT ================= */

router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting event",
    });
  }
});

module.exports = router;
