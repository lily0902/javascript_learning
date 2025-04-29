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




router.get("/", (req, res) => {
    res.send("嗨嗨， 我是 /members api~");
})

router.get("/all", async (req, res) => {
    try {
        let data = await readFilePromise("./data.json");
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "讀取資料失敗" });
    }
});

module.exports = router;