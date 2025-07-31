// api/massage.js
const db = require('../../model/db'); // adjust path if needed
const Massage = require('../../model/massage');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, text } = req.body;

    const massage = new Massage({ email, text });
    await massage.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sarthak" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Message Received!',
      html: `<p>${text}</p>`,
    });

    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};