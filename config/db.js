const mongoose = require("mongoose"); 

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo baglandı")
  } catch (error) {
    console.log("hata! mongo connect", error);
  }
}

module.exports = { connectDB };