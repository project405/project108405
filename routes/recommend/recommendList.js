var express = require('express');
var router = express.Router();

const recommendList = require('../utility/recommend');

//接收GET請求
router.get('/', function (req, res, next) {
    var memID = req.session.memID ; 
    recommendList.getRecommendList(memID).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else {
            console.log(data);
            res.render('recommendList', { recom : data });
        }
    })

});



module.exports = router;
