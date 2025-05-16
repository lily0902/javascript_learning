const mongoose = require("mongoose");


/// 1. 建立連線 (connection)
//// 連線的設定值: "mongodb://{host_ip}:{port}/{db_name}"
const connConfig = "mongodb://localhost:27017/nodejs-tutorial";
const conn = mongoose.createConnection(connConfig);


// 一旦連線成功 , 觸發 callback function
conn.on("connected", () => {
    console.log("MongoDB is connected");
});

/// 2. 建立 Schema & Models
/// 建立 Schema
const testqq = new mongoose.Schema({
    "dramaId": String,
    "category": String,
    "name": String,
    "score": String
}, {
    collection : "testqq"  // 要操作的 collection (table) 名稱
});

// 建立 Model 物件 (在 conn 連線上 , 註冊一個物件)
// (Node.js 透過 Model 物件 , 和 collection (表格) 互動)
let dramasModel = conn.model("Dramas", testqq); // "Dramas" : testqq


/// 3. 透過 Model 進行 CRUD 操作
// 非同步的動作 --> 使用 Promise 處理
// dramasModel.find()
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     })

// Async / Await 處理
let main = async () => {
    try {
        //let data = await dramasModel.find();
        //console.log(data);

        // [補充] .find (條件 , 顯示欄位)
        let data2 = await dramasModel.find(
            { "category": "政治" },
            { category: 1, name: 1, score: 1 , _id : 0}
        );
        console.log(data2);
    }
    catch (err) {
        console.log(err);
    }
};

//main();

////////////////////////////
// 建立 2nd Schema & Model
const membersSchema = new mongoose.Schema({
    "name": String,
    "gender": String,
    "age": Number,
    "math_score": Number
}, {
    collection: "members",
    versionKey : false // 移除 __v欄位
});

let membersModel = conn.model("Members", membersSchema);

let findMain2 = async () => {
    try {
        //let data2 = await membersModel.find({ "math_score": { "$gte": 60 } });
        let data2 = await membersModel.findOne({ "math_score": { "$gte": 60 } });
        console.log(data2)
    }
    catch (err) {
        console.log(err);
    }
}

//findMain2();

let insertMain2 = async () => {
    try {
        // 正常情況
        //let result = await membersModel.create({ name: "bensen", gender: "M", age: 44, math_score: 88 });

        // 錯誤情況
        let result = await membersModel.create({ name: "david", gender: "M", age: 46, eng_score: 88 });

        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
};

insertMain2();