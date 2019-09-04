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
    var movie = true;
    var book = true;
    var music = true;
    var exhibition = true;
    var hotArticle = [];  //存放前三名熱門文章
    var checkAuthority;
    var imgs = [];
    var tag = [] ;
    var result = [];
    // -----------  每週推薦 --------------
    await sql('SELECT * FROM "recommend"')
        .then((data) => {
            // console.log("data=", data.rows);
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

    // 將推薦的movie改為中文
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
    await sql('SELECT * FROM "articleListDataView" ORDER BY "likeCount" DESC , "artiDateTime" DESC LIMIT 10')
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

    result[0] = fourRecommend;
    result[1] = hotArticle;
    result[2] = [memID];
    result[3] = checkAuthority;
    result[4] = imgs;
    result[5] = tag ; 
    
    return result;
}
module.exports = { getIndexData };