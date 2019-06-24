'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');
//=========================================
//---------  getRecommendList() -----------
//=========================================
var getRecommendList = async function () {
    var RecommendList = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend"')
        .then((data) => {
            // console.log("data=", data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                // console.log(data.rows[i].recomClass);
                if (data.rows[i].recomClass == 'movie') {
                    data.rows[i].recomClass = '電影';
                } else if (data.rows[i].recomClass == 'music') {
                    data.rows[i].recomClass = '音樂';
                } else if (data.rows[i].recomClass == 'book') {
                    data.rows[i].recomClass = '書籍';
                } else {
                    data.rows[i].recomClass = '展覽';
                }
            }
            RecommendList = data.rows;
        }, (error) => {
            RecommendList = null;
        });
    return RecommendList;
}

//=========================================
//---------  getOneRecommend() -------------
//=========================================
var getOneRecommend = async function (recomNum, memID) {
    var oneRecommend = [];  //存放文章內容
    var oneRecomLikeCount = []; //存放文章愛心總數
    var oneRecomMessage = []; //存放文章留言內容
    var oneRecomMessCount = []; //存放文章留言總數
    var oneRecomMessLikeCount = []; //存放留言愛心數量
    var tagLink = [];
    var tag = [];
    var isCollection = [];
    var result = [];

    // -----------  取得單一推薦文章 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomNum" = $1', [recomNum])
        .then((data) => {
            if (data.rows.length > 0) {
                // console.log(data.rows);
                data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                oneRecommend = data.rows;
            } else {
                oneRecomend = -1;
            }
        }, (error) => {
            oneRecommend = null;
        });
    // -----------  取得單一推薦文章愛心數量 --------------
    await sql('SELECT count("recomNum") FROM "recommendLike" WHERE "recomNum"=$1', [recomNum])
        .then((data) => {
            if (data.rows.length > 0) {
                // console.log(data.rows);
                oneRecomLikeCount = data.rows;
            } else {
                oneRecomLikeCount = -1;
            }
        }, (error) => {
            oneRecomLikeCount = null;
        });
    // -----------  取得單一文章所有留言 --------------
    await sql('SELECT * FROM "recommendMessage" WHERE "recomNum" = $1', [recomNum])
        .then((data) => {
            // console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].recomMessDateTime = moment(data.rows[i].recomMessDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            oneRecomMessage = data.rows;
        }, (error) => {
            oneRecomMessage = null;
        });
    // -----------  取得單一文章留言數量 --------------
    await sql('SELECT count("recomNum") FROM "recommendMessage" WHERE "recomNum" = $1', [recomNum])
        .then((data) => {
            // console.log(data.rows);
            oneRecomMessCount = data.rows;
        }, (error) => {
            oneRecomMessCount = null;
        });
    // -----------  取得每篇文章留言的愛心數量 --------------
    for (let i = 0; i < oneRecomMessage.length; i++) {
        await sql('SELECT count("recomMessNum") FROM "recommendMessageLike" WHERE "recomMessNum" = $1', [oneRecomMessage[i].recomMessNum])
            .then((data) => {
                // console.log(data.rows[0]);
                oneRecomMessLikeCount.push(data.rows[0]);
            }, (error) => {
                oneRecomMessLikeCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    await sql('select * from "tagLinkArticle" where "recomNum" = $1', [recomNum])
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
    // console.log("tagLink=", tagLink);
    // -----------  取得文章全部tag --------------
    // 初始化二維陣列
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
    // 判斷是否被使用者收藏
    await sql('SELECT "recomNum" FROM "memberCollection" WHERE "recomNum" = $1 and "memID" = $2', [recomNum, memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isCollection.push('1');
            } else {
                isCollection.push('0');
            }
        }, (error) => {
            isCollection.push('0');
        });


    console.log(oneRecomMessLikeCount);
    result[0] = oneRecommend;
    result[1] = oneRecomMessage;
    result[2] = oneRecomLikeCount;
    result[3] = oneRecomMessCount;
    result[4] = oneRecomMessLikeCount;
    result[5] = tag;
    result[6] = isCollection;
    result[7] = [memID] ;
    // console.log(result);
    return result;
}
//=========================================
//------ get_four_class_recom (start)------
//=========================================

//---------  getRecomMovie() -------------
var getRecomMovie = async function () {
    var RecommendMovie = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['movie'])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                if (data.rows[i].recomClass == 'movie') {
                    data.rows[i].recomClass = '電影';
                }
            }
            // console.log("data=", data.rows);
            RecommendMovie = data.rows;
        }, (error) => {
            RecommendMovie = null;
        });
    return RecommendMovie;


}

//---------  getRecomMusic() -------------
var getRecomMusic = async function () {
    var RecommendMusic = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['music'])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                if (data.rows[i].recomClass == 'music') {
                    data.rows[i].recomClass = '音樂';
                }
            }
            // console.log("data=", data.rows);
            RecommendMusic = data.rows;
        }, (error) => {
            RecommendMusic = null;
        });
    return RecommendMusic;

}
//---------  getRecomBook() --------------
var getRecomBook = async function () {
    var RecommendBook = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['book'])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                if (data.rows[i].recomClass == 'book') {
                    data.rows[i].recomClass = '書籍';
                }
            }
            // console.log("data=", data.rows);
            RecommendBook = data.rows;
        }, (error) => {
            RecommendBook = null;
        });
    return RecommendBook;

}

//-------  getRecomExhibition() ----------
var getRecomExhibition = async function () {
    var RecommendExhibition = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['exhibition'])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                if (data.rows[i].recomClass == 'exhibition') {
                    data.rows[i].recomClass = '展覽';
                }
            }
            // console.log("data=", data.rows);
            RecommendExhibition = data.rows;
        }, (error) => {
            RecommendExhibition = null;
        });
    return RecommendExhibition;

}

//=========================================
//------ get_four_class_recom (end)------
//=========================================
module.exports = {
    getRecommendList, getOneRecommend,
    getRecomMovie, getRecomMusic, getRecomBook, getRecomExhibition
}