var express = require('express');
var router = express.Router();

const recommendList = require('../utility/recommend');

//接收GET請求
router.get('/', function (req, res, next) {
    recommendList.getRecommendList().then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.length > 0) {
            console.log(data);
            res.render('recommendList', { recom: data });  //將資料傳給顯示頁面
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })

});




module.exports = router;
