import express from "express";
const router = express.Router(); //產生router物件，存入變數

router.get("/", (req, res) => { 
    res.send("我是/about的根路徑");
});

// /about/testqq?name=jeff
router.get("/testqq", (req, res) => {
    let name = req.query.name;
    res.send("我是/about/testqq路徑, name: " + name);
});

export default router; //匯出router物件