'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');


var articlePost = async function (memID, artiHead, artiCont, artiClass, artiDateTime) {
    var result;
    //取得員工資料
    await sql('INSERT into "article" ("memID","artiHead","artiCont","artiClass","artiDateTime") VALUES ($1,$2,$3,$4,$5)', [memID, artiHead, artiCont, artiClass, artiDateTime])
        .then((data) => {
            // console.log("data=", data);
            result = 0;
        }, (error) => {
            result = 1;
        });

    //回傳物件
    console.log(result);
    return result;
}

//匯出
module.exports = { articlePost };