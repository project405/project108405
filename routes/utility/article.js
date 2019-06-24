'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');
//=========================================
//---------  getArticleList() -------------
//=========================================
var getArticleList = async function (memID) {
    var articleList = [];
    var likeCount = [];
    var messageCount = [];
    var tagLink = [];
    var tag = [];
    var result = [];
    var isCollection = [];
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
                    likeCount[articleList[i].artiNum] = data.rows[0].count;
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
                    messageCount[articleList[i].artiNum] = data.rows[0].count;
                }
            }, (error) => {
                messageCount = null;
            });
    }
    for (let i = 0; i < articleList.length; i++) {
        // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [articleList[i].artiNum])
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
    console.log("taglink=", tagLink);
    // -----------  取得文章全部tag --------------
    //初始化二維陣列
    for (let i = 0; i < tagLink.length; i++) {
        tag[i] = [];
    }
    // console.log("初始",tag);
    // 將tagLink二維陣列，去tag表中取得每一篇文章所有的標籤名稱
    for (let i = 0; i < tagLink.length; i++) {
        for (let j = 0; j < tagLink[i].length; j++) {
            if (tagLink[i][j].tagNum != 'null') {
                await sql('select "tagName" from "tag" where "tagNum" = $1', [tagLink[i][j].tagNum])
                    .then((data) => {
                        // console.log(data.rows[0].tagName);
                        if (data.rows[0].tagName != undefined && data.rows[0].tagName != null) {
                            tag[i][j] = data.rows[0].tagName;
                        }
                    }, (error) => {
                        tag = null;
                    });
            }
        }
    }
    // 判斷是否被使用者收藏
    for (let i = 0; i < articleList.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [articleList[i].artiNum, memID])
            .then((data) => {
                console.log(data.rows);
                if (data.rows == null || data.rows == '') {
                    isCollection.push('1');
                } else {
                    isCollection.push('0');
                }
            }, (error) => {
                isCollection.push('0');
            });
    }
    console.log("isCollection=", isCollection);

    result[0] = articleList;  //存入文章清單
    result[1] = likeCount;  //存入文章清單每篇的愛心數量
    result[2] = messageCount;
    result[3] = tag;
    result[4] = isCollection;
    // console.log(result);
    return result;
}
//=========================================
//---------  getOneArticle() -------------
//=========================================
var getOneArticle = async function (artiNum, memID) {
    var oneArticle = [];  //存放文章內容
    var oneArtiLikeCount = []; //存放文章愛心總數
    var oneArtiMessage = []; //存放文章留言內容
    var oneArtiMessCount = []; //存放文章留言總數
    var oneArtiMessLikeCount = []; //存放留言愛心數量
    var tagLink = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
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
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    await sql('select * from "tagLinkArticle" where "artiNum" = $1', [artiNum])
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
    console.log("tagLink=", tagLink);
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
    await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [artiNum, memID])
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
    await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2', [artiNum, memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isLike.push('1');
            } else {
                isLike.push('0');
            }
        }, (error) => {
            isLike.push('0');
        });


    result[0] = oneArticle;
    result[1] = oneArtiMessage;
    result[2] = oneArtiLikeCount;
    result[3] = oneArtiMessCount;
    result[4] = oneArtiMessLikeCount;
    result[5] = tag;
    result[6] = isCollection;
    result[7] = isLike ; 
    result[8] = [memID] ; 
    console.log(result);
    return result;
}
//=========================================
//----- get_four_class_article (start)-----
//=========================================
//---------  getClassMovie() -------------
var getClassMovie = async function () {
    var result = [];
    var movieArticleList = [];
    var movieArtiLikeCount = [];
    var movieArtiMessLikeCount = [];
    // -----------  取得電影文章 --------------
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['movie'])
        .then((data) => {
            // console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            movieArticleList = data.rows;
        }, (error) => {
            movieArticleList = null;
        });
    // -----------  取得電影文章愛心數量 --------------
    for (let i = 0; i < movieArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [movieArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                if (data.rows.length > 0) {
                    movieArtiLikeCount.push(data.rows[0]);
                } else {
                    movieArtiLikeCount = -1;
                }
            }, (error) => {
                movieArtiLikeCount = null;
            });
    }
    // -----------  取得電影文章留言數量 --------------
    for (let i = 0; i < movieArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum" = $1', [movieArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                movieArtiMessLikeCount.push(data.rows[0]);
            }, (error) => {
                movieArtiMessLikeCount = null;
            });
    }
    result[0] = movieArticleList;
    result[1] = movieArtiLikeCount;
    result[2] = movieArtiMessLikeCount
    // console.log(result);
    return result;
}
//---------  getClassMusic() -------------
var getClassMusic = async function () {
    var result = [];
    var musicArticleList = [];
    var musicArtiLikeCount = [];
    var musicArtiMessLikeCount = [];
    // -----------  取得音樂文章 --------------
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['music'])
        .then((data) => {
            // console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            musicArticleList = data.rows;
        }, (error) => {
            musicArticleList = null;
        });
    // -----------  取得音樂文章愛心數量 --------------
    for (let i = 0; i < musicArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [musicArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                if (data.rows.length > 0) {
                    musicArtiLikeCount.push(data.rows[0]);
                } else {
                    musicArtiLikeCount = -1;
                }
            }, (error) => {
                musicArtiLikeCount = null;
            });
    }
    // -----------  取得音樂文章留言數量 --------------
    for (let i = 0; i < musicArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum" = $1', [musicArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                musicArtiMessLikeCount.push(data.rows[0]);
            }, (error) => {
                musicArtiMessLikeCount = null;
            });
    }

    result[0] = musicArticleList;
    result[1] = musicArtiLikeCount;
    result[2] = musicArtiMessLikeCount
    return result;
}
//---------  getClassBook() -------------
var getClassBook = async function () {
    var result = [];
    var bookArticleList = [];
    var bookArtiLikeCount = [];
    var bookArtiMessLikeCount = [];
    // -----------  取得書籍文章 --------------
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['book'])
        .then((data) => {
            // console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            bookArticleList = data.rows;
        }, (error) => {
            bookArticleList = null;
        });
    // -----------  取得書籍文章愛心數量 --------------
    for (let i = 0; i < bookArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [bookArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                if (data.rows.length > 0) {
                    bookArtiLikeCount.push(data.rows[0]);
                } else {
                    bookArtiLikeCount = -1;
                }
            }, (error) => {
                bookArtiLikeCount = null;
            });
    }
    // -----------  取得書籍文章留言數量 --------------
    for (let i = 0; i < bookArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum" = $1', [bookArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                bookArtiMessLikeCount.push(data.rows[0]);
            }, (error) => {
                bookArtiMessLikeCount = null;
            });
    }

    result[0] = bookArticleList;
    result[1] = bookArtiLikeCount;
    result[2] = bookArtiMessLikeCount
    return result;
}
//---------  getClassExhibition() -------------
var getClassExhibition = async function () {
    var result = [];
    var exhibitionArticleList = [];
    var exhibitionArtiLikeCount = [];
    var exhibitionArtiMessLikeCount = [];
    // -----------  取得展覽文章 --------------
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['exhibition'])
        .then((data) => {
            // console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            exhibitionArticleList = data.rows;
        }, (error) => {
            exhibitionArticleList = null;
        });
    // -----------  取得展覽文章愛心數量 --------------
    for (let i = 0; i < exhibitionArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [exhibitionArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                if (data.rows.length > 0) {
                    exhibitionArtiLikeCount.push(data.rows[0]);
                } else {
                    exhibitionArtiLikeCount = -1;
                }
            }, (error) => {
                exhibitionArtiLikeCount = null;
            });
    }
    // -----------  取得展覽文章留言數量 --------------
    for (let i = 0; i < exhibitionArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum" = $1', [exhibitionArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                exhibitionArtiMessLikeCount.push(data.rows[0]);
            }, (error) => {
                exhibitionArtiMessLikeCount = null;
            });
    }

    result[0] = exhibitionArticleList;
    result[1] = exhibitionArtiLikeCount;
    result[2] = exhibitionArtiMessLikeCount
    return result;
}
// ========= get_four_class_article (end) ========

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

//=========================================
//---------  getArtiLikeCount() -------------
//=========================================
var getArtiLikeCount = async function (artiNum) {
    var oneArtiLikeCount = []; //存放文章愛心總數
    var result = [] ; 
    // -----------  取得單一文章愛心數量 --------------
    await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [artiNum])
        .then((data) => {
            if (data.rows.length > 0) {
                oneArtiLikeCount = data.rows;
            } else {
                oneArtiLikeCount = -1;
            }
        }, (error) => {
            oneArtiLikeCount = null;
        });

    result[0] = oneArtiLikeCount;
    // console.log("result[0] = " , result[0]);
    return result;
}

//=========================================
//---------  getRecomLikeCount() -------------
//=========================================
var getRecomLikeCount = async function (recomNum) {
    var oneRecomLikeCount = []; //存放文章愛心總數
    var result = [] ; 
    // -----------  取得單一文章愛心數量 --------------
    await sql('SELECT count("recomNum") FROM "recommendLike" WHERE "recomNum"=$1', [recomNum])
        .then((data) => {
            if (data.rows.length > 0) {
                oneRecomLikeCount = data.rows;
            } else {
                oneRecomLikeCount = -1;
            }
        }, (error) => {
            oneRecomLikeCount = null;
        });

    result[0] = oneRecomLikeCount;
    // console.log("result[0] = " , result[0]);
    return result;
}
//匯出
module.exports = {
    getArticleList, getOneArticle,
    getClassMovie, getClassMusic, getClassBook, getClassExhibition,
    getHotArticle,getArtiLikeCount,getRecomLikeCount
};