'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');

//=========================================
//---------  getCollRecommend() -----------
//=========================================
var getCollRecommend = async function (memID) {
    var getdata = [];
    var result = [];
    //---------  取得每個會員收藏的推薦文章編號 -------------
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0', [memID])
        .then((data) => {
            // console.log(data.rows);
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    //---------  取得收藏的推薦文章編號後，再取得文章內容 -------------
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

//=========================================
//---------  getCollArticle() -------------
//=========================================
var getCollArticle = async function (memID) {
    var getdata = [];
    var colleArticle = [];
    var colleArtiLikeCount = [];
    var colleArtiMessCount = [];
    var tagLink = [];
    var tag = [];
    var result = [];
    //---------  取得每個會員收藏的文章編號 -------------
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0', [memID])
        .then((data) => {
            // console.log(data.rows);
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    //---------  取得收藏的文章編號後，再取得文章內容 -------------
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1', [getdata[i].artiNum])
            .then((data) => {
                data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                colleArticle.push(data.rows[0]);
            }, (error) => {
                colleArticle = null;
            });
    }
    //---------  取得收藏的文章的愛心數量 -------------
    for (let i = 0; i < colleArticle.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [colleArticle[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                colleArtiLikeCount.push(data.rows[0]);
            }, (error) => {
                colleArtiLikeCount = null;
            });
    }
    //---------  取得收藏的文章的留言數量 -------------
    for (let i = 0; i < colleArticle.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [colleArticle[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                colleArtiMessCount.push(data.rows[0]);
            }, (error) => {
                colleArtiMessCount = null;
            });
    }

    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < colleArticle.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [colleArticle[i].artiNum])
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
    console.log("tagLink=", tagLink);
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
    // console.log(tag) ;
    result[0] = colleArticle;
    result[1] = colleArtiLikeCount;
    result[2] = colleArtiMessCount;
    result[3] = tag;
    return result;
}
//=========================================
//---- get_four_class_recommend (start)----
//=========================================
//---------  getRecomMovie() -------------
var getRecomMovie = async function (memID) {
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
//---------  getRecomMusic() -------------
var getRecomMusic = async function (memID) {
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
//---------  getRecomBook() -------------
var getRecomBook = async function (memID) {
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
//---------  getRecomExhibition() -------------
var getRecomExhibition = async function (memID) {
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
// ========= get_four_class_article (end) ========

//=========================================
//--- get_four_class_collArticle (start)---
//=========================================

//---------  getArtiMovie() -------------
var getArtiMovie = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1 and "artiClass" = $2', [getdata[i].artiNum, 'movie'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getArtiMusic() -------------
var getArtiMusic = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1 and "artiClass" = $2', [getdata[i].artiNum, 'music'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getArtiBook() -------------
var getArtiBook = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1 and "artiClass" = $2', [getdata[i].artiNum, 'book'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getArtiExhibition() -------------
var getArtiExhibition = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1 and "artiClass" = $2', [getdata[i].artiNum, 'exhibition'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}

// ========= get_four_class_collArticle (end) ========
module.exports = {
    getCollRecommend, getCollArticle,
    getRecomMovie, getRecomMusic, getRecomBook, getRecomExhibition,
    getArtiMovie, getArtiMusic, getArtiBook, getArtiExhibition
};