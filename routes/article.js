var express = require('express');
var router = express.Router();

const article = require('./utility/article');
var moment = require('moment');
//接收GET請求
router.get('/:artiNum', function(req, res, next) {
    var artiNum = req.params.artiNum;   //取出參數

    article.getOneArticle(artiNum).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            // for(let i = 0 ; i < data.length ; i++){
            //     data[i].artiDateTime=moment(data[i].artiDateTime).format("YYYY-MM-DD HH:mm:ss") ;
            // }
            console.log(artiNum);
            res.render('article', {items:data});  //將資料傳給顯示頁面
        }  
    })
});


module.exports = router;