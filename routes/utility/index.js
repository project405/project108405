'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const member = require('./member');

//=========================================
//---------  getIndexData() -----------
//=========================================
var getIndexData = async function (memID) {
    var weekRecommend = [];
    var hotArticle = [];  //存放前三名熱門文章
    var articleImgs = [] ;
    var recommendImgs = [];
    var tag = [] ;

    //(燈泡區塊) 分析文章
    var positiveArticle = [] ; //正向文章
    var negativeArticle = [] ; //負向文章
    var positiveImg = [] ; //正向照片
    var negativeImg = [] ; //負向照片

    //(葉子區塊) 針對會員 對文章/推薦 分類按愛心次數
    var byClassData = [] ;
    var artiClassCount = [] ; 
    var recomClassCount = [] ;
    var classCount = [0,0,0,0] ;  //arti + recom
    var r ; //radom
    var result = [];

    // -----------  每週推薦 --------------
    await sql('SELECT * '+
             ' FROM( '+
                    ' SELECT "A".*, "I"."imgName", ROW_NUMBER() OVER(PARTITION BY "A"."recomNum" ORDER BY "imgDateTime" DESC ) AS "R" '+
                    ' FROM(  '+
                        ' SELECT *, ROW_NUMBER() OVER(PARTITION BY "recomClass" ORDER BY "recomDateTime" DESC ) AS "Rank" '+
                        ' FROM "recommend" '+
                        ' ORDER BY "recomDateTime" DESC ) AS "A" '+
                    ' LEFT JOIN  "image" AS "I" '+
                        ' ON "A"."recomNum" = "I"."recomNum" '+
                    ' WHERE "Rank" = \'1\' AND "I"."recomMessNum" IS NULL '+
                    ' ORDER BY "recomNum" ) AS "B" '+
             ' WHERE "B"."R" = \'1\' ')
        .then((data) => {
            
            // 將每周推薦的類別改為中文
            for (let i = 0; i < data.rows.length; i++) {
                if (data.rows[i].recomClass == 'movie') {
                    data.rows[i].recomClass = '電影';
                } else if (data.rows[i].recomClass == 'music') {
                    data.rows[i].recomClass = '音樂';
                } else if (data.rows[i].recomClass == 'book') {
                    data.rows[i].recomClass = '書籍';
                } else {
                    data.rows[i].recomClass = '展覽';
                }
            }
            weekRecommend = data.rows;
        }, (error) => {
            weekRecommend = null;
        })

    // -----------  熱門文章 --------------
    await sql('SELECT "articleListDataView".*, "member"."memName" ' + 
              'FROM "articleListDataView" '+
              'INNER JOIN "member" ON "member"."memID" = "articleListDataView"."memID"' +
              'ORDER BY "likeCount" DESC , "artiDateTime" DESC LIMIT 3')
        .then((data) => {
            if (!data.rows) {
                hotArticle = undefined;
            } else {
                hotArticle = data.rows;
            }
        }, (error) => {
            hotArticle = undefined;
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

    //----------- 取得文章照片 ----------- 
    await sql('SELECT "artiNum" , "imgName" FROM "image" ORDER BY "imgNum" ')
        .then((data) => {
            if (!data.rows) {
                articleImgs = undefined;
            } else {
                articleImgs = data.rows;
            }
        }, (error) => {
            articleImgs = undefined;
        });
    
    //----------- 取得推薦照片 ----------- 
    await sql('SELECT "recomNum" , "imgName" FROM "image" ORDER BY "imgNum"')
        .then((data) => {
            if (!data.rows) {
                recommendImgs = undefined;
            } else {
                recommendImgs = data.rows;
            }
        }, (error) => {
            recommendImgs = undefined;
        });

    //----------- 正向文章 ----------- 
    await sql('SELECT * '+ 
            ' FROM( '+
                ' SELECT * '+
                ' FROM "article" '+
                ' WHERE "score2" >= 20 '+
                ' ORDER BY "positiveWords" DESC, "analyzeScore" DESC '+
                ' LIMIT 5) AS "A" '+
            ' ORDER BY random() '+
            ' LIMIT 1 ')
    .then((data) => {
        if (!data.rows) {
            positiveArticle = undefined;
        } else {
            positiveArticle = data.rows;
        }
    }, (error) => {
        positiveArticle = undefined;
    });

    //----------- 負向文章 ----------- 
    await sql('SELECT * '+
            ' FROM( '+
                ' SELECT * '+
                ' FROM "article" '+
                ' WHERE "score2" <= -15 '+
                ' ORDER BY "negativeWords" DESC, "analyzeScore" DESC '+
                ' LIMIT 5) AS "A" '+
            ' ORDER BY random() '+
            ' LIMIT 1 ')
    .then((data) => {
        if (!data.rows) {
            negativeArticle = undefined;
        } else {
            negativeArticle = data.rows;
        }
    }, (error) => {
        negativeArticle = undefined;
    });

    //----------- 正向照片 ----------- 
    if(positiveArticle.length != 0 ){
        await sql('SELECT "imgName" '+
            ' FROM "image" '+
            ' WHERE "artiNum" = $1 '+
            ' ORDER BY "imgNum" ',[positiveArticle[0].artiNum])
        .then((data) => {
            if (!data.rows) {
                positiveImg = undefined;
            } else {
                positiveImg = data.rows;
            }
        }, (error) => {
            positiveImg = undefined;
        });
    }
    

    //----------- 負向照片 ----------- 
    if(negativeArticle.length != 0 ){
        await sql('SELECT "imgName" '+
            ' FROM "image" '+
            ' WHERE "artiNum" = $1 '+
            ' ORDER BY "imgNum"',[negativeArticle[0].artiNum])
        .then((data) => {
            if (!data.rows) {
                negativeImg = undefined;
            } else {
                negativeImg = data.rows;
            }
        }, (error) => {
            negativeImg = undefined;
        });
    }
    

    // ----------- 計算文章class的數量-----------
    await sql('SELECT "artiClass" AS "class" , count("artiClass") '+
             ' FROM "article" '+
             ' WHERE "artiNum" '+
                 ' IN( SELECT "artiNum" '+
                        ' FROM "articleLike" '+
                        ' WHERE "memID" = $1) '+
             ' GROUP BY "artiClass"', [memID])
    .then((data) => {
        if (!data.rows) {
            artiClassCount = {"class":"" , "count":0 }; 
        } else {
            artiClassCount = data.rows ;
        }
    }, (error) => {
        artiClassCount = {"class":"" , "count":0 }; 
    });

    // ----------- 計算推薦class的數量-----------
    await sql('SELECT "recomClass" AS "class" , count("recomClass") '+
             ' FROM "recommend" '+
             ' WHERE "recomNum" '+
                 ' IN( SELECT "recomNum" '+
                        ' FROM "recommendLike" '+
                        ' WHERE "memID" = $1) '+
             ' GROUP BY "recomClass"', [memID])
    .then((data) => {
        if (!data.rows) {
            recomClassCount = {"class":"" , "count":0 }; 
        } else {
            recomClassCount = data.rows ;
        }
    }, (error) => {
        recomClassCount ={"class":"" , "count":0 }; 
    });

    //依照亂數取文章或推薦
    r = Math.floor(Math.random() * 10) + 1;

    //如果都沒對文章或推薦按過愛心
    if(artiClassCount.length == 0 && recomClassCount.length == 0){
        var classRandom = Math.floor(Math.random() * 3) ;
        byClassData = await byClassGetData(classRandom,r ) ; 
    }else{
        //加總class按讚次數
        await sumClass(classCount, artiClassCount) ;
        await sumClass(classCount, recomClassCount) ;

        //排序
        classCount = await sortObject(classCount);

        //class次數最多的 以亂數的方式去判斷說要取文章 還是 推薦
        byClassData = await byClassGetData(classCount[0][0],r ) ; 
    }

    result[0] = weekRecommend;
    result[1] = hotArticle;
    result[2] = [memID];
    result[3] = articleImgs;
    result[4] = recommendImgs;
    result[5] = tag ; 
    result[6] = positiveArticle ; 
    result[7] = negativeArticle ; 
    result[8] = positiveImg ;
    result[9] = negativeImg ;
    result[10] = byClassData; 

    return result;
}

//計算使用者分別對article/recommend Class 按愛心的次數
async function sumClass(array, data){
    for(var i = 0 ; i < data.length ; i++){
        if(data[i].class == 'movie'){
            array[0] += parseInt(data[i].count,10) ; 
        }else if(data[i].class == 'music'){
            array[1] += parseInt(data[i].count,10) ;
        }else if(data[i].class == 'book'){
            array[2] += parseInt(data[i].count,10) ;
        }else if(data[i].class == 'exhibition'){
            array[3] += parseInt(data[i].count,10) ;
        }
    }
} 

//排序
async function sortObject(array){
    var sortable = [] ;
    for (var item in array) {
        sortable.push([item, array[item]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortable ; 
}

//針對class 取文章或推薦(亂數)
async function byClassGetData(index, r){
    var className = "" ; 
    var result = [] ;    
    
    //判斷class是什麼
    if(index == "0"){
        className = "movie";
    }else if(index == "1"){
        className = "music";
    }else if(index == "2"){
        className = "book";
    }else if(index == "3"){
        className = "exhibition";
    }

    //取文章
    if( r <= 5 ){
        await sql('SELECT * '+
                 ' FROM "articleListDataView" '+
                 ' WHERE "artiClass" = $1 '+
                 ' ORDER BY random() '+
                 ' LIMIT 1', [className])
        .then((data) => {
            if (!data.rows) {
                result = undefined; 
            } else {
                result = data.rows ;
            }
        }, (error) => {
            result = undefined ; 
        });
    }else{ 
        //取推薦
        await sql('SELECT * '+
            ' FROM "recommend" '+
            ' WHERE "recomClass" = $1 '+
            ' ORDER BY random() '+
            ' LIMIT 1', [className])
        .then((data) => {
            if (!data.rows) {
                result = undefined; 
            } else {
                result = data.rows ;
            }
        }, (error) => {
            result = undefined ; 
        });

    }
    return result ; 
}

//=====================================
//---------  getWebSearch() -----------
//=====================================
var getWebSearch = async function (searchParams, memID) {
    var articleList = [];
    var tag ;
    var isCollection  ;
    var isLike ;
    var artiImgs ;

    var recommendList = [];
    var recomImgs ; 

    var result = [];

    //======================================
    //------------- 搜尋文章 ---------------
    //======================================

    // -----------  取得文章清單 -------------
    await sql(`	SELECT "T2".*, "M"."memName" 
                FROM(
                    SELECT *
                    FROM( 
                        SELECT "A".*,"I"."imgNum", "I"."imgName", ROW_NUMBER() OVER(PARTITION BY "A"."artiNum" ORDER BY "I"."imgNum") as "Rank" 
                        FROM "articleListDataView" AS "A"
                        LEFT JOIN "image" AS "I"
                            ON "A"."artiNum" = "I"."artiNum"
                        WHERE "I"."artiMessNum" IS NULL)  AS "T1"
                WHERE "T1"."Rank" = '1' AND ("artiHead" LIKE $1 or "artiCont" LIKE $1 or "artiClass" LIKE $1 ) 
                ORDER BY "artiNum" DESC) AS "T2"
                INNER JOIN "member" "M"
                ON "M"."memID" = "T2"."memID"`,['%' + searchParams + '%'])
        .then((data) => {
            articleList = data.rows;
        }, (error) => {
            articleList = undefined;
        });

    // ----------- 取得tag -----------
    await sql('SELECT * '+
              ' FROM "articleTagView" '+
              ' WHERE "artiNum" '+
                ' IN(SELECT "artiNum" '+
                    ' FROM "articleListDataView" '+
                    ' WHERE "artiHead" LIKE $1 or "artiCont" LIKE $1 or "artiClass" LIKE $1) ' 
            ,['%' + searchParams + '%'])
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

    //======================================
    //------------- 搜尋推薦 ---------------
    //======================================

    // -----------  取得推薦清單 --------------
    await sql(`	SELECT "T2".*
                FROM(
                    SELECT *
                    FROM( 
                        SELECT "A".*,"I"."imgNum", "I"."imgName", ROW_NUMBER() OVER(PARTITION BY "A"."recomNum" ORDER BY "I"."imgNum") as "Rank" 
                        FROM "recommendListDataView" AS "A"
                        LEFT JOIN "image" AS "I"
                            ON "A"."recomNum" = "I"."recomNum"
                        WHERE "I"."recomMessNum" IS NULL)  AS "T1"
                WHERE "T1"."Rank" = '1' AND ("recomHead" LIKE $1 or "recomCont" LIKE $1 or "recomClass" LIKE $1 ) 
                ORDER BY "recomNum" DESC ) AS "T2"`
             ,['%' + searchParams + '%'])
        .then((data) => {
            if (data.rows != undefined) {
                recommendList = data.rows
            } else {
                recommendList = undefined
            }
        }, (error) => {
            recommendList = undefined;
        });

    //文章
    result[0] = articleList;
    result[1] = tag;
    result[2] = isLike ; 
    // result[3] = artiImgs ;
    result[4] = isCollection;
    result[5] = [memID];

    //推薦
    result[6] = recommendList ; 
    // result[7] = recomImgs ; 

    return result;
}

module.exports = { getIndexData, getWebSearch };