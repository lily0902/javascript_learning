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

module.exports = router;