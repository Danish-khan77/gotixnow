const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/emailService");

/* ================= REGISTER ================= */

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("📩 Register attempt:", email);

    // 🔍 check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // 👉 if already verified
      if (existingUser.isVerified) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }

      // 👉 if NOT verified → resend email
      const verifyURL = `https://gotixnow-backend.onrender.com/api/auth/verify/${existingUser.verificationToken}`;

      const htmlContent = `
        <h2>Verify Your Email 🎟</h2>
        <p>You already registered. Click below to verify:</p>
        <a href="${verifyURL}">Verify Email</a>
      `;

      await sendEmail(email, "Verify Your Account", htmlContent);

      return res.status(200).json({
        message: "Verification email resent. Check your email.",
      });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 🔑 generate token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // 👤 create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    console.log("🪪 Saved Token:", verificationToken);

    // 🔗 verification link
    const verifyURL = `https://gotixnow-backend.onrender.com/api/auth/verify/${verificationToken}`;

    const htmlContent = `
      <h2>Welcome to GotixNow 🎟</h2>
      <p>Click below to verify your email:</p>
      <a href="${verifyURL}">Verify Email</a>
    `;

    // 📧 send email
    await sendEmail(email, "Verify Your Account", htmlContent);

    console.log("✅ Verification email sent");

    res.status(201).json({
      message: "Registration successful. Check your email to verify.",
    });
  } catch (error) {
    console.log("❌ Register Error:", error);

    // 🔥 handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({ message: error.message });
  }
};
/* ================= VERIFY EMAIL ================= */

const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.redirect(
        "https://monumental-macaron-fa6c3a.netlify.app/login?verified=false",
      );
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    console.log("✅ Email verified:", user.email);

    return res.redirect(
      "https://monumental-macaron-fa6c3a.netlify.app/login?verified=true",
    );
  } catch (error) {
    console.error("Verify Email Error:", error);
    return res.redirect(
      "https://monumental-macaron-fa6c3a.netlify.app/login?verified=false",
    );
  }
};

/* ================= LOGIN ================= */

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
};
