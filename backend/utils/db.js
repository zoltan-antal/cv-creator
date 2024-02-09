const mongoose = require('mongoose');
const { DATABASE_URL } = require('./config');

const connectToDatabase = async () => {
  mongoose.set('strictQuery', false);
  console.log('connecting to', DATABASE_URL);
  try {
    mongoose.connect(DATABASE_URL);
    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database:', error.message);
  }
  return null;
};

module.exports = { connectToDatabase };
