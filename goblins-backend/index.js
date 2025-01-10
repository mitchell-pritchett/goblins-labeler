const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const imagesRoutes = require("./routes/images");
const annotationsRoutes = require("./routes/annotations");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/images", imagesRoutes);
app.use("/api/annotations", annotationsRoutes);

// serving React frontend files
app.use(express.static(path.join(__dirname, "../goblins-frontend/build")));

// for non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../goblins-frontend/build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});