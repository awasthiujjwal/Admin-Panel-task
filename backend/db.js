const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/task');
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;