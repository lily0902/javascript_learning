// 匯入必要模組
import express from 'express';
import fs from 'fs';

const router = express.Router(); // 建立一個 router 實例，用來設計 /books 專屬的路由

// 根路由：當使用者請求 /books 時，回應文字訊息
router.get('/', (req, res) => {
    res.send('我是/books的根路徑');
});

// /books/page 路由，回應 JSON 格式的資料
router.get("/page", (req, res)=> {
    res.json({message: "我是/books/page路徑!!!"});
});

// /books/data：讀取本地 data.json 檔案的內容，非同步方式處理
router.get("/data", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            // 若讀取時發生錯誤，輸出錯誤訊息並回應錯誤內容
            console.log(err);
            res.send("發生錯誤");
        }
        else {
            // 若成功，顯示讀取到的原始資料（string）與轉換成 JSON 物件的結果
            console.log(data);
            console.log(typeof data);

            console.log("-".repeat(30));

            let result = JSON.parse(data);  // 將 JSON 字串轉成物件
            console.log(result);
            console.log(typeof result);

            res.json(result); // 回傳 JSON 給前端
            // res.send(data); // 若要回傳原始文字也可以用這行
        }
    });
});

// 錯誤示範：這個寫法無法正確取得非同步 fs.readFile 的資料，會是 undefined
router.get("/data-2", (req, res) => {
    let data2 = fs.readFile("data.json", "utf8", () => { }); // 這樣會立即 return undefined
    console.log(data2);
    res.send(data2); // 回傳 undefined
});

// 同時讀取多個 JSON 檔案，但未保證順序與正確回應（不建議此寫法）
router.get("/milti-data", (req, res) => {
    let result = {};

    fs.readFile("./models/data1.json", "utf8", (err, data1) => {
        result["data1"] = JSON.parse(data1);
    });

    fs.readFile("./models/data2.json", "utf8", (err, data2) => {
        result["data2"] = JSON.parse(data2);
    });

    fs.readFile("./models/data3.json", "utf8", (err, data3) => {
        result["data3"] = JSON.parse(data3);
        res.json(result); // 回傳時其他兩筆資料可能尚未完成讀取，會導致資料不完整
    });
});

// 包裝成 Promise 的讀檔函式
let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, "utf8", (err, data) => {
            if (err) reject(err); // 若有錯誤則拒絕
            else resolve(JSON.parse(data)); // 否則解析 JSON 並傳回
        });
    });
};

// 使用 Promise 的方式讀取多個檔案，確保順序與完整性
router.get("/milti-data-promise", (req, res) => { 
    let result = {};

    readFilePromise("./models/data1.json")
        .then(data1 => {
            result["data1"] = data1;
            return readFilePromise("./models/data2.json");
        })
        .then(data2 => {
            result["data2"] = data2;
            return readFilePromise("./models/data3.json");
        })
        .then(data3 => {
            result["data3"] = data3;
            result["messages"] = "我是 Promise 取得!!!";
            res.json(result);
        })
        .catch(err => {
            res.json(err); // 任一檔案出錯都會捕捉並回應錯誤
        });
});

// 使用 async/await 方式處理多筆檔案讀取，更直覺的寫法
router.get("/milti-data-async", async (req, res) => {
    let result = {};
    try {
        result["data1"] = await readFilePromise("./models/data1.json");
        result["data2"] = await readFilePromise("./models/data2.json");
        result["data3"] = await readFilePromise("./models/data3.json");
        result["messages"] = "我是 Async/Await 取得!!!";
        res.json(result);
    }
    catch (err) {
        res.json(err); // 捕捉例外並回應錯誤
    }
});

// [module][1] 將 router 對外導出，供主程式 (例如 app.js) 引入使用
export default router;
