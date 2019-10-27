var express = require('express');
var router = express.Router();

const member = require('../utility/member');
//接收GET請求
router.get('/:artiPage', function (req, res, next) {
    var artiPage = req.params.artiPage;   //取出參數
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID == undefined && req.session.passport == undefined) {
        res.render('login');
    } else if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }

    member.getMyArticleClassList('book', memID, artiPage).then(data => {

        //將照片字串取代為空
        for (var i = 0; i < data[0].length; i++) {
            if (data[0][i].artiCont.match("\\:imgLocation") != null) {
                data[0][i].artiCont = data[0][i].artiCont.replace(/\\:imgLocation/g, " ");
            }
        }

        if (data == null) {
            res.render('error');
        } else if (data.length > 0) {
            res.render('myArtiClassManage', { myArtiClass: data });
        } else {
            res.render('notFound');
        }

    })

});


module.exports = router;
