var express = require('express');
var router = express.Router();
//增加引用函式
const index = require('./utility/index');

//接收GET請求
router.get('/', function (req, res, next) {
    var memID = req.session.memID;
    index.getIndexData(memID).then(data => { //取得artiNum
        for (var i = 0; i < data[1].length; i++) {
            if (data[1][i].artiCont.match("\\:imgLocation") != null) {
                console.log("近來囉");
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
