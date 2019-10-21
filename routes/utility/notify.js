'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');

//---------  getNotifyList() -------------
var getNotifyList = async function (memID) {
    var result = [];
    var checkAuthority;
    await sql('SELECT * FROM "memberMessage" WHERE "memID"=$1', [memID])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].memMessDateTime = moment(data.rows[i].memMessDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            result.push(data.rows);
        }, (error) => {
            result = null;
        });

    result.push([memID]);

    return result;
}


module.exports = { getNotifyList };