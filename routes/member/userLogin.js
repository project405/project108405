var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const secret = "project108405"
const login = require('../utility/login');

//接收POST請求
router.post('/', function (req, res, next) {
    var memID = req.body.memID;         //取得帳號
    var memPass = req.body.memPass;     //取得密碼
    var lineID = req.body.lineID
    
    //密碼加密
    var hmac = crypto.createHmac("sha256",secret);
    var pwd = hmac.update(memPass);
    var cryptoPWD = pwd.digest("hex");

    if (lineID) {   
        login.userBind(memID, cryptoPWD, lineID).then(d => {
            if (d == null) {
                req.session.memID = null;
                req.session.memPass = null;
                res.write('<head><meta charset="utf-8"/></head>');
                res.end('<script> alert("綁定失敗。"); </script>');

            } else {
                req.session.memID = d.memID;
                req.session.memPass = d.memPass;
                login.addLineID(memID, lineID).then(data => {
                    console.log('success')
                },error => {
                    console.log(error)
                })
                res.redirect('/');   //導向使用者管理頁面
            }
        })
    } else {
        login.userLogin(memID, cryptoPWD).then(d => {
            if (d == null) {
                req.session.memID = null;
                req.session.memPass = null;
                res.write('<head><meta charset="utf-8"/></head>');
                res.end('<script> alert("登入失敗，尚未註冊帳號。"); history.back();</script>');

            } else {
                req.session.memID = d.memID;
                req.session.memPass = d.memPass;
                res.redirect('/');
            }
        })
    }
});

module.exports = router;