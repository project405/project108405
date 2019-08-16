'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const member = require('./member');
var moment = require('moment');
//=========================================
//---------  getRecommendList() -----------
//=========================================
var getRecommendList = async function (memID) {
    var RecommendList = [];
    var checkAuthority;
    var result = [];
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
    //取得權限
    await member.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = RecommendList;
    result[1] = [memID];
    result[2] = checkAuthority;
    return result;
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
    var isLike = [];
    var isMessLike = []; //判斷留言愛心是否被按過
    var checkAuthority;
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
    // 判斷是否被使用者案愛心
    await sql('SELECT "recomNum" FROM "recommendLike" WHERE "recomNum" = $1 and "memID" = $2', [recomNum, memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isLike.push('1');
            } else {
                isLike.push('0');
            }
        }, (error) => {
            isLike.push('0');
        });
    // 判斷留言是否被按過愛心
    for (var i = 0; i < oneRecomMessage.length; i++) {
        await sql('SELECT "recomMessNum" FROM "recommendMessageLike" WHERE "recomMessNum" = $1 and "memID" = $2', [oneRecomMessage[i].recomMessNum, memID])
            .then((data) => {
                console.log("data.rows=", data.rows);
                if (data.rows == null || data.rows == '') {
                    isMessLike[i] = '1';
                } else {
                    isMessLike[i] = '0';
                }
            }, (error) => {
                isMessLike[i] = '0';
            });
    }
    //取得權限
    await member.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })

    console.log(oneRecomMessLikeCount);
    result[0] = oneRecommend;
    result[1] = oneRecomMessage;
    result[2] = oneRecomLikeCount;
    result[3] = oneRecomMessCount;
    result[4] = oneRecomMessLikeCount;
    result[5] = tag;
    result[6] = isCollection;
    result[7] = isLike;
    result[8] = [memID];
    result[9] = isMessLike;
    result[10] = checkAuthority;
    // console.log(result);
    return result;
}
//=========================================
//------ get_four_class_recom (start)------
//=========================================

//---------  getRecomMovie() -------------
var getRecomMovie = async function (memID) {
    var RecommendMovie = [];
    var checkAuthority;
    var result = [];
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
    //取得權限
    await member.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = RecommendMovie;
    result[1] = [memID];
    result[2] = checkAuthority;

    return result;


}

//---------  getRecomMusic() -------------
var getRecomMusic = async function (memID) {
    var RecommendMusic = [];
    var checkAuthority;
    var result = [];
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
    //取得權限
    await member.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = RecommendMusic;
    result[1] = [memID];
    result[2] = checkAuthority;

    return result;

}
//---------  getRecomBook() --------------
var getRecomBook = async function (memID) {
    var RecommendBook = [];
    var checkAuthority;
    var result = [];
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
    //取得權限
    await member.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = RecommendBook;
    result[1] = [memID];
    result[2] = checkAuthority;

    return result;

}

//-------  getRecomExhibition() ----------
var getRecomExhibition = async function (memID) {
    var RecommendExhibition = [];
    var checkAuthority;
    var result = [];
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
    //取得權限
    await member.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = RecommendExhibition;
    result[1] = [memID];
    result[2] = checkAuthority;

    return result;

}

//=========================================
//------ get_four_class_recom (end)------
//=========================================

//=========================================
//---------  addRecommendLike() -----------
//=========================================
var addRecommendLike = async function (memID, recomNum) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var result;

    await sql('INSERT INTO "recommendLike" ("memID","recomNum","recomLikeDateTime") VALUES ($1,$2,$3)', [memID, recomNum, addTime])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}
//=========================================
//---------  delRecommedLike() -----------
//=========================================
var delRecommendLike = async function (memID, recomNum) {
    var result;
    await sql('DELETE FROM "recommendLike" WHERE "memID" = $1 and "recomNum"= $2', [memID, recomNum])
        .then((data) => {
            console.log("刪除囉~~~~");
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}

module.exports = {
    getRecommendList, getOneRecommend,
    getRecomMovie, getRecomMusic, getRecomBook, getRecomExhibition,
    addRecommendLike, delRecommendLike
}