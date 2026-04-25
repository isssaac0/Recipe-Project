
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    try {
        // Check token in headers
        if (req.headers.authorization) {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
} else {
    token = req.headers.authorization;
}

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } else {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

    } catch (error) {
        return res.status(401).json({ message: "Token failed" });
    }
};

module.exports = protect;