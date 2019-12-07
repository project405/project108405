var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求
router.get('/', function (req, res, next) {
    res.render('activityList');  //將資料傳給顯示頁面
});

module.exports = router;