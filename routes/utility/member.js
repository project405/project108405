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
    var artiNum ;
    var tagNum = [];
    var result;

    //新增文章
    await sql('INSERT into "article" ("memID","artiHead","artiCont","artiClass","artiDateTime") VALUES ($1,$2,$3,$4,$5); '+
             ' SELECT currval(\'"article_artiNum_seq1"\') AS "artiNum" '
             , [memID, artiHead, artiCont, artiClass, artiDateTime])
        .then((data) => {
            if(!data.rows){
                artiNum = undefined ;
                console.log("ARtiBum =" ,artiNum);
            }else{
                
                artiNum = data.rows[0].artiNum ;
                console.log("ARtiBum =" ,artiNum);
            }
        }, (error) => {
            artiNum = undefined ;
        });

    //查詢新增文章的文章編號
    await sql('SELECT "artiNum" from "article" where "memID"= $1 and "artiHead" = $2 and "artiCont" = $3 and "artiClass" = $4 and "artiDateTime" = $5 ', [memID, artiHead, artiCont, artiClass, artiDateTime])
        .then((data) => {
            console.log("data.rows=", data.rows);
            // artiNum = data.rows[0].artiNum;
            // console.log("artiNum=", artiNum);
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
    var articleList = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var imgs = [];
    var result = [];
    //--------- get myArticle ----------
    await sql('SELECT * FROM "articleListDataView" WHERE "memID" = $1', [memID])
        .then((data) => {
          if(!data.rows){
              articleList = undefined ; 
          }else{
              articleList = data.rows ; 
          }
        }, (error) => {
            articleList = undefined ; 
        })
    
    // -----------  取得tag --------------
    await sql('SELECT * FROM "articleTagView" '+
             ' WHERE "artiNum" '+
                ' IN (SELECT "artiNum" '+
                    ' FROM "articleListDataView" '+
                    ' WHERE "memID" = $1)',[memID])
        .then((data) => {
            if (!data.rows) {
                tag = undefined ; 
            } else {
                tag = data.rows ; 
            }
        }, (error) => {
            tag = undefined ; 
        });

    // ----------- 判斷是否被使用者收藏 ----------- 
    await sql('SELECT "memID" , "artiNum" '+
             ' FROM "memberCollection" '+
             ' WHERE "memID" = $1', [memID])
        .then((data) => {
            if (!data.rows) {
                isCollection = undefined ;
            } else {
                isCollection = data.rows ;
            }
        }, (error) => {
            isCollection = undefined ;
        });

    // ----------- 判斷是否被使用者按愛心 -----------
    await sql('SELECT "memID","artiNum" '+
             ' FROM "articleLike"  '+
             ' WHERE "memID" = $1', [memID])
        .then((data) => {
            if (!data.rows) {
                isLike = undefined ;
            } else {
                isLike = data.rows ; 
            }
        }, (error) => {
            isLike = undefined ;
        });

    // ----------- 取得照片 -----------
    await sql('SELECT "artiNum" , "imgName" '+ 
             ' FROM "image" '+
             ' WHERE "artiNum" '+ 
                ' IN(SELECT "artiNum" '+ 
                   ' FROM "articleListDataView" '+
                   ' WHERE "memID" = $1)', [memID])
        .then((data) => {
            if (!data.rows) {
                imgs = undefined ;
            }else{
                imgs = data.rows ;
            }
        }, (error) => {
            imgs = undefined ;
        });
    result[0] = articleList;
    result[1] = tag;
    result[2] = imgs; 
    result[3] = isLike;
    result[4] = isCollection;
    result[5] = [memID] ;

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
var getMyArticleClassList = async function (artiClass, memID){
    var articleList = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var checkAuthority;
    var imgs = [];
    var result = [];

    // -----------  取得分類文章 --------------
    await sql('SELECT * '+ 
             ' FROM "articleListDataView" '+
             ' WHERE "artiClass" = $1 AND "memID" = $2', [artiClass, memID])
    .then((data) => {
        if(!data.rows){
            articleList = undefined ; 
        }else{
            articleList = data.rows ;
        }
    }, (error) => {
        articleList = undefined ; 
    });

    // -----------  取得tag --------------
    await sql('SELECT  * '+
             ' FROM "articleTagView" '+
             ' WHERE "artiNum" '+
                ' IN(SELECT "artiNum" '+
                    ' FROM "articleListDataView" '+
                    ' WHERE "artiClass" =  $1 AND "memID" = $2)', [artiClass.memID])
        .then((data) => {
            if(!data.rows){
                tag = undefined ; 
            }else{
                tag = data.rows ;
            }
        }, (error) => {
            tag = undefined ; 
        });

    // 判斷是否被使用者收藏
    await sql('SELECT "memID" , "artiNum" '+
             ' FROM "memberCollection" '+
             ' WHERE "memID" = $1', [memID])
        .then((data) => {
            if(!data.rows){
                isCollection = undefined ; 
            }else{
                isCollection = data.rows ;
            }
        }, (error) => {
            isCollection = undefined ; 
        });

    // 判斷是否被使用者按愛心
    await sql('SELECT "memID","artiNum" '+ 
             ' FROM "articleLike" '+
             ' WHERE "memID" = $1', [memID])
        .then((data) => {
            if(!data.rows){
                isLike = undefined ; 
            }else{
                isLike = data.rows ;
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
    await sql('SELECT "artiNum" , "imgName" FROM "image"' )
        .then((data) => {
            if(!data.rows){
                imgs = undefined ; 
            }else{
                imgs = data.rows ;
            }
        }, (error) => {
            imgs = undefined ; 
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
    articlePost, myArticle, modifyMember, getOriginalMail,
    getMyArticleClassList,
    addArticleLike, delArticleLike,
    addArticleMessLike, delArticleMessLike,
    addRecommendMessLike, delRecommendMessLike,
    report, checkAuthority
};