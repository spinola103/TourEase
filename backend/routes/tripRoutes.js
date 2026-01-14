const express = require("express");
const router = express.Router();

const {
  generateTrip,
  refineTrip,
} = require("../controllers/tripController");

router.post("/generate", generateTrip);
router.post("/refine", refineTrip);

module.exports = router;
