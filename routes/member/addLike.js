var express = require('express');
var router = express.Router();

const member = require('../utility/member');
const recommend = require('../utility/recommend');

router.post('/', function (req, res, next) {
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID == undefined && req.session.passport == undefined) {
        res.redirect("/login");
    } else if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }


    if (req.body.deleteRecommendReply) {
        if (memID == req.body.memID) {
            console.log('compare completed')
            member.deleteRecommendReply(req.body.recomMessNum).then((data) => {
                if (data == 1) {
                    console.log('second刪除成功')
                    res.send('刪除成功')
                } else {
                    console.log('second刪除失敗')
                    res.send('刪除失敗')
                }
            })
        }
    }
    if (req.body.deleteReply) {
        if (memID == req.body.memID) {
            console.log('compare completed')
            member.deleteReply(req.body.artiMessNum).then((data) => {
                if (data == 1) {
                    console.log('second刪除成功')
                    res.send('刪除成功')
                } else {
                    console.log('second刪除失敗')
                    res.send('刪除失敗')
                }
            })
        }
    }
    if (req.body.delArticle) {
        if (memID == req.body.memID) {
            member.deleteArticle(req.body.artiNum).then((data) => {
                if (data == 1) {
                    res.send('刪除成功')
                } else {
                    res.send('刪除失敗')
                }
            })
        }
    }
    //推薦愛心
    if (req.body.likeType == "recommend") {
        recommend.addRecommendLike(memID, req.body.recomNum).then(data => {
            if (data == 1) {
                console.log("新增成功");
                res.send("新增成功摟!");
            } else {
                console.log("新增失敗");
                res.send("新增失敗摟!");
            }
        })
    //文章愛心
    } else if (req.body.likeType == "article") {
        member.addArticleLike(memID, req.body.artiNum).then(data => {
            if (data == 1) {
                console.log("新增文章愛心成功");
                res.send("新增成功摟!");
            } else {
                console.log("新增文章愛心失敗");
                res.send("新增失敗摟!");
            }
        })

    } else if (req.body.likeType == "articleMess") {
        var mydata = { "artiMessNum": req.body.artiMessNum, "artiNum": req.body.artiNum };
        member.addArticleMessLike(memID, req.body.artiMessNum).then(data => {
            if (data == 1) {
                console.log("新增留言愛心成功");
                res.send(mydata);
            } else {
                console.log("新增文章愛心失敗");
                res.send("新增失敗摟!");
            }
        })

    } else if (req.body.likeType == "recommendMess") {
        var mydata = { "recomMessNum": req.body.recomMessNum, "recomNum": req.body.recomNum };
        member.addRecommendMessLike(memID, req.body.recomMessNum).then(data => {
            if (data == 1) {
                console.log("新增留言愛心成功");
                res.send(mydata);
            } else {
                console.log("新增文章愛心失敗");
                res.send("新增失敗摟!");
            }
        })
    }
});


module.exports = router;