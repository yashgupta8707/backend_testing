const express = require("express");
const router = express.Router();
const AdmissionEnquiry = require("../models/Enquiry"); // ✅ Import the Model

// ✅ POST Route for Admission Enquiry
router.post("/admissionEnquiry", async (req, res) => {
  try {
    const { name, email, course, contact } = req.body;

    // Validate Input Fields
    if (!name || !email || !course || !contact) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // ✅ Save Enquiry to Database
    const newEnquiry = new AdmissionEnquiry({ name, email, course, contact });
    await newEnquiry.save();

    return res.status(201).json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("🔥 Server Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error, please try again." });
  }
});

router.get("/admissionEnquiry", async (req, res) => {
  try {
    const enquiries = await AdmissionEnquiry.find();
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries", error });
  }
});

router.delete("/admissionEnquiry/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEnquiry = await AdmissionEnquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }

    return res.status(200).json({ success: true, message: "Enquiry deleted successfully!" });
  } catch (error) {
    console.error("🔥 Server Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error, please try again." });
  }
});



module.exports = router;
