const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },

    // 🔥 Dynamic pricing
    vipPrice: { type: Number },
    regularPrice: { type: Number, required: true },

    city: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

// ✅ UPDATED VALIDATION
eventSchema.pre("save", function (next) {
  if (this.regularPrice == null) {
    return next(new Error("Regular price is required"));
  }
  // If no vipPrice, fallback to regularPrice
  if (this.vipPrice == null) {
    this.vipPrice = this.regularPrice;
  }
  next();
});

module.exports = mongoose.model("Event", eventSchema);
