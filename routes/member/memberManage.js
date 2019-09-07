var express = require('express');
var router = express.Router();

const member = require('../utility/member');
const signUp = require('../utility/signUp');

//接收GET請求
router.get('/', function (req, res, next) {
    var memID = req.session.memID;
    if (memID == null || memID == undefined) {
        res.render('login');
    } else {
        member.checkAuthority(memID).then(data => {
            var mydata = [] ;
            mydata[0] = data ; 
            mydata[1] = memID ; 
            console.log(mydata);
            res.render('memberManage',{items:mydata});
        })
    }

});

router.post('/', function (req, res, next) {
    res.write('<head><meta charset="utf-8"/></head>');
    var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    var checkMail;
    var originalMail;//目前使用者原本的Mail
    var memID = req.session.memID;
    var memberData = {
        "memID": memID,
        "memPass": req.body.memPass,
        "memCheckPass": req.body.memCheckPass,
        "memMail": req.body.memMail,
        "memBirth": req.body.memBirth,
        "memAddr": req.body.memAddr,
        "memGender": req.body.memGender
    };
    signUp.checkMail(memberData.memMail).then(data => {
        checkMail = data[0];
        // console.log("checkMail=", checkMail);
    })
    member.getOriginalMail(memID).then(data => {
        originalMail = data[0].memMail;
        // console.log("origin=",originalMail);

    })

    console.log(memberData);
    setTimeout(function () {
        if (memberData.memPass == "" || memberData.memCheckPass == "" || memberData.memMail == "" || memberData.memBirth == "" || memberData.memGender == "") {
            res.end('<script> alert("輸入的資料不可為空"); history.back();</script>');
        } else if (memberData.memPass != memberData.memCheckPass) {
            res.end('<script> alert("輸入的密碼與確認密碼不正確，請重新輸入"); history.back();</script>');
        } else if (memberData.memMail.search(emailRule) == -1) {
            res.end('<script> alert("非法的email，請重新輸入。"); history.back();</script>');
        } else if (checkMail && originalMail != memberData.memMail) {
            res.end('<script> alert("此Email已經被註冊過囉！請重新輸入。"); history.back();</script>');
        } else {
            member.modifyMember(memberData.memPass, memberData.memBirth, memberData.memMail, memberData.memGender, memberData.memAddr, memberData.memID).
                then(data => {
                    console.log(data);
                    if (data == 1) {
                        res.end('<script> alert("修改成功！");location.replace("/");</script>');
                    } else {
                        res.end('<script> alert("修改失敗！請重新輸入！"); history.back(); </script>');
                    }
                });
        }
    }, 2000)
});

module.exports = router;
