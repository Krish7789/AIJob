const express = require("express");
const router = express.Router();
const { handleCompanyPack } = require("../controllers/comapanyControllers");

router.post("/company-pack", handleCompanyPack);

module.exports = router;
