'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//=========================================
//---------  getMood() -----------
//=========================================
var getMood = async function (r) {
    var negativerecom= [];
    var negativearti = [];
    var positiverecom = [];
    var positivearti = [];
    var result = [];
    var positiveChoose = Math.round(Math.random())
    var negativeChoose = Math.round(Math.random())

    // -----------  取得推薦清單 --------------

    if (negativeChoose == 0) {
        await sql('SELECT * FROM( SELECT * FROM "recommend" WHERE "analyzeScore" < 0 ORDER BY "negativeWords" DESC, "analyzeScore" DESC LIMIT 5) AS "A" ORDER BY random() LIMIT 1 ')
        .then((data) => {
            if (data.rows != undefined) {
                negativerecom = data.rows
            } else {
                negativerecom = undefined
            }
        }, (error) => {
            negativerecom = undefined;
        });
    } else {
        await sql('SELECT * FROM( SELECT * FROM "article" WHERE "analyzeScore" < 0 ORDER BY "negativeWords" DESC, "analyzeScore" DESC LIMIT 5) AS "A" ORDER BY random() LIMIT 1 ')
        .then((data) => {
            if (data.rows != undefined) {
                negativearti = data.rows
            } else {
                negativearti = undefined
            }
        }, (error) => {
            negativearti = undefined;
        });
    }

    if (positiveChoose == 0) {
        await sql('SELECT * FROM(SELECT * FROM "recommend" WHERE "analyzeScore" > 0.5 ORDER BY "positiveWords" DESC, "analyzeScore" DESC LIMIT 5) AS "A" ORDER BY random() LIMIT 1 ')
        .then((data) => {
            if (data.rows != undefined) {
                positiverecom = data.rows
            } else {
                positiverecom = undefined
            }
        }, (error) => {
            positiverecom = undefined;
        });
    } else {
        await sql('SELECT * FROM( SELECT * FROM "article" WHERE "analyzeScore" > 0.5 ORDER BY "positiveWords" DESC, "analyzeScore" DESC LIMIT 5) AS "A" ORDER BY random() LIMIT 1 ')
        .then((data) => {
            if (data.rows != undefined) {
                positivearti = data.rows
            } else {
                positivearti = undefined
            }
        }, (error) => {
            positivearti = undefined;
        });
    
    }
        
    result[0] = negativerecom;
    result[1] = negativearti;
    result[2] = positiverecom;
    result[3] = positivearti;

    console.log(result);
    return result;
}

//匯出
module.exports = {getMood};