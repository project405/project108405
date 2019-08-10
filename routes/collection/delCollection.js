var express = require('express');
var router = express.Router();

const collection = require('../utility/collection');
//接收GET請求

router.post('/', function (req, res, next) {
    var memID = req.session.memID;
    console.log(req.body) ;
    if (req.body.likeType == "recommend") {
        collection.delColleRecommend(memID, req.body.recomNum).then(data => {
            console.log("近來囉");
            if (data == 1) {
                res.send("刪除成功摟!");
            } else {
                res.send("新增失敗摟!");
            }
        })
    } else {
        collection.delColleArticle(memID, req.body.artiNum).then(data => {
            if (data == 1) {
                // console.log("刪除成功");
                res.send("刪除成功摟!");
            } else {
                // console.log("刪除失敗");
                res.send("新增失敗摟!");
            }
        })
    }
});


module.exports = router;