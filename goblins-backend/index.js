const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const imagesRoutes = require("./routes/images");
const annotationsRoutes = require("./routes/annotations");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/images", imagesRoutes);
app.use("/api/annotations", annotationsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});