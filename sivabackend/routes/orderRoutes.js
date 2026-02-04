const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

// POST /api/orders
router.post("/", async (req, res) => {
  try {
    const { items, total, customerEmail } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty ☕" });
    }

    // Save order
    const order = new Order({ items, total });
    await order.save();

    // ✉️ EMAIL SEND
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_GMAIL@gmail.com",
        pass: "GMAIL_APP_PASSWORD"
      }
    });

    await transporter.sendMail({
      from: "Sip Serenity ☕ <YOUR_GMAIL@gmail.com>",
      to: customerEmail,
      subject: "Sip Serenity Order Confirmed 🍃",
      text: `
Thank you for your order!

Items:
${items.map(i => `${i.name} x ${i.qty}`).join("\n")}

Total: ₹${total}

Your tea is being prepared ☕
      `
    });

    res.status(201).json({
      message: "Order placed & email sent successfully 📩",
      order
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;