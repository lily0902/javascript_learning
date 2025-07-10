# mongo_tutorial 專案說明

本資料夾為 MongoDB 操作練習專案，主要用於學習 Node.js 連接與操作 MongoDB 資料庫。

## 專案結構

```
mongo_tutorial/
├── mongo.js         # MongoDB 連線與基本操作範例
```

## 主要檔案用途

- **mongo.js**：示範如何使用 Node.js 連接 MongoDB，進行基本的資料庫操作（如新增、查詢、更新、刪除）。

### mongo.js 內容說明

1. **連線設定**
   - 使用 `mongoose.createConnection` 連接本機 MongoDB（`mongodb://localhost:27017/nodejs-tutorial`）。
   - 連線成功時會在終端機顯示 "MongoDB is connected"。

2. **Schema 與 Model 建立**
   - 定義 `testqq` Schema，欄位有 dramaId、category、name、score。
   - 註冊 Model：`dramasModel`，對應 collection 為 `testqq`。

3. **查詢範例（find）**
   - 使用 `dramasModel.find()` 查詢所有資料。
   - 範例中有條件查詢：`find({ "category": "政治" }, { category: 1, name: 1, score: 1, _id: 0 })`，只顯示部分欄位。
   - 支援 Promise 與 async/await 寫法。

4. **第二個 Schema/Model：members**
   - 定義 `membersSchema`，欄位有 name、gender、age、math_score。
   - 註冊 Model：`membersModel`，對應 collection 為 `members`。
   - 關閉 versionKey（不產生 __v 欄位）。

5. **查詢 members 範例**
   - 使用 `membersModel.findOne({ "math_score": { "$gte": 60 } })` 查詢數學成績大於等於 60 的一筆資料。

6. **新增 members 範例**
   - 使用 `membersModel.create({ name: "bensen", gender: "M", age: 44, math_score: 88 })` 新增一筆正確資料。
   - 範例也示範錯誤情境（欄位 eng_score 不在 schema 內）。

7. **執行說明**
   - 只要取消 main、findMain2、insertMain2 等函式的註解，即可測試不同操作。
   - 預設執行 `insertMain2()`，會嘗試插入一筆 members 資料。

---

如需更詳細的操作說明，請參考 mongo.js 內的原始碼註解。 