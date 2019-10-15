'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const moment = require('moment');


//==============================
//----- 抓取有綁定line的會員 -----
//==============================

var AllMember = async function () {
    var result;
    
    await sql('SELECT "lineID" FROM "member" where "lineID" is not null')
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
//------ 對推播內容點選喜愛 ------
//==============================

var linebotAddLike = async function () {
    var result;
    
    // 判斷是否被使用者按愛心
    await sql('SELECT "memID","artiNum" '+ 
             ' FROM "articleLike" '+
             ' WHERE "memID" = $1', [memID])
        .then((data) => {
            if(!data.rows){
                isLike = undefined ; 
            }else{
                isLike = data.rows ;
            }
        }, (error) => {
            isLike.push('0');
        });
    
    
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var result;
    await sql('INSERT INTO "articleLike" ("memID","artiNum","artiLikeDateTime") VALUES ($1,$2,$3)', [memID, artiNum, addTime])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
  
}

//匯出
module.exports = {AllMember,linebotAddLike};