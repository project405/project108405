var express = require('express');
var router = express.Router();

const member = require('../utility/member');
//接收GET請求
router.get('/', function (req, res, next) {
    var memID = req.session.memID;
    // console.log(memID);
    if (memID == null || memID == undefined) {
        res.render('login');
    } else {
        member.myBookArticle(memID).then(data => {
            console.log(data);
            if (data == null) {
                res.render('error');
            } else if (data.length > 0) {
                res.render('myArtiClassManage', { myArtiClass: data });
            } else {
                res.render('notFound');
            }

        })

    }

});


module.exports = router;
