const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Recipe Service MongoDB Connected");
  } catch (error) {
    console.log("Recipe Service DB Connection Error:", error);
  }
};

module.exports = connectDB;
