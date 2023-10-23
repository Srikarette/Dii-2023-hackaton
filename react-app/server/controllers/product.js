// Start CRUD Operation
//ใช้ exports.fs เพื่อให้ route เรียกใช้ได้
const Product = require("../models/Product");
exports.read = async (req, res) => {
  try {
    //code
    const id = req.params.id;
    const product_list = await Product.find({ _id: id }).exec();
    res.send(product_list);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Server Errror");
  }
};
exports.list = async (req, res) => {
  try {
    //code
    const product_list = await Product.find({}).exec();

    res.send(product_list);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Server Errror");
  }
};
exports.create = async (req, res) => {
  try {
    //code
    console.log(req.body); // ดูข้อมูลที่มาจากหน้าบ้านก่อน หรือลองเช็คจาก postmanก่อน

    const producted = await Product(req.body).save();

    res.send(producted);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Server Errror");
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updateProduct = await Product.update({ _id: id }, req.body, {
      new: true,
    }).exec();

    res.send(updateProduct);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Server Errror");
  }
};
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await Product.findOneAndDelete({ _id: id }).exec();

    res.send(removed);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Server Errror");
  }
};
