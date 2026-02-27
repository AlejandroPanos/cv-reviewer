/* Create imports */
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");

/* Create routes */
router.get("/", authControllers.getUser);
router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);

/* Create export */
module.exports = router;
