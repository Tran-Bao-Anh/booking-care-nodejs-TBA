import express from "express";
import bodyParser from "body-parser"; //dùng để viết api, giúp lấy được các tham số client gửi lên server. vd: tham số trong link /user?id=7 thì phải dùng thư viện bodyParser mới lấy đc id=7
import viewEngine from "./config/viewEngine"; //cài thư viện ejs để dùng viewEngine để render file .ejs lên màn hình
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require(`dotenv`).config(); //giúp lấy các tham số trong file môi trường bằng câu lệnh process.env.
//>>>>> giải thích thư viện trong file package.json-devDependencies
//babel là trình compiler của nodejs - vì js có nhiều phiên bản củ và mới nên dùng babel để đồng nhất code ==> code js phiên bản nào cũng được
// nodemon dùng restart server mỗi lần có thay đổi file
let app = express();
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("Backend nodeJS is running on the port: " + port);
});
