var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求
router.get('/', function (req, res, next) {
    var artiListNum = req.params.artiListNum;   //取出參數
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }

    
    res.render('activity');  //將資料傳給顯示頁面

});

module.exports = router;