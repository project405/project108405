'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 使用者登入
//---------------------------------------------
var userLogin = async function(id, password){   
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

//匯出
module.exports = {userLogin};