const bcrypt = require("bcrypt");
const RegisterModel = require("../models/user.model");
const { jwtgenerate } = require("../middlewares/jwt");

const loginUser = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    // Find user by userId
    const user = await RegisterModel.findOne({ "personalDetails.userId": userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.personalDetails.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid userId or password" });
    }

    // Generate JWT token
    const token = jwtgenerate(user.personalDetails.userId);
    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    next(error); // Pass error to the error-handling middleware
  }
};

module.exports = loginUser;
