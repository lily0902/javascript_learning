const express = require("express");
const hbs = require("hbs"); //npm install hbs
const path = require("path"); //npm install path 
const app = express();
const portNum = 8088;

// [1] 設定模板引擎 (解析 html 檔 , 讓 express 看懂 html 程式)
app.engine("html", hbs.__express);

// [2] 設定模板 (template) 位置
app.set("views", path.join(__dirname, "application", "views"));

// [3] 設定靜態檔的位置
app.use(express.static(path.join(__dirname, "application")));

app.get("/", (req, res) => {
  //res.send("嗨嗨,  我是 Node.js server.");
  // [4] 使用 .render 回傳 html 頁面
  res.render("index.html");
});

app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});