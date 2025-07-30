const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

// Define the Mongoose schema
const massageSchema = new mongoose.Schema({
  email: String,
  text: String,
});

// Avoid model overwrite on re-deploy
const Massage = mongoose.models.Massage || mongoose.model('Massage', massageSchema);

// MongoDB connection function
async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, text } = req.body;

    if (!email || !text) {
      return res.status(400).json({ message: 'Email and message are required' });
    }

    await connectToDB();

    // Save to database
    const massage = new Massage({ email, text });
    await massage.save();

    // Email transport setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Send confirmation to the user
    await transporter.sendMail({
      from: `"Sarthak" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🛬 Message Received – Fasten Your Seatbelt!",
      html: `
        <div style="font-family: 'Segoe UI'; line-height: 1.6;">
          <h2>Hey Champ! 📨</h2>
          <p>Your message landed safely in my inbox:</p>
          <blockquote>${text}</blockquote>
          <p>I'll get back to you soon. ✨</p>
        </div>
      `,
    });

    // 2. Notify admin
    await transporter.sendMail({
      from: `"Sarthak's Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New message received',
      html: `<p><strong>From:</strong> ${email}</p><p><strong>Message:</strong><br>${text}</p>`,
    });

    res.status(200).json({ message: 'Message sent and saved successfully!' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Something went wrong on the server.' });
  }
};