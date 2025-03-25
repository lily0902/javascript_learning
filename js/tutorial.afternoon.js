/////////////////非同步處理機制
import fs from 'fs';

//1.使用readFileSync
// let d1 = fs.readFileSync('./models/data1.json', 'utf8');
// console.log("d1完成");
// let d2 = fs.readFileSync('./models/data2.json', 'utf8');
// console.log("d2完成");
// let d3 = fs.readFileSync('./models/data3.json', 'utf8');
// console.log("d3完成");
// console.log(JSON.parse(d1));
// console.log(JSON.parse(d2));
// console.log(JSON.parse(d3));

//////////////////////////////////
//2. 使用Promise
// //1)宣告Promise
// let readFilePromise = (dataPath) => {
//     return new Promise((resolve, reject) => {


//         fs.readFile(dataPath, "utf8", (err, data1) => {
//             //result["data1"] = JSON.parse(data1);
//             if (err) {
//                 reject(err);
//             }
//             else {
//                 resolve(JSON.parse(data1));
//             }
//         });


    
//     });
// };

// let output = {};

//使用Promise讀取5個檔案
// readFilePromise("./models/data1.json")
//     .then(data1 => {
//         output["data1"] = data1;
//         return readFilePromise("./models/data2.json");
//     })
//     .then(data2 => {
//         output["data2"] = data2;
//         return readFilePromise("./models/data3.json");
//     })
//     .then(data3 => {
//         output["data3"] = data3;
//         console.log(output);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// //2)使用Promise
// readFilePromise("./models/data1.json")
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });


/// Promise 特性
// let flipCoin = ()=>{
//     return new Promise((resolve, reject) => {
//         //延遲時間執行，以毫秒(ms)為單位
//         setTimeout(() => {
            
//             if (Math.random() > 0.2) {
//                 //resolve執行.then
//                 resolve("上課瞜!!!");
//             }
            
//             else {
//                 //reject執行.catch
//                 reject("放假瞜!!!");
//             }
//          }, 500);
//     });
// };

// flipCoin()
//     .then(result => {
//         console.log("我是flipCoin的.then區");
//         console.log(result);
//         return "aaa";
//     })
//     .then(r => {
//         console.log("我是第二個.then");
//         console.log(r);
//     })
//     .catch(err => {
//         console.log("我是flipCoin的.catch區");
//         console.log(err);
//     });

//Promise.all
//a. 全部完成(fulfilled,成功狀態) --> 進入 .then 區
//b. 任一失敗(rejected,失敗狀態) --> 進入 .catch 區
// Promise.all([
//     flipCoin(),
//     flipCoin(),
//     flipCoin()
//     ])
//     .then(r => {
//         console.log(r);
//     })
//     .catch(err => {
//         console.log(err);
//     });

////////////////////////////
//3. async / await (ECMAScript2017 2015 ~ 2017 , ES7)
//定義 flipCoin function
// let flipCoin = ()=>{
//     return new Promise((resolve, reject) => {
//         //延遲時間執行，以毫秒(ms)為單位
//         setTimeout(() => {
            
//             if (Math.random() > 0.2) {
//                 //resolve執行.then
//                 resolve("上課瞜!!!");
//             }
            
//             else {
//                 //reject執行.catch
//                 reject("放假瞜!!!");
//             }
//         }, 500);
//     });
// };


//使用flipCoin
//Promise 版
// flipCoin()
//     .then(result => {
//         console.log("成功",result);

//     })
//     .catch(err => {
//         console.log("失敗",err);
//     });

//async / await 版
// let main = async () => {
//     //使用try-catch作錯誤處理
//     try {
//         //轉成'同步'語言執行 -->執行完才往下做
//         let r = await flipCoin();
        
//         //沒加'await' -->還是 '非同步'
//         //let r = flipCoin();
        
//         console.log("成功!!!!!!!!!!");
//         console.log(r);
//     }
//     catch (err) {
//         console.log(err);
//     }
// };

// main();

let readFilePromise = (dataPath) => {
    return new Promise((resolve, reject) => {


        fs.readFile(dataPath, "utf8", (err, data1) => {
            //result["data1"] = JSON.parse(data1);
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data1));
            }
        });


    
    });
};

//讀三個檔案(asyna / await)
let main2 = async () => {
    try {
        //1. 使用 await 轉成'同步'語法 (執行完才會往下)
        //2. await 後的 function,要return Promise
        //3. await 要在 async fucntion 內
        //4. 使用try-catch做錯誤處理(取代.them/.catch)

        let output = {};
        let data1 = await readFilePromise("./models/data1.json");
        let data2 = await readFilePromise("./models/data2.json");
        let data3 = await readFilePromise("./models/data3.json");
        output["data1"] = data1;
        output["data2"] = data2;
        output["data3"] = data3;
        console.log(output);
    }
    catch (err) {
        console.log(err);
    }
};

main2();