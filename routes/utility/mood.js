'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//=========================================
//---------  getMood() -----------
//=========================================
var getMood = async function () {
    var negativerecom= [];
    var negativearti = [];
    var positiverecom = [];
    var positivearti = [];
    var temp = []
    var result = [];
    var positiveChoose = Math.round(Math.random())
    var negativeChoose = Math.round(Math.random())
    async function compare(item, index) {
        if (item.length != 0 && index <= 1) {
            if (Object.keys(item[0]).indexOf('artiNum') >= 0 ) {
                var contentObj =  {
                    artiNum: item[0].artiNum,
                    artiHead:  item[0].artiHead,
                    artiCont:  item[0].artiCont,
                }
                result.push(contentObj)
              } else {
                // 推薦
                var contentObj =  {
                    recomNum: item[0].recomNum,
                    recomHead:  item[0].recomHead,
                    recomCont:  item[0].recomCont,
                }
                result.push(contentObj)
              }
        } else if (item.length != 0 && index >= 2) {
            if (Object.keys(item[0]).indexOf('artiNum') >= 0 ) {
                //  文章
                var contentObj =  {
                    artiNum: item[0].artiNum,
                    artiHead:  item[0].artiHead,
                    artiCont:  item[0].artiCont,
                }
                result.push(contentObj)
              } else {
                // 推薦
                var contentObj =  {
                    recomNum: item[0].recomNum,
                    recomHead:  item[0].recomHead,
                    recomCont:  item[0].recomCont,
                }
                result.push(contentObj)
            }
        }
    }

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
    
    temp[0] = negativerecom;
    temp[1] = negativearti;
    temp[2] = positiverecom;
    temp[3] = positivearti;
    
    temp.map( async(item, index) => {
        if (item != '') {
            await compare(item, index)
        }
    })
    return result;
}

//匯出
module.exports = {getMood};