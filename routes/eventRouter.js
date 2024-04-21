const express = require("express");
const router = express.Router();
const newEvent = require("../models/newEventSchema");
const Event = require("../models/newEventSchema");
// Route for fetching all events
router.get("/events", async (req, res) => {
  try {
    const events = await newEvent.find({});

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json({ message: "Events found", events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await newEvent.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event found", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/events/googleId/:googleId", async (req, res) => {
  try {
    const googleId = req.params.googleId;
    console.log(googleId);
    const events = await Event.find({ googleId });

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for the specified Google ID" });
    }

    res.status(200).json({ message: "Events found", events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/events/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const eventDataToUpdate = req.body;
  console.log(eventDataToUpdate);
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      eventDataToUpdate,
      { new: true }
    );
    res.json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, message: "Failed to update event" });
  }
});
module.exports = router;
