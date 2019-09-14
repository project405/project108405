'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 使用者登入
//---------------------------------------------
var userLogIn = async function(id, password){   
    var result;

    //取得員工資料
    await sql('SELECT * FROM "member" WHERE "memID"=$1 and "memPass"=$2', [id, password])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];
            }else{
                result = null;
            } 
        }, (error) => {
            result = null;
        });
    
    //回傳物件
    return result;
}

//---------------------------------------------
// line綁定
//---------------------------------------------
var userBind = async function(id, password, lineID){   
    var result;

    //取得員工資料
    await sql('SELECT * FROM "member" WHERE "memID"=$1 and "memPass"=$2', [id, password])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];
            } else {
                result = null;
            } 
        }, (error) => {
            result = null;
        });
    
    //回傳物件
    return result;
}
var addLineID = async function(memID, lineID){  
    var result;
    await sql('UPDATE "member" SET "lineID" = $2 WHERE "memID" = $1', [memID, lineID])
    .then((data) => {
        console.log(data)
        result = data.rows[0];
    }, (error) => {
        console.error(error)
        result = null;
    }) 
    //回傳物件
    return result;
}

var userJudgeBind = async function(lineID){
    var memID;   
    var LineID;
    var result = [];

    //取得員工資料
    await sql('SELECT * FROM "member" WHERE "lineID" = $1', [lineID])
        .then((data) => {
            if(!data.rows){
                LineID = undefined ;
            }else{
                LineID = data.rows ;
            }
        }, (error) => {
            LineID = undefined ;
        });

    await sql('SELECT * FROM "member" WHERE "lineID" = $1',[lineID])
        .then((data) => {
            if(!data.rows){
                memID = undefined ;
            }else{
                memID = data.rows ;
            }
        }, (error) => {
            memID = undefined ;
        });


    result[0] = LineID;
    result[1] = memID;


    //回傳物件
    return result;
}

//匯出
module.exports = {userLogIn, userBind, addLineID, userJudgeBind};
