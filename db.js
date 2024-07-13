const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

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
