# nodejs-4-front_back_end 專案說明

本資料夾為 Node.js + Express + 前後端分離練習專案，結合前端靜態頁面與後端 API，適合學習全端開發流程。以下為各目錄與檔案的用途說明：

## 專案結構

```
nodejs-4-front_back_end/
├── answer.js                  # 主伺服器程式，啟動 Express 應用
├── application/               # 前端相關資源（靜態檔案、模板、圖片、JS、CSS）
│   ├── css/                   # 樣式表
│   ├── images/                # 圖片資源
│   ├── js/                    # 前端 JavaScript 程式
│   └── views/                 # HTML 模板檔案
├── models/                    # 資料存取層，包含 JSON 資料
├── router/                    # 路由模組，定義 API 路由
├── server.js                  # 伺服器啟動檔（可能為另一練習用）
├── package.json               # 專案相依套件與基本資訊
└── package-lock.json          # 套件鎖定檔
```

## 主要目錄與檔案用途

- **answer.js**：主伺服器程式，設定 Express、靜態檔案、模板、掛載路由。
- **application/**：前端靜態資源與模板。
  - **css/**：網站樣式表。
  - **images/**：網站圖片。
  - **js/**：前端互動腳本。
  - **views/**：HTML 模板檔案。
- **models/**：資料層，包含 JSON 範例資料。
- **router/**：路由層，定義 API 路由（如 dramas）。
- **server.js**：另一份伺服器啟動檔，可能用於不同練習情境。
- **package.json**：專案相依套件與基本資訊。

## 運作流程簡述

1. 啟動伺服器（answer.js），載入 Express。
2. 設定靜態檔案與模板路徑。
3. 掛載路由（/dramas 等），由 router/ 目錄下模組負責。
4. 前端頁面由 application/views/ 下模板產生，靜態資源由 application/ 提供。
5. 資料存取由 models/ 目錄下模組處理。

---

如需更詳細的 API 或功能說明，請參考各目錄下的原始碼註解。 