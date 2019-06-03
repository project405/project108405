'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');

//=========================================
//---------  getIndexData() -----------
//=========================================
var getIndexData = async function () {
    var weekRecommend = [];
    var fourRecommend = [] ;
    var movie = true ; 
    var book = true ; 
    var music = true ;
    var exhibition = true ; 
    //熱門文章
    var mydata = [];
    var articleLikeCount = [] //存放 articleLike表中裡面的 artiNum欄位
    var max = 0; // 尋找在articleLike表中 出現最多次的artiNum
    var times = 0; //作為判斷是否取得三篇文章的開關
    var hotArticle = [];  //存放前三名熱門文章
    var artiLike = [];
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
        });
    for (var i = 0; i < weekRecommend.length; i++) {
        if (weekRecommend[i].recomClass == '電影' && movie){
            fourRecommend.push(weekRecommend[i]);
            movie = false ; 
        }else if(weekRecommend[i].recomClass == '音樂' && music){
            fourRecommend.push(weekRecommend[i]);
            music = false ;
        }else if(weekRecommend[i].recomClass == '書籍' && book){
            fourRecommend.push(weekRecommend[i]);
            book = false ;
        }else if(weekRecommend[i].recomClass == '展覽' && exhibition){
            fourRecommend.push(weekRecommend[i]);
            exhibition = false ;
        }
    }
    // -----------  熱門文章 --------------
    await sql('select "articleLike"."artiNum" from "articleLike"')
        .then((data) => {
            artiLike = data.rows;
            //初始化陣列 
            for (let i = 0; i <= artiLike.length; i++) {
                articleLikeCount[i] = 0;
            }
            //將取得的文章編號做計算 (articleLikeCount陣列維度代表第幾篇文章 裡面的值代表共有幾個讚)
            for (let i = 0; i < artiLike.length; i++) {
                articleLikeCount[artiLike[i].artiNum] += 1;
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
            artiLike = null;
        });
    // 撈前三篇文章的資訊
    for (let i = 0; i < 3; i++) {
        await sql('select * from "article" where "artiNum" = $1 ', [hotArticle[i]])
            .then((data) => {
                data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD HH:mm:ss");
                mydata[i] = data.rows[0];
            }, (error) => {
                mydata = null;
            });
    }
    result[0] = fourRecommend;
    result[1] = mydata;
    console.log("1",result[1]);
    return result;
}
module.exports = { getIndexData };