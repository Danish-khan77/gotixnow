const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    city: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
