const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const jwtverify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not provided or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    req.user = { userId: decoded.userId }; // Attach userId to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Token is invalid or expired" });
  }
};

// Function to generate JWT using user_id
const jwtgenerate = (userId) => {
  return jwt.sign({ userId }, process.env.JWTKEY, { expiresIn: "1h" });
};

module.exports = { jwtgenerate, jwtverify };
