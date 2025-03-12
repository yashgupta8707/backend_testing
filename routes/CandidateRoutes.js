const express = require("express");
const Candidate = require("../models/Candidate");

const router = express.Router();

// @route   POST /api/potentialCandidates
// @desc    Add a potential candidate
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, department, location, level } = req.body;

    // Check if the candidate already exists
    const existingCandidate = await Candidate.findOne({ phone });
    if (existingCandidate) {
      return res.status(400).json({ error: "Candidate with this phone number already exists!" });
    }

    const newCandidate = new Candidate({ name, phone, email, department, location, level });
    await newCandidate.save();

    res.status(201).json({ message: "Candidate registered successfully!" });
  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @route   GET /api/potentialCandidates
// @desc    Get all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @route   DELETE /api/potentialCandidates/:id
// @desc    Delete a candidate by ID
router.delete("/:id", async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Candidate deleted successfully!" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
