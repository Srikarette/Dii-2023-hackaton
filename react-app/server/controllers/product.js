// Start CRUD Operation
//ใช้ exports.fs เพื่อให้ route เรียกใช้ได้
exports.read = async (req, res) => {
  res.send("Hello Controller Read");
};
exports.list = async (req, res) => {
  try {
    res.send("Hello Controller list");
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Server Errror");
  }
};
exports.create = async (req, res) => {
  try {
    res.send("Hello Controller Create");
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Server Errror");
  }
};
