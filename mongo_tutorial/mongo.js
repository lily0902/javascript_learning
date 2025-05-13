const mongoose = require("mongoose");


/// 1. 建立連線 (connection)
const connConfig = "mongodb://localhost:27017/";
const conn = mongoose.createConnection(connConfig);



/// 2. 建立 Schema & Models


/// 3. 透過 Model 進行 CRUD 操作