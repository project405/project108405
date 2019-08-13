var express = require('express');
var router = express.Router();

const collection = require('../utility/collection');
//接收GET請求
router.get('/', function (req, res, next) {
    var memID = req.session.memID;
    if (req.session.memID == null || req.session.memID == undefined) {
        res.render('logIn');
    } else {
        collection.getCollArtiClassList(memID,'book').then(data => {
            if (data == null) {
                res.render('error');  //導向錯誤頁面
            } else if (data == -1) {
                res.render('notFound');  //導向找不到頁面                
            } else {
                res.render('colleArtiClass', { items: data });  //將資料傳給顯示頁面
            }
        })
    }
});


module.exports = router;