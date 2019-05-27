var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function (req, res, next) {
    res.render('recommendList');  //導向找不到頁面
});



module.exports = router;
