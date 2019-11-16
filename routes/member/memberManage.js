var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const secret = "project108405"

const member = require('../utility/member');
const signUp = require('../utility/signUp');
const moment = require('moment');

//接收GET請求
router.get('/', function (req, res, next) {
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID == undefined && req.session.passport == undefined) {
        res.render('login');
    } else if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }

    member.getMemberInfor(memID).then(data => {
        data[0].memBirth = moment(data[0].memBirth).format("YYYY-MM-DD");
        res.render('memberManage', { items: data });
    })

});

router.post('/', function (req, res, next) {
    res.write('<head><meta charset="utf-8"/></head>');
    var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    var checkMail;
    var originalMail;//目前使用者原本的Mail
    var memID;

    //判斷是使用哪種方式登入
     if (req.session.memID == undefined && req.session.passport == undefined) {
        res.render('login');
    } else if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }

    var memberData = {
        "memID": memID,
        "memPass": req.body.memPass,
        "memCheckPass": req.body.memCheckPass,
        "memMail": req.body.memMail,
        "memBirth": req.body.memBirth,
        "memAddr": req.body.memAddr,
        "memGender": req.body.memGender
    };

    member.getRepeatMail(memID,memberData.memMail).then(data => {
        originalMail = data[0];
    })

    setTimeout(function () {
        if (memberData.memPass == "" || memberData.memCheckPass == "" || memberData.memMail == "" || memberData.memBirth == "" || memberData.memGender == "") {
            res.end('<script> alert("輸入的資料不可為空"); history.back();</script>');
        } else if (memberData.memPass != memberData.memCheckPass) {
            res.end('<script> alert("輸入的密碼與確認密不正確，請重新輸入"); history.back();</script>');
        } else if (memberData.memMail.search(emailRule) == -1) {
            res.end('<script> alert("非法的email，請重新輸入。"); history.back();</script>');
        } else if (originalMail) {
            res.end('<script> alert("此Email已經被註冊過囉！請重新輸入。"); history.back();</script>');
        } else {
            //密碼加密
            var hmac = crypto.createHmac("sha256",secret);
            var pwd = hmac.update(memberData.memPass);
            var cryptoPWD = pwd.digest("hex");

            member.modifyMember(cryptoPWD, memberData.memBirth, memberData.memMail, memberData.memGender, memberData.memAddr, memberData.memID).
                then(data => {
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
