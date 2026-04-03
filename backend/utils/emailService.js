const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    // 🔐 transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // 📧 mail options
    const mailOptions = {
      from: `"GotixNow" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // 🚀 send mail
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);
    console.log("USER:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS);

    return info;
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};

module.exports = { sendEmail };
