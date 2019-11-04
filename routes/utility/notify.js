'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');

//---------  getNotifyList() -------------
var getNotifyList = async function (memID) {
    var result = [];
    await sql('SELECT * FROM "memberMessage" WHERE "memID"=$1 ORDER BY "memMessDateTime" DESC' , [memID])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].memMessDateTime = moment(data.rows[i].memMessDateTime).format("YYYY-MM-DD HH:mm:ss");
            }
            result.push(data.rows);
        }, (error) => {
            result = null;
        });

    result.push([memID]);

    return result;
}

//增加會員訊息(寄信)
var insertMessage = async function(memID, message, dateTime){
    var result = 0 ;
 
    for(var i = 0 ; i < memID.length ; i++){
        await sql('INSERT INTO "memberMessage" ("memID","memMessCont","memMessDateTime") VALUES ($1,$2,$3)'
            , [memID[i], message[i], dateTime ])
        .then((data) => {
            console.log(data);
            result = 1 ; 
        }, (error) => {
            result = 0 ; 
        });


    }
   
    return result;

}




module.exports = { getNotifyList, insertMessage};