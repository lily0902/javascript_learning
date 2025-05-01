$(function(){
  
    $("#drama-select-btn").click(function(){

        var type = $("#categories-select").val();

        // Ajax
        // query_string 
        $.ajax({
            //url  : "/dramas/list", // 1. 忘記帶 type
            //url  : "/dramas/list?type=ABCD", // 2. type 亂帶
            url  : "/dramas/list?type="+type,  // 3. type 正常
            type: "GET",
            headers: {
                "x-jeff-token" : "APTX4869"  // 3. token 正確
            },
            timeout: 10000 // 10 sec
        })
            .then(function (response) {
            // 成功 -> status_code = 2xx , 3xx
            console.log(response);

            createTable(response["result"]);

        })
            .catch(function (error) {
            // 失敗 -> status_code = 4xx , 5xx
            console.log(error);
            alert(error.responseJSON.message);

            if(error.status === 401){
                alert("請先登入！");
                return;
            };
        });


    });

    $("#drama-insert-btn").click(function(){
        insertNewRecord();
    });

});

let createTable = (data)=>{
    data = data || [
        { category : "犯罪" , name : "絕命毒師" , score : 10 },
        { category : "殭屍" , name : "屍戰朝鮮" , score : 9 },
        { category : "愛情" , name : "想見你"   , score : 8.5 },
    ];
 

    let tableBody = data.map((ele,i)=>`
        <tr>
            <th scope="row">${ele.dramaId}</th>
            <td>${ele.category}</td>
            <td>${ele.name}</td>
            <td>${ele.score} / 10</td>
        </tr>
    `).join("");
    

    $("#drama-select-table tbody").html(tableBody);
};



let insertNewRecord = ()=> {
    let category  = $("#categories-insert option:selected").val(); 
    let name      = $("#name-insert").val();
    let score     = $("#score-insert").val();


    if(!name || name.length === 0){
        alert("請輸入劇名！");
        return;
    };

    if(!score || score.legnth === 0){
        alert("請輸入評價！");
        return;
    };


    $.ajax({
        url: "/dramas/data",
        type: "POST", // requests method
        
        //新增 headers key-value pair
        headers: {
            // 1. 沒帶 token
            //"x-jeff-token": "qqq"  // 2. token 帶錯
            "x-jeff-token" : "APTX4869"  // 3. token 正確
        },
        data : {
            category,
            name,
            score
        },

        // data : JSON.stringify({
        //     category,
        //     name,
        //     score
        // }),
        // contentType: "application/json",
    })
    .then(r=>{
        if(r.message === "ok.")  alert("更新完成！");
        
    })
    .catch(err=>{
        console.log(err);

        alert(err.responseJSON.message);

        if(err.status === 404){
            alert("找不到該 API !");
            return;
        };

        // if(err.status === 401){
        //     alert("請先登入 , 2秒後自動將您跳轉！");
        //     setTimeout(function(){
        //         location.href="/login";
        //     },2000);
        //     return;
        // };
        
        //alert("系統有誤 , 請稍後再試！");
    });
};
