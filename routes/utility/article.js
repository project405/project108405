'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const member = require('./member');
var moment = require('moment');

//=========================================
//---------  getArticleList() -------------
//=========================================
var getArticleList = async function (memID) {
    var articleList = [];
    var tag ;
    var isCollection  ;
    var isLike ;
    var checkAuthority = [];
    var imgs ;
    var result = [];

    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "articleListDataView"')
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
    await sql('SELECT "memID","artiNum" FROM "articleLike" WHERE "memID" = $1 ',[memID])
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
                isCollection = data.rows ;
            }
        }, (error) => {
            isCollection = undefined ; 
        });

    //取得權限
    await member.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("權限=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("權限=", checkAuthority);
        }
    })

    //取得第一張照片
    await sql('SELECT "artiNum" , "imgName" FROM "image"')
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                imgs = undefined;
            } else {
                imgs = data.rows;
            }
        }, (error) => {
            imgs = undefined;
        });

    result[0] = articleList;  //存入文章清單
    result[1] = tag;
    result[2] = isLike ; 
    result[3] = imgs ;
    result[4] = isCollection;
    result[5] = [memID];
    result[6] = checkAuthority;
    console.log(result);
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
    var checkAuthority;
    var imgs = [];
    var result = [];

    // -----------  取得單一文章 --------------
    await sql('SELECT * FROM "articleListDataView" WHERE "artiNum" = $1', [artiNum])
        .then((data) => {
            if (data.rows.length > 0) {
                // console.log("單一文章",data.rows);
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
                ' FROM "articleMessage" AS "Mess" '+
                    ' LEFT JOIN "articleMessageLike" AS "MessLike" '+
                        ' ON "Mess"."artiMessNum" = "MessLike"."artiMessNum" '+
                ' WHERE "Mess"."artiNum" = $1 '+
                ' GROUP BY "Mess"."artiMessNum" '+
                    ' ,"Mess"."memID" '+
                    ' ,"Mess"."artiMessDateTime" '+
                    ' ,"Mess"."artiMessCont"', [artiNum])
        .then((data) => {
            // console.log("單一文章留言",data.rows);
            oneArtiMessage = data.rows;
        }, (error) => {
            oneArtiMessage = null;
        });

    // -----------  取得tag --------------
    await sql('SELECT "tagName" FROM "articleTagView" WHERE "artiNum" = $1', [artiNum])
        .then((data) => {
            // console.log("data=", data.rows);
            if (!data.rows) {
                tag = undefined ;
            } else {
                tag = data.rows ;
            }
        }, (error) => {
            tag  = undefined ;
        });

    // 判斷是否被使用者收藏
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

    // 文章是否被使用者按過愛心
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

    // 留言是否被使用者按過愛心
    await sql('SELECT "Mess"."artiMessNum" '+
            ' FROM "articleMessage" AS "Mess" '+
                ' INNER JOIN "articleMessageLike" AS "MessLike" '+
                    ' ON "Mess"."artiMessNum" = "MessLike"."artiMessNum" '+
            ' WHERE "Mess"."artiNum" = $1 AND "MessLike"."memID" = $2 ', [artiNum, memID])
        .then((data) => {
            console.log("留言是否被按過愛心", data.rows);
            if (!data.rows) {
                isMessLike = undefined ; 
            } else {
                isMessLike = data.rows ; 
            }
        }, (error) => {
            isMessLike = undefined ; 
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

    //取得照片
    await sql('SELECT "artiNum" , "imgName" FROM "image" WHERE "artiNum" = $1',[artiNum])
        .then((data) => {
            if (!data.rows) {
                imgs = undefined;
            } else {
                imgs = data.rows;
            }
        }, (error) => {
            imgs = undefined;
        });
        
    result[0] = oneArticle;
    result[1] = oneArtiMessage;
    result[2] = tag;
    result[3] = isCollection;
    result[4] = isLike;
    result[5] = isMessLike;
    result[6] = imgs;
    result[7] = [memID];
    result[8] = checkAuthority;
   

    return result;
}


//=========================================
//---------  getArticleClassList() --------
//=========================================
var getArticleClassList = async function (articleClass , memID){
    var articleList = [] ; 
    var tag = [] ;
    var isCollection = [] ;
    var isLike = [];
    var imgs = [] ; 
    var checkAuthority = [] ;
    var result = [] ; 
    // -----------  取得分類文章 --------------
    await sql('SELECT * FROM "articleListDataView" WHERE "artiClass" = $1', [articleClass])
        .then((data) => {
            if (!data.rows) {
                articleList = undefined;
            } else {
                articleList = data.rows;
            }
            console.log(articleList) ;
        }, (error) => {
            articleList = null;
        });

    // ----------- 取得 tag -----------
    await sql('SELECT * FROM "articleTagView"')
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
                isCollection = data.rows ;
            }
        }, (error) => {
            isCollection = undefined ; 
        });

    // ----------- 判斷是否被使用者按愛心 -----------
    await sql('SELECT "memID","artiNum" FROM "articleLike" WHERE "memID" = $1 ',[memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isLike = undefined;
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike = undefined;
        });  

         //----------- 取得第一張照片 ----------- 
    await sql('SELECT "artiNum" , "imgName" FROM "image"')
    .then((data) => {
        if (data.rows == null || data.rows == '') {
            imgs = undefined;
        } else {
            imgs = data.rows;
        }
    }, (error) => {
        imgs = undefined;
    });      

    // ----------- 取得權限 -----------
    await member.checkAuthority(memID).then(data => {
        if (data != undefined) {
            checkAuthority = data;
            console.log("權限=", checkAuthority);
        } else {
            checkAuthority = undefined;
            console.log("權限=", checkAuthority);
        }
    })

   

    result[0] = articleList ;
    result[1] = tag ; 
    result[2] = isCollection ;
    result[3] = isLike ;
    result[4] = imgs ;
    result[5] = [memID] ;
    result[6] = checkAuthority ;
    return result ; 
}

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
    var result = [];
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
    var result = [];
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
//=========================================
//---------  getArtiMessLikeCount() -------------
//=========================================
var getArtiMessLikeCount = async function (artiMessNum) {
    var artiMessNumCount = []; //存放文章愛心總數
    var result = [];
    // -----------  取得單一文章愛心數量 --------------
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
    // console.log("result[0] = " , result[0]);
    return result;
}

//=========================================
//---------  getRecomMessLikeCount() -------------
//=========================================
var getRecomMessLikeCount = async function (recomMessNum) {
    var recomMessNumCount = []; //存放文章愛心總數
    var result = [];
    // -----------  取得單一文章愛心數量 --------------
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
    // console.log("result[0] = " , result[0]);
    return result;
}
//匯出
module.exports = {
    getArticleList, getOneArticle,
    getArticleClassList,
    getHotArticle, getArtiLikeCount, getRecomLikeCount,
    getArtiMessLikeCount, getRecomMessLikeCount
};