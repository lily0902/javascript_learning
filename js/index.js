// const _ = require('lodash');

// const x = _.isEmpty([1, 2, 3, 4]);
// console.log(x);


// import http from 'http';
// const server = http.createServer(function (req, res) {
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<h1>hello world!!!</h1>');
//     res.end();
// });
// server.listen(3000);

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let map1 = arr.map(n => n * 2);
// console.log("map1: ",map1);

// let profile = {
//     name: 'jeff',
//     height: 170,
//     weight: 65,
//     age: 26,
//     class: 'A-',
//     interest: ["drink", "hiking", "programming"]
// }

// console.log(`嗨嗨，我是${profile.name}，階級為${profile.class}`);
// profile.height = 180;
// console.log(`修改${profile.name}的身高為${profile.height}`);
// profile.interest.push("play guitar");
// console.log(profile.interest);

// let studentsScores = [
//     { name : "Jeff"  , age : 18 , scores : [95,88,100] },
//     { name : "Leo"   , age : 22 , scores : [90,97,98]  },
//     { name : "Holy"  , age : 25 , scores : [75,68,90]  },
//     { name : "Keven" , age : 33 , scores : [77,65,32]  },
//     { name : "Jenny" , age : 20 , scores : [63,82,91]  },
//     { name : "Elle"  , age : 31 , scores : [100,73,83] },
// ];

// let a = studentsScores.map(sum => sum.scores.)

// let data = ["a", "b", "c", "c", "c", "a", "d", "b", "b", "a", "c"];

// let answer = {};

// for (let i of data) {
//     if (i in answer)
//         answer[i]++;
//     else
//         answer[i] = 1;
// }

// console.log(answer);


// for (let i = 1; i < 10; i++){
//     let message ="";
//     for (let j = 1; j < 10; j++){
//         if (i * j < 10)
//             message += (`${i} * ${j} = ${i * j}`+" ");
//         else
//             message += `${i} * ${j} = ${i * j}`;
//         message += " ";
//     }
//     console.log(message);
// }


// let fibonacci = (n) => {
//     if (n === 1 || n === 2) return 1;
//     else
//         return fibonacci(n - 1) + fibonacci(n - 2);
// }
// console.log(fibonacci(10));

let i = 0;
while (i < 30) {
    console.log(Math.ceil(Math.random()*45));
    i++;
}
