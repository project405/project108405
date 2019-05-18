'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');

//---------  getCollRecommend() -------------
var getCollRecommend = async function (memID) {
    var getdata = [];
    var result = [];
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
                result.push(data.rows[0]);
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getCollArticle() -------------
var getCollArticle = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0', [memID])
        .then((data) => {
            // console.log(data.rows);
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1', [getdata[i].artiNum])
            .then((data) => {
                data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                result.push(data.rows[0]);
            }, (error) => {
                result = null;
            });
    }
    return result;
}
// ==================  Four Class  (start)=========================
//---------  getClassMovie() -------------
var getClassMovie = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1 and "recomClass" = $2', [getdata[i].recomNum, 'movie'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getClassMusic() -------------
var getClassMusic = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1 and "recomClass" = $2', [getdata[i].recomNum, 'music'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getClassBook() -------------
var getClassBook = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1 and "recomClass" = $2', [getdata[i].recomNum, 'book'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getClassExhibition() -------------
var getClassExhibition = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1 and "recomClass" = $2', [getdata[i].recomNum, 'exhibition'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
module.exports = { getCollRecommend, getCollArticle,
     getClassMovie, getClassMusic, getClassBook, getClassExhibition };