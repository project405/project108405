var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function (req, res, next) {
    var memID = req.session.memID;
    if (memID == null || memID == undefined) {
        res.render('login');
    } else {
        res.render('memberManage');
    }

});


module.exports = router;
