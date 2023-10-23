const express = require("express");
const { readdirSync } = require("fs"); // function to read directory
const morgan = require("morgan"); //Middleware หรือ ตำรวจในการตรวจสอบก่อนเข้า controller
const cors = require("cors"); // ป้องกัน Api
const bodyParse = require("body-parser");

const connectDB = require("./config/db");

const productRouters = require("./Routes/product"); //import name
const authRouters = require("./Routes/auth");


const app = express();

connectDB()

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));

//วิธีืีที่ 1 การเรียกใช้
// app.use("/api", productRouters);
// app.use("/api", authRouters);

//วิธีืืที่ 2
readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

// use Middleware Morgan

app.listen(5000, () => console.log("Server is Running 5000"));
