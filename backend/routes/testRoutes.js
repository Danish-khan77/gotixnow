const express = require("express");
const router = express.Router();
const { sendEmail } = require("../utils/emailService");

router.get("/test-mail", async (req, res) => {
  try {
    await sendEmail(
      "your_email@gmail.com",
      "Test Email 🚀",
      "<h2>Email is working successfully 🎉</h2>",
    );

    res.send("Mail sent successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Mail failed");
  }
});

module.exports = router;
