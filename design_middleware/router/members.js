const express = require('express');
const router = express.Router();

router.get("/", (req, res) => { 
    res.send(" /members api");
});

module.exports = router;