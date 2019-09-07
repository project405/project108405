var express = require('express');
var router = express.Router();

const member = require('../utility/member');

router.post('/', function (req, res, next) {
    var memID = req.session.memID;
    if (memID == undefined || memID == null) {
        res.render('login');
    } else {
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
                }else{
                    res.render('error');
                }
            })
    }
});

module.exports = router;
