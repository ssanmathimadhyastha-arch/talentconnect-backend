const router = require("express").Router();
const Event = require("../modules/Event");

router.post("/create", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json({ message: "Event created successfully" });
});

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

module.exports = router;
