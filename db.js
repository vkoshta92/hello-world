const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
// const mongoURL = process.env.MONGODB_URL_LOCAL;
// const MONGODB_URL_LOCAL = process.env.MONGODB_URL_LOCAL;



mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.error('Error connecting to MongoDB Server:', err);
});

module.exports = db;
