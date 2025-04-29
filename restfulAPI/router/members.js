const express = require("express");
const router = express.Router();
const fs = require("fs");

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




router.get("/", (req, res) => {
    res.send("嗨嗨， 我是 /members api~");
});

router.get("/all", async (req, res) => {
    try {
        let data = await readFilePromise("./data.json");
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "讀取資料失敗" });
    }
});

router.get("/detail/:memNo", async (req, res) => {
    try {
        let data = await readFilePromise("./data.json");
        let memNo = req.params.memNo;
        if (!data[memNo]) {
            return res.status(404).send({ "message": "Not Found" });
        }
        else {
            res.send(data[memNo]);
        }
    } catch (error) {
        res.status(500).send({ "message": "Not Found" });
    }
    
})

router.put("/detail/:memNo", async (req, res) => {
    try {
        let data = await readFilePromise("./data.json");
        let memNo = req.params.memNo;
        let payload = req.body;
        
        
        // 檢查 req.body (payload) 是否有 name/gender/age 這三個參數
        if (!payload["name"] || !payload["age"] || !payload["gender"]) {
            return res.status(400).send({ "message": "req.body 的資料格式有誤!" });
        }
        // 檢查是否有對應的 memNo 資料
        else if (!data[memNo]) {
            return res.status(404).send({ 
                "message"      : "Not Found" , 
                "affectedRows" : 0
            });
        }
        //更新資料
        else {
            data[memNo] = payload;
            // 把 data 資料寫出到 data.json
            fs.writeFileSync("./data.json", JSON.stringify(data), "utf8");
            res.json({ 
                "message"      : "OK" , 
                "affectedRows" : 1
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "讀取資料失敗" });
    }
});

router.post("/", async (req, res) => {
    try {
        let data = await readFilePromise("./data.json");
        let payload = req.body;
        
        //Object.keys(data) 會回傳一個陣列，所以可以用map來轉換成數字
        let lastMemNo = Object.keys(data).map(key => Number(key)).sort((a,b) => b-a);
        let newMemNo = lastMemNo[0] + 1;
    
        // 檢查 req.body (payload) 是否有 name/gender/age 這三個參數
        if (!payload["name"] || !payload["age"] || !payload["gender"]) {
            return res.status(400).send({ "message": "req.body 的資料格式有誤!" });
        }
        else {
            data[newMemNo] = payload;
            fs.writeFileSync("./data.json", JSON.stringify(data), "utf8");
            return res.json({
                "message": "ok",
                "memNo": newMemNo
            });
        }
        
    }
    catch (error) {
        res.status(500).send({ "message": "server 端發生錯誤!" });
    }
    
});

router.delete("/", async (req, res) => { 
    let data = await readFilePromise("./data.json");
    let memNo = req.query.memNo;
    let result = data[memNo];

    if (!result) {
        return res.status(404).send({ 
            "message" : "Not Found", 
            "affectedRows" : 0
          });
    }
    else {
        delete data[memNo];
        fs.writeFileSync("./data.json", JSON.stringify(data), "utf8");
        return res.json({ 
            "message" : "ok", 
            "affectedRows" : 1
          });
    }
});
module.exports = router;