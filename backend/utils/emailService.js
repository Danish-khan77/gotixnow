const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/* ==========================================
   SEND EMAIL FUNCTION
========================================== */
const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: "GotixNow <onboarding@resend.dev>",
      to: to,
      subject: subject,
      html: html,
    });

    console.log("✅ Email sent successfully:", response?.id);
    return response;
  } catch (error) {
    console.error("❌ Email sending error:", error);
    throw error;
  }
};

module.exports = { sendEmail };
