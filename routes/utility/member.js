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
//==============================
//------ memberInformation() ---
//==============================
var memberInformation = async function (memID) {
    var result;
    await sql('SELECT * FROM "member" where "memID" = $1 ', [memID])
        .then((data) => {
            if (!data.rows[0]) {
                result = undefined;
            } else {
                result = data.rows[0];
            }
        }, (error) => {
            result = undefined;
        });
    return result;
}


//================================
//-------- articlePost() ---------
//================================
var articlePost = async function (memID, artiHead, artiCont, artiClass, artiDateTime, imgData, tag, analyzeScore, positiveWords, negativeWords, swearWords, score2) {
    var artiNum;
    var tagNum = [];
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }
    //新增文章
    await sql('INSERT into "article" ("memID","artiHead","artiCont","artiClass","artiDateTime", "analyzeScore", "positiveWords", "negativeWords", "swearWords", "score2") ' +
        ' VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)  returning "article"."artiNum" ;'
        , [memID, artiHead, artiCont, artiClass, artiDateTime, analyzeScore, positiveWords, negativeWords, swearWords, score2])
        .then((data) => {
            if (!data.rows) {
                artiNum = undefined;
            } else {
                artiNum = data.rows[0].artiNum;
            }
        }, (error) => {
            artiNum = undefined;
    });

    //新增tag 
    if(tag.length != 0){
        for (var i = 0; i < tag.length; i++) {
            await sql('INSERT into "tag" ("tagName") VALUES ($1) returning "tag"."tagNum" ', [tag[i].trim()])
                .then((data) => {
                    if (!data.rows) {
                        tagNum = undefined;
                    } else {
                        tagNum = data.rows[0].tagNum;
                    }
                }, (error) => {
                    tagNum = undefined;
                });
    
            // --------- 新增tagLink ---------
            await sql('INSERT into "tagLinkArticle" ("artiNum","tagNum") VALUES ($1,$2)', [artiNum, tagNum])
                .then((data) => {
                    result = 0;
                }, (error) => {
                    result = 1;
                });
        }
    }
    
    // --------- 新增img ---------
    if(imgData != undefined){
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("memID", "artiNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4)', [memID, artiNum, imgData[i], artiDateTime])
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
//-------- editArticle() ---------
//================================
var editArticle = async function (memID, artiHead, artiCont, artiClass, imgData, tag, analyzeScore, positiveWords, negativeWords, swearWords, artiNum, artiDateTime, score2) {
    var tagNum = [];
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }
    //修改文章
    await sql('UPDATE "article" SET "artiHead" = $1, "artiCont" =$2, "artiClass"= $3, "analyzeScore"= $4, "positiveWords"= $5, "negativeWords"= $6, "swearWords"= $7, "score2"= $9' +
    ' WHERE "artiNum" = $8'
    , [artiHead, artiCont, artiClass, analyzeScore, positiveWords, negativeWords, swearWords, artiNum, score2])
    .then((data) => {
        result = 1;
    }, (error) => {
        console.error(error)
        result = 0;
    });

    // 刪除舊tag連結
    await sql ('DELETE FROM "tagLinkArticle" WHERE "artiNum" = $1',[artiNum])
    .then((data)=> {
    },(e) => {
        console.error(e)
    }) 

    //新增tag 
    if(tag.length != 0){
        for (var i = 0; i < tag.length; i++) {
            await sql('INSERT into "tag" ("tagName") VALUES ($1) returning "tag"."tagNum" ', [tag[i]])
                .then((data) => {
                    if (!data.rows) {
                        tagNum = undefined;
                    } else {
                        tagNum = data.rows[0].tagNum;
                    }
                }, (error) => {
                    tagNum = undefined;
                    console.error(error)
                });

            // --------- 新增tagLink ---------
            await sql('INSERT into "tagLinkArticle" ("artiNum","tagNum") VALUES ($1,$2)', [artiNum, tagNum])
                .then((data) => {
                    result = 1
                }, (error) => {
                    console.log(error)
                    result = 0;
                });
        }
    }

    await sql('DELETE FROM "image" WHERE "artiNum" = $1 and "artiMessNum" IS NULL', [artiNum])
    .then((data) => {
    }, (error) => {
        console.log(error)
    })

    // --------- 新增img ---------
    if(imgData != undefined){
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("memID", "artiNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4)', [memID, artiNum, imgData[i], artiDateTime])
                .then((data) => {
                    result = 1;
                }, (error) => {
                    result = 0;
                });
        }
    }
    return result;
}


//================================
//-------- activityPost() ---------
//================================
var activityPost = async function (memID, artiHead, artiCont, artiClass, artiDateTime, imgData, tag, analyzeScore, positiveWords, negativeWords, swearWords, score2, deadline) {
    var artiNum;
    var tagNum = [];
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }
    //新增文章
    await sql('INSERT into "article" ("memID","artiHead","artiCont","artiClass","artiDateTime", "analyzeScore", "positiveWords", "negativeWords", "swearWords", "score2", "deadline") ' +
        ' VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)  returning "article"."artiNum" ;'
        , [memID, artiHead, artiCont, artiClass, artiDateTime, analyzeScore, positiveWords, negativeWords, swearWords, score2, deadline])
        .then((data) => {
            if (!data.rows) {
                artiNum = undefined;
            } else {
                artiNum = data.rows[0].artiNum;
            }
        }, (error) => {
            artiNum = undefined;
    });

    //新增tag 
    if(tag.length != 0){
        for (var i = 0; i < tag.length; i++) {
            await sql('INSERT into "tag" ("tagName") VALUES ($1) returning "tag"."tagNum" ', [tag[i].trim()])
                .then((data) => {
                    if (!data.rows) {
                        tagNum = undefined;
                    } else {
                        tagNum = data.rows[0].tagNum;
                    }
                }, (error) => {
                    tagNum = undefined;
                });
    
            // --------- 新增tagLink ---------
            await sql('INSERT into "tagLinkArticle" ("artiNum","tagNum") VALUES ($1,$2)', [artiNum, tagNum])
                .then((data) => {
                    result = 0;
                }, (error) => {
                    result = 1;
                });
        }
    }
    
    // --------- 新增img ---------
    if(imgData != undefined){
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("memID", "artiNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,NOW())', [memID, artiNum, imgData[i]])
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
//----- specialColumnPost() ------
//================================
var specialColumnPost = async function (memID, specColHead, specColCont, postDateTime, imgData) {
    var specColNum;
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }
    //新增文章
    await sql(`INSERT into "specialColumn" ("specColHead", "specColCont", "specColDateTime")
                VALUES ($1,$2,$3) 
                returning "specialColumn"."specColNum"`
        , [specColHead, specColCont, postDateTime])
        .then((data) => {
            if (!data.rows) {
                specColNum = undefined;
            } else {
                specColNum = data.rows[0].specColNum;
            }
        }, (error) => {
            specColNum = undefined;
    });

    // --------- 新增img ---------
    if(imgData != undefined){
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("memID", "specColNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4)', [memID, specColNum, imgData[i], postDateTime])
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
//----- editSpecialColumn() ------
//================================
var editSpecialColumn = async function (memID, specColHead, specColCont, postDateTime, imgData, specColNum) {
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }
    //修改文章
    await sql('UPDATE "specialColumn" SET "specColHead" = $1, "specColCont" =$2' +
    ' WHERE "specColNum" = $3'
    , [specColHead, specColCont, specColNum])
    .then((data) => {
        result = 1;
    }, (error) => {
        console.error(error)
        result = 0;
    });

    await sql('DELETE FROM "image" WHERE "specColNum" = $1', [specColNum])
    .then((data) => {
    }, (error) => {
        console.log(error)
    })

    // --------- 新增img ---------
    if(imgData != undefined){
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("memID", "specColNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4)', [memID, specColNum, imgData[i], postDateTime])
                .then((data) => {
                    result = 1;
                }, (error) => {
                    result = 0;
                });
        }
    }
    return result;
}


//================================
//-------- editRecommend()--------
//================================
var editRecommend = async function (memID, recomHead, recomCont, recomClass, imgData, tag, analyzeScore, positiveWords, negativeWords, recomNum, artiDateTime, score2) {
    var tagNum = [];
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }
    //修改文章
    await sql('UPDATE "recommend" SET "recomHead" = $1, "recomCont" =$2, "recomClass"= $3, "analyzeScore"= $4, "positiveWords"= $5, "negativeWords"= $6, "score2"= $8'+
    ' WHERE "recomNum" = $7'
    , [recomHead, recomCont, recomClass, analyzeScore, positiveWords, negativeWords, recomNum, score2])
    .then((data) => {
        result = 1;
    }, (error) => {
        console.error(error)
        result = 0;
    });

    // 刪除舊tag連結
    await sql ('DELETE FROM "tagLinkArticle" WHERE "recomNum" = $1',[recomNum])
    .then((data)=> {
    },(e) => {
        console.error(e)
    }) 

    //新增tag 
    if(tag.length != 0){
        for (var i = 0; i < tag.length; i++) {
            await sql('INSERT into "tag" ("tagName") VALUES ($1) returning "tag"."tagNum" ', [tag[i]])
                .then((data) => {
                    result = 1;
                    if (!data.rows) {
                        tagNum = undefined;
                    } else {
                        tagNum = data.rows[0].tagNum;
                    }
                }, (error) => {
                    tagNum = undefined;
                    console.error(error)
                });

            // --------- 新增tagLink ---------
            await sql('INSERT into "tagLinkArticle" ("recomNum","tagNum") VALUES ($1,$2)', [recomNum, tagNum])
                .then((data) => {
                    result = 1
                }, (error) => {
                    console.log(error)
                    result = 0;
                });
        }
    }

    await sql('DELETE FROM "image" WHERE "recomNum" = $1 and "recomMessNum" IS NULL', [recomNum])
    .then((data) => {
    }, (error) => {
        console.log(error)
    })

    // --------- 新增img ---------
    if (imgData != undefined) {
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("memID", "recomNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4)', [memID, recomNum, imgData[i], artiDateTime])
                .then((data) => {
                    result = 1;
                }, (error) => {
                    result = 0;
                    console.log(error)
                });
        }
    }

    return result;
}
//================================
//---- editRecommendReply() ------
//================================
var editRecommendReply = async function (recomNum, memID, replyCont, postDateTime, imgData, analyzeScore, positiveWords, negativeWords, swearWords, recomMessNum, score2) {
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }
    //編輯留言
    await sql('UPDATE "recommendMessage" SET "recomMessCont"= $1, "analyzeScore" =$2, "positiveWords"= $3, "negativeWords"= $4, "swearWords"= $5, "score2"= $7 '+
    'WHERE "recomMessNum" = $6'
        , [replyCont, analyzeScore, positiveWords, negativeWords, swearWords, recomMessNum, score2])
        .then((data) => {
            result = 1;
        }, (error) => {
            console.error(error)
            result = 0;
        });
        
    await sql('DELETE FROM "image" WHERE "recomMessNum" = $1', [recomMessNum])
    .then((data) => {
    }, (error) => {
        console.log(error)
    })

    if(imgData != undefined){
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("recomNum", "memID", "recomMessNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4,$5)', [recomNum, memID, recomMessNum, imgData[i], postDateTime])
                .then((data) => {
                    result = 1;
                }, (error) => {
                    result = 0;
                    console.error(error)
                });
        }
    }
    return result;
}

//================================
//-------- deleteArticle() -------
//================================
var deleteArticle = async function (artiNum) {
    var result = 0;

    await sql ('DELETE FROM "article" WHERE "artiNum" = $1',[artiNum])
        .then((data)=> {
            result = 1
        },(e) => {
            console.error(e)
            result = 0
        }) 
    return result;
}
//================================
//-------- deleteRecommend() -------
//================================
var deleteRecommend = async function (recomNum) {
    var result = 0;
    await sql ('DELETE FROM "recommend" WHERE "recomNum" = $1',[recomNum])
        .then((data)=> {
            result = 1
        },(e) => {
            console.error(e)
            result = 0
        }) 
    return result;
}

//================================
//--- deleteSpecialColumn() -----
//================================
var deleteSpecialColumn = async function (specColNum) {
    console.log(specColNum)
    console.log(typeof(specColNum))

    var result = 0;
    await sql ('DELETE FROM "specialColumn" WHERE "specColNum" = $1',[specColNum])
        .then((data)=> {
            result = 1
        },(e) => {
            console.error(e)
            result = 0
        }) 
    return result;
}
//================================
//-------- deleteReply() -------
//================================
var deleteReply = async function (artiMessNum) {
    var result = 0;

    await sql ('DELETE FROM "articleMessage" WHERE "artiMessNum" = $1',[artiMessNum])
        .then((data)=> {
            result = 1
        },(e) => {
            console.error(e)
            result = 0
        }) 
    return result;
}
//================================
//--- deleteRecommendReply() -----
//================================
var deleteRecommendReply = async function (recomMessNum) {
    var result = 0;

    await sql ('DELETE FROM "recommendMessage" WHERE "recomMessNum" = $1',[recomMessNum])
        .then((data)=> {
            result = 1
        },(e) => {
            console.error(e)
            result = 0
        }) 
    return result;
}


//================================
//-------- recommendPost() ---------
//================================
var recommendPost = async function (memID, recomHead, recomCont, recomClass, recomDateTime, imgData, tag, analyzeScore, positiveWords, negativeWords, score2) {
    var recomNum;
    var tagNum;
    var result;    
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }

    // --------- 新增文章 ---------
    await sql('INSERT into "recommend" ("recomHead","recomCont","recomClass","recomDateTime", "analyzeScore", "positiveWords", "negativeWords", "score2")' +
        ' VALUES ($1,$2,$3,$4,$5,$6,$7,$8)  returning "recommend"."recomNum" ;'
        , [recomHead, recomCont, recomClass, recomDateTime, analyzeScore, positiveWords, negativeWords, score2])
        .then((data) => {
            if (!data.rows) {
                recomNum = undefined;
            } else {
                recomNum = data.rows[0].recomNum;
            }
        }, (error) => {
            recomNum = undefined;
            console.log(error)
        });
    
    // --------- 新增tag ---------
    if(tag.length != 0){
        for (var i = 0; i < tag.length; i++) {
            await sql('INSERT into "tag" ("tagName") VALUES ($1) returning "tag"."tagNum" ', [tag[i]])
                .then((data) => {
                    if (!data.rows) {
                        tagNum = undefined;
                    } else {
                        tagNum = data.rows[0].tagNum;
                    }
                }, (error) => {
                    tagNum = undefined;
                    console.log(error)

                });

            // --------- 新增tagLink ---------
            await sql('INSERT into "tagLinkArticle" ("recomNum","tagNum") VALUES ($1,$2)', [recomNum, tagNum])
                .then((data) => {
                    result = 0;
                }, (error) => {
                    result = 1;
                });
        }
    }


    // --------- 新增img ---------
    if(imgData != undefined){
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("memID", "recomNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4)', [memID, recomNum, imgData[i], recomDateTime])
                .then((data) => {
                    result = 0;
                }, (error) => {
                    result = 1;
                    console.log(error)

                });
        }
    }
    return result;
}

//================================
//-------- replyPost() ---------
//================================
var replyPost = async function (artiNum, memID, replyCont, postDateTime, imgData, analyzeScore, positiveWords, negativeWords, swearWords, score2) {
    
    var artiMessNum;
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }

    //新增留言
    await sql('INSERT into "articleMessage" ("artiNum","memID","artiMessDateTime","artiMessCont", "analyzeScore", "positiveWords", "negativeWords", "swearWords", "score2") '+
    'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning "articleMessage"."artiMessNum" ;'
        , [artiNum, memID, postDateTime, replyCont, analyzeScore, positiveWords, negativeWords, swearWords, score2])
        .then((data) => {
            if(!data.rows){
                artiMessNum = undefined ;
            }else{
                artiMessNum = data.rows[0].artiMessNum;
            }
        }, (error) => {
            console.error(error)
            artiMessNum = undefined;
        });
    if(imgData != undefined){
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("artiNum", "memID", "artiMessNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4,$5)', [artiNum, memID, artiMessNum, imgData[i], postDateTime])
                .then((data) => {
                    result = 0;
                }, (error) => {
                    result = 1;
                    console.error(error)
                });
        }
    }
    return result;
}
//================================
//-------- recommendReplyPost() --
//================================
var recommendReplyPost = async function (recomNum, memID, recomMessCont, recomMessDateTime, imgData, analyzeScore, positiveWords, negativeWords, swearWords, score2) {
    var recomMessNum;
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }

    //新增留言
    await sql('INSERT into "recommendMessage" ("recomNum","memID","recomMessDateTime","recomMessCont", "analyzeScore", "positiveWords", "negativeWords", "swearWords", "score2") '+
    'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning "recommendMessage"."recomMessNum" ;'
        , [recomNum, memID, recomMessDateTime, recomMessCont, analyzeScore, positiveWords, negativeWords, swearWords, score2])
        .then((data) => {
            result = 1;
            if(!data.rows){
                recomMessNum = undefined ;
            }else{
                recomMessNum = data.rows[0].recomMessNum;
            }
        }, (error) => {
            console.error(error)
            recomMessNum = undefined;
        });
    if(imgData != undefined){
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("recomNum", "memID", "recomMessNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4,$5)', [recomNum, memID, recomMessNum, imgData[i], recomMessDateTime])
                .then((data) => {
                    result = 1;
                }, (error) => {
                    result = 0;
                    console.error(error)
                });
        }
    }
    return result;
}
//================================
//-------- editReply() ---------
//================================
var editReply = async function (artiNum, memID, replyCont, postDateTime, imgData, analyzeScore, positiveWords, negativeWords, swearWords, artiMessNum, score2) {
    var result = 0;
    if (typeof(imgData) == 'string') {
        var temp = imgData
        imgData = []
        imgData.push(temp)
    }
    //新增留言
    await sql('UPDATE "articleMessage" SET "artiMessCont"= $1, "analyzeScore" =$2, "positiveWords"= $3, "negativeWords"= $4, "swearWords"= $5, "score2"=$7 '+
    'WHERE "artiMessNum" = $6'
        , [replyCont, analyzeScore, positiveWords, negativeWords, swearWords, artiMessNum, score2])
        .then((data) => {
            result = 1;
        }, (error) => {
            console.error(error)
            result = 0;
        });
        
    await sql('DELETE FROM "image" WHERE "artiMessNum" = $1', [artiMessNum])
    .then((data) => {
    }, (error) => {
        console.log(error)
    })

    if(imgData != undefined) {
        for (var i = 0; i < imgData.length; i++) {
            await sql('INSERT into "image" ("artiNum", "memID", "artiMessNum", "imgName", "imgDateTime") VALUES ($1,$2,$3,$4,$5)', [artiNum, memID, artiMessNum, imgData[i], postDateTime])
                .then((data) => {
                    result = 1;
                }, (error) => {
                    result = 0;
                    console.error(error)
                });
        }
    }

    return result;
}

//================================
//--------- myArticle() ----------
//================================
var myArticle = async function (memID, artiPage) {
    var articleList = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var imgs = [];
    var result = [];
    var articleSum;

    //--------- 取得我的文章 ----------
    await sql(`SELECT "T2".*, "M"."memName"
                FROM(
                    SELECT *
                    FROM( 
                        SELECT "A".*,"I"."imgNum", "I"."imgName", ROW_NUMBER() OVER(PARTITION BY "A"."artiNum" ORDER BY "I"."imgNum") as "Rank" 
                        FROM "articleListDataView" AS "A"
                        LEFT JOIN "image" AS "I"
                                ON "A"."artiNum" = "I"."artiNum"
                        WHERE "I"."artiMessNum" IS NULL)  AS "T1"
                    WHERE "T1"."Rank" = '1' AND "T1"."memID" = $1
                    ORDER BY "artiNum" DESC
                    LIMIT 10
                    OFFSET $2 ) AS "T2"
                    INNER JOIN "member" "M"
                        ON "M"."memID" = "T2"."memID"
                ORDER BY "artiDateTime" DESC`, [memID, (artiPage-1) * 10])
        .then((data) => {
            if (!data.rows) {
                articleList = undefined;
            } else {
                articleList = data.rows;
            }
        }, (error) => {
            console.log(error)
            articleList = undefined;
        })

    await sql('SELECT COUNT(*) ' +
              'FROM "articleListDataView"' +
              'WHERE "articleListDataView"."memID" = $1' , [memID])
    .then((data) => {
        articleSum = data.rows;
    }, (error) => {
        console.log(error)
        articleSum = undefined;
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

    result[0] = articleList;
    result[1] = tag;
    // result[2] = imgs;
    result[3] = isLike;
    result[4] = isCollection;
    result[5] = [memID];
    result[6] = articleSum
    result[7] = [artiPage]

    return result;
}

//================================
//--------- modifyMember() -------
//================================
var modifyMember = async function (memPass, memBirth, memMail, memGender, memAddr, memID) {
    var result = [];

    // -----------  修改會員資料 --------------
    await sql('UPDATE "member" SET "memPass" = $1, "memBirth" = $2, "memMail" = $3, "memGender" = $4, "memAddr" = $5 '+
                ' WHERE "memID" = $6 '
                , [memPass, memBirth, memMail, memGender, memAddr, memID])
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

//================================
//--------- getRepeatMail() ------
//================================
var getRepeatMail = async function (memID, memMail) {
    var result;

    // -----------  修改會員資料 --------------
    await sql('SELECT "memMail" from "member" where "memID" != $1 AND "memMail" = $2', [memID, memMail])
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
var getMyArticleClassList = async function (artiClass, memID, artiPage) {
    var articleList = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var imgs = [];
    var result = [];
    var articleSum;

    // -----------  取得分類文章 --------------
    await sql(`SELECT "T2".*, "M"."memName"
                FROM(
                    SELECT *
                    FROM( 
                        SELECT "A".*,"I"."imgNum", "I"."imgName", ROW_NUMBER() OVER(PARTITION BY "A"."artiNum" ORDER BY "I"."imgNum") as "Rank" 
                        FROM "articleListDataView" AS "A"
                        LEFT JOIN "image" AS "I"
                                ON "A"."artiNum" = "I"."artiNum"
                        WHERE "I"."artiMessNum" IS NULL)  AS "T1"
                    WHERE "T1"."Rank" = '1' AND "T1"."memID" = $2 AND "artiClass" = $1
                    ORDER BY "artiNum" DESC
                    LIMIT 10
                    OFFSET $3 ) AS "T2"
                    INNER JOIN "member" "M"
                    ON "M"."memID" = "T2"."memID"
                ORDER BY "artiDateTime" DESC`, [artiClass, memID, (artiPage-1) * 10])
        .then((data) => {
            if (!data.rows) {
                articleList = undefined;
            } else {
                articleList = data.rows;
            }
        }, (error) => {
            articleList = undefined;
            console.log(error)
        });
    await sql('SELECT COUNT(*) ' +
              'FROM "articleListDataView"' +
              'WHERE "artiClass" = $1 AND "memID" = $2', [artiClass, memID])
            .then((data) => {
                articleSum = data.rows;
            }, (error) => {
                console.log(error)
                articleSum = undefined;
            })
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

    result[0] = articleList;
    result[1] = tag;
    // result[2] = imgs;
    result[3] = isLike;
    result[4] = isCollection;
    result[5] = [memID];
    result[6] = articleSum;
    result[7] = [artiPage];

    return result;

}

//=========================================
//---------  addArticleLike() -----------
//=========================================
var addArticleLike = async function (memID, artiNum) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
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
    var addTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
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

    await sql('DELETE FROM "articleMessageLike" '+
             ' WHERE "memID" = $1 and "artiMessNum"= $2', [memID, artiMessNum])
        .then((data) => {
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
    var addTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    var result;

    await sql('INSERT INTO "recommendMessageLike" ("memID","recomMessNum","recomMessLikeDateTime") '+
             ' VALUES ($1,$2,$3)', [memID, recomMessNum, addTime])
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

    await sql('DELETE FROM "recommendMessageLike" '+
             ' WHERE "memID" = $1 and "recomMessNum"= $2', [memID, recomMessNum])
        .then((data) => {
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
    var addTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    var result;

    //系統舉報
    if (artiNum == null && artiMessNum == null && recomMessNum == null) {
        await sql('INSERT INTO "report" ("memID","reportReason","reportDateTime") VALUES ($1,$2,$3)'
                , [memID, reportReason, addTime])
            .then((data) => {
                result = 1;
            }, (error) => {
                result = 0;
            });
    //文章舉報
    } else if (artiNum != null) {
        await sql('INSERT INTO "report" ("memID","artiNum","reportReason","reportDateTime") VALUES ($1,$2,$3,$4)'
                , [memID, artiNum, reportReason, addTime])
            .then((data) => {
                result = 1;
            }, (error) => {
                result = 0;
            });
    //文章留言舉報        
    } else if (artiMessNum != null) {
        await sql('INSERT INTO "report" ("memID","artiMessNum","reportReason","reportDateTime") VALUES ($1,$2,$3,$4)'
            , [memID, artiMessNum, reportReason, addTime])
            .then((data) => {
                result = 1;
            }, (error) => {
                result = 0;
            });
    //推薦留言舉報        
    } else if (recomMessNum != null) {
        await sql('INSERT INTO "report" ("memID","recomMessNum","reportReason","reportDateTime") VALUES ($1,$2,$3,$4)'
                , [memID, recomMessNum, reportReason, addTime])
            .then((data) => {
                result = 1;
            }, (error) => {
                result = 0;
            });
    }

    return result;
}

//=========================================
//--------------  getMemberInfor() --------
//=========================================
var getMemberInfor = async function (memID) {
    var result;

    await sql('SELECT * FROM "member" WHERE "memID" = $1',[memID])
        .then((data) => {
            if (!data.rows) {
                result = undefined;
            } else {
                result = data.rows;
            }
        }, (error) => {
            result = undefined;
        });

    return result;
}

//=========================================
//--------------  getBestReply() --------
//=========================================
var getBestReply = async function (month,memID) {
    var recommendData= [] ;
    var recomNum = [] ;
    var result = [];

    //先找Like數max值，再撈出所有like數 = max 的所有留言編號 ，再根據所有留言編號找到推薦文章
    await sql(`SELECT * 
                FROM "recommend" 
                WHERE "recomNum"
                IN ( SELECT "recomNum" 
                     FROM "recommendMessage" 
                     WHERE "recomMessNum" 
                     IN ( SELECT "recomMessNum"
                          FROM "recommendMessageLike" 
                          WHERE date_part('MONTH',"recomMessLikeDateTime") = $1
                          GROUP BY "recomMessNum"
                          HAVING COUNT("recomMessNum") 
                             IN( SELECT  COUNT("recomMessNum") 
                                 FROM "recommendMessageLike" 
                                 WHERE date_part('MONTH',"recomMessLikeDateTime") = $1
                                 GROUP BY "recomMessNum"
                                 ORDER BY "count" DESC 
                                 LIMIT 1 ) 
                        ) 
                    )`, [month])
        .then((data) => {
            if (!data.rows) {
                recommendData = undefined;
            } else {
                recommendData = data.rows;
            }
        }, (error) => {
            recommendData = null;
        });

    //先找Like數max值，再撈出所有like數 = max 的所有留言編號 跟留言的人
    await sql(`SELECT "A".* , "M"."memID"
                FROM(
                    SELECT "recomMessNum"
                    FROM "recommendMessageLike" 
                    WHERE date_part('MONTH',"recomMessLikeDateTime") = $1
                    GROUP BY "recomMessNum"
                    HAVING COUNT("recomMessNum") 
                        IN( SELECT  COUNT("recomMessNum") 
                            FROM "recommendMessageLike" 
                            WHERE date_part('MONTH',"recomMessLikeDateTime") = $1
                            GROUP BY "recomMessNum"
                            ORDER BY "count" DESC 
                            LIMIT 1 ) 
                    ) AS "A"
                INNER JOIN "recommendMessage" AS "M"
                    ON "A"."recomMessNum" = "M"."recomMessNum"`,[month]) 
            .then((data) => {
                if (!data.rows) {
                    recomNum = undefined;
                } else {
                    recomNum = data.rows;
                }
            }, (error) => {
                recomNum = null;
            });
            
    result[0] = recommendData ;
    result[1] = recomNum ; 

    return result;
}

//匯出
module.exports = {
    articlePost, recommendPost, replyPost, myArticle, modifyMember, getOriginalMail,
    getMyArticleClassList,
    addArticleLike, delArticleLike,
    addArticleMessLike, delArticleMessLike,
    addRecommendMessLike, delRecommendMessLike,
    report, checkAuthority, editArticle, deleteArticle, deleteRecommend, editReply, deleteReply, 
    memberInformation, getMemberInfor, recommendReplyPost, deleteRecommendReply,
    editRecommendReply, editRecommend, getBestReply, getRepeatMail, activityPost, specialColumnPost,
    editSpecialColumn, deleteSpecialColumn
};