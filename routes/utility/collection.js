'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const member = require('./member');
var moment = require('moment');

//=========================================
//---------  getCollRecommend() -----------
//=========================================
var getCollRecommend = async function (memID) {
    var recommendList = [];
    var checkAuthority;
    var imgs = [] ; 
    var result = [];
    //---------  取得會員收藏所有的推薦文章內容 -------------
    await sql('SELECT "recomNum" '+
                    ' ,to_char("recomDateTime",\'YYYY-MM-DD\') AS "recomDateTime" '+
                    ' ,"recomHead" '+
                    ' ,"recomCont" '+
                    ' ,CASE WHEN "recomClass" = \'movie\' THEN \'電影\' '+
                    ' WHEN "recomClass" = \'music\' THEN \'音樂\' '+
                    ' WHEN "recomClass" = \'book\' THEN \'書籍\' '+
                    ' WHEN "recomClass" = \'exhibition\' THEN \'展覽\' '+
                    ' END AS "recomClass" '+
              ' FROM "recommend" '+
              ' WHERE "recomNum" IN (SELECT "recomNum" '+
              ' FROM "memberCollection"  '+
              ' WHERE "memID" = $1 )', [memID])
        .then((data) => {
            if (!data.rows){
                recommendList = undefined ;
            }else{
                recommendList = data.rows;
            }
           
        }, (error) => {
            recommendList = undefined ;
        });
  
    //---------  取得權限 --------- 
    await member.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })

    // --------- 取得照片 --------- 
    await sql('SELECT "recomNum","imgName" '+
              ' FROM "image" '+
              ' where "recomNum" IN (SELECT "recomNum" '+
                                    ' FROM "memberCollection" '+
                                    ' WHERE "memID" = $1 )', [memID])
        .then((data) => {
            if (!data.rows){
                imgs = undefined ;
            }else{
                imgs = data.rows;
            }
           
        }, (error) => {
            imgs = undefined ;
        });

    result[0] = recommendList ; 
    result[1] = [memID] ;
    result[2] = checkAuthority ;
    result[3] = imgs;

    return result;
}

//=========================================
//---------  getOneCollRecom() -------------
//=========================================
var getOneColleRecommend = async function (recomNum, memID) {
    var oneRecommend = [];  //存放文章內容
    var oneRecomMessage = []; //存放文章留言內容
    var isCollection = []; //是否有收藏過
    var tag = [];
    var isLike = []; //是否有過愛心
    var isMessLike = []; //判斷留言愛心是否被按過
    var checkAuthority;
    var imgs = [] ;
    var result = [];

    // -----------  取得單一文章 --------------
    await sql('SELECT * FROM "recommendListDataView" WHERE "recomNum" = $1', [recomNum])
        .then((data) => {
            if (!data.rows) {
                oneRecommend = undefined;
            } else {
                oneRecommend = data.rows ; 
            }
        }, (error) => {
            oneRecommend = undefined;
        });
    
    // -----------  取得單一文章所有留言 --------------
    await sql('SELECT "Mess"."recomMessNum" '+
                ' ,"Mess"."memID" '+
                ' ,to_char("Mess"."recomMessDateTime",\'YYYY-MM-DD\') AS "recomMessDateTime" '+
                ' ,"Mess"."recomMessCont" '+
                ' ,count("MessLike"."recomMessNum") AS "likeCount" '+
            ' FROM "recommendMessage" AS "Mess" '+
                ' LEFT JOIN "recommendMessageLike" AS "MessLike" '+
                    ' ON "Mess"."recomMessNum" = "MessLike"."recomMessNum" '+
            ' WHERE "Mess"."recomNum" = $1 '+
            ' GROUP BY "Mess"."recomMessNum" '+
                ' ,"Mess"."memID" '+
                ' ,"Mess"."recomMessDateTime" '+
                ' ,"Mess"."recomMessCont"', [recomNum])
        .then((data) => {
           if(!data.rows){
              oneRecomMessage = undefined ;
           }else{
              oneRecomMessage = data.rows ;
           }
           
        }, (error) => {
            oneRecomMessage = undefined ;
        });

    // -----------  取得tag --------------
    await sql('SELECT "tagName" FROM "recommendTagView" WHERE "recomNum" = $1', [recomNum])
        .then((data) => {
            if (!data.rows) {
                tag = undefined ; 
            } else {
                tag = data.rows ;
            }
        }, (error) => {
            tag = undefined ; 
        });
   
    // 判斷是否被使用者收藏
    await sql('SELECT "memID" , "recomNum" FROM "memberCollection" WHERE "recomNum" = $1 AND "memID" = $2', [recomNum, memID])
        .then((data) => {
            if (!data.rows) {
                isCollection = undefined ; 
            } else {
                isCollection = data.rows ;
            }
        }, (error) => {
            isCollection = undefined ; 
        });

    // 判斷是否被使用者案愛心
    await sql('SELECT "recomNum" FROM "recommendLike" WHERE "recomNum" = $1 AND "memID" = $2 ', [recomNum, memID])
        .then((data) => {
            if (!data.rows) {
                isLike = undefined ;
            } else {
                isLike = data.rows ;
            }
        }, (error) => {
            isLike = undefined ;
        });

    // 判斷留言是否被按過愛心
    await sql('SELECT "Mess"."recomMessNum" '+
            ' FROM "recommendMessage" AS "Mess" '+
                ' INNER JOIN "recommendMessageLike" AS "MessLike" '+
                ' ON "Mess"."recomMessNum" = "MessLike"."recomMessNum" '+
            ' WHERE "Mess"."recomNum" = $1 AND "MessLike"."memID" = $2', [recomNum, memID])
        .then((data) => {
            if (!data.rows) {
                isMessLike = undefined ;
            } else {
                isMessLike = data.rows;
            }
        }, (error) => {
            isMessLike = undefined ;
        });

    //----------- 取得照片 ----------- 
    await sql('SELECT "recomNum" , "imgName" FROM "image"')
        .then((data) => {
            if (!data.rows) {
                imgs = undefined;
            } else {
                imgs = data.rows;
            }
        }, (error) => {
            imgs = undefined;
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
    result[0] = oneRecommend ;
    result[1] = oneRecomMessage ;
    result[2] = tag ;
    result[3] = imgs ;
    result[4] = isLike;
    result[5] = isCollection;
    result[6] = isMessLike;
    result[7] = checkAuthority;

    result[8] = [memID];

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
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
    var imgs = [];
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
    // 判斷是否被使用者收藏
    for (let i = 0; i < colleArticle.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [colleArticle[i].artiNum, memID])
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
    // 判斷是否被使用者按愛心
    for (let i = 0; i < colleArticle.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [colleArticle[i].artiNum, memID])
            .then((data) => {
                console.log(data.rows);
                if (data.rows == null || data.rows == '') {
                    isLike.push('1');
                } else {
                    isLike.push('0');
                }
            }, (error) => {
                isLike.push('0');
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
    //取得第一張照片
    for (let i = 0; i < colleArticle.length; i++) {
        await sql('SELECT "imgName" FROM "image" WHERE "artiNum" = $1', [colleArticle[i].artiNum])
            .then((data) => {
                // console.log("data.rows=", data.rows);
                if (data.rows != "") {
                    imgs[colleArticle[i].artiNum] = data.rows[0].imgName;
                }
            }, (error) => {
                imgs[colleArticle[i].artiNum] = null;
            });
    }
    // console.log(tag) ;
    result[0] = colleArticle;
    result[1] = colleArtiLikeCount;
    result[2] = colleArtiMessCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID];
    result[7] = checkAuthority;
    result[8] = imgs ;
    return result;
}
//=========================================
//---- get_four_class_collRecommend (start)----
//=========================================
//---------  getRecomMovie() -------------
var getRecomMovie = async function (memID) {
    var getdata = [];
    var checkAuthority;
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
    result.push(memID);
    result.push(checkAuthority);
    return result;
}
//---------  getRecomMusic() -------------
var getRecomMusic = async function (memID) {
    var getdata = [];
    var checkAuthority;
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
    result.push(memID);
    result.push(checkAuthority);
    return result;
}
//---------  getRecomBook() -------------
var getRecomBook = async function (memID) {
    var getdata = [];
    var checkAuthority;
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
    result.push(memID);
    result.push(checkAuthority);
    return result;
}
//---------  getRecomExhibition() -------------
var getRecomExhibition = async function (memID) {
    var getdata = [];
    var checkAuthority;
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
    result.push(memID);
    result.push(checkAuthority);
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
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
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
    // 判斷是否被使用者收藏
    for (let i = 0; i < collArtiMovie.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [collArtiMovie[i].artiNum, memID])
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
    // 判斷是否被使用者按愛心
    for (let i = 0; i < collArtiMovie.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [collArtiMovie[i].artiNum, memID])
            .then((data) => {
                console.log(data.rows);
                if (data.rows == null || data.rows == '') {
                    isLike.push('1');
                } else {
                    isLike.push('0');
                }
            }, (error) => {
                isLike.push('0');
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
    result[0] = collArtiMovie;
    result[1] = collArtiLikeCount;
    result[2] = collArtiMessLikeCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID];
    result[7] = checkAuthority;
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
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
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
    // 判斷是否被使用者收藏
    for (let i = 0; i < collArtiMusic.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [collArtiMusic[i].artiNum, memID])
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
    // 判斷是否被使用者按愛心
    for (let i = 0; i < collArtiMusic.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [collArtiMusic[i].artiNum, memID])
            .then((data) => {
                console.log(data.rows);
                if (data.rows == null || data.rows == '') {
                    isLike.push('1');
                } else {
                    isLike.push('0');
                }
            }, (error) => {
                isLike.push('0');
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
    result[0] = collArtiMusic;
    result[1] = collArtiLikeCount;
    result[2] = collArtiMessLikeCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID];
    result[7] = checkAuthority;
    // console.log(result);
    return result;
}
//---------  getArtiBook() -------------
var getArtiBook = async function (memID) {
    var getdata = [];
    var collArtiBook = [];
    var collArtiLikeCount = [];
    var collArtiMessLikeCount = [];
    var tagLink = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
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
    // 判斷是否被使用者收藏
    for (let i = 0; i < collArtiBook.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [collArtiBook[i].artiNum, memID])
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
    // 判斷是否被使用者按愛心
    for (let i = 0; i < collArtiBook.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [collArtiBook[i].artiNum, memID])
            .then((data) => {
                console.log(data.rows);
                if (data.rows == null || data.rows == '') {
                    isLike.push('1');
                } else {
                    isLike.push('0');
                }
            }, (error) => {
                isLike.push('0');
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
    result[0] = collArtiBook;
    result[1] = collArtiLikeCount;
    result[2] = collArtiMessLikeCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID];
    result[7] = checkAuthority;
    // console.log(result);
    return result;
}
//---------  getArtiExhibition() -------------
var getArtiExhibition = async function (memID) {
    var getdata = [];
    var collArtiExhibition = [];
    var collArtiLikeCount = [];
    var collArtiMessLikeCount = [];
    var tagLink = [];
    var tag = [];
    var checkAuthority;
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
    // 判斷是否被使用者收藏
    for (let i = 0; i < collArtiExhibition.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [collArtiExhibition[i].artiNum, memID])
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
    // 判斷是否被使用者按愛心
    for (let i = 0; i < collArtiExhibition.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [collArtiExhibition[i].artiNum, memID])
            .then((data) => {
                console.log(data.rows);
                if (data.rows == null || data.rows == '') {
                    isLike.push('1');
                } else {
                    isLike.push('0');
                }
            }, (error) => {
                isLike.push('0');
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
    result[0] = collArtiExhibition;
    result[1] = collArtiLikeCount;
    result[2] = collArtiMessLikeCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID];
    result[7] = checkAuthority;
    // console.log(result);
    return result;
}

// ========= get_four_class_collArticle (end) ========

//=========================================
//---------  addCollention() -----------
//=========================================
var addColleArticle = async function (memID, artiNum) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var result;
    await sql('INSERT INTO "memberCollection" ("memID","artiNum","collDateTime") VALUES ($1,$2,$3)', [memID, artiNum, addTime])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}

//=========================================
//---------  addColleRecommend() -----------
//=========================================
var addColleRecommend = async function (memID, recomNum) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var result;
    await sql('INSERT INTO "memberCollection" ("memID","recomNum","collDateTime") VALUES ($1,$2,$3)', [memID, recomNum,addTime])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}

//=========================================
//---------  delCollention() -----------
//=========================================
var delColleArticle = async function (memID, artiNum) {
    var result;
    await sql('DELETE FROM "memberCollection" WHERE "memID" = $1 and "artiNum"= $2', [memID, artiNum])
        .then((data) => {
            console.log("刪除囉~~~~");
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}

//=========================================
//---------  delColleRecommend() -----------
//=========================================
var delColleRecommend = async function (memID, recomNum) {
    var result;
    await sql('DELETE FROM "memberCollection" WHERE "memID" = $1 and "recomNum"= $2', [memID, recomNum])
        .then((data) => {
            console.log("刪除囉~~~~");
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}
module.exports = {
    getCollRecommend, getOneColleRecommend, getCollArticle,
    getRecomMovie, getRecomMusic, getRecomBook, getRecomExhibition,
    getArtiMovie, getArtiMusic, getArtiBook, getArtiExhibition,
    addColleArticle, delColleArticle,
    addColleRecommend, delColleRecommend
};