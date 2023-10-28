const mongoose = require("mongoose");
const travelSchema = mongoose.Schema(
  {
    category: { type: String },
    lat: { type: String },
    lng: { type: String },
  },
  { timestamps: true } //สร้าง เวลา ตอนเรียกใช้ ณ ขณะนั้น
);
module.exports = mongoose.model("travel", travelSchema); //ส่งออก ชื่อ ตาราง กับ เนื้อหาในตาราง
