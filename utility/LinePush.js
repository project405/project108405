'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const moment = require('moment');

//==============================
//------ lineBotPush() ------
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

var linebotAddLike = async function () {
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

//匯出
module.exports = {AllMember,linebotAddLike};