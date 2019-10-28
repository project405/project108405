var express = require('express');
var router = express.Router();

const fs = require('fs');
const moment = require('moment');
const multer = require('multer');
const member = require('../utility/member');

var isRender = true; //判斷頁面是否有回傳過

var upload = multer({
    storage: undefined
})
//post請求
router.post('/', upload.array('userImg', 100), function (req, res, next) {
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID == undefined && req.session.passport == undefined) {
        memID = undefined;
    } else if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }
    if (!memID) {
        res.send("請進行登入");
        return;
    }
    var replyCont = req.body.replyCont;
    var artiNum = req.body.artiNum
    var analyzeScore = req.body.analyzeScore;
    var positiveWords = req.body.positiveWords;
    var negativeWords = req.body.negativeWords;
    var swearWords = req.body.swearWords;
    var editReply = req.body.editReply;

    var postDateTime = moment(Date().now).format("YYYY-MM-DD HH:mm:ss");
    var imgData = [];
    //將所有換行符號替代成<br> 
    replyCont = replyCont.replace(/\n/g, "<br>");

    for (var i in req.files) {
        imgData.push(req.files[i].filename);
    }
    // tag
    if (memID == undefined || memID == null) {
        res.send("請進行登入");
    } else {
        if (isRender) {
            if (editReply) {
                member.editReply(artiNum, memID, replyCont, postDateTime, req.body.base64Index, analyzeScore, positiveWords, negativeWords, swearWords, req.body.artiMessNum, req.body.remainImg, req.body.score2).then(data => {
                    if (data == 1) {
                        res.send("編輯留言成功");
                    } else {
                        res.send("編輯留言失敗");
                    }
                })
            } else {
                member.replyPost(artiNum, memID, replyCont, postDateTime, req.body.base64Index, analyzeScore, positiveWords, negativeWords, swearWords, req.body.score2).then(data => {
                    if (data == 0) {
                        res.send("留言成功");
                    } else {
                        res.send("留言失敗");
                    }
                })
            }
        } else {
            res.send("留言失敗");
        }
    }

});


module.exports = router;