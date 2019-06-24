var express = require('express');
var router = express.Router();

const article = require('./utility/article');

router.post('/', function (req, res, next) {
    var memID = req.session.memID;
    if (req.body.likeType == "recommend") {
        member.addArticleLike(memID, req.body.recomNum).then(data => {
            if (data == 1) {
                // console.log("新增成功");
                res.send("新增成功摟!");
            } else {
                // console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })
    } else {
        article.getLikeCount(req.body.artiNum).then(data => {
            if (data != undefined || data != null ) {
                // console.log("查詢成功");
                // console.log(data[0][0].count);
                res.send(data[0][0].count);
            } else {
                // console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })

    }
});


module.exports = router;