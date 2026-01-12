const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

module.exports = router;



