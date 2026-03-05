const express = require("express");
const router = express.Router();

const authController = require("../controllers/authControllers.js");

router.post("/register", authController.registerUser);
router.get("/verify/:token", authController.verifyEmail);
router.post("/login", authController.loginUser);

module.exports = router;
