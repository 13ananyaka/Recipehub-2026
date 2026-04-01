const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Notification Service MongoDB Connected");
  } catch (error) {
    console.log("Notification Service DB Connection Error:", error);
  }
};

module.exports = connectDB;
