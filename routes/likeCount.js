var express = require('express');
var router = express.Router();

const article = require('./utility/article');

router.post('/', function (req, res, next) {
    var memID = req.session.memID;
    if (req.body.likeType == "recommend") {
        article.getRecomLikeCount(req.body.recomNum).then(data => {
            if (data != undefined || data != null) {
                // console.log("新增成功");
                res.send(data[0][0].count);
            } else {
                // console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })
    } else if (req.body.likeType == "article") {
        article.getArtiLikeCount(req.body.artiNum).then(data => {
            if (data != undefined || data != null) {
                // console.log("查詢成功");
                // console.log(data[0][0].count);
                res.send(data[0][0].count);
            } else {
                // console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })

    } else if (req.body.likeType == "articleMess") {
        article.getArtiMessLikeCount(req.body.artiMessNum).then(data => {
            if (data != undefined || data != null) {
                // console.log(data[0][0].count);
                var mydata = { "artiMessNum": req.body.artiMessNum, "artiNum": req.body.artiNum, "data": data[0][0].count };
                res.send(mydata);
            } else {
                // console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })
    } else if (req.body.likeType == "recommendMess") {
        article.getRecomMessLikeCount(req.body.recomMessNum).then(data => {
            if (data != undefined || data != null) {
                // console.log(data[0][0].count);
                var mydata = { "recomMessNum": req.body.recomMessNum, "recomNum": req.body.recomNum, "data": data[0][0].count };
                res.send(mydata);
            } else {
                // console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })
    }
});


module.exports = router;