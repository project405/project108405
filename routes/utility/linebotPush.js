'use strict';
//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');

//增加引用函式
// const collection = require('./utility/collection');

//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1594135622',
    channelSecret: 'c503bd8ed4d7b8e183333309ddd135fd',
    channelAccessToken: 'xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
});
//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 推播功能
//---------------------------------------------

var linebotPush = async function(memID, lineID){  
    var result;
    // await sql('UPDATE "member" SET "lineID" = $2 WHERE "memID" = $1', [memID, lineID])
    // .then((data) => {
    //     console.log(data)
    //     result = data.rows[0];
    // }, (error) => {
    //     console.error(error)
    //     result = null;
    // }) 
    //回傳物件
    return result;
}



//匯出
module.exports = {linebotPush};
