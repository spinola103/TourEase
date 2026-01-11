const express = require("express");
const router = express.Router();

const { generateTrip } = require("../controllers/tripController");

router.post("/generate", generateTrip);

module.exports = router;
