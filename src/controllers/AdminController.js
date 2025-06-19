const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Entered password:", password);
    console.log("Stored hash:", admin.password);
    console.log("Match result:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "8h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
