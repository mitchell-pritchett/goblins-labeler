const express = require("express");
const router = express.Router();
const { parse } = require("fast-csv");

const {
  submitAnnotations,
  exportAnnotations,
} = require("../controllers/annotationsController");

router.post("/submit", submitAnnotations);
router.get("/export", exportAnnotations);

module.exports = router;