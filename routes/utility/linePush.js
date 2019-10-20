'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const moment = require('moment');


//==============================
//-------- 點選文章喜愛 --------
//==============================

var AddArticleLike = async function (lineID,artiNum) {
    var result ;
    var isLike ;
    // 判斷是否被使用者按愛心
    await sql('SELECT "memID", "artiNum" '+
              'FROM "articleLike" '+
              'WHERE "memID" IN (SELECT "memID"  FROM  "member" WHERE "lineID" =  $1 and "artiNum" = $2)', [lineID,artiNum])


        .then((data) => {
            if(!data.rows){
                isLike = 0 ; 
            }else{
                isLike = 1 ;
            }
        }, (error) => {
            isLike = 0;
        });
    
    
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    if(isLike = 1){
        await sql('INSERT INTO "articleLike" ((SELECT "memID"  FROM  "member" WHERE "lineID" =  $1),"artiNum","artiLikeDateTime") VALUES ($1,$2,$3)', [lineID, artiNum, addTime])
            .then((data) => {
                result = data.rows;
            }, (error) => {
                result = 0;
            });
        }    
    
    return result;
  
}

//==============================
//-------- 點選推薦喜愛 --------
//==============================

var AddRecommendLike = async function (lineID,artiNum) {
    var result ;
    var isLike ;
    console.log('後台的～～～～～～～～～～～～',lineID)
    console.log('後台的～～～～～～～～～～～～',artiNum)
    // 判斷是否被使用者按愛心
    await sql('SELECT "memID", "artiNum" '+
              'FROM "articleLike" '+
              'WHERE "memID" IN (SELECT "memID"  FROM  "member" WHERE "lineID" =  $1)', [lineID])


        .then((data) => {
            if(!data.rows){
                isLike = undefined ; 
            }else{
                isLike = data.rows ;
            }
        }, (error) => {
            isLike = 0;
        });
    
    
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    // await sql('INSERT INTO "articleLike" ("memID","artiNum","artiLikeDateTime") VALUES ($1,$2,$3)', [memID, artiNum, addTime])
    //     .then((data) => {
    //         result = 1;
    //     }, (error) => {
    //         result = 0;
    //     });


    console.log('islike@@@@@@@@@@@@@@@@@@',isLike)    
    return result;
  
}

//匯出
module.exports = {AddArticleLike,AddRecommendLike};