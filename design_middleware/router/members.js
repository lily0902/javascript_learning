const express = require('express');
const router = express.Router();
const fs = require("fs");
const authHelper = require("../utils/auth-helper");
const USERS = require("../users").USERS;



//token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjY291bnQiOiJqZWZmIiwicGFzc3dkIjoidGVzdHFxIiwibGV2ZWwiOjJ9LCJleHAiOjE3NDYyNjE1NjMsImlhdCI6MTc0NjI1Nzk1M30.sAdl23ODx7cJGJlibctOc74OJWeeQKAJgta8__63eh8

let readFilePromise = (datapath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(datapath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

router.use(
    // 1. 檢查 token 是否有攜帶
    authHelper.isTokenExist,
    // 2. Decode token
    authHelper.decodeToken
    // 3. 檢查是否有攜帶 memNo 參數
);

router.get("/",

    (req, res, next) => {
        if (!req.query.memNo) {
            res.status(400).json({ message: "memNo 不可為空" });
        }
        else {
            next();
        }
    },
    // 4. 取得特定 memNo 資料
    async (req, res) => {
        try {
            let data = await readFilePromise("./models/data.json");
            if (!data[req.query.memNo]) {
                res.status(404).json({ message: "Not Found" });
            }
            else {
                res.json(data[req.query.memNo])
            }
        }
        catch (err) {
            res.status(500).json({ message: "Server 端發生錯誤" });
        }

    
    });

router.post("/",
    // 1. 檢查 req.user.level 是否有權限
    (req, res, next) => {
        if (req.user.level !== 2) {
            res.status(403).json({ message: "Forbidden" });
        }
        else {
            next();
        }
    },
    // 2. 檢查 payload 欄位是否正確
    (req,res,next) => {
        if (!req.body.name || !req.body.gender || !req.body.age) {
            res.status(400).json({ message: "payload 資料格式有誤" });
        }
        else {
            next();
        }
    },
    // 3. 新增一筆資料到 data.json 上
    async (req, res) => { 
        try {
            let data = await readFilePromise("./models/data.json");
            //取得最新的 memNo
            let latestMemNo = Object.keys(data).map(key => Number(key)).sort((a, b) => b - a)[0];
            let newMemNo = latestMemNo + 1;

            // 修改最新的 memNo
            data[newMemNo] = req.body;
            fs.writeFileSync("./models/data.json", JSON.stringify(data), "utf8");
            res.json({
                message: "ok",
                memNo: String(newMemNo)
            });
        }
        catch (err) {
            res.status(500).json({ message: "Server 端發生錯誤" });
        }
    }
    
);

router.get("/all", 
    // 3. 取得 models/data.json 資料並回傳
    async (req, res) => {
        try {
            let data = await readFilePromise("./models/data.json");
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server 端發生錯誤" });
        }
    }
);



module.exports = router;