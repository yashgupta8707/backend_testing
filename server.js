  const express = require("express");
  const mongoose = require("mongoose");
  const dotenv = require("dotenv");
  const cors = require("cors");
  const bodyParser = require("body-parser");

  // ✅ Load environment variables
  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors());
  app.use(bodyParser.json());


// ✅ Enable Debug Mode for MongoDB
mongoose.set('debug', true);

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit if MongoDB fails to connect
  }
};

  // ✅ Import Routes (Only Once)
  const authRoutes = require("./routes/authRoutes"); 
  const candidateRoutes = require("./routes/CandidateRoutes");
  const contactRoutes = require("./routes/ContactRoutes");
  const enquiryRoutes = require("./routes/EnquiryRoutes");
  const registeredRoute = require("./routes/RegisteredForm");

  // ✅ Define Routes
  app.use("/api/auth", authRoutes); 
  app.use("/api/potentialCandidates", candidateRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/enquiries", enquiryRoutes);
  app.use("/api/registrationThroughForm", registeredRoute);


  app.get("/", (req, res) => {
    res.send("Hello MERN!");
  });

// Connect to DB first, then start the server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});