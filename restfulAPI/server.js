const express = require('express');
const app = express();
const cors = require('cors'); 
const bodyParser = require("body-parser"); 

const portNum = 8088;

const membersRouter = require("./router/members.js");


//////////////////////////////////// 
// This is for swagger API documents.
const swaggerUi         = require('swagger-ui-express');
const YAML              = require('yamljs');
const swaggerDocument   = YAML.load('./api-docs/api-doc.yaml');

let options = {
    customCss: '.swagger-ui .wrapper { width: 80% }'
};

app.use(`/api-docs`,
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument,options)
);
//////////////////////////////////// 

app.get("/",(req,res)=>{
  res.send("這是 Node.js server , 查看 <a href='/api-docs'> members API 文件</a>");
})


//[Body-Parser][1] 解析 application/json
app.use(bodyParser.json());

app.use("/members", membersRouter);


app.use((req,res)=>{
  res.status(404).send("API 尚未開發！");
});

app.use(cors()); 

app.listen(portNum,()=>{
    console.log(`API server is running at http://localhost:${portNum}`);
});
