'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const moment = require('moment');

//================================
//-------- checkAuthority() ---------
//================================
var checkAuthority = async function (memID) {
    console.log("近來囉");
    var result;
    await sql('SELECT "memAuthority" FROM "member" where "memID" = $1 ', [memID])
        .then((data) => {
            if (data.rows[0] == undefined || data.rows[0] == null) {
                result = undefined;
            } else {
                result = data.rows[0].memAuthority;
                // console.log("權限:", data.rows[0].memAuthority);
            }
        }, (error) => {
            result = undefined;
        });
    return result;
}


//================================
//-------- articlePost() ---------
//================================
var articlePost = async function (memID, artiHead, artiCont, artiClass, artiDateTime, imgData, tag) {
    var result;
    var artiNum = - 1;
    var tagNum = [];
    //新增文章
    await sql('INSERT into "article" ("memID","artiHead","artiCont","artiClass","artiDateTime") VALUES ($1,$2,$3,$4,$5)', [memID, artiHead, artiCont, artiClass, artiDateTime])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = 1;
        });

    //查詢新增文章的文章編號
    await sql('SELECT "artiNum" from "article" where "memID"= $1 and "artiHead" = $2 and "artiCont" = $3 and "artiClass" = $4 and "artiDateTime" = $5 ', [memID, artiHead, artiCont, artiClass, artiDateTime])
        .then((data) => {
            console.log("data.rows=", data.rows);
            artiNum = data.rows[0].artiNum;
            console.log("artiNum=", artiNum);
        }, (error) => {
            result = 1;
        });
    //新增tag 
    for (var i = 0; i < tag.length; i++) {
        await sql('INSERT into "tag" ("tagName") VALUES ($1)', [tag[i]])
            .then((data) => {
                result = 0;
            }, (error) => {
                result = 1;
            });

    }
    //查詢tagNum
    for (var i = 0; i < tag.length; i++) {
        await sql('SELECT "tagNum" from "tag" where "tagName" = $1', [tag[i]])
            .then((data) => {
                // console.log("data.rows=", data.rows);
                tagNum[i] = data.rows[0].tagNum;
            }, (error) => {
                result = 1;
            });
    }
    //新增tagLink
    for (var i = 0; i < tagNum.length; i++) {
        await sql('INSERT into "tagLinkArticle" ("artiNum","tagNum") VALUES ($1,$2)', [artiNum, tagNum[i]])
            .then((data) => {
                result = 0;
            }, (error) => {
                result = 1;
            });
    }
    //新增img
    for (var i = 0; i < imgData.length; i++) {
        await sql('INSERT into "image" ("memID", "artiNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4)', [memID, artiNum, imgData[i], artiDateTime])
            .then((data) => {
                result = 0;
            }, (error) => {
                result = 1;
            });
    }

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
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
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
    // 判斷是否被使用者收藏
    for (let i = 0; i < article.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [article[i].artiNum, memID])
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
    for (let i = 0; i < article.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [article[i].artiNum, memID])
            .then((data) => {
                // console.log(data.rows);
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
    await this.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = article;
    result[1] = articleLikeCount;
    result[2] = articleMessCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID]
    result[7] = checkAuthority;
    console.log(result);
    return result;
}

//================================
//--------- modifyMember() -------
//================================
var modifyMember = async function (memPass, memBirth, memMail, memGender, memAddr, memID) {
    var result = [];

    // -----------  修改會員資料 --------------
    await sql('UPDATE "member" SET "memPass" = $1, "memBirth" = $2, "memMail" = $3, "memGender" = $4, "memAddr" = $5 WHERE "memID" = $6 ', [memPass, memBirth, memMail, memGender, memAddr, memID])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });

    return result;
}
//================================
//--------- getOriginalMail() -------
//================================
var getOriginalMail = async function (memID) {
    var result;
    // -----------  修改會員資料 --------------
    await sql('SELECT "memMail" from "member" where "memID" = $1', [memID])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = 0;
        });
    return result;
}
//=========================================
//----- four_class_articleManage (start)-----
//=========================================
//---------  myMovieArticle() -------------
var myMovieArticle = async function (memID) {
    var movieArticleList = [];
    var movieArtiLikeCount = [];
    var movieArtiMessCount = [];
    var tagLink = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
    var result = [];

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
    // 判斷是否被使用者收藏
    for (let i = 0; i < movieArticleList.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [movieArticleList[i].artiNum, memID])
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
    for (let i = 0; i < movieArticleList.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [movieArticleList[i].artiNum, memID])
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
    await this.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = movieArticleList;
    result[1] = movieArtiLikeCount;
    result[2] = movieArtiMessCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID];
    result[7] = checkAuthority;
    console.log(result);
    return result;
}

//---------  myMusicArticle() -------------
var myMusicArticle = async function (memID) {
    var musicArticleList = [];
    var musicArtiLikeCount = [];
    var musicArtiMessCount = [];
    var tagLink = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
    var result = [];

    // -----------  取得電影分類文章 --------------
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1 and "memID" = $2 ', ['music', memID])
        .then((data) => {
            console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            musicArticleList = data.rows;
        }, (error) => {
            musicArticleList = null;
        });
    //---------  取得電影文章的愛心數量 -------------
    for (let i = 0; i < musicArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [musicArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                musicArtiLikeCount.push(data.rows[0]);
            }, (error) => {
                musicArtiLikeCount = null;
            });
    }
    //---------  取得收藏的文章的留言數量 -------------
    for (let i = 0; i < musicArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [musicArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                musicArtiMessCount.push(data.rows[0]);
            }, (error) => {
                musicArtiMessCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < musicArticleList.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [musicArticleList[i].artiNum])
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
    for (let i = 0; i < musicArticleList.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [musicArticleList[i].artiNum, memID])
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
    for (let i = 0; i < musicArticleList.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [musicArticleList[i].artiNum, memID])
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
    await this.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = musicArticleList;
    result[1] = musicArtiLikeCount;
    result[2] = musicArtiMessCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID];
    result[7] = checkAuthority;
    console.log(result);
    return result;
}

//---------  myBookArticle() -------------
var myBookArticle = async function (memID) {
    var bookArticleList = [];
    var bookArtiLikeCount = [];
    var bookArtiMessCount = [];
    var tagLink = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
    var result = [];

    // -----------  取得電影分類文章 --------------
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1 and "memID" = $2 ', ['book', memID])
        .then((data) => {
            console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            bookArticleList = data.rows;
        }, (error) => {
            bookArticleList = null;
        });
    //---------  取得電影文章的愛心數量 -------------
    for (let i = 0; i < bookArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [bookArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                bookArtiLikeCount.push(data.rows[0]);
            }, (error) => {
                bookArtiLikeCount = null;
            });
    }
    //---------  取得收藏的文章的留言數量 -------------
    for (let i = 0; i < bookArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [bookArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                bookArtiMessCount.push(data.rows[0]);
            }, (error) => {
                bookArtiMessCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < bookArticleList.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [bookArticleList[i].artiNum])
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
    for (let i = 0; i < bookArticleList.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [bookArticleList[i].artiNum, memID])
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
    for (let i = 0; i < bookArticleList.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [bookArticleList[i].artiNum, memID])
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
    await this.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = bookArticleList;
    result[1] = bookArtiLikeCount;
    result[2] = bookArtiMessCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID];
    result[7] = checkAuthority;
    console.log(result);
    return result;
}

//---------  myExhibitionArticle() -------------
var myExhibitionArticle = async function (memID) {
    var exhibitionArticleList = [];
    var exhibitionArtiLikeCount = [];
    var exhibitionArtiMessCount = [];
    var tagLink = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
    var result = [];

    // -----------  取得電影分類文章 --------------
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1 and "memID" = $2 ', ['exhibition', memID])
        .then((data) => {
            console.log(data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                data.rows[i].artiDateTime = moment(data.rows[i].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
            }
            exhibitionArticleList = data.rows;
        }, (error) => {
            exhibitionArticleList = null;
        });
    //---------  取得電影文章的愛心數量 -------------
    for (let i = 0; i < exhibitionArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [exhibitionArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                exhibitionArtiLikeCount.push(data.rows[0]);
            }, (error) => {
                exhibitionArtiLikeCount = null;
            });
    }
    //---------  取得收藏的文章的留言數量 -------------
    for (let i = 0; i < exhibitionArticleList.length; i++) {
        await sql('SELECT count("artiNum") FROM "articleMessage" WHERE "artiNum"=$1', [exhibitionArticleList[i].artiNum])
            .then((data) => {
                // console.log(data.rows[0]);
                exhibitionArtiMessCount.push(data.rows[0]);
            }, (error) => {
                exhibitionArtiMessCount = null;
            });
    }
    // -----------  取得tagLink表中的 artiNum 方便在 tag表中取得資料 --------------
    for (let i = 0; i < exhibitionArticleList.length; i++) {
        await sql('select * from "tagLinkArticle" where "artiNum" = $1', [exhibitionArticleList[i].artiNum])
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
    for (let i = 0; i < exhibitionArticleList.length; i++) {
        await sql('SELECT "artiNum" FROM "memberCollection" WHERE "artiNum" = $1 and "memID" = $2', [exhibitionArticleList[i].artiNum, memID])
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
    for (let i = 0; i < exhibitionArticleList.length; i++) {
        await sql('SELECT "artiNum" FROM "articleLike" WHERE "artiNum" = $1 and "memID" = $2 ', [exhibitionArticleList[i].artiNum, memID])
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
    await this.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("Authority=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("Authority=", checkAuthority);
        }
    })
    result[0] = exhibitionArticleList;
    result[1] = exhibitionArtiLikeCount;
    result[2] = exhibitionArtiMessCount;
    result[3] = tag;
    result[4] = isCollection;
    result[5] = isLike;
    result[6] = [memID];
    result[7] = checkAuthority;
    console.log(result);
    return result;
}
//=========================================
//---------  addArticleLike() -----------
//=========================================
var addArticleLike = async function (memID, artiNum) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var result;
    await sql('INSERT INTO "articleLike" ("memID","artiNum","artiLikeDateTime") VALUES ($1,$2,$3)', [memID, artiNum, addTime])
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

//=========================================
//---------  addArticleMessLike() ---------
//=========================================
var addArticleMessLike = async function (memID, artiMessNum) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var result;
    await sql('INSERT INTO "articleMessageLike" ("memID","artiMessNum","artiMessLikeDateTime") VALUES ($1,$2,$3)', [memID, artiMessNum, addTime])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}
//=========================================
//---------  delArticleMessLike() ---------
//=========================================
var delArticleMessLike = async function (memID, artiMessNum) {
    var result;
    await sql('DELETE FROM "articleMessageLike" WHERE "memID" = $1 and "artiMessNum"= $2', [memID, artiMessNum])
        .then((data) => {
            console.log("刪除囉~~~~");
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}
//=========================================
//---------  addRecommendMessLike() -------
//=========================================
var addRecommendMessLike = async function (memID, recomMessNum) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var result;
    await sql('INSERT INTO "recommendMessageLike" ("memID","recomMessNum","recomMessLikeDateTime") VALUES ($1,$2,$3)', [memID, recomMessNum, addTime])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}
//=========================================
//---------  delRecommendMessLike() -------
//=========================================
var delRecommendMessLike = async function (memID, recomMessNum) {
    var result;
    await sql('DELETE FROM "recommendMessageLike" WHERE "memID" = $1 and "recomMessNum"= $2', [memID, recomMessNum])
        .then((data) => {
            console.log("刪除囉~~~~");
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}
//=========================================
//--------------  report() ----------------
//=========================================
var report = async function (memID, artiNum, artiMessNum, recomMessNum, reportReason) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var result;
    if (artiNum == null && artiMessNum == null && recomMessNum == null) {
        await sql('INSERT INTO "report" ("memID","reportReason","reportDateTime") VALUES ($1,$2,$3)', [memID, reportReason, addTime])
            .then((data) => {
                console.log("舉報成功~~~~");
                result = 1;
            }, (error) => {
                result = 0;
            });
    } else if (artiNum != null) {
        await sql('INSERT INTO "report" ("memID","artiNum","reportReason","reportDateTime") VALUES ($1,$2,$3,$4)', [memID, artiNum, reportReason, addTime])
            .then((data) => {
                console.log("舉報成功~~~~");
                result = 1;
            }, (error) => {
                result = 0;
            });
    } else if (artiMessNum != null) {
        await sql('INSERT INTO "report" ("memID","artiMessNum","reportReason","reportDateTime") VALUES ($1,$2,$3,$4)', [memID, artiMessNum, reportReason, addTime])
            .then((data) => {
                console.log("舉報成功~~~~");
                result = 1;
            }, (error) => {
                result = 0;
            });
    } else if (recomMessNum != null) {
        await sql('INSERT INTO "report" ("memID","recomMessNum","reportReason","reportDateTime") VALUES ($1,$2,$3,$4)', [memID, recomMessNum, reportReason, addTime])
            .then((data) => {
                console.log("舉報成功~~~~");
                result = 1;
            }, (error) => {
                result = 0;
            });
    }

    return result;
}

//匯出
module.exports = {
    articlePost, myArticle, modifyMember, getOriginalMail,
    myMovieArticle, myMusicArticle, myBookArticle, myExhibitionArticle,
    addArticleLike, delArticleLike,
    addArticleMessLike, delArticleMessLike,
    addRecommendMessLike, delRecommendMessLike,
    report, checkAuthority
};