var express = require('express');
var router = express.Router();

const member = require('../utility/member');

router.post('/', function (req, res, next) {
    var memID = req.session.memID;

    if (req.body.likeType == "recommend") {
        member.addArticleLike(memID, req.body.recomNum).then(data => {
            if (data == 1) {
                console.log("新增成功");
                res.send("新增成功摟!");
                // res.end('<script>document.getElementById("test").style.color = "red"; history.back()</script>');
            } else {
                console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })
    } else {
        member.addArticleLike(memID, req.body.artiNum).then(data => {
            if (data == 1) {
                console.log("新增成功");
                res.send("新增成功摟!");
                // res.end('<script>document.getElementById("test").style.color = "red"; history.back()</script>');
            } else {
                console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })

    }
});


module.exports = router;