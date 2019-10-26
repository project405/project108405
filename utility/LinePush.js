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
            
        });
const response = await request.json();
return response.data.link;
};



//匯出
module.exports = {AllMember,recomImg,artiImg,Imgur};