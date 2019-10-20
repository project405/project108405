var express = require('express');
var router = express.Router();

//增加引用函式
const login = require('../utility/login');
const member = require('../utility/member');

//接收POST請求
router.post('/', function (req, res, next) {
    var memID = req.body.memID;         //取得帳號
    var memPass = req.body.memPass;     //取得密碼

    login.userLogin(memID, memPass).then(d => {
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
});

module.exports = router;