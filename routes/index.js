var express = require('express');
var router = express.Router();
//增加引用函式
const product = require('./utility/article');

//接收GET請求
router.get('/', function(req, res, next) {
    product.list().then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            res.render('index', {items:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

module.exports = router;
module.exports = router;
