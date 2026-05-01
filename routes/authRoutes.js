const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const {
registerUser,
loginUser
} = require("../controllers/authController");

/* REGISTER */
router.post(
"/register",
[
body("name").notEmpty().withMessage("Name is required"),

body("email")
.isEmail()
.withMessage("Enter valid email"),

body("password")
.isLength({ min: 6 })
.withMessage("Password must be at least 6 characters")
],
registerUser
);

/* LOGIN */
router.post(
"/login",
[
body("email")
.isEmail()
.withMessage("Enter valid email"),

body("password")
.notEmpty()
.withMessage("Password required")
],
loginUser
);

module.exports = router;