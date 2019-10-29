var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const moment = require('moment');
const member = require('../utility/member');

//post請求
router.post('/',urlencodedParser, function(req, res, next) {
    var memID;
    var artiHead = req.body.artiHead;
    var artiCont = req.body.artiCont;
    var artiClass = req.body.artiClass;
    var analyzeScore = req.body.analyzeScore;
    var positiveWords = req.body.positiveWords;
    var negativeWords = req.body.negativeWords;
    var swearWords = req.body.swearWords;
    var artiNum = req.body.artiNum;

    var postDateTime = moment(Date().now).format("YYYY-MM-DD HH:mm:ss");
    var tagData = [];
    //將所有換行符號替代成<br> 
    artiCont = artiCont.replace(/\n/g, "<br>");

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
            if (artiHead == 'undefined' || artiCont == '') {
                res.send("標題及內容不可為空，請重新輸入");
            } else {
                if (artiNum) {
                    member.editArticle(memID, artiHead, artiCont, artiClass, req.body.toImgur, tagData, analyzeScore, positiveWords, negativeWords, swearWords, artiNum, postDateTime, req.body.remainImg).then(data => {
                        if (data == 1) {
                            res.send("編輯成功");
                        } else {
                            res.send("編輯失敗");
                        }
                    })
                } else {
                    member.articlePost(memID, artiHead, artiCont, artiClass, postDateTime, req.body.toImgur, tagData, analyzeScore, positiveWords, negativeWords, swearWords).then(data => {
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