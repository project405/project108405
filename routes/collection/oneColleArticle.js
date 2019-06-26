var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求 
router.get('/:artiNum', async function (req, res, next) {
    var artiNum = req.params.artiNum;   //取出參數
    var memID = req.session.memID;
    if (memID == undefined || memID == null) {
        res.render("logIn");
    } else {
        article.getOneArticle(artiNum, memID).then(data => {
            if (data == null) {
                res.render('error');  //導向錯誤頁面
            } else if (data == -1) {
                res.render('notFound');  //導向找不到頁面                
            } else {

                res.render('oneColleArticle', { items: data });
            }
        })
    }
});

module.exports = router;
