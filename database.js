const mongoose = require('mongoose');
const env = require('dotenv');

env.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tfwnvsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"`);
        console.log('Connection to MongoDB established!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;