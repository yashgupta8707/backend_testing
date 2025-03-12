const express = require("express");
const Registration = require("../models/Register");

const router = express.Router();

// @route   POST /api/registerationThroughForm
// @desc    Save registration form data
// router.post("/", async (req, res) => {
//   try {
//     const formData = req.body;

//     // Check if email or phone already exists (optional validation)
//     const existingUser = await Registration.findOne({ email: formData.email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User with this email already exists!" });
//     }

//     // Save to the database
//     const newRegistration = new Registration(formData);
//     await newRegistration.save();

//     res.status(201).json({ message: "Registration successful!" });
//   } catch (error) {
//     console.error("Error saving registration:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);

    // 🔥 Handle missing required fields (Convert empty string to `undefined`)
    if (!req.body.gender || req.body.gender.trim() === "") {
      return res.status(400).json({ message: "Gender is required!" });
    }

    if (!req.body.firstName || req.body.firstName.trim() === "") {
      return res.status(400).json({ message: "First Name is required!" });
    }

    // ✅ Check if email already exists
    const existingUser = await Registration.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists!" });
    }

    // Save to database
    const newRegistration = new Registration(req.body);
    await newRegistration.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});
// Fetch all registered candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Registration.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a candidate by ID
router.delete("/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Candidate deleted successfully!" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;