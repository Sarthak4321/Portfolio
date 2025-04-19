const mongoose = require('mongoose');

const mongoDbUrl = 'mongodb://127.0.0.1:27017/portfolio';


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