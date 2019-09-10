var express = require('express');
var router = express.Router();

const member = require('../utility/member');

router.post('/', function (req, res, next) {
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID == undefined && req.session.passport == undefined) {
        res.render('login');
    } else if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }
    
    var reportData = {
        "artiNum": req.body.artiNum,
        "artiMessNum": req.body.artiMessNum,
        "recomMessNum": req.body.recomMessNum,
        "reportReason": req.body.reportReason
    };

    member.report(memID, reportData.artiNum, reportData.artiMessNum, reportData.recomMessNum, reportData.reportReason)
        .then(data => {
            if (data == 1) {
                res.write('<head><meta charset="utf-8"/></head>');
                res.end('<script> alert("舉報成功！"); history.back();</script>');
            } else {
                res.render('error');
            }
        })
});

module.exports = router;
