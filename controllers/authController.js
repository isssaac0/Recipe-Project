const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

/* ======================================
   GENERATE TOKEN
====================================== */
const generateToken = (id) => {
return jwt.sign(
{ id },
process.env.JWT_SECRET,
{ expiresIn: "7d" }
);
};
 
/* ======================================
   REGISTER USER
====================================== */
exports.registerUser = async (req, res, next) => {

const errors = validationResult(req);

if (!errors.isEmpty()) {
return res.status(400).json({
errors: errors.array()
});
}

try {

const { name, email, password } = req.body;

/* Check existing user */
const userExists = await User.findOne({ email });

if (userExists) {
return res.status(400).json({
message: "User already exists"
});
}

/* Hash password */
const salt = await bcrypt.genSalt(10);
const hashedPassword =
await bcrypt.hash(password, salt);

/* Create user */
const user = await User.create({
name,
email,
password: hashedPassword
});

/* Response */
res.status(201).json({
_id: user._id,
name: user.name,
email: user.email,
token: generateToken(user._id)
});

} catch (error) {
next(error);
}

};

/* ======================================
   LOGIN USER
====================================== */
exports.loginUser = async (req, res, next) => {

const errors = validationResult(req);

if (!errors.isEmpty()) {
return res.status(400).json({
errors: errors.array()
});
}

try {

const { email, password } = req.body;

/* Find user */
const user = await User.findOne({ email });

if (!user) {
return res.status(401).json({
message: "Invalid email or password"
});
}

/* Compare password */
const isMatch =
await bcrypt.compare(password, user.password);

if (!isMatch) {
return res.status(401).json({
message: "Invalid email or password"
});
}

/* Success */
res.json({
_id: user._id,
name: user.name,
email: user.email,
token: generateToken(user._id)
});

} catch (error) {
next(error);
}

};

/* ======================================
   GET PROFILE
====================================== */
exports.getProfile = async (req, res, next) => {

try {

const user = await User.findById(req.user._id)
.select("-password");

if (!user) {
return res.status(404).json({
message: "User not found"
});
}

res.json(user);

} catch (error) {
next(error);
}

};