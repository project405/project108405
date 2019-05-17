'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');

//---------  getCollRecommend() -------------
var getCollRecommend = async function (memID) {
    var getdata = [];
    var result=[] ;
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0', [memID])
        .then((data) => {
            // console.log(data.rows);
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1', [getdata[i].recomNum])
            .then((data) => {
                data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                result.push(data.rows[0]) ;
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getCollRecommend() -------------
var getCollArticle = async function (memID) {
    var getdata = [];
    var result=[] ;
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0', [memID])
        .then((data) => {
            console.log(data.rows);
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1', [getdata[i].artiNum])
            .then((data) => {
                data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                result.push(data.rows[0]) ;
            }, (error) => {
                result = null;
            });
    }
    return result;
}
module.exports = { getCollRecommend, getCollArticle };