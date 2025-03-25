//建立router
import express from 'express';
import fs from 'fs';
const router = express.Router(); //產生router物件，存入變數


//路徑設定/api設計
router.get('/', (req, res) => {
    res.send('我是/books的根路徑');
});

router.get("/page", (req, res)=> {
    res.json({message: "我是/books/page路徑!!!"});
});

//檔案系統的I/O==>非同步的動作(asynchronous)
router.get("/data", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        //若有錯誤，通常沒事為undifined
        if (err) {
            console.log(err);
            res.send("發生錯誤");
        }
        else {
            console.log(data);
            console.log(typeof data);

            console.log("-".repeat(30));

            let result = JSON.parse(data);  //轉成json(object)資料型別
            console.log(result);
            console.log(typeof result);
            res.json(result);//回傳前端json資料 
            //res.send(data);//回傳前端string資料
        }
        
    });
});

router.get("/data-2", (req, res) => {
    let data2 = fs.readFile("data.json", "utf8", () => { });//會得到一個undefined
    console.log(data2);
    res.send(data2);
});

router.get("/milti-data", (req, res) => {
    
    let result = {};
    //讀models/data{n}.json的資料
    fs.readFile("./models/data1.json", "utf8", (err, data1) => {
        result["data1"] = JSON.parse(data1);  //轉成json(object)資料型別
        //res.json(result);
    });

    fs.readFile("./models/data2.json", "utf8", (err, data2) => {
        result["data2"] = JSON.parse(data2);  //轉成json(object)資料型別
        //res.json(result);
    });

    fs.readFile("./models/data3.json", "utf8", (err, data3) => {
        result["data3"] = JSON.parse(data3);  //轉成json(object)資料型別
        res.json(result);
    });

    
});

let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, "utf8", (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });
    });
};

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
            res.json(err);
        });
});

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
        res.json(err);
    }
});

//[module][1]將router導出,等著別人require引入使用
export default router ; //匯出router物件