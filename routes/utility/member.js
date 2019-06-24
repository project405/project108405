'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const moment = require('moment');

//================================
//-------- articlePost() ---------
//================================
var articlePost = async function (memID, artiHead, artiCont, artiClass, artiDateTime, picture) {
    var result;
    //取得員工資料
    await sql('INSERT into "article" ("memID","artiHead","artiCont","artiClass","artiDateTime","picture") VALUES ($1,$2,$3,$4,$5,$6)', [memID, artiHead, artiCont, artiClass, artiDateTime, picture])
        .then((data) => {
            // console.log("data=", data);
            result = 0;
        }, (error) => {
            result = 1;
        });

    //回傳物件
    // console.log(result);
    return result;
}


//================================
//--------- myArticle() ----------
//================================
var myArticle = async function (memID) {
    var article = [];
    var articleLikeCount = [];
    var articleMessCount = [];
    var tagLink = [];
    var tag = [];
    var result = [];
    //--------- get myArticle ----------
    await sql('SELECT * FROM "article" WHERE "memID" = $1', [memID])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            article = data.rows;
            // console.log("data=",data.rows);
        }, (error) => {
            article = null;
        })
    //---------  取得文章每篇的愛心數量 -------------
    for (let i = 0; i < article.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [article[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                articleLikeCount.push(data.rows[0]);
            }, (error) => {
                articleLikeCount = null;
            });
    }
    //---------  取得文章每篇的留言數量 -------------
    for (let i = 0; i < article.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [article[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                articleMessCount.push(data.rows[0]);
            }, (error) => {
                articleMessCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < article.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [article[i].artiNum])
            .then((data) => {
                // console.log("data=", data.rows);
                if (data.rows != undefined && data.rows != '') {
                    tagLink.push(data.rows);
                } else {
                    let tagNull = { "tagNum": "null" };
                    tagLink.push([tagNull]);
                }
            }, (error) => {
                tagLink = null;
            });
    }
    // console.log("tagLink=", tagLink);
    // -----------  取得文章全部tag --------------
    //初始化二維陣列
    for (let i = 0; i < tagLink.length; i++) {
        tag[i] = [];
    }
    // 將tagLink二維陣列，去tag表中取得每一篇文章所有的標籤名稱
    for (let i = 0; i < tagLink.length; i++) {
        for (let j = 0; j < tagLink[i].length; j++) {
            if (tagLink[i][j].tagNum != 'null') {
                await sql('select "tagName" from "tag" where "tagNum" = $1', [tagLink[i][j].tagNum])
                    .then((data) => {
                        // console.log(data.rows[0].tagName);
                        if (data.rows[0].tagName != undefined) {
                            tag[i][j] = data.rows[0].tagName;
                        }
                    }, (error) => {
                        tag = null;
                    });
            }
        }
    }
    result[0] = article;
    result[1] = articleLikeCount;
    result[2] = articleMessCount;
    result[3] = tag;
    return result;
}

//=========================================
//----- four_class_articleManage (start)-----
//=========================================
//---------  myMovieArticle() -------------
var myMovieArticle = async function (memID) {
    var result = [];
    var movieArticleList = [];
    var movieArtiLikeCount = [];
    var movieArtiMessCount = [];
    var tagLink = [];
    var tag = [];
    // -----------  取得電影分類文章 --------------
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1 and "memID" = $2 ', ['movie', memID])
        .then((data) => {
            console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            movieArticleList = data.rows;
        }, (error) => {
            movieArticleList = null;
        });
    //---------  取得電影文章的愛心數量 -------------
    for (let i = 0; i < movieArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [movieArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                movieArtiLikeCount.push(data.rows[0]);
            }, (error) => {
                movieArtiLikeCount = null;
            });
    }
    //---------  取得收藏的文章的留言數量 -------------
    for (let i = 0; i < movieArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [movieArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                movieArtiMessCount.push(data.rows[0]);
            }, (error) => {
                movieArtiMessCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < movieArticleList.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [movieArticleList[i].artiNum])
            .then((data) => {
                // console.log("data=", data.rows);
                if (data.rows != undefined && data.rows != '') {
                    tagLink.push(data.rows);
                } else {
                    let tagNull = { "tagNum": "null" };
                    tagLink.push([tagNull]);
                }
            }, (error) => {
                tagLink = null;
            });
    }
    // console.log("tagLink=", tagLink);
    // -----------  取得文章全部tag --------------
    //初始化二維陣列
    for (let i = 0; i < tagLink.length; i++) {
        tag[i] = [];
    }
    // 將tagLink二維陣列，去tag表中取得每一篇文章所有的標籤名稱
    for (let i = 0; i < tagLink.length; i++) {
        for (let j = 0; j < tagLink[i].length; j++) {
            if (tagLink[i][j].tagNum != 'null') {
                await sql('select "tagName" from "tag" where "tagNum" = $1', [tagLink[i][j].tagNum])
                    .then((data) => {
                        // console.log(data.rows[0].tagName);
                        if (data.rows[0].tagName != undefined) {
                            tag[i][j] = data.rows[0].tagName;
                        }
                    }, (error) => {
                        tag = null;
                    });
            }
        }
    }
    result[0] = movieArticleList;
    result[1] = movieArtiLikeCount;
    result[2] = movieArtiMessCount;
    result[3] = tag;

    console.log(result);
    return result;
}

//=========================================
//---------  addArticleLike() -----------
//=========================================
var addArticleLike = async function (memID, artiNum) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss") ; 
    var result;
    await sql('INSERT INTO "articleLike" ("memID","artiNum","artiLikeDateTime") VALUES ($1,$2,$3)', [memID, artiNum,addTime])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}
//=========================================
//---------  delArticleLike() -----------
//=========================================
var delArticleLike = async function (memID, artiNum) {
    var result;
    await sql('DELETE FROM "articleLike" WHERE "memID" = $1 and "artiNum"= $2', [memID, artiNum])
        .then((data) => {
            console.log("刪除囉~~~~");
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}


//匯出
module.exports = {
    articlePost, myArticle,
    myMovieArticle,
    addArticleLike,delArticleLike
};