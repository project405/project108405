var express = require('express');
var router = express.Router();

const member = require('../utility/member');
const recommend = require('../utility/recommend');

router.post('/', function (req, res, next) {
    var memID = req.session.memID;
    if (req.body.likeType == "recommend") {
        recommend.delRecommendLike(memID, req.body.recomNum).then(data => {
            if (data == 1) {
                // console.log("刪除成功");
                res.send("刪除推薦愛心成功摟!");
            } else {
                // console.log("刪除失敗");
                res.send("刪除推薦愛心失敗摟!");
            }
        })
    } else if (req.body.likeType == "article") {
        member.delArticleLike(memID, req.body.artiNum).then(data => {
            if (data == 1) {
                // console.log("刪除成功");
                res.send("刪除文章愛心成功摟!");
            } else {
                // console.log("刪除失敗");
                res.send("刪除文章愛心失敗摟!");
            }
        })
    } else if (req.body.likeType == "articleMess") {
        var mydata = { "artiMessNum": req.body.artiMessNum, "artiNum": req.body.artiNum };
        member.delArticleMessLike(memID, req.body.artiMessNum).then(data => {
            if (data == 1) {
                // console.log("刪除成功");
                res.send(mydata);
            } else {
                // console.log("刪除失敗");
                res.send("刪除文章留言愛心失敗摟!");
            }
        })
    } else if (req.body.likeType == "recommendMess") {
        var mydata = { "recomMessNum": req.body.recomMessNum, "recomNum": req.body.recomNum };
        member.delRecommendMessLike(memID, req.body.recomMessNum).then(data => {
            if (data == 1) {
                // console.log("刪除成功");
                res.send(mydata);
            } else {
                // console.log("刪除失敗");
                res.send("刪除文章留言愛心失敗摟!");
            }
        })
    }
});


module.exports = router;