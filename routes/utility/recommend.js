'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const member = require('./member');
var moment = require('moment');

//=========================================
//---------  getRecommendList() -----------
//=========================================
var getRecommendList = async function (memID) {
    var RecommendList = [];
    var checkAuthority;
    var imgs = [] ; 
    var result = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommendListDataView"')
        .then((data) => {
            console.log(data.rows);
            RecommendList = data.rows;
        }, (error) => {
            RecommendList = null;
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
    result[0] = RecommendList;
    result[1] = [memID];
    result[2] = checkAuthority;
    result[3] = imgs ;
    return result;
}

//=========================================
//---------  getOneRecommend() -------------
//=========================================
var getOneRecommend = async function (recomNum, memID) {
    var oneRecommend = [];  //存放文章內容
    var oneRecomMessage = []; //存放文章留言內容
    var tag = [];
    var isCollection = [];
    var isLike = [];
    var isMessLike = []; //判斷留言愛心是否被按過
    var imgs = [] ;
    var checkAuthority;
    var result = [];

    // -----------  取得單一推薦文章 --------------
    await sql('SELECT * FROM "recommendListDataView" WHERE "recomNum" = $1', [recomNum])
        .then((data) => {
            if (!data.rows) {
                oneRecommend = undefined ; 
            } else {
                oneRecommend = data.rows ; 
            }
        }, (error) => {
            oneRecommend = undefined ; 
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
           }else {
                oneRecomMessage = data.rows;
           }
        }, (error) => {
            oneRecomMessage = undefined ;
        });
  
    // -----------  取得tag --------------
    await sql('SELECT "tagName" FROM "recommendTagView" WHERE "recomNum" = $1 ', [recomNum])
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

    result[0] = oneRecommend;
    result[1] = oneRecomMessage;
    result[2] = tag;
    result[3] = imgs ;
    result[4] = isLike;
    result[5] = isCollection;
    result[6] = isMessLike;
    result[7] = checkAuthority;
    result[8] = [memID];
    
    return result;
}

//==============================
//---- getRecomClassList () ----
//==============================
//---------  getRecomClassList() -------------
// var getRecomClassList = async function (recomClass,memID) {
//     var recommendData = [];
//     var checkAuthority;
//     var imgs = [] ;
//     var result = [];
//     // -----------  取得文章清單 --------------
//     await sql('SELECT * FROM "recommendListDataView" WHERE "recomClass" = $1', [recomClass])
//         .then((data) => {
//           if(!data.rows){
//             recommendData = undefined ;
//           }else{
//             recommendData = data.rows ;
//           }
//         }, (error) => {
//             recommendData = undefined ;
//         });

//     //取得權限
//     await member.checkAuthority(memID).then(data => {
//         if (data != undefined) {
//             checkAuthority = data;
//             console.log("Authority=", checkAuthority);
//         } else {
//             checkAuthority = undefined;
//             console.log("Authority=", checkAuthority);
//         }
//     })

//     //----------- 取得照片 ----------- 
//     await sql('SELECT "recomNum" , "imgName" FROM "image"')
//     .then((data) => {
//         if (!data.rows) {
//             imgs = undefined;
//         } else {
//             imgs = data.rows;
//         }
//     }, (error) => {
//         imgs = undefined;
//     });

//     result[0] = recommendData;
//     result[1] = [memID];
//     result[2] = checkAuthority;
//     result[3] = imgs ; 

//     return result;
// }

//---------  getRecomClassList() -------------
var getRecomClassList = async function () {
    
    let result = [];
    // (1)
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['movie'])
        .then((data) => {
            if(data.rows.length > 0){
                result.push(data.rows);
                console.log(result);
            }else{
                result.push([]);
            }
        }, (error) => {
            result.push([]); 
        });

    // (2)
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['music'])
        .then((data) => {
            if(data.rows.length > 0){
                result.push(data.rows);
            }else{
                result.push([]);
            }
        }, (error) => {
            result.push([]); 
        });
    // (3)
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['book'])
        .then((data) => {
            if(data.rows.length > 0){
                result.push(data.rows);
            }else{
                result.push([]);
            }
        }, (error) => {
            result.push([]); 
        });
    // (4)
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['exhibition'])
        .then((data) => {
            if(data.rows.length > 0){
                result.push(data.rows);
            }else{
                result.push([]);
            }
        }, (error) => {
            result.push([]); 
        });

    
    return result;
}


//=========================================
//---------  addRecommendLike() -----------
//=========================================
var addRecommendLike = async function (memID, recomNum) {
    var addTime = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var result;

    await sql('INSERT INTO "recommendLike" ("memID","recomNum","recomLikeDateTime") VALUES ($1,$2,$3)', [memID, recomNum, addTime])
        .then((data) => {
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}
//=========================================
//---------  delRecommedLike() -----------
//=========================================
var delRecommendLike = async function (memID, recomNum) {
    var result;
    await sql('DELETE FROM "recommendLike" WHERE "memID" = $1 and "recomNum"= $2', [memID, recomNum])
        .then((data) => {
            console.log("刪除囉~~~~");
            result = 1;
        }, (error) => {
            result = 0;
        });
    return result;
}

module.exports = {
    getRecommendList, getOneRecommend,
    getRecomClassList,
    addRecommendLike, delRecommendLike
}