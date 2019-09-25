'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const moment = require('moment');

//==============================
//------ checkAuthority() ------
//==============================
var checkAuthority = async function (memID) {
    var result;
    await sql('SELECT "memAuthority" FROM "member" where "memID" = $1 ', [memID])
        .then((data) => {
            if (data.rows[0] == undefined || data.rows[0] == null) {
                result = undefined;
            } else {
                result = data.rows[0].memAuthority;
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
    var artiNum;
    var tagNum;
    var result;

    //新增文章
    await sql('INSERT into "article" ("memID","artiHead","artiCont","artiClass","artiDateTime") ' +
        ' VALUES ($1,$2,$3,$4,$5)  returning "article"."artiNum" ;'
        , [memID, artiHead, artiCont, artiClass, artiDateTime])
        .then((data) => {
            if (!data.rows) {
                artiNum = undefined;
                console.log("artinum =", artiNum);
            } else {

                artiNum = data.rows[0].artiNum;
                console.log("artinum =", artiNum);
            }
        }, (error) => {
            artiNum = undefined;
        });

    //新增tag 
    for (var i = 0; i < tag.length; i++) {
        console.log("tag[i]=",tag[i]);
        await sql('INSERT into "tag" ("tagName") VALUES ($1) returning "tag"."tagNum" ', [tag[i]])
            .then((data) => {
                console.log("data=",data);
                if (!data.rows) {
                    tagNum = undefined;
                } else {
                    tagNum = data.rows[0].tagNum;
                }
            }, (error) => {
                tagNum = undefined;
            });
            console.log(tagNum);
        //新增tagLink
        await sql('INSERT into "tagLinkArticle" ("artiNum","tagNum") VALUES ($1,$2)', [artiNum, tagNum])
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

    console.log("結果:",result);
    return result;
}



//================================
//-------- recommendPost() ---------
//================================
var recommendPost = async function (memID, recomHead, recomCont, recomClass, recomDateTime, imgData, tag) {
    var recomNum;
    var tagNum;
    var result;

    //新增文章
    await sql('INSERT into "recommend" ("recomHead","recomCont","recomClass","recomDateTime")' +
        ' VALUES ($1,$2,$3,$4)  returning "recommend"."recomNum" ;'
        , [recomHead, recomCont, recomClass, recomDateTime])
        .then((data) => {
            if (!data.rows) {
                recomNum = undefined;
                console.log("recomnum =", recomNum);
            } else {
                recomNum = data.rows[0].recomNum;
                console.log("recomnum =", recomNum);
            }
        }, (error) => {
            recomNum = undefined;
        });

    //新增tag 
    for (var i = 0; i < tag.length; i++) {
        console.log("tag[i]=",tag[i]);
        await sql('INSERT into "tag" ("tagName") VALUES ($1) returning "tag"."tagNum" ', [tag[i]])
            .then((data) => {
                console.log("data=",data);
                if (!data.rows) {
                    tagNum = undefined;
                } else {
                    tagNum = data.rows[0].tagNum;
                }
            }, (error) => {
                tagNum = undefined;
            });
            console.log(tagNum);
        //新增tagLink
        await sql('INSERT into "tagLinkArticle" ("recomNum","tagNum") VALUES ($1,$2)', [recomNum, tagNum])
            .then((data) => {
                result = 0;
            }, (error) => {
                result = 1;
            });
    }


    //新增img
    for (var i = 0; i < imgData.length; i++) {
        await sql('INSERT into "image" ("memID", "recomNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4)', [memID, recomNum, imgData[i], recomDateTime])
            .then((data) => {
                result = 0;
            }, (error) => {
                result = 1;
            });
    }

    console.log("結果:",result);
    return result;
}

//================================
//-------- replyPost() ---------
//================================
var replyPost = async function (artiNum, memID, replyCont, postDateTime, imgData) {

    var artiMessNum ;
    var result;
    console.log(memID)
    console.log(typeof(memID))

    //新增留言
    await sql('INSERT into "articleMessage" ("artiNum","memID","artiMessDateTime","artiMessCont") VALUES ($1,$2,$3,$4);'
             ,[artiNum, memID, postDateTime, replyCont])
        .then((data) => {
            if(!data.rows){
                artiMessNum = undefined ;
                console.log("artiMessNum =" ,artiMessNum);
            }else{
                console.log(data)
                artiMessNum = data.rows[0].artiMessNum ;
                console.log("artiMessNum =" ,artiMessNum);
            }
        }, (error) => {
            console.error(error)
            artiMessNum = undefined ;
        });
    if (imgData) {
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("memID", "artiNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4)', [memID, artiNum, imgData[i], postDateTime])
                .then((data) => {
                    result = 0;
                }, (error) => {
                    result = 1;
            });
        }
    }
    return result;
}

//================================
//--------- myArticle() ----------
//================================
var myArticle = async function (memID) {
    var articleList = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var imgs = [];
    var result = [];
    //--------- get myArticle ----------
    await sql('SELECT * FROM "articleListDataView" WHERE "memID" = $1', [memID])
        .then((data) => {
            if (!data.rows) {
                articleList = undefined;
            } else {
                articleList = data.rows;
            }
        }, (error) => {
            articleList = undefined;
        })

    // -----------  取得tag --------------
    await sql('SELECT * FROM "articleTagView" ' +
        ' WHERE "artiNum" ' +
        ' IN (SELECT "artiNum" ' +
        ' FROM "articleListDataView" ' +
        ' WHERE "memID" = $1)', [memID])
        .then((data) => {
            if (!data.rows) {
                tag = undefined;
            } else {
                tag = data.rows;
            }
        }, (error) => {
            tag = undefined;
        });

    // ----------- 判斷是否被使用者收藏 ----------- 
    await sql('SELECT "memID" , "artiNum" ' +
        ' FROM "memberCollection" ' +
        ' WHERE "memID" = $1', [memID])
        .then((data) => {
            if (!data.rows) {
                isCollection = undefined;
            } else {
                isCollection = data.rows;
            }
        }, (error) => {
            isCollection = undefined;
        });

    // ----------- 判斷是否被使用者按愛心 -----------
    await sql('SELECT "memID","artiNum" ' +
        ' FROM "articleLike"  ' +
        ' WHERE "memID" = $1', [memID])
        .then((data) => {
            if (!data.rows) {
                isLike = undefined;
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike = undefined;
        });

    // ----------- 取得照片 -----------
    await sql('SELECT "artiNum" , "imgName" ' +
        ' FROM "image" ' +
        ' WHERE "artiNum" ' +
        ' IN(SELECT "artiNum" ' +
        ' FROM "articleListDataView" ' +
        ' WHERE "memID" = $1)', [memID])
        .then((data) => {
            if (!data.rows) {
                imgs = undefined;
            } else {
                imgs = data.rows;
            }
        }, (error) => {
            imgs = undefined;
        });
    result[0] = articleList;
    result[1] = tag;
    result[2] = imgs;
    result[3] = isLike;
    result[4] = isCollection;
    result[5] = [memID];

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

//===================================
//----- getMyArticleClassList() -----
//===================================
var getMyArticleClassList = async function (artiClass, memID) {
    var articleList = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
    var imgs = [];
    var result = [];

    // -----------  取得分類文章 --------------
    await sql('SELECT * ' +
        ' FROM "articleListDataView" ' +
        ' WHERE "artiClass" = $1 AND "memID" = $2', [artiClass, memID])
        .then((data) => {
            if (!data.rows) {
                articleList = undefined;
            } else {
                articleList = data.rows;
            }
        }, (error) => {
            articleList = undefined;
        });

    // -----------  取得tag --------------
    await sql('SELECT  * ' +
        ' FROM "articleTagView" ' +
        ' WHERE "artiNum" ' +
        ' IN(SELECT "artiNum" ' +
        ' FROM "articleListDataView" ' +
        ' WHERE "artiClass" =  $1 AND "memID" = $2)', [artiClass.memID])
        .then((data) => {
            if (!data.rows) {
                tag = undefined;
            } else {
                tag = data.rows;
            }
        }, (error) => {
            tag = undefined;
        });

    // 判斷是否被使用者收藏
    await sql('SELECT "memID" , "artiNum" ' +
        ' FROM "memberCollection" ' +
        ' WHERE "memID" = $1', [memID])
        .then((data) => {
            if (!data.rows) {
                isCollection = undefined;
            } else {
                isCollection = data.rows;
            }
        }, (error) => {
            isCollection = undefined;
        });

    // 判斷是否被使用者按愛心
    await sql('SELECT "memID","artiNum" ' +
        ' FROM "articleLike" ' +
        ' WHERE "memID" = $1', [memID])
        .then((data) => {
            if (!data.rows) {
                isLike = undefined;
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike.push('0');
        });

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

    //取得照片
    await sql('SELECT "artiNum" , "imgName" FROM "image"')
        .then((data) => {
            if (!data.rows) {
                imgs = undefined;
            } else {
                imgs = data.rows;
            }
        }, (error) => {
            imgs = undefined;
        });

    result[0] = articleList;
    result[1] = tag;
    result[2] = imgs;
    result[3] = isLike;
    result[4] = isCollection;
    result[5] = [memID];

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
    articlePost, recommendPost, replyPost, myArticle, modifyMember, getOriginalMail,
    getMyArticleClassList,
    addArticleLike, delArticleLike,
    addArticleMessLike, delArticleMessLike,
    addRecommendMessLike, delRecommendMessLike,
    report, checkAuthority
};