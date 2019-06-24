var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求 
router.get('/:artiNum', async function (req, res, next) {
    var artiNum = req.params.artiNum;   //取出參數
    var memID = req.session.memID;
    article.getOneArticle(artiNum,memID).then(data => {
        // 測試data
        for(let i = 0 ; i<data.length ; i++){
            for (let j = 0 ; j < data[i].length; j++){
                console.log("data[" , i ,"][",j,"]=" ,data[i][j]);
            }
        }
        
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            res.render('article', { items: data });
        }
    })

});

module.exports = router;
