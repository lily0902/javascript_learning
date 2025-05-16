const express = require('express');
const app = express();

const hbs    = require("hbs");
const path   = require("path");

const bodyParser = require("body-parser");
const session = require("express-session"); //[session][1] 安裝 express-session


const dramasRouter = require("./router/dramas");
const aboutRouter = require("./router/about");
const authRouter = require("./router/auth");

let validator = require("./utils/validator");

// [Seeeion 外存][1]
// 追加 redis 套件 (node.js 使用)
//const redis = require("redis");
//const redisClient = redis.createClient(); //產生 redisClient 的連線實例 (instance)

// [Session 外存][2]
// 追加 connect-redis 套件 (專門為 express 設計的對接套件)
//const redisStore = require("connect-redis")(session); 



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

// 處理 session 資料的 middleware
// 後面才可用 req.session 做資料存取
// [session][2] 設定 session middleware
app.use(session({
	// [Session 外存][3] 設定好 redisStore
	//store: new redisStore({ client: redisClient}), // session 資料存放的地方 
	secret: "c90dis90#",   // session 資料加密使用
	resave: true,  // 不論修改 , 是否回存到 store 上
	saveUninitialized: false, // 初始化的 session 是否要存到 store 上
	name: "_ntust_tutorial_id", // cookie 的 key 值
	ttl: 24 * 60 * 60 * 1 // session 資料的有效時間
}));


app.use("/auth", authRouter);



app.use("/about",validator.isUserLogin,aboutRouter);
app.use("/dramas",validator.isUserLogin, dramasRouter);

/////// 登入驗證
// 1. 加入 login 頁面
// 2. POST /auth API 驗證 + 紀錄資料到 session 上
// 3. GET /logout 登出 API
// 4. 加入 登入驗證 middleware (isUserLogined)

app.use((req, res, next) => {
	console.log(req.session);
	next();
})

app.get("/login", (req, res) => {
	res.render("login.html");
});

app.get("/logout", (req, res) => {
	req.session.destroy(); // 刪除 session 物件資料
	res.clearCookie("_ntust_tutorial_id"); // 刪掉 cookie 的 key-value pair
	res.redirect("/login"); // 導入到 login 頁面
})


app.get("/",validator.isUserLogin,
	
	
	// [session][4] 加入登入驗證判斷 middleware
	// (req, res, next) => { // 是否登入驗證
	// 	console.log(req.session);

		

		// if (!req.session.userInfo || req.session.userInfo.isLogined === false) {
		// 	res.redirect("/login");
		// 	return;
		// }
		// else {
		// 	next();
		// }

		//改成error first
		// if (req.session.userInfo && req.session.userInfo.isLogined) {
		// 	next();
		// }
		// else {
		// 	res.send("尚未登入")
		// }
	//},
	(req, res) => {
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



