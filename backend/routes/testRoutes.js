const express = require("express");
const router = express.Router();
const { sendEmail } = require("../utils/emailService");

router.post("/test-mail", async (req, res) => {
  try {
    const { email } = req.body;

    // ✅ validation
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("📧 Sending test email to:", email);

    // 📧 send email
    const response = await sendEmail(
      email,
      "Verify Your Email 🚀",
      `<h2>Email is working successfully 🎉</h2>
       <p>Please verify your email to continue.</p>`,
    );

    console.log("✅ Email response:", response.response);

    res.status(200).json({
      message: "Mail sent successfully!",
    });
  } catch (error) {
    console.log("❌ Mail error:", error.message);

    res.status(500).json({
      message: "Mail failed",
      error: error.message,
    });
  }
});

module.exports = router;
