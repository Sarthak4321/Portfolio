// // api/massage.js
// const db = require('../../model/db'); // adjust path if needed
// const Massage = require('../../model/massage');
// const nodemailer = require('nodemailer');

// module.exports = async (req, res) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const { email, text } = req.body;

//     const massage = new Massage({ email, text });
//     await massage.save();

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Sarthak" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Message Received!',
//       html: `<p>${text}</p>`,
//     });

//     res.status(200).json({ message: 'Success!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// File: api/massage.js

const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Massage = require('../model/massage');
require('dotenv').config();

const connectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
};

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

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
            subject: "🛬 Message Received – Fasten Your Seatbelt!",
            html: `<p>Hey! Your message: <strong>${text}</strong> has been received.</p>`,
        });

        await transporter.sendMail({
            from: `"Sarthak's Website" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'New message received',
            html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${text}</p>`,
        });

        res.status(200).json({ message: 'Message sent and saved!' });
    } catch (err) {
        console.error('❌ ERROR:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};