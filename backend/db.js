const mongoose = require('mongoose');

const connectDB = async (retries = 5, delay = 3000) => {
  while (retries) {
    try {
      await mongoose.connect('mongodb://localhost:27017/cashmira');
      console.log('MongoDB connected');
      return;
    } catch (err) {
      console.error(`MongoDB connection failed. Retries left: ${retries - 1}`);
      console.error('Error:', err.message);
      retries--;
      if (retries === 0) {
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

module.exports = connectDB;
