'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');


//----------------------------------
// 是否使用者有按愛心
//----------------------------------
var checkArtiLike= async function(memID,artiNum){
    var result;
    await sql('SELECT * FROM  articleLike where "memId"= $1 and "artiNum" = $2 ', [memID,artiNum])
       .then((data) => {
            result = data.rows;
        }, (error) => {
            result = -1;
        });
    return result;
}

//----------------------------------
// 點選文章愛心
//----------------------------------
var onArtiLike= async function(memID,artiNum,artiLikeDateTime){
    var result;
    await sql('INSERT INTO articleLike (memID,artiNum,artiLikeDateTime) VALUES ($1, $2, $3)', [memID,artiNum,artiLikeDateTime])
        .then((data) => {
            result = 0;   //新增成功 
        }, (error) => {
            result = -1;  //新增失敗
        });
		
    return result;
}

//----------------------------------
// 收回文章愛心
//----------------------------------
var offArtiLike = async function(memID){
    var result;
    await sql('DELETE FROM articleLike WHERE memID = $1', [memID])
        .then((data) => {
            result = data.rowCount;   //刪除筆數(包括刪除0筆) 
        }, (error) => {
            result = -1;   //剛除失敗
        });
		
    return result;
}

//------------------------------------------
// 計算文章愛心人數
//------------------------------------------
var countByArtiLike = async function(artiNum){
    //存放結果
    let result = 0; 
    let articleLikeCount;


    await query('select count(*) as cnt from articleLike where "artiNum" = $1'), [artiNum]
        .then((data) => {   
            if(data.rows.length > 0){
                maleCount = data.rows[0].cnt;   //人數
            }else{
                result = -1;  //找不到資料
            }                      
        }, (error) => {
            result = -9;  //執行錯誤
        });
    		
    //回傳執行結果
    return result;
}

//匯出
module.exports = {checkArtiLike,onArtiLike, offArtiLike, countByArtiLike};
