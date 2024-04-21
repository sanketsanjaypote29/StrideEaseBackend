const mongoose = require("mongoose");

const newEventSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  organiserName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  individualOrCompany: {
    type: String,
    enum: ["Individual", "Company"],
    required: true,
  },
  venueAddress: {
    type: String,
    required: true,
  },
  venueLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, // Store image URLs
    },
  ],
  ticketName: {
    type: String,
    required: true,
  },
  ticketType: {
    type: String,
    enum: ["Paid", "Free", "Donation"],
    required: true,
  },
  totalSlots: {
    type: Number,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  saleStartDate: {
    type: Date,
    required: true,
  },
  saleEndDate: {
    type: Date,
    required: true,
  },
  saleStartDate: { type: Date, required: true, default: Date.now },
  saleEndDate: { type: Date, required: true, default: Date.now },
});

const newEvent = mongoose.model("newEvent", newEventSchema);

module.exports = newEvent;
