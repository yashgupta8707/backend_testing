const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// @route   POST /api/contact
// @desc    Save contact form data
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newContact = new Contact({ name, phone, email, message });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
