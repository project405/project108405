'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

////--------- checkMemID() -------------
var checkMemID = async function (memID) {
    var result = []  //判斷資料庫是否已存在ID
    await sql('SELECT "memID" FROM "member" where "memID" = $1', [memID])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = undefined;
        });
    console.log("3");
    return result;
}
//---------  createMember() -------------
var createMember = async function (newData) {
    var result;
    // 'INSERT INTO member (member, memPass, memBirth, memMail, memGender) VALUES ($1, $2, $3, $4, $5)', [newData.member, newData.memPass, newData.memBirth, newData.memMail,memGender])
    console.log(newData);
    await sql('INSERT INTO "member" ("memID") VALUES ($1)', [newData.memID])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });

    return result;
}

//匯出
module.exports = { createMember, checkMemID };