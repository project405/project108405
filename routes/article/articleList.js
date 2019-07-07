var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求
router.get('/', function (req, res, next) {
    var memID = req.session.memID;
    article.getArticleList(memID).then(data => {
        // console.log(data[3][1].length);
        // console.log(data[0][0]);
        // console.log(data[0].length);
        // console.log(data[1][1]);
        // for (var i = 0; i < data[0].length; i++) {
        //     console.log(data[0][i].artiCont);
        // }

        console.log("data=",data);
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.length > 0) {
            // console.log(data);
            res.render('articleList', { items: data });  //將資料傳給顯示頁面
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});



module.exports = router;
