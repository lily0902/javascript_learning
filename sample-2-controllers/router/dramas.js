const express = require("express");
const fs = require("fs");

const model = require("../models"); // require 為資料夾的話 , 預設會找 index.js
console.log(model);

let router = express.Router();
let validator = require("../utils/validator");
// 此時 vaildator 變數 即為{
//    "isTokenExist" : isTokenExist, // value 為 middleware 本人
//    "isTokenVaild" : isTokenVaild
// }

// isUserLogin 外移到 validator
router.use(validator.isUserLogin);

let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath,"utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                //轉成 javaScript 物件
                resolve(JSON.parse(data));
            }
        });
    });
};


let isUserLogined = (req,res,next)=>{
    if(!req.session.userInfo || !req.session.userInfo.isLogined){
        res.status(401).send("請先 <a href='/login'>登入</a> !");
        return;
    }
    next();
}


//router.use(isUserLogined);




router.get("/page",
    (req,res)=>{
        //let name = req.session.userInfo.name;
        //res.render("dramas.html",{ templateName : name });
        res.render("dramas.html");
        
    }
);

// .use -> request 100% 會經過的 middleware
router.use(
    validator.isTokenExist, // 1. 檢查 token 是否存在 (M1)
    validator.isTokenVaild // 2. 檢查 token 是否正確 (M2)
);


// 取得 影集資料
// GET /dramas/list?type={}
router.get("/list", async (req, res) => {
    try {
        // 使用 type 做搜尋
        let condition = req.query.type === "全" ? {} : { "category": req.query.type };
        let data = await model.dramas.find(condition); // 透過 model.dramasConn 物件 去拉資料
        res.json({ result: data });
    }
    catch (err) {
        res.status(500).json({ message: "Server 端發生錯誤!" });
    }
});


// 新增 影集資料
// POST /dramas/data
// payload : { category : 犯罪 , name : zzzz , score : 2.5 }

router.post("/data", async (req, res) => {
    try {
        // 1. 取得最新的 dramaId
        let lastElement = await model.dramas.findOne({}, { dramaId: 1 })
            .sort({ dramaId: -1 }); //透過 dramaId 大 --> 小 排序
        let newestDramaId = Number(lastElement["dramaId"]) + 1;
        req.body["dramaId"] = String(newestDramaId); // 在 req.body 上 , 新增 dramaId
        
        // 2. 新增資料 --> model.drama.create()
        let result = await model.dramas.create(req.body);
        console.log(" 新增的資料 : ", result);
        res.json({ message: "ok." });
    }
    catch (err) {
        res.status(500).json({ message: "Server 端發生錯誤!" });
    }
});

// 修改 影集資料
// PUT /dramas/detail/:dramaId
// payload : { name : ABCDE , score : 5 }
router.put("/detail/:dramaId", async (req, res) => {
    try {
        let dramaId = req.params.dramaId;
        let result = await model.dramas.updateOne(
            { dramaId },
            { "$set": { name: req.body.name, score: req.body.score } }
        );
        console.log("修改結果 : ", result);
        res.json({ message: "ok." });

    }
    catch (err) {
        res.status(500).json({ message: "Server 端發生錯誤!" });
    }
});

// 刪除 影集資料
// DELETE /dramas/detail/:dramaId
router.delete("/detail/:dramaId", async (req, res) => {
    try {
        let dramaId = req.params.dramaId;
        let result = await model.dramas.deleteOne({ dramaId });

        console.log("刪除結果: ", result);
        res.json({ message: "ok." });
    }
    catch (err) {
        res.status(500).json({ message: "Server 端發生錯誤!" });
    }
});
















/////////////////////////////////////////////////////////
// GET /dramas/list --> 取得資料
// [Work1] 加入參數檢查 (M1)
// [work3] 使用共用的 Middleware  (實名 Middleware) 
// router.get("/list",

//     //////使用 validator.js 的 middleware (實名 Middleware)
//     //validator.isTokenExist, // 1. 檢查 token 是否存在 (M1)
//     //validator.isTokenVaild, // 2. 檢查 token 是否正確 (M2)

//     // 1. 檢查 type 是否存在 (m1)
//     (req, res, next) => {
//         if (!req.query.type) {
//             // 調整 status_code = 400 --> 前端接到 , 才會進到 error 區的程式
//             res.status(400).json({ message: "請帶入 type 參數" });
//         }
//         else {
//             next();
//         }
//      },
    
//     //2. 檢查 type 是否正確 (m2)
//     (req, res, next) => {
//         // type 值是否在 
//         let data = ["犯罪", "殭屍", "愛情", "政治", "其他", "全"];

//         // if indexOf() == -1 代表不在 array 裡
//         if (data.indexOf(req.query.type) === -1) {
//             console.log("發生錯誤2!!!");
//             res.status(400).json({ message: "type 值有誤!" });
//         }
//         else {
//             next();
//         }
//     },
    
//     //最後的 middleware (處理業務邏輯)
//     async (req, res) => {
//         try {
//             let data = await readFilePromise("./models/sample2.json");
//             let type = req.query.type;

//             if (type === "全") {
//                 res.json({ result: data });
//             } else {
//                 let filteredData = data.filter(ele => ele["category"] === type);
//                 res.json({ result: filteredData });
//             };
//         } catch (err) { 
//             console.log(err);
//         }

    

// });


// // POST /dramas/data
// // [Work2] 加入 API token 檢查機制, 預期使用者 token 寫在 headers
// router.post("/data",

//     //validator.isTokenExist, // 1. 檢查 token 是否存在 (M1)
//     //validator.isTokenVaild, // 2. 檢查 token 是否正確 (M2)
    
//     // 3. 處理業務邏輯 (M3)
//     async (req, res)=> {
//     try{
//         let payload = req.body ;

//         console.log(payload);
//         // console.log(payload["name"]);
//         // console.log(payload["score"]);
        
        
//         ////// 1) 不管 dramaId 
        
//         // // 讀取 json 
//         // let data = fs.readFileSync("./models/sample2.json","utf8");
//         // data = JSON.parse(data);
        
//         // // [ {} , {} , {} , ...]
//         // // 塞入 array
//         // data.push(payload);
        
//         // // 寫出成 json file 
//         // // fs.writeFileSync("./models/sample2.json",data,"utf8");
//         // fs.writeFileSync("./models/sample2.json",JSON.stringify(data),"utf8");
        
        
//         ////// 2) 調整 dramaId
//         // 讀取 json 
//         let data = fs.readFileSync("./models/sample2.json", "utf8");
//         data = JSON.parse(data);
        
//         // 取得最新 dramaId 
//         // [ "1001" , "1002" , "1003" , ... , "1007" ]
//         // let latestDramaId  = data.map(ele => ele["dramaId"]).slice(-1)[0] ;
//         // let newDramaId     = Number(latestDramaId) + 1 ;
        
//         let latestDramaId  = data.map(ele => Number(ele["dramaId"]))
//             .sort((a, b) => b - a)[0];
        
//         let newDramaId     = latestDramaId + 1 ;
        
//         payload["dramaId"] = String(newDramaId);
        
        
        
//         // [ {} , {} , {} , ...]
//         // 塞入 array
//         data.push(payload);
        
//         // 寫出成 json file 
//         // fs.writeFileSync("./models/sample2.json",data,"utf8");
//         fs.writeFileSync("./models/sample2.json", JSON.stringify(data), "utf8");
        
        
//         res.json({ message: "ok." });
//     }
//         catch(err) {
//         console.log(err);
//         res.status(500).json({ message: "server error." });
//     }

// });


module.exports = router;