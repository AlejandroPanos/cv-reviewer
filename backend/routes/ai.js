/* Create imports */
const express = require("express");
const router = express.Router();
const aiControllers = require("../controllers/ai");

/* Create routes */
router.post("/", aiControllers.generateReview);

/* Create export */
module.exports = router;
