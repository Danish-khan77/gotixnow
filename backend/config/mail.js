const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Email send function
const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "GotixNow <onboarding@resend.dev>", // temporary sender
      to: to,
      subject: subject,
      html: html,
    });

    console.log("✅ Email Sent Successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
};

module.exports = { sendEmail };
