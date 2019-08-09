var express = require('express');
var router = express.Router();
//增加引用函式
const article = require('./utility/article');
var moment = require('moment');

//接收GET請求
router.get('/', function (req, res, next) {
    article.getHotArticle().then(data => { //取得artiNum
        // console.log(data);
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.length > 0) {
            res.render('index', { items: data });
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});


module.exports = router;
