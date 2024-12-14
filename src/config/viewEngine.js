import express from "express";

let configViewEngine = (app) => {
  app.use(express.static("./src/public"));  //static là để express biết là chỉ lấy các file ảnh,css,js ở trong ./src/public
  app.set("viewEngine", "ejs"); // dùng viewEngine là ejs - ejs là thư viện đã cài đặt
  app.set("views", "./src/views");  //giúp tìm các file .ejs trong thư mục "./src/views"
};

module.exports = configViewEngine;
