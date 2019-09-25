'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const member = require('./member');

//=========================================
//---------  getIndexData() -----------
//=========================================
var getIndexData = async function (memID) {
    var weekRecommend = [];
    var fourRecommend = [];
    var movie = true; //判斷是否找過 (只取一篇)
    var book = true; 
    var music = true;
    var exhibition = true;
    var hotArticle = [];  //存放前三名熱門文章
    var imgs = [];
    var tag = [] ;
    var result = [];
    // -----------  每週推薦 --------------
    await sql('SELECT * FROM "recommend"')
        .then((data) => {
            // 將每周推薦的類別改為中文
            for (let i = 0; i < data.rows.length; i++) {
                // console.log(data.rows[i].recomClass);
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

    // 只各取一篇出來
    for (var i = 0; i < weekRecommend.length; i++) {
        if (weekRecommend[i].recomClass == '電影' && movie) {
            fourRecommend.push(weekRecommend[i]);
            movie = false;
        } else if (weekRecommend[i].recomClass == '音樂' && music) {
            fourRecommend.push(weekRecommend[i]);
            music = false;
        } else if (weekRecommend[i].recomClass == '書籍' && book) {
            fourRecommend.push(weekRecommend[i]);
            book = false;
        } else if (weekRecommend[i].recomClass == '展覽' && exhibition) {
            fourRecommend.push(weekRecommend[i]);
            exhibition = false;
        }
    }
    // -----------  熱門文章 --------------
    await sql('SELECT * FROM "articleListDataView" ORDER BY "likeCount" DESC , "artiDateTime" DESC LIMIT 3')
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

    result[0] = fourRecommend;
    result[1] = hotArticle;
    result[2] = [memID];
    // result[3] = checkAuthority;
    result[4] = imgs;
    result[5] = tag ; 
    
    return result;
}


//=========================================
//---------  getWebSearch() -----------
//=========================================
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
    await sql('SELECT * '+
              ' FROM "articleListDataView" '+
              ' WHERE "artiHead" LIKE $1 or "artiCont" LIKE $1  or "artiClass" LIKE $1 ',['%' + searchParams + '%'])
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

    //取得第一張照片
    await sql('SELECT "artiNum" , "imgName" FROM "image"')
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                artiImgs = undefined;
            } else {
                artiImgs = data.rows;
            }
        }, (error) => {
            artiImgs = undefined;
        });

    //======================================
    //------------- 搜尋推薦 ---------------
    //======================================

    // -----------  取得推薦清單 --------------
    await sql('SELECT * '+
             ' FROM "recommendListDataView" '+
             ' WHERE "recomHead" LIKE $1 or "recomCont" LIKE $1 or "recomClass" LIKE $1 '
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

    //----------- 取得照片 ----------- 
    await sql('SELECT "recomNum" , "imgName" FROM "image"')
    .then((data) => {
        if (!data.rows) {
            recomImgs = undefined;
        } else {
            recomImgs = data.rows;
        }
    }, (error) => {
        recomImgs = undefined;
    });

    //文章
    result[0] = articleList;
    result[1] = tag;
    result[2] = isLike ; 
    result[3] = artiImgs ;
    result[4] = isCollection;
    result[5] = [memID];

    //推薦
    result[6] = recommendList ; 
    result[7] = recomImgs ; 

    return result;

}

module.exports = { getIndexData, getWebSearch };