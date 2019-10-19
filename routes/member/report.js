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

    if(req.body.reportReason == "" || req.body.reportReason.trim() == ""){
        if(req.body.artiNum != undefined || req.body.artiMessNum != undefined || req.body.recomMessNum != undefined){
            res.send("內容不可為空！");
        }else{
            res.send('<head><meta charset="utf-8"/> </head> <script> alert("內容不可為空！");  window.history.back();</script>');
        }
      
    }
    member.report(memID, reportData.artiNum, reportData.artiMessNum, reportData.recomMessNum, reportData.reportReason)
        .then(data => {
            if (data == 1) {
                if(req.body.artiNum != undefined || req.body.artiMessNum != undefined || req.body.recomMessNum != undefined){
                    res.send("舉報成功");
                }else{
                    // res.write('<head><meta charset="utf-8"/></head>');
                    res.send('<head><meta charset="utf-8"/> </head> <script> alert("舉報成功!");  window.history.back();</script>');
                }
            } else {
                res.render('error');
            }
        })
});

module.exports = router;
