var express = require('express');
var router = express.Router();
//增加引用函式
const article = require('./utility/articleLike');
var moment = require('moment');

//點選文章愛心功能
router.post('/', function (req, res) {
    //ejs使用者按愛心 要怎連接過來
    // article.ejs 會傳會員id 及 文章編號id給我
    // var artiNum = req.params.artiNum;
    //搜尋 會員ID和文章編號ID 是不是有在 articleLike >  0
    // true offArtiLike  收回愛心
    //  false onArtiLike 新增愛心
});
