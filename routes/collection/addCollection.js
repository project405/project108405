var express = require('express');
var router = express.Router();

const collection = require('../utility/collection');
//接收GET請求

router.post('/', function (req, res, next) {
    var memID = req.session.memID;
    if (req.body.likeType == "recommend") {
        collection.addColleRecommend(memID, req.body.recomNum).then(data => {
            if (data == 1) {
                console.log("新增成功");
                res.send("新增成功摟!");
            } else {
                console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })
    } else {
        collection.addColleArticle(memID, req.body.artiNum).then(data => {
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