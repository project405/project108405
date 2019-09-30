var express = require('express');
var router = express.Router();

const member = require('../utility/member');

router.post('/', function (req, res, next) {
    var memID;
    var reportData =[] ; 

    //判斷是使用哪種方式登入
    // if (req.session.memID == undefined && req.session.passport == undefined) {
    //     res.render('login');
    // } else 
    if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }

    console.log(req.body.artiMessNum);
    //判斷是哪一個檢舉
    if(req.body.artiNum != undefined){
        reportData["artiNum"] = req.body.artiNum;
    }else if (req.body.artiMessNum != undefined){
        reportData["artiMessNum"] = req.body.artiMessNum;
    }else if (req.body.recomMessNum != undefined){
        reportData["recomMessNum"] = req.body.recomMessNum;
    }

    //檢舉內容
    reportData["reportReason"] = req.body.reportReason;
  
    member.report(memID, reportData.artiNum, reportData.artiMessNum, reportData.recomMessNum, reportData.reportReason)
        .then(data => {
            console.log("data= ,",data);
            if (data == 1) {
                // res.write('<head><meta charset="utf-8"/></head>');
                res.send("舉報成功");
                // res.send('<script> alert("舉報成功！"); history.back();</script>');
            } else {
                res.render('error');
            }
        })
});

module.exports = router;
