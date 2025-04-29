const mongoose = require('mongoose');
require('dotenv').config();

// const mongoDbUrl = 'mongodb://127.0.0.1:27017/portfolio';
const mongoDbUrl = process.env.DB_URL;


mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("✅mongodb connected succesfully");
    
});

db.on('disconnected', () => {
    console.log('disconnected');
    
});

db.on('error', (err) => {
    console.log('error');
});

module.exports = db;