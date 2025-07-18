const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const Organizer = require("../Model/organizerModel");
const Admin = require("../Model/adminModel");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Query all three collections in parallel using normalizedEmail
    const [user, organizer, admin] = await Promise.all([
      User.findOne({ email: normalizedEmail }),
      Organizer.findOne({ email: normalizedEmail }),
      Admin.findOne({ email: normalizedEmail }),
    ]);

    let foundUser = user || organizer || admin;
    let role = user ? "user" : organizer ? "organizer" : "admin";
    let modelType = user ? "User" : organizer ? "Organizer" : "Admin";

    if (!foundUser) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    console.log("Found User:"); // Debugging log

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      console.log("Password mismatch"); // Debugging log
      return res.status(400).json({ message: "Invaliddd credentials." });
    }

    const tokenPayload = {
      userId: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
      role,
      modelType,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || "24h",
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role,
        ...(role === "organizer" && { companyName: foundUser.companyName }),
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during sign in.",
    });
  }
};

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Authentication error' });
  }
};

module.exports = { signIn, authenticateToken };