// Connect to database mongodb
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hackatondb"); //ใส่ path ของเครื่องเรา ใช้ localhost ไม่ได้ บางครั้ง
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
