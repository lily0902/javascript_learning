const express = require("express");
const hbs = require("hbs"); //npm install hbs
const path = require("path"); //npm install path 
const app = express();
const portNum = 8088;

const dramasRouter = require("./router/dramas.js");

// [1] 設定模板引擎 (解析 html 檔 , 讓 express 看懂 html 程式)
//hbs -> handlebars 為一種模板引擎
//另外一種熱門的模板引擎 --> pug
app.engine("html", hbs.__express);

// [2] 設定模板 (template) 位置 (讀取 *.css / *.js / *.jpg / *.png / *.mp4 / ...)
app.set("views", path.join(__dirname, "application", "views"));

// [3] 設定靜態檔的位置
// --> 處理 靜態檔 相關 requests
app.use(express.static(path.join(__dirname, "application")));

app.get("/", (req, res) => {
  //res.send("嗨嗨,  我是 Node.js server.");
  
  // [4] 使用 .render (渲染) 回傳 html 頁面 
  res.render("index.html");
});

app.use("/dramas", dramasRouter);

//關於我們
app.get("/about/us", (req, res) => {
  res.render("aboutus.html");
});


app.get("/testqq", (req, res) => {
  res.render("template.html");
});

app.get("/data", (req, res) => {
  res.json({ name: "jeff", age: 18 , message : "今天好冷喔~~"});
 });
app.listen(portNum , ()=>{
  console.log(`Server is running at http://localhost:${portNum}`);
});