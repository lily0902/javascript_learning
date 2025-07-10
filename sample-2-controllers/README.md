# sample-2-controllers 專案說明

本資料夾為 Node.js + Express MVC 架構的範例專案，主要用於練習後端伺服器、Session、模板引擎、路由、資料存取等功能。以下為各目錄與檔案的用途說明：

## 專案結構

```
sample-2-controllers/
├── answer.js                # 主伺服器程式，啟動 Express 應用，設定 session、模板、靜態檔案、路由
├── sample-server.js         # 另一份伺服器啟動檔（可能為練習用）
├── application/             # 前端相關資源（靜態檔案、模板、圖片、JS、CSS）
│   ├── css/                 # 樣式表
│   ├── images/              # 圖片資源
│   ├── js/                  # 前端 JavaScript 程式
│   └── views/               # hbs/html 模板檔案
├── models/                  # 資料存取層，包含 JSON 資料與資料庫連線模組
├── router/                  # 路由模組，定義各功能的 API 路由
├── utils/                   # 工具模組（如驗證 middleware）
├── package.json             # 專案相依套件與基本資訊
└── package-lock.json        # 套件鎖定檔
```

## 主要目錄與檔案用途

- **answer.js**：專案主伺服器程式，設定 Express、Session、模板引擎、靜態檔案路徑，並掛載各路由。
- **sample-server.js**：另一份伺服器啟動檔，可能用於不同練習情境。
- **application/**：前端靜態資源與模板。
  - **css/**：網站樣式表。
  - **images/**：網站圖片。
  - **js/**：前端互動腳本。
  - **views/**：hbs/html 模板檔案，對應各頁面（如 index、login、aboutus、dramas）。
- **models/**：資料層，包含 JSON 範例資料與資料庫連線模組（如 db.js、dramasConn.js、membersConn.js）。
- **router/**：路由層，定義各功能的 API 路由（如 dramas、about、auth）。
- **utils/**：工具模組，包含驗證與 session middleware（如 validator.js）。
- **package.json**：專案相依套件與基本資訊。

## 運作流程簡述

1. 啟動伺服器（answer.js），載入 Express、Session、模板引擎等。
2. 設定靜態檔案與模板路徑。
3. 掛載路由（/dramas, /about, /auth 等），由 router/ 目錄下模組負責。
4. 前端頁面由 application/views/ 下模板產生，靜態資源由 application/ 提供。
5. 資料存取由 models/ 目錄下模組處理。
6. 驗證與 session 控制由 utils/validator.js 提供 middleware。

---

如需更詳細的 API 或功能說明，請參考各目錄下的原始碼註解。 