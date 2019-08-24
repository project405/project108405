var express = require('express');
var router = express.Router();

const member = require('../utility/member');
//接收GET請求
router.get('/', function (req, res, next) {
    var memID = req.session.memID;

    if (memID == null || memID == undefined) {
        res.render('login');
    } else {
        member.myArticle(memID).then(data => {
            for (var i = 0; i < data[0].length; i++) {
                if (data[0][i].artiCont.match("\\:imgLocation") != null) {
                    console.log("近來囉");
                    data[0][i].artiCont = data[0][i].artiCont.replace(/\\:imgLocation/g, "");
                }
            }
            if (data == null) {
                res.render('error');
            } else if (data.length > 0) {
                res.render('articleManage', { myArticle: data });
            } else {
                res.render('notFound');
            }

        })

    }

});


module.exports = router;
