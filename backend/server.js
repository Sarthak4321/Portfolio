const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const db = require('./model/db');
const Massage = require('./model/massage');
require('dotenv').config();

const app = express();
const PORT = 3000;
// const PORT = 'https://portfolio-ghrm-n0szsd2y8-sarthak4321s-projects.vercel.app/';

// Static files
app.use(express.static('distribution'));

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");

// Home Route
app.get('/', (req, res) => {
    res.render("index");
});

// Handle form submission
app.post('/massage', async (req, res) => {
    try {
        const userMassage = req.body;
        const { email, text } = userMassage;

        // Save to DB
        const massage = new Massage(userMassage);
        const savedDeta = await massage.save();

        // Setup Nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 1. Send confirmation to user



        await transporter.sendMail({
            from: `"Sarthak" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🎉 Your Message Has Landed – Sit Tight!",
            html: `
  <div style="font-family: 'Segoe UI', sans-serif; color: #222; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 600px; margin: auto;">
    <div style="text-align: center; margin-bottom: 25px;">
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDN4dGRsaHQzZWt0bDI1ejlncDV4NzJib2xxczE0eHNodWhnMTg4byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0kR0P92xjgvYhK4G4n/giphy.gif" 
           alt="Message Delivered" 
           style="width: 100%; max-width: 400px; border-radius: 10px;">
    </div>
    <h2 style="text-align: center; font-size: 24px;">Hello Rockstar! 🌟</h2>
    <p style="font-size: 16px; line-height: 1.6;">
      Your message has safely arrived at my digital desk – no turbulence, just excitement on this end!
    </p>
    <blockquote style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #555;">
      <em>"${text}"</em>
    </blockquote>
    <p style="font-size: 16px; line-height: 1.6;">
      I'm now putting on my superhero cape (and grabbing a coffee ☕) to read your message carefully. Expect a reply soon!
    </p>
    <p style="text-align: center; margin-top: 30px;">
      🚀 Meanwhile, feel free to <a href="https://yourwebsite.com" target="_blank" style="color: #007bff; text-decoration: none;">explore my site</a> or connect on social media.
    </p>
    <p style="text-align: center; font-size: 14px; margin-top: 40px; color: #666;">
      Cheers,<br><strong>Sarthak</strong>
    </p>
  </div>
  `
        });





        //     await transporter.sendMail({
        //       from: `"Sarthak" <${process.env.EMAIL_USER}>`,
        //       to: email,
        //       subject: "🛬 Message Received – Fasten Your Seatbelt!",
        //       html: `
        //     <div style="font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        //       <div style="text-align: center;">
        //         <img src="https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif" alt="Mail Delivered" style="max-width: 100%; border-radius: 8px; margin-bottom: 20px;">
        //       </div>
        //       <h2 style="color: #111;">Hey Champ! 📨</h2>
        //       <p>Your message crash-landed into my inbox (no casualties, just excitement)! 😄</p>
        //       <blockquote style="border-left: 4px solid #aaa; margin: 10px 0; padding-left: 15px; color: #555;">
        //         ${text}
        //       </blockquote>
        //       <p>I'll put on my thinking cap and get back to you faster than a squirrel on espresso ☕🐿️.</p>
        //       <p>Until then, stay awesome – and maybe peek at <a href="https://yourwebsite.com" target="_blank" style="color: #007bff; text-decoration: none;">my site</a> if you're feeling curious.</p>
        //       <p style="margin-top: 30px;">High-fives ✋,<br><strong>Sarthak</strong></p>
        //     </div>
        //   `
        //     });


        // 2. Notify admin
        await transporter.sendMail({
            from: `"Sarthak's Website" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'New message received',
            html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${text}</p>`,
        });

        // Render success page
        res.status(200).render("massagesend");

    } catch (err) {
        console.error("Error:", err);
        res.status(400).render("massageSendUnsuccesful");
    }
});

// Start server
app.listen(PORT, () => {
    console.log("✅ Sarthak's Server has connected successfully");
});