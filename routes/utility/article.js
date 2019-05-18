'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');
//=========================================
//---------  getArticleList() -------------
//=========================================
var getArticleList = async function () {
    var articleList = [];
    var likeCount = [];
    var messageCount = [];
    var result = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "article"')
        .then((data) => {
            // console.log("data=", data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            articleList = data.rows;
        }, (error) => {
            articleList = null;
        });
    // -----------  取得文章清單每篇的愛心數量 --------------
    for (let i = 0; i < articleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [articleList[i].artiNum])
            .then((data) => {
                if (data.rows != '' && data.rows != undefined) {
                    // console.log(articleList[i].artiNum , ":" , data.rows[0].count);
                    likeCount[articleList[i].artiNum] = data.rows[0].count
                }
            }, (error) => {
                likeCount = null;
            });
    }
    // -----------  取得文章清單每篇的留言數量 --------------
    for (let i = 0; i < articleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [articleList[i].artiNum])
            .then((data) => {
                if (data.rows != '' && data.rows != undefined) {
                    // console.log(articleList[i].artiNum , ":" , data.rows[0].count);
                    messageCount[articleList[i].artiNum] = data.rows[0].count
                }
            }, (error) => {
                messageCount = null;
            });
    }

    result[0] = articleList;  //存入文章清單
    result[1] = likeCount;  //存入文章清單每篇的愛心數量
    result[2] = messageCount;
    // console.log(result);
    return result;
}
//=========================================
//---------  getOneArticle() -------------
//=========================================
var getOneArticle = async function (artiNum) {
    var oneArticle = [];  //存放文章內容
    var oneArtiLikeCount = []; //存放文章愛心總數
    var oneArtiMessage = []; //存放文章留言內容
    var oneArtiMessCount = []; //存放文章留言總數
    var oneArtiMessLikeCount = []; //存放留言愛心數量
    var result = [];

    // -----------  取得單一文章 --------------
    await sql('SELECT * FROM "article" WHERE "artiNum" = $1', [artiNum])
        .then((data) => {
            if (data.rows.length > 0) {
                // console.log(data.rows);
                data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                oneArticle = data.rows;
            } else {
                oneArticle = -1;
            }
        }, (error) => {
            oneArticle = null;
        });
    // -----------  取得單一文章愛心數量 --------------
    await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [artiNum])
        .then((data) => {
            if (data.rows.length > 0) {
                // console.log(data.rows);
                oneArtiLikeCount = data.rows;
            } else {
                oneArtiLikeCount = -1;
            }
        }, (error) => {
            oneArtiLikeCount = null;
        });
    // -----------  取得單一文章所有留言 --------------
    await sql('SELECT * FROM "articleMessage" WHERE "artiNum" = $1', [artiNum])
        .then((data) => {
            // console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiMessDateTime = moment(data.rows[i].artiMessDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            oneArtiMessage = data.rows;
        }, (error) => {
            oneArtiMessage = null;
        });
    // -----------  取得單一文章留言數量 --------------
    await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum" = $1', [artiNum])
        .then((data) => {
            // console.log(data.rows);
            oneArtiMessCount = data.rows;
        }, (error) => {
            oneArtiMessCount = null;
        });
    // -----------  取得每篇文章留言的愛心數量 --------------
    for (let i = 0; i < oneArtiMessage.length; i++) {
        await sql('SELECT count("artiMessNum") FROM "articleMessageLike" WHERE "artiMessNum" = $1', [oneArtiMessage[i].artiMessNum])
            .then((data) => {
                // console.log(data.rows[0]);
                oneArtiMessLikeCount.push(data.rows[0]);
            }, (error) => {
                oneArtiMessLikeCount = null;
            });
    }

    result[0] = oneArticle;
    result[1] = oneArtiMessage;
    result[2] = oneArtiLikeCount;
    result[3] = oneArtiMessCount;
    result[4] = oneArtiMessLikeCount;
    // console.log(result);
    return result;
}
//=========================================
//----- get_four_class_article (start)-----
//=========================================
//---------  getClassMovie() -------------
var getClassMovie = async function () {
    var result = [];

    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['movie'])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    return result;
}
//---------  getClassMusic() -------------
var getClassMusic = async function () {
    var result = [];

    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['music'])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    return result;
}
//---------  getClassBook() -------------
var getClassBook = async function () {
    var result = [];

    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['book'])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    return result;
}
//---------  getClassExhibition() -------------
var getClassExhibition = async function () {
    var result = [];

    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['exhibition'])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    return result;
}
// ========= get_four_class_article (start) ========

//=========================================
//---------  getHotArticle() -------------
//=========================================
var getHotArticle = async function () {
    var result = [];
    var mydata = [];
    var articleLikeCount = [] //存放 articleLike表中裡面的 artiNum欄位
    var max = 0; // 尋找在articleLike表中 出現最多次的artiNum
    var times = 0; //作為判斷是否取得三篇文章的開關
    var hotArticle = [];  //存放前三名熱門文章

    await sql('select "articleLike"."artiNum" from "articleLike"')
        .then((data) => {
            result = data.rows;
            //初始化陣列 
            for (let i = 0; i <= result.length; i++) {
                articleLikeCount[i] = 0;
            }
            //將取得的文章編號做計算 (articleLikeCount陣列維度代表第幾篇文章 裡面的值代表共有幾個讚)
            for (let i = 0; i < result.length; i++) {
                articleLikeCount[result[i].artiNum] += 1;
            }
            // console.log(articleLikeCount);
            //尋找前三名
            max = Math.max(...articleLikeCount);  //取得最大值
            while (times < 3) {
                for (let i = 1; i <= articleLikeCount.length; i++) {
                    if (times == 3) break;
                    if (articleLikeCount[i] == max) {
                        hotArticle[times] = i;
                        times += 1;
                    }
                }
                max -= 1;
            }
        }, (error) => {
            result = null;
        });
    // 撈前三篇文章的資訊
    for (let i = 0; i < 3; i++) {
        await sql('select * from "article" where "artiNum" = $1 ', [hotArticle[i]])
            .then((data) => {
                data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD HH:mm:ss");
                mydata[i] = data.rows;
            }, (error) => {
                mydata = null;
            });
    }

    return mydata;
}

//匯出
module.exports = {
    getArticleList, getOneArticle,
    getClassMovie, getClassMusic, getClassBook, getClassExhibition,
    getHotArticle
};