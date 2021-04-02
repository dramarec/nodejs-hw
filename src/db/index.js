const mongoose = require('mongoose');

require('dotenv').config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});

mongoose.connection.on('connected', err => {
    console.log('Mongoose connected');
});

mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', err => {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        console.log('Connection for DB disconnected and app terminated');
        process.exit(1);
    });
});

module.exports = db;
