'use strict';
//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');

//引用操作資料庫的物件
const query = require('./asyncDB');
//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1653312089',
    channelSecret: 'f582b751649f1b57f33910c0238113eb',
    channelAccessToken: 'QRKiyeWZcixMaO55Yf35KXjZTkrDD70ZAP2gyt8W55aeLgtA75mOVIkOZpruRurKgUgq6ow1+V85huiGRDEBas0Uq57+o4nNREgClY6s+gSg28gC1HNAbELCV7JxGEDlA2bkF8SuWeFNULCG1Z/lwgdB04t89/1O/w1cDnyilFU='
});



// //------------------------------------------
// // 新增會員資料
// //------------------------------------------
// var addMember = async function(id, name){
//     //存放結果
//     let result;  

//     //新增會員資料
//     await query('insert into member (userid, name) values ($1, $2)', [id, name])
//         .then((data) => {
//             result = data.rowCount;  //新增資料數 
//         }, (error) => {
//             result = -9;  //執行錯誤
//         });

//     //回傳執行結果
//     return result;  
// }

// //------------------------------------------
// // 刪除會員資料
// //------------------------------------------
// var deleteMember = async function(id){
//     //存放結果
//     let result;  

//     //刪除會員資料
//     await query('delete from member where userid = $1', [id])
//         .then((data) => {
//             result = data.rowCount;  //刪除資料數 
//         }, (error) => {
//             result = -9;  //執行錯誤
//         });

//     //回傳執行結果
//     return result;  
// }

//------------------------------------------
// 隨機選擇推薦3項食物
//------------------------------------------
var randomSelectFoods = async function(){
    //存放結果
    let result;  
    console.log("randomSelectFoods進來了")
//     //亂數選擇3項
//     await query('select * from foods order by random() limit 3')
//         .then((data) => {   
//             if(data.rows.length > 0){
//                 result = data.rows;   //食物資料(陣列)
//             }else{
//                 result = -1;  //找不到資料
//             }                      
//         }, (error) => {
//             result = -9;  //執行錯誤
//         });

//     //回傳執行結果
//     return result;  
// }

// //------------------------------------------
// // 取出所有成員
// //------------------------------------------
// var fetchAllMember = async function(){
//     //存放結果
//     let result;  

//     //亂數選擇3項
//     await query('select * from member')
//         .then((data) => {   
//             if(data.rows.length > 0){
//                 result = data.rows;   //會員資料(陣列)
//             }else{
//                 result = -1;  //找不到資料
//             }                      
//         }, (error) => {
//             result = -9;  //執行錯誤
//         });

//     //回傳執行結果
//     return result;  
// }
// //------------------------------------------

//匯出
module.exports = {randomSelectFoods};

//----------------------------------------
// 建立一個網站應用程式app
// 如果連接根目錄, 交給機器人處理
//----------------------------------------
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//----------------------------------------
// 可直接取用檔案的資料夾
//----------------------------------------
app.use(express.static('public'));

//----------------------------------------
// 監聽3000埠號, 
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function() {
    const port = server.address().port;
    console.log("正在監聽埠號:", port);
});
