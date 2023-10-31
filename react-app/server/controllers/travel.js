// Start CRUD Operation
//ใช้ exports.fs เพื่อให้ route เรียกใช้ได้
const Travel = require("../models/Travel");
exports.list = async (req, res) => {
  try {
    //code
    const traveled = await Travel.find({}).exec();
    res.send(traveled);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Server Errror");
  }
};
exports.create = async (req, res) => {
  try {
    //code
    console.log(req.body); // ดูข้อมูลที่มาจากหน้าบ้านก่อน หรือลองเช็คจาก postmanก่อน

    const traveled = await Travel(req.body).save();

    res.send(traveled);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Server Errror");
  }
};
exports.remove = async (req, res) => {
  try {
    //code
    const id = req.params.id;
    const removed = await Travel.findOneAndDelete({ _id: id });
    res.send(removed);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to Remove");
  }
};
