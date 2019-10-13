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
    var imgs = [] ; 
    var result = [];

    //---------  取得收藏推薦內容 -------------
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
              ' WHERE "recomNum" '+
                ' IN (SELECT "recomNum" '+
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

    // --------- 取得照片 --------- 
    await sql('SELECT "recomNum","imgName" '+
              ' FROM "image" '+
              ' WHERE "recomNum" '+
                    ' IN (SELECT "recomNum" '+
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
    // result[2] = checkAuthority ;
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
   
    // ----------- 判斷是否被使用者收藏 -----------
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

    // ----------- 判斷是否被使用者案愛心 -----------
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

    // ----------- 判斷留言是否被按過愛心 -----------
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

    result[0] = oneRecommend ;
    result[1] = oneRecomMessage ;
    result[2] = tag ;
    result[3] = imgs ;
    result[4] = isLike;
    result[5] = isCollection;
    result[6] = isMessLike;
    // result[7] = checkAuthority;
    result[8] = [memID];

    return result;
}
//=========================================
//---------  getCollArticle() -------------
//=========================================
var getCollArticle = async function (memID) {
    var colleArticle = [];
    var tag = [];
    var isLike = [];
    var imgs = [];
    var result = [];

    //---------  取得每個會員收藏的文章內容 -------------
    await sql('SELECT * '+
             ' FROM "articleListDataView" AS "artiView" '+
             ' WHERE "artiView"."artiNum" '+
                ' IN (SELECT "artiNum" '+
                    ' FROM "memberCollection"  '+
                    ' WHERE "memID" = $1 )',  [memID])
        .then((data) => {
            if(!data.rows){
                colleArticle = undefined ; 
            }else {
                colleArticle = data.rows ;
            }
        }, (error) => {
            colleArticle = undefined ;
        });

    // -----------  取得每篇收藏文章的tag --------------
    await sql('SELECT "tagName" '+
             ' FROM "articleTagView" '+
             ' WHERE "artiNum" '+
                ' IN(SELECT "artiNum" '+
                   ' FROM "memberCollection"  '+
                   ' WHERE "memID" = $1)', [memID])
        .then((data) => {
            if (!data.rows) {
                tag = undefined ;
            } else {
                tag = data.rows ;
            }
        }, (error) => {
            tag = undefined ;
        });

    // ----------- 判斷是否被使用者按愛心 -----------
    await sql('SELECT "artiNum" '+
             ' FROM "articleLike" '+ 
             ' WHERE "artiNum" '+
                ' IN(SELECT "artiNum" '+
                   ' FROM "memberCollection" '+
                   ' WHERE "memID" = $1) AND "memID" = $1', [memID])
        .then((data) => {
            if (!data.rows) {
                isLike = undefined ; 
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike = undefined ; 
        });

    // ----------- 取得照片 -----------
    await sql('SELECT "artiNum" , "imgName" '+ 
             ' FROM "image" '+
             ' WHERE "artiNum" '+
                ' IN(SELECT "artiNum" '+
                   ' FROM "memberCollection" '+
                   ' WHERE "memID" = $1)', [memID])
        .then((data) => {
            if (!data.rows) {
                imgs = undefined ; 
            }else {
                imgs = data.rows;
            }
        }, (error) => {
            imgs = undefined ; 
        });

    result[0] = colleArticle;
    result[1] = tag;
    result[2] = isLike;
    result[3] = imgs;
    result[4] = [memID];

    return result;
}

//===============================
//---- getCollRecomClassList ----
//===============================
var getCollRecomClassList = async function (memID, recomClass) {
    var recommendList = [];
    var imgs = [] ;
    var result = [];

    //--------- 根據分類取得會員收藏的推薦內容 ---------
    await sql('SELECT  "recomView"."recomNum" '+
                ' ,"recomView"."recomHead" '+
                ' ,"recomView"."recomCont" '+
                ' ,"recomView"."recomClass" '+
             ' FROM "recommendListDataView" AS "recomView" '+
             ' WHERE "recomView"."recomNum" '+
                    'IN (SELECT "recomNum" '+
                        ' FROM "memberCollection" '+
                        ' WHERE "memID" = $1 ) AND "recomView"."recomClass" = $2', [memID, recomClass])
        .then((data) => {
            if(!data.rows){
                recommendList = undefined ; 
            }else {
                recommendList = data.rows ;
            }     
        }, (error) => {
            recommendList = undefined ; 
        });
      
    // --------- 取得照片 --------- 
    await sql('SELECT "recomNum" , "imgName" '+
             ' FROM "image"  '+
             ' WHERE "recomNum" '+
                'IN(SELECT "recomNum" '+
                    ' FROM "memberCollection" '+
                    ' WHERE "memID" = $1)', [memID])
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
    result[1] = imgs ;
    // result[2] = checkAuthority ;
    result[3] = [memID];

    return result ;

}

//===============================
//---- getCollArtiClassList ----
//===============================
var getCollArtiClassList = async function (memID, artiClass) {
    var articleList = [];
    var tag = [] ;
    var isLike = [] ;
    var imgs = [] ;
    var result = [];

    //--------- 根據分類取得會員收藏的文章內容 ---------
    await sql('SELECT * '+
             ' FROM "articleListDataView" '+
             ' WHERE "artiNum" '+
                ' IN (SELECT "artiNum" '+
                    ' FROM "memberCollection" '+
                    ' WHERE "memID" = $1 ) '+
              ' AND "artiClass" = $2 ', [memID, artiClass])
        .then((data) => {
            if(!data.rows){
                articleList = undefined ; 
            }else {
                articleList = data.rows ;
            }     
        }, (error) => {
            articleList = undefined ; 
        });

    // -----------  取得每篇收藏文章的tag --------------
    await sql('SELECT "tagName" '+
              ' FROM "articleTagView" '+
              ' WHERE "artiNum" '+
                ' IN(SELECT "artiNum" '+
                   ' FROM "memberCollection"  '+
                   ' WHERE "memID" = $1)', [memID])
        .then((data) => {
            if (!data.rows) {
                tag = undefined ;
            } else {
                tag = data.rows ;
            }
        }, (error) => {
            tag = undefined ;
        });

    // --------- 取得照片 --------- 
    await sql('SELECT "artiNum" , "imgName" '+
                ' FROM "image"  '+
                ' WHERE "artiNum" '+
                    'IN(SELECT "artiNum" '+
                      ' FROM "memberCollection" '+
                      ' WHERE "memID" = $1)', [memID])
        .then((data) => {
        if (!data.rows){
            imgs = undefined ;
        }else{
            imgs = data.rows;
        }

        }, (error) => {
            imgs = undefined ;
        });

    // --------- 判斷是否被使用者按愛心 ---------
    await sql('SELECT "artiNum" '+
        ' FROM "articleLike" '+ 
        ' WHERE "artiNum" '+
            ' IN(SELECT "artiNum" '+
                ' FROM "memberCollection" '+
                ' WHERE "memID" = $1)', [memID])
        .then((data) => {
            if (!data.rows) {
                isLike = undefined ; 
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike = undefined ; 
        });    

    result[0] = articleList ; 
    result[1] = tag ; 
    result[2] = imgs ;
    result[3] = isLike ; 
    // result[4] = checkAuthority ;
    result[5] = [memID];

    return result ;

}

//=========================================
//---------  addCollention() --------------
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
//---------  addColleRecommend() ----------
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
            result = 1;
        }, (error) => {
            result = 0;
        });
        
    return result;
}
module.exports = {
    getCollRecommend, getOneColleRecommend, getCollArticle,
    getCollRecomClassList,getCollArtiClassList,
    addColleArticle, delColleArticle,
    addColleRecommend, delColleRecommend
};