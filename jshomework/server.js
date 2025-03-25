import express from 'express';
const app = express();
const port = 8088;

import helloRouter from './router/hello.js';
import introductionRouter from './router/introduction.js';


app.get("/", (req, res) => {
    res.send("aaa");
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});


app.use("/hello", helloRouter);
app.use("/introduction", introductionRouter);
