const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_DB;

    if (!mongoURI) {
      throw new Error('MONGO_DB is missing in .env file');
    }

    await mongoose.connect(mongoURI);

    console.log('MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
