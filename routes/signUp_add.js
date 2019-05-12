var express = require('express');
var router = express.Router();

//增加引用函式
const signUp = require('./utility/signUp');

//接收POST請求
router.post('/', function (req, res, next) {
    res.write('<head><meta charset="utf-8"/></head>');
    var memID = req.body.memID;
    console.log("memID = ", memID);
    var memPass = req.body.memPass;
    var memCheckPass = req.body.memCheckPass;
    var memMail = req.body.memMail;
    var memBirth = req.body.memBirth;
    var memGender = req.body.memGender;
    var checkID ;  // 檢查資料庫是否有存在相同的ID
    signUp.checkMemID(memID).then(data => {
        checkID = data[0];
    })
    setTimeout(function () {
        if (memPass != memCheckPass) {
            res.end('<script> alert("密碼與確認密碼不同，請重新輸入。"); history.back();</script>');
        } else if (checkID) {
            res.end('<script> alert("帳號已有人使用。"); history.back();</script>');
        } else {
            // 建立一個新資料物件
            var newData = {
                memID: memID,
                memGender: memGender,
                memPass: memPass,
                // memMail:memMail,
                memBirth:memBirth
            }
            console.log(newData);
            signUp.createMember(newData).then(d => {
                if (d == 0) {
                    res.write('<script> alert("新增成功！恭喜你已經成為會員！"); history.back();</script>');
                } else {
                    res.end('<script> alert("新增失敗！請重新註冊！"); history.back(); </script>');     //顯示註冊失敗訊息
                }
            })
        }
    }, 2000)


});

module.exports = router;