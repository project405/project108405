var express = require('express');
var router = express.Router();

const article = require('./utility/article');
var moment = require('moment');
//接收GET請求 
router.get('/:artiNum', async function (req, res, next) {
    var artiNum = req.params.artiNum;   //取出參數
    mydata = []; //用來存放 撈article , articleMessage 的data 

    //取得文章列表中 其中的一篇文章(dict型態) 
    article.getOneArticle(artiNum).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            // 使用 moment 解析時間
            data.artiDateTime = moment(data.artiDateTime).format("YYYY-MM-DD HH:mm:ss");
            mydata[0] = data; //把 article 撈到的資料 存到mydata 裡面
            // -----  call getArticleMessage() 取得文章留言資料(list型態) -----
            article.getArticleMessage(artiNum).then(data => {
                // 使用 moment 解析時間
                for (let i = 0; i < data.length; i++) {
                    data[i].artiMessDateTime = moment(data[i].artiMessDateTime).format("YYYY-MM-DD HH:mm:ss");
                }
                mydata[1] = data; //把 articleMessage 撈到的資料 存到mydata 裡面

                if (data == null) {
                    res.render('error');  //導向錯誤頁面
                } else {
                    // console.log(mydata[1][0]);
                    res.render('article', { items: mydata });  // mydata[]丟給items 
                }
            })
            //--------------------------------------------------------------------
        }
    })




});


module.exports = router;