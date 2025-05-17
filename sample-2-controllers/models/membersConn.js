const mongoose = require("mongoose");
const conn = require("./db");


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

module.exports = membersModel;