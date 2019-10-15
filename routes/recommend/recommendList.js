var express = require('express');
var router = express.Router();

const recommendList = require('../utility/recommend');

//接收GET請求
router.get('/', function (req, res, next) {
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }
    
    recommendList.getRecommendList(memID).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else {
            res.render('recommendList', { recom : data });
        }
    })

});



module.exports = router;
