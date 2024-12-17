const jwt = require("jsonwebtoken");
require("dotenv").config(); // dotenv kullanımı

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = verified; // Kullanıcı bilgilerini req nesnesine ekle
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
