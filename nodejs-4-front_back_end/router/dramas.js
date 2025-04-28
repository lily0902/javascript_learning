const express = require("express");
const router = express.Router();
const fs = require("fs");

let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath,"utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};


router.get("/page", (req, res) => {
    res.render("dramas.html");
});

router.get("/getDramaListData", async(req, res) => {
    try {
        //讀取 models/sample2.json , response 給前端
        let data = await readFilePromise("models/sample2.json");
        let type = req.query.type;
        
        if (type === "全") {
            res.json({ result: data });
        }
        else {
            let filteredData = data.filter(ele => ele["category"] === type);
            res.json({ result: filteredData });
        }

        
    } catch (err) {
        // 2xx 請求ok
        // 3xx 請求ok, 但資源換位置 , response 會告訴你下一個位置
        // 4xx Client 端問題
        // 5xx Server 端問題 ex server.js 出現bug
        res.status(500).json({ message: "讀取資料失敗" });
    }
});

//POST /dramas/createNewDramaData --> 新增資料
router.post("/createNewDramaData", async (req, res) => { 
    try {
        //將 req.body (Form Data) 寫入到 sample2.json 裡
        //1. 先讀出此array
        let data = await readFilePromise("models/sample2.json");
        //2. 使用 .push
        data.push(req.body);
        //3. 再把 資料寫出去 sample2.json (同步處理)
        fs.writeFileSync("models/sample2.json", JSON.stringify(data), "utf8");



        console.log(req.body);
        res.json({ message: "ok." });
    }catch (err) {
        res.status(500).json({ message: "系統有問題!!!" });
    }
});

module.exports = router;