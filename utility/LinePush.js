'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
// const moment = require('moment');
const fetch = require("node-fetch");



//==============================
//----- 抓取有綁定line的會員 -----
//==============================

var AllMember = async function () {
    var result;
    
    await sql('SELECT "lineID","memID" FROM "member" where "lineID" is not null')
        .then((data) => {
            
            if (!data.rows) {
                result = undefined;
            } else {
                result = data.rows;
            }
        } , (error) => {
                result = undefined;
        });
       
    return result;
}

//==============================
//-------- 抓取推播內容 --------
//============================== 
var getIndexData = async function (lineID) {
    var byClassData = [] ;
    var artiClassCount = [] ; 
    var recomClassCount = [] ;
    var classCount = [0,0,0,0] ;  //arti + recom
    var r ; //radom
    var result = [];

    // ----------- 計算文章class的數量-----------
    await sql('SELECT "artiClass" AS "class" , '+
              '    count("artiClass")  '+
              ' FROM "article" '+
              ' WHERE "artiNum" '+
              ' IN( SELECT "artiNum" '+
                ' FROM "articleLike"  '+
                '   WHERE "memID" IN (SELECT "memID" '+ 
                    '  FROM  "member" '+
                    '  WHERE "lineID" =  $1)) '+  
                'GROUP BY "artiClass"', [lineID])
    .then((data) => {
        if (!data.rows) {
            artiClassCount = {"class":"" , "count":0 }; 
        } else {
            artiClassCount = data.rows ;
        }
    }, (error) => {
        artiClassCount = {"class":"" , "count":0 }; 
    });

    // ----------- 計算推薦class的數量-----------
    await sql('SELECT "recomClass" AS "class" , count("recomClass") '+
             ' FROM "recommend" '+
             ' WHERE "recomNum" '+
                 ' IN( SELECT "recomNum" '+
                        ' FROM "recommendLike" '+
                        ' WHERE "memID" IN (SELECT "memID"  '+
						' FROM  "member" '+
						' WHERE "lineID" =  $1)) '+
             ' GROUP BY "recomClass"', [lineID])
    .then((data) => {
        if (!data.rows) {
            recomClassCount = {"class":"" , "count":0 }; 
        } else {
            recomClassCount = data.rows ;
        }
    }, (error) => {
        recomClassCount ={"class":"" , "count":0 }; 
    });

    //依照亂數取文章或推薦
    r = Math.floor(Math.random() * 10) + 1

    //如果都沒對文章或推薦按過愛心
    if(artiClassCount.length == 0 && recomClassCount.length == 0){
        var classRandom = Math.floor(Math.random() * 3) ;
        byClassData = await byClassGetData(classRandom,r ) ; 

    }else{
        //加總class按讚次數
        await sumClass(classCount, artiClassCount) ;
        await sumClass(classCount, recomClassCount) ;

        //排序
        classCount = await sortObject(classCount);

        //class次數最多的 以亂數的方式去判斷說要取文章 還是 推薦
        byClassData = await byClassGetData(classCount[0][0],r ) ; 
    }
    
  

    // console.log("byClassData",byClassData);

    
    result = byClassData; 

    return result;
}

//計算使用者分別對article/recommend Class 按愛心的次數
async function sumClass(array, data){
    for(var i = 0 ; i < data.length ; i++){
        if(data[i].class == 'movie'){
            array[0] += parseInt(data[i].count,10) ; 
        }else if(data[i].class == 'music'){
            array[1] += parseInt(data[i].count,10) ;
        }else if(data[i].class == 'book'){
            array[2] += parseInt(data[i].count,10) ;
        }else if(data[i].class == 'exhibition'){
            array[3] += parseInt(data[i].count,10) ;
        }
    }
} 

//排序
async function sortObject(array){
    var sortable = [] ;
    for (var item in array) {
        sortable.push([item, array[item]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortable ; 
}

//針對class 取文章或推薦(亂數)
async function byClassGetData(index, r){
    var className = "" ; 
    var result = [] ;    
    
    //判斷class是什麼
    if(index == "0"){
        className = "movie";
    }else if(index == "1"){
        className = "music";
    }else if(index == "2"){
        className = "book";
    }else if(index == "3"){
        className = "exhibition";
    }

    //取文章
    if( r <= 5 ){
        await sql(` SELECT "B".*
                    FROM( SELECT "A".* , "I"."imgName"  , ROW_NUMBER() OVER(PARTITION BY "I"."artiNum" ORDER BY "I"."imgDateTime" DESC ) AS "R"
                        FROM "articleListDataView" AS "A" 
                        INNER JOIN "image" AS "I" 
                            ON "A"."artiNum" = "I"."artiNum"
                        WHERE "artiClass" = $1 AND "I"."artiMessNum" IS NULL ) AS "B"
                    WHERE "B"."R" = 1
                    ORDER BY random() 
                    LIMIT 1`, [className])
        .then((data) => {
            if (!data.rows) {
                result = undefined; 
            } else {
                result = data.rows ;
            }
        }, (error) => {
            result = undefined ; 
        });
    }else{ 
        //取推薦
        await sql(`SELECT "B".*
                    FROM( SELECT "A".* , "I"."imgName"  , ROW_NUMBER() OVER(PARTITION BY "I"."recomNum" ORDER BY "I"."imgDateTime" DESC ) AS "R"
                        FROM "recommend" AS "A" 
                        INNER JOIN "image" AS "I" 
                            ON "A"."recomNum" = "I"."recomNum"
                        WHERE "recomClass" = $1 AND "I"."recomMessNum" IS NULL ) AS "B"
                    WHERE "B"."R" = 1
                    ORDER BY random() 
                    LIMIT 1`, [className])
        .then((data) => {
            if (!data.rows) {
                result = undefined; 
            } else {
                result = data.rows ;
            }
        }, (error) => {
            result = undefined ; 
        });

    }

    return result ; 
}


//==============================
//-------- 抓取推薦圖片 --------
//==============================  

var recomImg = async function (recomNum) {
    var result;
    await sql('SELECT "imgName" FROM "image" WHERE "recomNum" = $1 LIMIT 1',[recomNum])
        .then((data) => {
            if (!data.rows) {
                result = undefined;
            } else {
                result = data.rows;
            }
        }, (error) => {
            result = undefined;
        });
    return result;     
}

//==============================
//-------- 抓取文章圖片 --------
//==============================  

var artiImg = async function (artiNum) {
    var result;
    await sql('SELECT "imgName" FROM "image" WHERE "artiNum" = $1 LIMIT 1', [artiNum])
        .then((data) => {
            if (!data.rows) {
                result = undefined;
            } else {
                result = data.rows;
            }
        }, (error) => {
            result = undefined;
        });
    return result;
}

//==============================
//-------- 圖片解碼base64 --------
//==============================        
var Imgur = async function (img) {
    const url = 'https://api.imgur.com/3/image',
        request = await fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json", 
              "Authorization": 'Client-ID 8b8755d8a1c4ace',
            },
            dataType:"json" ,
            body: img
            
        }
        // .catch(error => console.error('Error:', error))
        );
const response = await request.json();
return response.data.link;
};


//匯出
module.exports = {AllMember,getIndexData,recomImg,artiImg,Imgur};