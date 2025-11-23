const express = require("express");
const { handleInterview } = require("../controllers/interviewController");
const router = express.Router();

router.post("/interview", handleInterview);
router.get("/start-interview", (req, res) => {
  res.json({
    firstQuestion: "Tell me about yourself."
  });
});


module.exports = router;
