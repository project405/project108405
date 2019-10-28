var express = require('express');
var router = express.Router();

const fs = require('fs');
const moment = require('moment');
const multer = require('multer');
const member = require('../utility/member');

//post
var isRender = true; //判斷頁面是否有回傳過

var upload = multer({
    storage: undefined
})

//post請求
router.post('/', upload.array('userImg', 100), function (req, res, next) {
  var memID;
  var recomHead = req.body.recomHead;
  var recomCont = req.body.recomCont;
  var recomClass = req.body.recomClass;
  var analyzeScore = req.body.analyzeScore;
  var positiveWords = req.body.positiveWords;
  var negativeWords = req.body.negativeWords;
  var recomNum = req.body.recomNum

  var postDateTime = moment(Date().now).format("YYYY-MM-DD HH:mm:ss");
  var tagData = [];
  var imgData = [];
  //將所有換行符號替代成<br> 
  recomCont = recomCont.replace(/\n/g, "<br>");

  //判斷是使用哪種方式登入
  if (req.session.memID == undefined && req.session.passport == undefined) {
      memID = undefined;
  } else if (req.session.memID != undefined && req.session.passport == undefined) {
      memID = req.session.memID;
  } else if (req.session.memID == undefined && req.session.passport != undefined) {
      memID = req.session.passport.user.id;
  }

  // tag
  if (req.body.tag != '') {
      tagData = req.body.tag.split(",");
  }
  if (memID == undefined) {
      res.send("請進行登入");
  } else {
      if (isRender) {
          if (recomHead == 'undefined' || recomCont == '') {
              res.send("標題及內容不可為空，請重新輸入");
          } else {
              if (recomNum) {
                member.editRecommend(memID, recomHead, recomCont, recomClass, req.body.base64Index, tagData, analyzeScore, positiveWords, negativeWords, recomNum, postDateTime, req.body.remainImg, req.body.score2).then(data => {
                    if (data == 1) {
                        res.send("編輯成功");
                    } else {
                        res.send("編輯失敗");
                    }
                })
              } else {
                  member.recommendPost(memID, recomHead, recomCont, recomClass, postDateTime, req.body.base64Index, tagData, analyzeScore, positiveWords, negativeWords, req.body.score2).then(data => {
                      if (data == 0) {
                          res.send("發文成功");
                      } else {
                          res.send("發文失敗");
                      }
                  })
              }
          }
      } else {
          res.send("發文失敗");
      }
  }

});


module.exports = router;