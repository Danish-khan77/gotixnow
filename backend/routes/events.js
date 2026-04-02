const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

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
    let { title, venue, date, vipPrice, regularPrice, city } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    vipPrice = vipPrice ? Number(vipPrice) : undefined;
    regularPrice = regularPrice ? Number(regularPrice) : undefined;

    if (regularPrice == null) {
      return res.status(400).json({
        success: false,
        message: "Regular price is required",
      });
    }

    const newEvent = new Event({
      title,
      venue,
      date: parsedDate,
      vipPrice,
      regularPrice,
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
      message: error.message,
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

/* ================= UPDATE EVENT ================= */

router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    let { title, venue, date, vipPrice, regularPrice, city } = req.body;

    const parsedDate = new Date(date);

    vipPrice = vipPrice ? Number(vipPrice) : undefined;
    regularPrice = regularPrice ? Number(regularPrice) : undefined;

    if (regularPrice == null) {
      return res.status(400).json({
        success: false,
        message: "Regular price is required",
      });
    }

    const updateData = {
      title,
      venue,
      date: parsedDate,
      vipPrice,
      regularPrice,
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

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

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

/* ================= GET EVENT BY ID ================= */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    const event = await Event.findById(id);

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

module.exports = router;
