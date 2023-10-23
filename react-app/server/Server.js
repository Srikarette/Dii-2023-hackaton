const express = require("express");
const { readdirSync } = require("fs"); // function to read directory

const productRouters = require("./Routes/product"); //import name
const authRouters = require("./Routes/auth");
const app = express();

//วิธีืีที่ 1 การเรียกใช้
// app.use("/api", productRouters);
// app.use("/api", authRouters);

//วิธีืืที่ 2
readdirSync("./Routes").map((r) => console.log(r));

app.listen(5000, () => console.log("Server is Running 5000"));
