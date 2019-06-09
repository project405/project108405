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
                if (data.rows[0].recomClass == 'movie') {
                    data.rows[0].recomClass = '電影';
                } else if (data.rows[0].recomClass == 'music') {
                    data.rows[0].recomClass = '音樂';
                } else if (data.rows[0].recomClass == 'book') {
                    data.rows[0].recomClass = '書籍';
                } else {
                    data.rows[0].recomClass = '展覽';
                }
                result.push(data.rows[0]);
            }, (error) => {
                result = null;
            });
    }
    return result;
}

//=========================================
//---------  getOneCollRecom() -------------
//=========================================
var getOneColleRecommend = async function (recomNum) {
    var oneArticle = [];  //存放文章內容
    var oneArtiLikeCount = []; //存放文章愛心總數
    var oneArtiMessage = []; //存放文章留言內容
    var oneArtiMessCount = []; //存放文章留言總數
    var oneArtiMessLikeCount = []; //存放留言愛心數量
    var result = [];

    // -----------  取得單一文章 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomNum" = $1', [recomNum])
        .then((data) => {
            if (data.rows.length > 0) {
                // console.log(data.rows);
                data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                oneArticle = data.rows;
            } else {
                oneArticle = -1;
            }
        }, (error) => {
            oneArticle = null;
        });
    // -----------  取得單一文章愛心數量 --------------
    await sql('SELECT count("recomNum") FROM "recommendLike" WHERE "recomNum"=$1', [recomNum])
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
    await sql('SELECT * FROM "recommendMessage" WHERE "recomNum" = $1', [recomNum])
        .then((data) => {
            // console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].recomMessDateTime = moment(data.rows[i].recomMessDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            oneArtiMessage = data.rows;
        }, (error) => {
            oneArtiMessage = null;
        });
    // -----------  取得單一文章留言數量 --------------
    await sql('SELECT count("recomNum") FROM "recommendMessage" WHERE "recomNum" = $1', [recomNum])
        .then((data) => {
            // console.log(data.rows);
            oneArtiMessCount = data.rows;
        }, (error) => {
            oneArtiMessCount = null;
        });
    // -----------  取得每篇文章留言的愛心數量 --------------
    for (let i = 0; i < oneArtiMessage.length; i++) {
        await sql('SELECT count("recomMessNum") FROM "recommendMessageLike" WHERE "recomMessNum" = $1', [oneArtiMessage[i].recomMessNum])
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
//---- get_four_class_collRecommend (start)----
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
                    if (data.rows[0].recomClass == 'movie') {
                        data.rows[0].recomClass = '電影';
                    } else if (data.rows[0].recomClass == 'music') {
                        data.rows[0].recomClass = '音樂';
                    } else if (data.rows[0].recomClass == 'book') {
                        data.rows[0].recomClass = '書籍';
                    } else {
                        data.rows[0].recomClass = '展覽';
                    }
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
                    if (data.rows[0].recomClass == 'movie') {
                        data.rows[0].recomClass = '電影';
                    } else if (data.rows[0].recomClass == 'music') {
                        data.rows[0].recomClass = '音樂';
                    } else if (data.rows[0].recomClass == 'book') {
                        data.rows[0].recomClass = '書籍';
                    } else {
                        data.rows[0].recomClass = '展覽';
                    }
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
                    if (data.rows[0].recomClass == 'movie') {
                        data.rows[0].recomClass = '電影';
                    } else if (data.rows[0].recomClass == 'music') {
                        data.rows[0].recomClass = '音樂';
                    } else if (data.rows[0].recomClass == 'book') {
                        data.rows[0].recomClass = '書籍';
                    } else {
                        data.rows[0].recomClass = '展覽';
                    }
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
                    if (data.rows[0].recomClass == 'movie') {
                        data.rows[0].recomClass = '電影';
                    } else if (data.rows[0].recomClass == 'music') {
                        data.rows[0].recomClass = '音樂';
                    } else if (data.rows[0].recomClass == 'book') {
                        data.rows[0].recomClass = '書籍';
                    } else {
                        data.rows[0].recomClass = '展覽';
                    }
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
// ========= get_four_class_collRecommend (end) ========

//=========================================
//--- get_four_class_collArticle (start)---
//=========================================

//---------  getArtiMovie() -------------
var getArtiMovie = async function (memID) {
    var getdata = [];
    var collArtiMovie = [];
    var collArtiLikeCount = [];
    var collArtiMessLikeCount = [];
    var tagLink = [];
    var tag = [];
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
                    collArtiMovie.push(data.rows[0]);
                }
            }, (error) => {
                collArtiMovie = null;
            });
    }
    //---------  取得收藏的文章的愛心數量 -------------
    for (let i = 0; i < collArtiMovie.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [collArtiMovie[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                collArtiLikeCount.push(data.rows[0]);
            }, (error) => {
                collArtiLikeCount = null;
            });
    }
    //---------  取得收藏的文章的留言數量 -------------
    for (let i = 0; i < collArtiMovie.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [collArtiMovie[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                collArtiMessLikeCount.push(data.rows[0]);
            }, (error) => {
                collArtiMessLikeCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < collArtiMovie.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [collArtiMovie[i].artiNum])
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
    result[0] = collArtiMovie;
    result[1] = collArtiLikeCount;
    result[2] = collArtiMessLikeCount;
    result[3] = tag;
    // console.log(result);
    return result;
}
//---------  getArtiMusic() -------------
var getArtiMusic = async function (memID) {
    var getdata = [];
    var collArtiMusic = [];
    var collArtiLikeCount = [];
    var collArtiMessLikeCount = [];
    var tagLink = [];
    var tag = [];
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
                    collArtiMusic.push(data.rows[0]);
                }
            }, (error) => {
                collArtiMusic = null;
            });
    }
    //---------  取得收藏的文章的愛心數量 -------------
    for (let i = 0; i < collArtiMusic.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [collArtiMusic[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                collArtiLikeCount.push(data.rows[0]);
            }, (error) => {
                collArtiLikeCount = null;
            });
    }
    //---------  取得收藏的文章的留言數量 -------------
    for (let i = 0; i < collArtiMusic.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [collArtiMusic[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                collArtiMessLikeCount.push(data.rows[0]);
            }, (error) => {
                collArtiMessLikeCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < collArtiMusic.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [collArtiMusic[i].artiNum])
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
    result[0] = collArtiMusic;
    result[1] = collArtiLikeCount;
    result[2] = collArtiMessLikeCount;
    result[3] = tag;
    // console.log(result);
    return result;
}
//---------  getArtiBook() -------------
var getArtiBook = async function (memID) {
    var getdata = [];
    var collArtiBook = [] ; 
    var collArtiLikeCount = [] ;
    var collArtiMessLikeCount = [] ;
    var tagLink = [] ;
    var tag = [] ; 
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
                    collArtiBook.push(data.rows[0]);
                }
            }, (error) => {
                collArtiBook = null;
            });
    }
    //---------  取得收藏的文章的愛心數量 -------------
    for (let i = 0; i < collArtiBook.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [collArtiBook[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                collArtiLikeCount.push(data.rows[0]);
            }, (error) => {
                collArtiLikeCount = null;
            });
    }
    //---------  取得收藏的文章的留言數量 -------------
    for (let i = 0; i < collArtiBook.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [collArtiBook[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                collArtiMessLikeCount.push(data.rows[0]);
            }, (error) => {
                collArtiMessLikeCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < collArtiBook.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [collArtiBook[i].artiNum])
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
    result[0] = collArtiBook;
    result[1] = collArtiLikeCount;
    result[2] = collArtiMessLikeCount;
    result[3] = tag;
    // console.log(result);
    return result;
}
//---------  getArtiExhibition() -------------
var getArtiExhibition = async function (memID) {
    var getdata = [];
    var collArtiExhibition = [] ;
    var collArtiLikeCount = [] ;
    var collArtiMessLikeCount = [] ; 
    var tagLink = [] ; 
    var tag = [] ; 
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
                    collArtiExhibition.push(data.rows[0]);
                }
            }, (error) => {
                collArtiExhibition = null;
            });
    }
    //---------  取得收藏的文章的愛心數量 -------------
    for (let i = 0; i < collArtiExhibition.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [collArtiExhibition[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                collArtiLikeCount.push(data.rows[0]);
            }, (error) => {
                collArtiLikeCount = null;
            });
    }
    //---------  取得收藏的文章的留言數量 -------------
    for (let i = 0; i < collArtiExhibition.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [collArtiExhibition[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                collArtiMessLikeCount.push(data.rows[0]);
            }, (error) => {
                collArtiMessLikeCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < collArtiExhibition.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [collArtiExhibition[i].artiNum])
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
    result[0] = collArtiExhibition;
    result[1] = collArtiLikeCount;
    result[2] = collArtiMessLikeCount;
    result[3] = tag;
    // console.log(result);
    return result;
}

// ========= get_four_class_collArticle (end) ========

//=========================================
//---------  addCollention() -----------
//=========================================
var addCollention = async function (memID,artiNum) {
    var result ;
    await sql('INSERT INTO "memberCollection" ("memID","artiNum") VALUES ($1,$2)', [memID,artiNum])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result ;
}

//=========================================
//---------  delCollention() -----------
//=========================================
var delCollention = async function (memID,artiNum) {
    var result ;
    await sql('DELETE FROM "memberCollection" WHERE "memID" = $1 and "artiNum"= $2', [memID,artiNum])
        .then((data) => {
            console.log("刪除囉~~~~");
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result ;
}
module.exports = {
    getCollRecommend, getOneColleRecommend,getCollArticle,
    getRecomMovie, getRecomMusic, getRecomBook, getRecomExhibition,
    getArtiMovie, getArtiMusic, getArtiBook, getArtiExhibition,
    addCollention,delCollention
};