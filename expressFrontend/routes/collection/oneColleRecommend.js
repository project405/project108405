var express = require('express');
var router = express.Router();

const collection = require('../utility/collection');

//接收GET請求 
router.get('/:recomNum', async function (req, res, next) {
    var recomNum = req.params.recomNum;   //取出參數
    var memID = req.session.memID ; 
    collection.getOneColleRecommend(recomNum).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            console.log(data);
            res.render('oneColleRecommend', { items: data });
        }
    })
});

module.exports = router;
