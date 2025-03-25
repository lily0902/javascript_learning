import express from "express" ;
const app = express();
const portNum = 8088;


//[module][2]引入/router/books.js程式

import booksRouter from "./router/books.js"; //.->當前目錄
import aboutRouter from "./router/about.js"; //.->當前目錄


//路由設定
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(portNum, () => {
    console.log(`Server is running at http://localhost:${portNum}`);
});

//[module][3] 將/books的request導入到booksRouter處理
app.use("/books", booksRouter); 
app.use("/about", aboutRouter);