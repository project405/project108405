'use strict';

var express = require('express');
var router = express.Router();

const collection = require('../utility/collection');

/* GET home page. */
router.get('/', function (req, res, next) { 
    //如果未登入  
    if (req.session.memID == null || req.session.memID == undefined) {
      res.render('login');
    } else {
      //取得推薦文章
      collection.getCollRecommend(req.session.memID).then(data => {
        if (data == null) {
          res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
          res.render('notFound');  //導向找不到頁面                
        } else {
          // console.log(data);
          res.render('collectionRecommend', { collData: data });
        }
      })

    }
});

module.exports = router;
