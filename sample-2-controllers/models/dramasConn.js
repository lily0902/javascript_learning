const mongoose = require("mongoose");
const conn = require("./db");

/// 2. 建立 Schema & Models
/// 建立 Schema
const testqq = new mongoose.Schema({
    "dramaId": String,
    "category": String,
    "name": String,
    "score": String
}, {
    collection: "testqq",  // 要操作的 collection (table) 名稱
    versionKey : false // 移除 __v欄位
});

// 建立 Model 物件 (在 conn 連線上 , 註冊一個物件)
// (Node.js 透過 Model 物件 , 和 collection (表格) 互動)
let dramasModel = conn.model("Dramas", testqq); // "Dramas" : testqq

module.exports = dramasModel;