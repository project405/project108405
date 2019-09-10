var express = require('express');
var router = express.Router();
//增加引用函式
const index = require('./utility/index');

//接收GET請求
router.get('/', function (req, res, next) {
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }
    
    index.getIndexData(memID).then(data => { 
        // 取代圖片文字為空字串
        for (var i = 0; i < data[1].length; i++) {
            if (data[1][i].artiCont.match("\\:imgLocation") != null) {
                data[1][i].artiCont = data[1][i].artiCont.replace(/\\:imgLocation/g, "");
            }
        }
        
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.length > 0) {
            res.render('index', { items: data });
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});


module.exports = router;
