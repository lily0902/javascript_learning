import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get("/page", (req, res) => {
    res.send("這是 introduction 頁面");
});


//寫一個return promise的函式
let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => { 
        fs.readFile(dataPath, "utf8", (err, data) => { 
            if (err) reject(err);
            // 為什麼要用 JSON.parse()？ 在 JavaScript 中，JSON（JavaScript Object Notation） 是一種 字串格式，但我們通常需要它變成 JavaScript 物件或陣列 來操作資料。
            else resolve(JSON.parse(data));
            console.log(typeof JSON.parse(data));//object
        });
    });
}


router.get("/data", async(req, res) => {
    try {
        let data = await readFilePromise("data.json");
        res.json({result: data});
    }
    catch {
        res.send("檔案有問題");
    }
});

router.get("/data/:EmpNo", async (req, res) => {
    try {
        let data = await readFilePromise("data.json");
        //為什麼 typeof data 會顯示 "object"？ 因為在 JavaScript 中，陣列（Array）是 Object 的一種特殊形式！但它仍然是 Array，所以 Array.isArray() 是更準確的判斷方式。
        //console.log(typeof data);
        let EmpNo = req.params.EmpNo;
        let result = data.filter(ele => ele["EmpNo"] === EmpNo);
        //console.log(Array.isArray(result)); 
        
        res.json(result.length > 0 ? result : {});
        // if (result.length > 0) {
        //     res.json(result);
        // }
        // else {
        //     res.json({});
        // }

    }
    catch {
        
    }
    
});


export default router;

//req.params 與 req.query 差異
//類型	        用途	                                      範例
//req.params	URL 參數，通常用來 動態匹配路由	                GET /user/123 → req.params.id === '123'
//req.query	    查詢參數（Query String），通常用來 過濾或排序	 GET /user?id=123 → req.query.id === '123'
