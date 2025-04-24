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
        res.json({ result: data });
    } catch (err){
        res.status(500).json({ message: "讀取資料失敗" });
    }
});

module.exports = router;