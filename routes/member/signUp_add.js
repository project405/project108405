var express = require('express');
var router = express.Router();
var crypto = require('crypto');

//增加引用函式
const signUp = require('../utility/signUp');
const secret = "project108405"
//接收POST請求
router.post('/', function (req, res, next) {
    res.write('<head><meta charset="utf-8"/></head>');
    var memID = req.body.memID;
    var memPass = req.body.memPass;
    var memCheckPass = req.body.memCheckPass;
    var memMail = req.body.memMail;
    var memName = req.body.memName;
    var memBirth = req.body.memBirth;
    var memGender = req.body.memGender;
    var checkID;  // 檢查資料庫是否有存在相同的ID
    var checkMail;
    var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

    signUp.checkMemID(memID).then(data => {
        checkID = data[0];

    }) 
    signUp.checkMail(memMail).then(data =>{
        checkMail = data[0];
    })

    setTimeout(function () {
        if (memID == "" || memPass == "" || memCheckPass == "" || memMail == "" || memName == "" ||memBirth == "") {
            res.end('<script> alert("輸入的資料不可為空，請重新輸入。"); history.back();</script>');
        } else if (memPass != memCheckPass) {
            res.end('<script> alert("密碼與確認密碼不同，請重新輸入。"); history.back();</script>');
        } else if (checkID) {
            res.end('<script> alert("帳號已有人使用，請重新輸入。"); history.back();</script>');
        } else if (memMail.search(emailRule) == -1) {
            res.end('<script> alert("非法的email，請重新輸入。"); history.back();</script>');
        } else if (checkMail) {
            res.end('<script> alert("此Email已經被註冊過囉！請重新輸入。"); history.back();</script>');
        } else {
            //密碼加密
            var hmac = crypto.createHmac("sha256",secret);
            var pwd = hmac.update(memPass);
            var cryptoPWD = pwd.digest("hex");
            // 建立一個新資料物件
            var newData = {
                memID: memID,
                memPass: cryptoPWD,
                memBirth: memBirth,
                memName: memName,
                memMail: memMail,
                memGender: memGender
            }
            
            signUp.createMember(newData).then(d => {
                if (d == 0) {
                    res.end('<script> alert("新增成功！恭喜你已經成為會員！");location.replace("/");</script>');
                } else {
                    res.end('<script> alert("新增失敗！請重新註冊！"); history.back(); </script>');     //顯示註冊失敗訊息
                }
            })
        }
    }, 2000)


});

module.exports = router;