var express = require('express');
var router = express.Router();

//增加引用函式
const login = require('../utility/login');
const member = require('../utility/member');

//接收POST請求
router.post('/', function (req, res, next) {
    var memID = req.body.memID;                 //取得帳號
    var memPass = req.body.memPass;     //取得密碼
    var lineID = req.body.lineID
    
    if (lineID) {   
        login.userBind(memID, memPass, lineID).then(d => {
            if (d == null) {
                req.session.memID = null;
                req.session.memPass = null;
                res.write('<head><meta charset="utf-8"/></head>');
                res.end('<script> alert("綁定失敗。"); </script>');

            } else {
                console.log('bind err')
                req.session.memID = d.memID;
                req.session.memPass = d.memPass;
                // member.checkAuthority(memID).then(data => {
                //     var mydata = [];
                //     mydata[0] = data;
                //     mydata[1] = memID;
                //     mydata[2] = lineID;
                //     console.log(mydata);
                //     // res.render('memberManage', { items: mydata });
                // })
                login.addLineID(memID, lineID).then(data => {
                    console.log('success')
                },error => {
                    console.log(error)
                })
                res.render('memberManage', { name: d.memID });   //導向使用者管理頁面
            }
        })
    } else {
        login.userLogin(memID, memPass).then(d => {
            if (d == null) {
                req.session.memID = null;
                req.session.memPass = null;
                res.write('<head><meta charset="utf-8"/></head>');
                res.end('<script> alert("登入失敗，尚未註冊帳號。"); </script>');
    
            } else {
                req.session.memID = d.memID;
                req.session.memPass = d.memPass;
                member.checkAuthority(memID).then(data => {
                    var mydata = [];
                    mydata[0] = data;
                    mydata[1] = memID;
                    console.log(mydata);
                    // res.render('memberManage', { items: mydata });
                })
                res.render('memberManage', { name: d.memID });   //導向使用者管理頁面
            }
        })
    }
});

module.exports = router;