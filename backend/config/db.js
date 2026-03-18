const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    const db = process.env.MONGO_URI || (config.has('mongoURI') ? config.get('mongoURI') : null);
    if (!db) {
      throw new Error('MongoDB URI is missing (set MONGO_URI or config.mongoURI)');
    }

    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
