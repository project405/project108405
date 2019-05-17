'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');
//------------------------------------------
// get article list
//------------------------------------------
var getArticleList = async function () {
    var result = [];

    await sql('SELECT * FROM article')
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    return result;
}
//---------  getOneArticle() -------------
var getOneArticle = async function (artiNum) {
    var result = {};

    await sql('SELECT * FROM article WHERE "artiNum" = $1', [artiNum])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];
            } else {
                result = -1;
            }
        }, (error) => {
            result = null;
        });


    return result;
}
//---------  getArticleMessage() -------------
var getArticleMessage = async function (artiNum) {
    var result = [];

    await sql('SELECT * FROM "articleMessage" WHERE "artiNum" = $1', [artiNum])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    return result;
}
// ==================  Four Class  (start)=========================
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
// ==================  Four Class  (end)=========================
//---------  getArticleNum() -------------
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

    // console.log("test=",test[0]);
    return mydata;
}

//匯出
module.exports = {
    getArticleList, getOneArticle, getArticleMessage,
    getClassMovie, getClassMusic, getClassBook, getClassExhibition,
    getHotArticle
};