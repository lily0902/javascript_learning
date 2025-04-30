const express = require('express');
const app = express();

const hbs    = require("hbs");
const path   = require("path");

const bodyParser   = require("body-parser");


const dramasRouter = require("./router/dramas");
const aboutRouter  = require("./router/about");


// 設定模板引擎
app.engine('html',hbs.__express);

// 設定模板 位置
app.set("views" , path.join(__dirname ,"application","views"));

// 設定靜態檔 位置
app.use(express.static(path.join(__dirname,"application")));


// Setting body-parser
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
		extended : false ,
		limit : "1mb",
		parameterLimit : '10000'
}));



app.use("/about",aboutRouter);
app.use("/dramas",dramasRouter);


app.get("/",(req,res)=>{
    res.render("index.html");
});

///////////////////////////////////////////
// Middleware (中介函式) 的使用
app.get("/hello",
	//往下一個 Middleware (中介函式) 執行
	(req, res, next) => {
		console.log("我是 Middleware 1");
		
		// [1] 顯示 name 參數
		//console.log(`您是 ${req.query.name}`);

		//[2] Middleware 間傳參數
		//req (request 物件) 上 設定資料
		req.test = { name: "jeff", age: 18 };

		// [3] 往下一個 Middleware (中介函式) 執行
		//next();

		// [4] 檢查 name 參數 是否存在
		// V -> OK , 往下一個 Middleware (中介函式) 執行
		// X -> 錯誤 , 回傳 {message : "name 人呢?"};

		// 使用 error first 寫法
		//if (req.query.name === undefined) { // 還可以更好
		if (!req.query.name) {// 更佳 !!!
			res.json({message : "name 人呢?"});
			
		} else {
			next();
		}
	},
	(req, res, next) => {
		// 100% 確保 name 參數存在
		console.log("我是 Middleware 2");

		// 顯示前端 name 參數
		// 顯示前端 age 參數
		console.log(`您是 ${req.query.name}`);
		console.log(`您的年齡是 ${req.query.age}歲`);
		next();
	},
	(req, res, next) => {
		console.log("我是 Middleware 3");
		console.log(req.test);
		next();
	},
	(req, res) => {
		console.log("我是 Middleware 4");
		res.json({ result: req.test });
	});


app.listen(8088,function(){
    console.log("Server is running at http://localhost:" + String(8088));
});



