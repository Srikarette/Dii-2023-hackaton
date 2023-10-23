const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
  },
  { timestamps: true } //สร้าง เวลา ตอนเรียกใช้ ณ ขณะนั้น
);
module.exports = mongoose.model("products", productSchema); //ส่งออก ชื่อ ตาราง กับ เนื้อหาในตาราง
