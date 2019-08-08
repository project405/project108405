'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const member = require('./member');
var moment = require('moment');

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
    //熱門文章
    var mydata = [];
    var articleLikeCount = [] //存放 articleLike表中裡面的 artiNum欄位
    var max = 0; // 尋找在articleLike表中 出現最多次的artiNum
    var times = 0; //作為判斷是否取得三篇文章的開關
    var hotArticle = [];  //存放前三名熱門文章
    var artiLike = [];
    var checkAuthority;
    var artiNum = []; //記住每一維度對應的文章編號
    var imgs = [] ; 
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
    await sql('select "artiNum" from "articleLike" ORDER BY "artiLikeDateTime" ')
        .then((data) => {
            artiLike = data.rows;
            //初始化articleLikeCount，並將所有的文章編號紀錄至artiNum 
            for (let i = 0; i < artiLike.length; i++) {
                articleLikeCount[i] = 0;
                artiNum[i] = artiLike[i].artiNum;
            }
            //比對文章編號，計算愛心總數
            for (var i = 0; i < artiLike.length; i++) {
                var temp = artiLike[i].artiNum;  //比對文章編號
                for (var j = 0; j < artiLike.length; j++) {
                    if (artiLike[j].artiNum == temp) {
                        articleLikeCount[i] += 1;
                    }
                }
            }
            //將重複的文章編號取代掉
            for (var i = 0; i < artiLike.length; i++) {
                for (var j = i + 1; j < artiLike.length; j++) {
                    if (artiLike[i].artiNum == artiLike[j].artiNum) {
                        artiLike[j].artiNum = 0;
                        articleLikeCount[j] = -1;
                    }
                }
            }
            console.log(artiLike);
            console.log(articleLikeCount);

            //尋找前三名
            max = Math.max(...articleLikeCount);  //取得最大值
            console.log(max);
            while (times < 3) {
                for (var i = 0; i < articleLikeCount.length; i++) {
                    if (times == 3) break;
                    //如果是目前最大
                    if (articleLikeCount[i] == max) { 
                        //加入熱門文章
                        hotArticle[times] = artiLike[i].artiNum;
                        //代表找到一筆 
                        times += 1;
                    }
                }
                max -= 1;
            }
        }, (error) => {
            console.log("index.js出錯");
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
    // console.log(mydata) ;
    //取得第一張照片
    for (let i = 0; i < mydata.length; i++) {
        await sql('SELECT "imgName" FROM "image" WHERE "artiNum" = $1', [mydata[i].artiNum])
            .then((data) => {
                console.log("data.rows=", data.rows);
                if (data.rows != "") {
                    imgs[mydata[i].artiNum] = data.rows[0].imgName;
                }
            }, (error) => {
                imgs[mydata[i].artiNum] = null;
            });
    }
    result[0] = fourRecommend;
    result[1] = mydata;
    result[2] = [memID];
    result[3] = checkAuthority;
    result[4] = imgs ; 
    return result;
}
module.exports = { getIndexData };