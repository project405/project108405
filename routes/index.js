var express = require('express');
var router = express.Router();
//增加引用函式
const article = require('./utility/article');
var moment = require('moment');

var mydata = []; //用來取得data 並回傳給index.ejs

//依照
function myfunction(hotArticle, i) {
    article.getHotArticle(hotArticle[i]).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.length > 0) {
            data[0].artiDateTime = moment(data[0].artiDateTime).format("YYYY-MM-DD HH:mm:ss");
            mydata.push(data); //將data資料存到mydata
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
}


//接收GET請求
router.get('/', function (req, res, next) {
    var articleLikeCount = [] //存放 articleLike表中裡面的 artiNum欄位
    var max = 0; // 尋找在articleLike表中 出現最多次的artiNum
    var times = 0; //作為判斷是否取得三篇文章的開關
    var hotArticle = [];  //存放前三名熱門文章

    article.getArticleNum().then(data => { //取得artiNum
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.length > 0) {
            //初始化陣列 
            for (let i = 0; i <= data.length; i++) {
                articleLikeCount[i] = 0;
            }
            //將取得的文章編號做計算 (articleLikeCount陣列維度代表第幾篇文章 裡面的值代表共有幾個讚)
            for (let i = 0; i < data.length; i++) {
                articleLikeCount[data[i].artiNum] += 1;
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
            // 撈前三篇文章的資訊
            for (let i = 0; i < 3; i++) {
                myfunction(hotArticle, i);
            }
            //解決非同步問題，迴圈執行完後再執行
            setTimeout(function () {
                res.render('index', { items: mydata });
                // console.log("RenData", mydata);
                mydata = []; //初始化
            }, 2000)
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});


module.exports = router;
