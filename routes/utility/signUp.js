'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//--------- checkMemID() -------------
var checkMemID = async function (memID) {
    var result = []  //判斷資料庫是否已存在ID
    await sql('SELECT "memID" FROM "member" where "memID" = $1', [memID])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = undefined;
        });
    return result;
}

//--------- checkMail() -------------
var checkMail = async function (memMail) {
    var result = []  //判斷資料庫是否已存在ID
    await sql('SELECT "memMail" FROM "member" where "memMail" = $1', [memMail])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = undefined;
        });
    return result;
}

//---------  createMember() -------------
var createMember = async function (newData) {
    var result;
    await sql('INSERT INTO "member" ("memID", "memPass", "memBirth","memName", "memMail", "memGender") VALUES ($1,$2,$3,$4,$5,$6)',
        [newData.memID, newData.memPass, newData.memBirth,newData.memName ,newData.memMail, newData.memGender])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });

    return result;
}

//---------  googleCreateMember() -------------
var googleCreateMember = async function (memID, memName, memMail) {
    var result;
    await sql('INSERT INTO "member" ("memID" , "memName", "memMail") VALUES ($1, $2, $3)',
        [memID, memName, memMail])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });

    return result;
}

//匯出
module.exports = { createMember, checkMemID ,checkMail, googleCreateMember};