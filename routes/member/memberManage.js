var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function (req, res, next) {
    if (req.session.memID == null || req.session.memID == undefined) {
        res.render('login');
    } else {
        res.render('memberManage');
    }

});


module.exports = router;
