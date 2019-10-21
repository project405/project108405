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


//匯出
module.exports = {AllMember,recomImg,artiImg};