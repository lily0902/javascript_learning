

// 1. 檢查 header 是否有 token (M1)
let isTokenExist = (req, res, next) => {
    // 檢查 headers --> req.headers
    if (!req.headers["x-jeff-token"]) {
        console.log("[M1] 無 token !!!");
        res.status(400).json({ message: "token 人呢???" });
    }
    else {
        next();
    }
}

// 2. 檢查 token 是否正確 (M2)
let isTokenVaild = (req, res, next) => {
    if (req.headers["x-jeff-token"] !== "APTX4869") { 
        console.log("[M2] token 錯誤 !!!");

        // status_code = 403 --> 無權限 (Forbidden)
        res.status(403).json({ message: "您沒有權限!" });
    }
    else {
        next();
    }
}

// 1. 檢查 account / passwd 是否存在 
let isAccountAndPasswdExist = (req, res, next) => {
    // 檢查 payload (Form data , req.body)
    if (!req.body.account || !req.body.passwd ) {
        res.status(400).json({ message: "缺少帳號 或 密碼 !!" });
    }
    else {
        next();
    }
};

// 2. 再檢查 account / passwd 是否和 server 端一致
let isUserVaild = (req, res, next) => {
    if (!(req.body.account === "jeff" && req.body.passwd === "1234")) {
        res.status(400).json({ message: "帳號或密碼錯誤!" });
    }
    else {
        next();
    }
};

// [session][3] 建立 session 處理 middleware
let setSessionInfo = (req, res, next) => {
    // 紀錄資料在 session 上面
    // 建立 userInfo key-value pair
    req.session.userInfo = {
        name: "jeff",
        isLogined: true
    };

    next();
};

let isUserLogin = (req, res, next) => {
    if (!req.session.userInfo || req.session.userInfo.isLogined === false) {
            res.redirect("/login");
            return;
        }
    else {
        next();
    }
}
    
//一定要 module.exports 出去
module.exports = {
    "isTokenExist" : isTokenExist, // value 為 middleware 本人
    "isTokenVaild": isTokenVaild,
    "isAccountAndPasswdExist": isAccountAndPasswdExist,
    "isUserVaild": isUserVaild,
    "setSessionInfo": setSessionInfo,
    "isUserLogin": isUserLogin
}