const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_GMAIL@gmail.com",
        pass: "GMAIL_APP_PASSWORD"
      }
    });

    await transporter.sendMail({
      from: email,
      to: "info@sipserenity.com",
      subject: "New Contact Message ☕",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `
    });

    res.json({ message: "Message sent successfully 📩" });
  } catch (err) {
    res.status(500).json({ message: "Mail failed" });
  }
});

module.exports = router;