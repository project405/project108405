var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求
router.get('/:artiNum', function (req, res, next) {
    var artiNum = req.params.artiNum;   //取出參數
    var memID;
    //判斷是使用哪種方式登入
    if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }

    article.getOneActivity(artiNum, memID).then(data => {
        // 將字串替換成圖片
        if (data[0][0].artiCont.match("\\:imgLocation") != null) {
            for (var j = 0; j < data[2].length; j++) {
                data[0][0].artiCont = data[0][0].artiCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='" + data[2][j].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.1em; ' ></div>");
            }
        }

        for (var i = 0; i < data[1].length; i++) {
            if (data[1][i].artiMessCont.match("\\:imgLocation") != null) {
                for (var j = 0; j < data[3].length; j++) {
                    data[1][i].artiMessCont = data[1][i].artiMessCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='" + data[3][j].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.1em; ' ></div>");
                }
            }
        }

        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {

            res.render('activity', { items: data });
        }
    })
});

module.exports = router;