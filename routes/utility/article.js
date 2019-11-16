'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//=========================================
//----- getArticleListPagination() --------
//=========================================
var getArticleListPagination = async function (memID, artiListNum) {
    var articleList = [];
    var tag ;
    var isCollection  ;
    var isLike ;
    var imgs ;
    var result = [];
    var articleSum;
    // -----------  取得文章清單 --------------
    await sql(`SELECT "T2".*,
                      "M"."memName" 
                FROM(
                    SELECT *
                    FROM( 
                        SELECT "A".*,"I"."imgNum", "I"."imgName", ROW_NUMBER() OVER(PARTITION BY "A"."artiNum" ORDER BY "I"."imgNum") as "Rank" 
                        FROM "articleListDataView" AS "A"
                            LEFT JOIN "image" AS "I"
                                ON "A"."artiNum" = "I"."artiNum"
                        WHERE "I"."artiMessNum" IS NULL	) AS "T1"
                    WHERE "T1"."Rank" = '1'
                    ORDER BY "artiNum" DESC
                    LIMIT 10 
                    OFFSET $1 ) AS "T2"
                        INNER JOIN "member" "M"
                            ON "M"."memID" = "T2"."memID"
                ORDER BY "artiDateTime" DESC`, [(artiListNum-1) * 10])
        .then((data) => {
            articleList = data.rows;
        }, (error) => {
            articleList = undefined;
        });

    await sql('SELECT COUNT(*) FROM "articleListDataView"')
    .then((data) => {
        articleSum = data.rows;
    }, (error) => {
        articleSum = undefined;
    })

    // ----------- 取得tag -----------
    await sql('SELECT * FROM "articleTagView"')
        .then((data) => {
            tag = data.rows;
        }, (error) => {
            tag = undefined;
        });

    // ----------- 判斷是否被使用者按愛心 -----------
    await sql('SELECT "memID","artiNum" FROM "articleLike" WHERE "memID" = $1 ', [memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isLike = undefined;
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike = undefined;
        });

    // ----------- 判斷是否被使用者收藏 -----------
    await sql('SELECT "memID" , "artiNum" FROM "memberCollection" WHERE "memID" = $1', [memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isCollection = undefined;
            } else {
                isCollection = data.rows;
            }
        }, (error) => {
            isCollection = undefined;
        });

    result[0] = articleList; 
    result[1] = tag;
    result[2] = isLike;
    result[3] = imgs;
    result[4] = isCollection;
    result[5] = [memID];
    result[6] = articleSum;
    result[7] = [artiListNum];

    return result;
}

//=========================================
//---------  getArticleList() -------------
//=========================================
var getArticleList = async function (memID) {
    var articleList = [];
    var tag ;
    var isCollection  ;
    var isLike ;
    var imgs ;
    var result = [];

    // -----------  取得文章清單 --------------
    await sql('SELECT"articleListDataView".*, "member"."memName"'+
             ' FROM "articleListDataView"' +
             ' INNER JOIN "member" ON "member"."memID" = "articleListDataView"."memID"'+
             ' ORDER BY "articleListDataView"."artiNum" DESC')
        .then((data) => {
            articleList = data.rows;
        }, (error) => {
            articleList = undefined;
        });

    // ----------- 取得tag -----------
    await sql('SELECT * FROM "articleTagView"')
        .then((data) => {
            tag = data.rows;
        }, (error) => {
            tag = undefined;
        });

    // ----------- 判斷是否被使用者按愛心 -----------
    await sql('SELECT "memID","artiNum" FROM "articleLike" WHERE "memID" = $1 ', [memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isLike = undefined;
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike = undefined;
        });

    // ----------- 判斷是否被使用者收藏 -----------
    await sql('SELECT "memID" , "artiNum" FROM "memberCollection" WHERE "memID" = $1', [memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isCollection = undefined;
            } else {
                isCollection = data.rows;
            }
        }, (error) => {
            isCollection = undefined;
        });

    //取得照片
    await sql(`SELECT "artiNum" , "imgName" 
               FROM "image" 
               WHERE "artiMessNum" IS NULL AND "artiNum" IS NOT NULL 
               ORDER BY "imgNum"`)
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                imgs = undefined;
            } else {
                imgs = data.rows;
            }
        }, (error) => {
            imgs = undefined;
        });

    result[0] = articleList; 
    result[1] = tag;
    result[2] = isLike;
    result[3] = imgs;
    result[4] = isCollection;
    result[5] = [memID];

    return result;
}

//=========================================
//---------  getOneArticle() -------------
//=========================================
var getOneArticle = async function (artiNum, memID) {
    var oneArticle = [];  //存放文章內容
    var oneArtiMessage = []; //存放文章留言內容
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var isMessLike = []; //判斷留言愛心是否被按過
    var imgs = [];
    var replyImgs = [];
    var result = [];
    var guessArticle = undefined ; //取得猜測使用者可能喜歡的文章

    // -----------  取得單一文章 --------------
    await sql('SELECT "articleListDataView".*, "member"."memName" ' +
              'FROM "articleListDataView" ' +
              'INNER JOIN "member" ON "member"."memID" = "articleListDataView"."memID" ' +
              'WHERE "artiNum" = $1', [artiNum])
        .then((data) => {
            if (data.rows.length > 0) {
                oneArticle = data.rows;
            } else {
                oneArticle = -1;
            }
        }, (error) => {
            oneArticle = null;
        });
    // -----------  取得單一文章所有留言 --------------
    await sql('SELECT "Mess"."artiMessNum" '+
                ' ,"Mess"."memID" '+
                ' ,to_char("Mess"."artiMessDateTime",\'YYYY-MM-DD\') AS "artiMessDateTime" '+
                ' ,"Mess"."artiMessCont" '+
                ' ,count("MessLike"."artiMessNum") AS "likeCount" '+
                ',"member"."memName"' +
              ' FROM "articleMessage" AS "Mess" '+
                    ' LEFT JOIN "articleMessageLike" AS "MessLike" '+
                        ' ON "Mess"."artiMessNum" = "MessLike"."artiMessNum" '+
                    'INNER JOIN "member"' +
                    'ON "member"."memID" = "Mess"."memID"' +
              ' WHERE "Mess"."artiNum" = $1 '+
              ' GROUP BY "Mess"."artiMessNum" '+
                    ' ,"Mess"."memID" '+
                    ' ,"Mess"."artiMessDateTime" '+
                    ' ,"Mess"."artiMessCont" ' +
                    ' ,"member"."memName" ' +
             ' ORDER BY "artiMessNum" ', [artiNum])
        .then((data) => {
            oneArtiMessage = data.rows;
        }, (error) => {
            oneArtiMessage = null;
        });

    // -----------  取得tag --------------
    await sql('SELECT "tagName" FROM "articleTagView" WHERE "artiNum" = $1', [artiNum])
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
    await sql('SELECT "memID" , "artiNum" FROM "memberCollection" WHERE "memID" = $1 AND "artiNum" = $2', [memID, artiNum])
        .then((data) => {
            if (!data.rows) {
                isCollection = undefined;
            } else {
                isCollection = data.rows;
            }
        }, (error) => {
            isCollection = undefined;
        });

    // ----------- 文章是否被使用者按過愛心 -----------
    await sql('SELECT "artiNum" FROM "articleLike" WHERE "memID" = $1 AND "artiNum" = $2', [memID, artiNum])
        .then((data) => {
            if (!data.rows) {
                isLike = undefined;
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike = undefined;
        });

    // ----------- 留言是否被使用者按過愛心 -----------
    await sql('SELECT "Mess"."artiMessNum" '+
            ' FROM "articleMessage" AS "Mess" '+
                ' INNER JOIN "articleMessageLike" AS "MessLike" '+
                    ' ON "Mess"."artiMessNum" = "MessLike"."artiMessNum" '+
            ' WHERE "Mess"."artiNum" = $1 AND "MessLike"."memID" = $2 ', [artiNum, memID])
        .then((data) => {
            if (!data.rows) {
                isMessLike = undefined;
            } else {
                isMessLike = data.rows;
            }
        }, (error) => {
            isMessLike = undefined;
        });

    // ----------- 取得照片 -----------
    await sql('SELECT "artiNum" , "imgName" '+
             ' FROM "image" '+
             ' WHERE "artiNum" = $1 AND "artiMessNum" IS NULL'+
             ' ORDER BY "imgNum"',[artiNum])
        .then((data) => {
            if (!data.rows) {
                imgs = undefined;
            } else {
                imgs = data.rows;
            }
        }, (error) => {
            imgs = undefined;
        });

    // ----------- 根據該文章的tag去猜測使用者可能喜歡的文章 -----------
    await sql('SELECT * '+ 
             ' FROM "article" '+
             ' WHERE "artiNum" '+ 
                ' IN(SELECT "A"."artiNum" '+
                   ' FROM(SELECT "artiNum" , count("artiNum") '+
                        ' FROM "tagLinkArticle" '+
                        ' WHERE "tagNum" '+ 
                            ' IN(SELECT "tagNum" '+
                                ' FROM "tag" '+
                                ' WHERE "tagName"  '+
                                    ' IN(SELECT "tagName" '+
                                        ' FROM "tag" '+
                                        ' WHERE "tagNum" '+
                                            ' IN (SELECT "tagNum" '+ 
                                                ' FROM "tagLinkArticle" '+ 
                                                ' WHERE "artiNum" = $1 ) '+
                                        ' ) '+
                                ' ) AND "artiNum" != $1 '+
                        ' GROUP BY "artiNum" '+
                        ' ORDER BY "count" DESC ,"artiNum" DESC '+
                        ' LiMIT 3 '+
                        ' ) AS "A" '+
                    ') '+
            ' ORDER BY "artiNum" DESC', [artiNum])
        .then((data) => {
            if (data.rowCount <= 0) {
                guessArticle = undefined ;
            } else {
                guessArticle = data.rows;
            }   
        });

    // ----------- 如果tag沒任何關聯 則隨機取三篇文章 -----------
    if(guessArticle == undefined){
        await sql('SELECT * '+
            ' FROM "article" '+
            ' WHERE "artiNum" != $1 '+
            ' ORDER BY random() '+
            ' LIMIT 3',[artiNum]) 
        .then((data) => {
                if (!data.rows) {
                    guessArticle = undefined ;
                } else {
                    
                    guessArticle = data.rows;
                }   
        });
    }else if(guessArticle.length < 3 ) { //  如果tag關聯數量小於三篇文章 
        if(guessArticle.length == 1 ){ //如果只有一篇
            await sql('SELECT * '+
                    ' FROM "article" '+
                    ' WHERE "artiNum" != $1 '+
                    ' ORDER BY random() '+
                    ' LIMIT 2',[guessArticle[0].artiNum]) 
            .then((data) => {
                    if (!data.rows) {
                        guessArticle = undefined ;
                    } else {
                        for(var i = 0 ; i < data.rows.length ; i++){
                            guessArticle.push(data.rows[i]);
                        }
                    }   
            });
        }else if (guessArticle.length == 2 ){  //如果有兩篇
            await sql('SELECT * '+
                     ' FROM "article" '+
                     ' WHERE "artiNum" != $1 AND "artiNum" != $2 '+
                     ' ORDER BY random() '+
                     ' LIMIT 1',[guessArticle[0].artiNum ,guessArticle[1].artiNum]) 
            .then((data) => {
                    if (!data.rows) {
                        guessArticle = undefined ;
                    } else {
                        guessArticle.push(data.rows[0]);
                    }   
            });
        }
        
    }

    //取得照片
    await sql('SELECT "artiNum" , "imgName" '+
        ' FROM "image" '+ 
        ' WHERE "artiNum" = $1 AND  "artiMessNum" IS NOT NULL'+
        ' ORDER BY "imgNum"', [artiNum])
        .then((data) => {
            if (!data.rows) {
                replyImgs = undefined;
            } else {
                replyImgs = data.rows;
            }
        }, (error) => {
            replyImgs = undefined;
            console.error(error)
        });

    result[0] = oneArticle;
    result[1] = oneArtiMessage;
    result[2] = tag;
    result[3] = isCollection;
    result[4] = isLike;
    result[5] = isMessLike;
    result[6] = imgs;
    result[7] = [memID];
    result[8] = guessArticle;
    result[9] = replyImgs;


    return result;
}


//=========================================
//---------  getOneReply() -------------
//=========================================
var getOneReply = async function (artiMessNum, memID) {
    var oneReply = []; //存放文章留言內容
    var replyImgs = [];
    var result = [];

    //取得單篇留言
    await sql('SELECT * FROM "articleMessage" WHERE "artiMessNum"= $1 ' , [artiMessNum])
    .then((data) => {
        if (!data.rows) {
            oneReply = undefined;
        } else {
            oneReply = data.rows;
        }
    }, (error) => {
        oneReply = undefined;
        console.log(error)
    });

    // ----------- 取得照片 -----------
    await sql('SELECT "artiMessNum" , "imgName" '+
             ' FROM "image" '+
             ' WHERE "artiMessNum" = $1 '+
             ' ORDER BY "imgNum"',[artiMessNum])
        .then((data) => {
            if (!data.rows) {
                replyImgs = undefined;
            } else {
                replyImgs = data.rows;
            }
        }, (error) => {
            replyImgs = undefined;
            console.log(error)
        });

    result[0] = oneReply;
    result[1] = replyImgs;
    result[2] = [memID];
    return result;
}


//=========================================
//---------  getArticleClassList() --------
//=========================================
var getArticleClassList = async function (articleClass, memID, artiListNum) {
    var articleList = [];
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var imgs = [] ; 
    var result = [] ; 
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
                        WHERE "I"."artiMessNum" IS NULL ) AS "T1"
                    WHERE "T1"."Rank" = '1' AND "artiClass" = $1
                    ORDER BY "artiNum" DESC
                    LIMIT 10 
                    OFFSET $2 ) AS "T2"
                INNER JOIN "member" "M"
                    ON "M"."memID" = "T2"."memID"
                ORDER BY "artiDateTime" DESC`, [articleClass, (artiListNum-1) * 10])
        .then((data) => {
            if (!data.rows) {
                articleList = undefined;
            } else {
                articleList = data.rows;
            }
        }, (error) => {
            console.log(error)
            articleList = null;
        });

    await sql('SELECT COUNT(*) ' +
              'FROM "articleListDataView"' +
              'WHERE "artiClass" = $1' , [articleClass])
    .then((data) => {
        articleSum = data.rows;
    }, (error) => {
        articleSum = undefined;
    })
    // ----------- 取得 tag -----------
    await sql('SELECT * '+
             ' FROM "articleTagView" '+
             ' WHERE "artiNum" '+ 
                 ' IN (SELECT "artiNum" '+
                     ' FROM "articleListDataView" '+
                     ' WHERE "artiClass" = $1)' ,[articleClass])
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
    await sql('SELECT "memID" , "artiNum" FROM "memberCollection" WHERE "memID" = $1', [memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isCollection = undefined;
            } else {
                isCollection = data.rows;
            }
        }, (error) => {
            isCollection = undefined;
        });

    // ----------- 判斷是否被使用者按愛心 -----------
    await sql('SELECT "memID","artiNum" FROM "articleLike" WHERE "memID" = $1 ', [memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isLike = undefined;
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike = undefined;
        });

    result[0] = articleList ;
    result[1] = tag ; 
    result[2] = isCollection ;
    result[3] = isLike ;
    // result[4] = imgs ;
    result[5] = [memID] ;
    result[6] = articleSum;
    result[7] = [artiListNum];

    return result ; 
}

//=========================================
//---------  getArtiLikeCount() -------------
//=========================================
var getArtiLikeCount = async function (artiNum) {
    var artiLikeCount = []; //存放文章愛心總數
    var result = [];

    // -----------  取得文章愛心數量 --------------
    await sql('SELECT count("artiNum") FROM "articleLike" WHERE "artiNum"=$1', [artiNum])
        .then((data) => {
            if (data.rows.length > 0) {
                artiLikeCount = data.rows;
            } else {
                artiLikeCount = undefined;
            }
        }, (error) => {
            artiLikeCount = undefined;
        });

    result[0] = artiLikeCount;

    return result;
}

//=========================================
//---------  getRecomLikeCount() ----------
//=========================================
var getRecomLikeCount = async function (recomNum) {
    var recomLikeCount = []; //存放推薦愛心總數
    var result = [];

    // -----------  取得推薦愛心數量 --------------
    await sql('SELECT count("recomNum") FROM "recommendLike" WHERE "recomNum"=$1', [recomNum])
        .then((data) => {
            if (data.rows.length > 0) {
                recomLikeCount = data.rows;
            } else {
                recomLikeCount = -1;
            }
        }, (error) => {
            recomLikeCount = null;
        });

    result[0] = recomLikeCount;

    return result;
}
//=========================================
//---------  getArtiMessLikeCount() -------------
//=========================================
var getArtiMessLikeCount = async function (artiMessNum) {
    var artiMessNumCount = []; //存放文章留言愛心總數
    var result = [];

    // -----------  取得文章留言愛心數量 --------------
    await sql('SELECT count("artiMessNum") FROM "articleMessageLike" WHERE "artiMessNum"=$1', [artiMessNum])
        .then((data) => {
            if (data.rows.length > 0) {
                artiMessNumCount = data.rows;
            } else {
                artiMessNumCount = -1;
            }
        }, (error) => {
            artiMessNumCount = null;
        });

    result[0] = artiMessNumCount;

    return result;
}

//=========================================
//---------  getRecomMessLikeCount() ------
//=========================================
var getRecomMessLikeCount = async function (recomMessNum) {
    var recomMessNumCount = []; //存放推薦留言愛心總數
    var result = [];

    // -----------  取得推薦留言愛心數量 --------------
    await sql('SELECT count("recomMessNum") FROM "recommendMessageLike" WHERE "recomMessNum"=$1', [recomMessNum])
        .then((data) => {
            if (data.rows.length > 0) {
                recomMessNumCount = data.rows;
            } else {
                recomMessNumCount = -1;
            }
        }, (error) => {
            recomMessNumCount = null;
        });

    result[0] = recomMessNumCount;

    return result;
}


//匯出
module.exports = {
    getArticleList, getOneArticle,
    getArticleClassList,
    getArtiLikeCount, getRecomLikeCount,
    getArtiMessLikeCount, getRecomMessLikeCount, getOneReply, getArticleListPagination
};