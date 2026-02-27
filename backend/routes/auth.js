/* Create imports */
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const { requireAuth } = require("../middleware/authMiddleware");

/* Create routes */
router.get("/", requireAuth, authControllers.getUser);
router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", requireAuth, authControllers.logout);

/* Create export */
module.exports = router;
