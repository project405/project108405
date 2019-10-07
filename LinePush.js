'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//------------------------------------------
// 新增會員資料
//------------------------------------------
var addMember = async function(id, name){
    //存放結果
    let result;  

    //新增會員資料
    await query('insert into member (userid, name) values ($1, $2)', [id, name])
        .then((data) => {
            result = data.rowCount;  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}

//------------------------------------------
// 刪除會員資料
//------------------------------------------
var deleteMember = async function(id){
    //存放結果
    let result;  

    //刪除會員資料
    await query('delete from member where userid = $1', [id])
        .then((data) => {
            result = data.rowCount;  //刪除資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}

//------------------------------------------
// 隨機選擇推薦3項食物
//------------------------------------------
var randomSelectFoods = async function(){
    //存放結果
    let result;  

    //亂數選擇3項
    await query('select * from foods order by random() limit 3')
        .then((data) => {   
            if(data.rows.length > 0){
                result = data.rows;   //食物資料(陣列)
            }else{
                result = -1;  //找不到資料
            }                      
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}

//------------------------------------------
// 取出所有成員
//------------------------------------------
var fetchAllMember = async function(){
    //存放結果
    let result;  

    //亂數選擇3項
    await query('select * from member')
        .then((data) => {   
            if(data.rows.length > 0){
                result = data.rows;   //會員資料(陣列)
            }else{
                result = -1;  //找不到資料
            }                      
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}
//------------------------------------------

//匯出
module.exports = {addMember, deleteMember, randomSelectFoods, fetchAllMember};