const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");

exports.getImages = (req, res) => {
  const results = [];
  const csvFilePath = path.join(__dirname, "../data/whiteboards.csv");

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", () => res.json(results))
    .on("error", (err) => {
      console.error("Error reading CSV:", err);
      res.status(500).send("Error reading CSV file");
    });
};