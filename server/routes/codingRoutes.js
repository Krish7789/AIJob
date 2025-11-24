// server/routes/codingRoutes.js
const express = require("express");
const router = express.Router();
const {
  getCodingQuestions,
  submitSolution,
} = require("../controllers/codingController");

router.get("/coding-questions", getCodingQuestions);
router.post("/coding-questions/:id/submit", submitSolution);

module.exports = router;
