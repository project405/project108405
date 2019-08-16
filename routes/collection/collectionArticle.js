'use strict';

var express = require('express');
var router = express.Router();

const collection = require('../utility/collection');
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.memID == null || req.session.memID == undefined) {
    res.render('logIn');
  } else {
    collection.getCollArticle(req.session.memID).then(data => {
      console.log(data);
      for (var i = 0; i < data[0].length; i++) {
        if (data[0][i].artiCont.match("\\:imgLocation") != null) {
          console.log("近來囉");
          data[0][i].artiCont = data[0][i].artiCont.replace(/\\:imgLocation/g, "");
        }
      }
      if (data == null) {
        res.render('error');  //導向錯誤頁面
      } else if (data == -1) {
        res.render('notFound');  //導向找不到頁面                
      } else {
        // console.log(data);
        res.render('collectionArticle', { collData: data });
      }
    })

  }
});

module.exports = router;
