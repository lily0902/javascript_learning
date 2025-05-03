const express = require('express');
const router = express.Router();
const fs = require("fs");
const USERS = require("../users").USERS;
const authHelper = require("../utils/auth-helper");



router.post("/",
    // 1. 檢查 payload 是否有 account & passwd
    (req, res,next) => { 
        if (!req.body.account || !req.body.passwd) {
            res.status(400).json({ message: "payload 缺少 account & passwd" });
        }
        else {
            next();
        }
    },
    // 2. 檢查 account & passwd 和 users 資料是否一致
    (req, res, next) => { 
        let account = req.body.account;
        let passwd = req.body.passwd;

        if (!USERS[account] || USERS[account]["passwd"] != passwd) {
            res.status(400).json({ message: "帳號或密碼錯誤" });
        }
        else {
            req.data = USERS[account]; // 將使用者資料放入 req.data 中 (自己掛載的欄位)
            next();
        }
    },
    // 3. 產生 token 
    authHelper.createToken,
    // 4. 將 token 回傳給前端
    
    (req, res) => { 
        // 可取 req.token
        res.json({
            "token": req.token
        });
        
});

module.exports = router;