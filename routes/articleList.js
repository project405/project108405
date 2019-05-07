var express = require('express');
var router = express.Router();

const article = require('./utility/article');
//接收GET請求
router.get('/', function(req, res, next) {
  article.list().then(data => {
      if(data==null){
          res.render('error');  //導向錯誤頁面
      }else if(data.length > 0){
          res.render('articleList', {items:data});  //將資料傳給顯示頁面
      }else{
          res.render('notFound');  //導向找不到頁面
      }  
  })
});



module.exports = router;
