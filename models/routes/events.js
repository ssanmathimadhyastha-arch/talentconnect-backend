const router = require("express").Router();
const Event = require("../models/Event");

router.post("/create", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json({ message: "Event created successfully" });
});

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post("/register/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  event.attendees.push(req.body.email);
  await event.save();
  res.json({ message: "Registered for event" });
});

module.exports = router;
