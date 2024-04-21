const express = require("express");
const router = express.Router();
const newEvent = require("../models/newEventSchema");

// Route for creating a new event
router.post("/create", async (req, res) => {
  try {
    const eventData = req.body; // Assuming form data is sent in the request body

    // Create a new instance of the newEvent model with the received data
    const event = new newEvent(eventData);

    // Save the event to the database
    await event.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/events', async (req, res) => {
  try {
    const events = await newEvent.find({});

    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }

    res.status(200).json({ message: 'Events found', events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
