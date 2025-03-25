import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    if (req.query.name) {
        res.send(`Hello , ${req.query.name} ! Welcome to the Node.js ~~~. `);
    }
    else {
        res.send("bbb");
    }
})

router.get("/greeting", (req, res) => {
    res.send("Hello, World!");
    
});


export default router;