var express = require('express');
var router = express.Router();

const recommend = require('../utility/recommend');
//接收GET請求
router.get('/', function (req, res, next) {
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }
    
    recommend.getRecomClassList('音樂', memID).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            res.render('recomClass', { recom: data });  //將資料傳給顯示頁面
        }
    })

});


module.exports = router;