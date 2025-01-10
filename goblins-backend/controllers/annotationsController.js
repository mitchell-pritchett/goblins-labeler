const fs = require("fs");
const path = require("path");
const { parse } = require("json2csv");
const annotationsFilePath = path.join(__dirname, "../data/annotations.json");


exports.submitAnnotations = (req, res) => {
  const annotations = req.body;
  const outputFilePath = path.join(__dirname, "../data/annotations.json");

  try {
    // Append to the JSON file
    const existingData = fs.existsSync(outputFilePath)
      ? JSON.parse(fs.readFileSync(outputFilePath, "utf-8"))
      : [];
    const updatedData = [...existingData, annotations];

    fs.writeFileSync(outputFilePath, JSON.stringify(updatedData, null, 2));
    res.status(200).send("Annotations saved successfully");
  } catch (error) {
    console.error("Error saving annotations:", error);
    res.status(500).send("Error saving annotations");
  }
};

exports.exportAnnotations = (req, res) => {
  try {
    if (!fs.existsSync(annotationsFilePath)) {
      return res.status(404).send("No annotations available to export.");
    }

    const annotationsData = JSON.parse(fs.readFileSync(annotationsFilePath, "utf8"));

    const flattenedData = annotationsData.flatMap((annotation) =>
      annotation.rectangles.map((rect) => ({
        id: annotation.id,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        transcription: rect.transcription,
        confidence: rect.confidence,
      }))
    );

    const fields = [
      "id",
      "x",
      "y",
      "width",
      "height",
      "transcription",
      "confidence",
    ];

    const csv = parse(flattenedData, { fields });

    res.header("Content-Type", "text/csv");
    res.attachment("annotations.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting annotations:", error);
    res.status(500).send("Failed to export annotations.");
  }
};
