const nodemailer = require('nodemailer');
const db = require('../model/db'); // adjust if db is elsewhere
const Massage = require('../model/massage');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { email, text } = req.body;

    if (!email || !text) {
      return res.status(400).json({ message: 'Email and message are required' });
    }

    // Save to MongoDB
    const message = new Massage({ email, text });
    await message.save();

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Send confirmation email to user
    await transporter.sendMail({
      from: `"Sarthak" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🛬 Message Received – Fasten Your Seatbelt!",
      html: `
        <div style="font-family: Arial; color: #333; padding: 20px;">
          <h2>Hey Champ! 📨</h2>
          <p>Your message just crash-landed into my inbox (don’t worry, no injuries) 😄</p>
          <blockquote style="border-left: 4px solid #aaa; padding-left: 10px;">${text}</blockquote>
          <p>I’ll get back to you soon. Meanwhile, feel free to explore more at <a href="https://yourwebsite.com">my website</a>.</p>
          <p>High-fives ✋,<br><strong>Sarthak</strong></p>
        </div>
      `,
    });

    // 2. Notify admin
    await transporter.sendMail({
      from: `"Sarthak's Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '📬 New message received from portfolio',
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${text}</p>
      `,
    });

    // Send response
    return res.status(200).json({ message: 'Message saved and emails sent!' });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};