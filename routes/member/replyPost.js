var express = require('express');
var router = express.Router();

const fs = require('fs');
const moment = require('moment');
const multer = require('multer');
const member = require('../utility/member');

var maxSize = 1024 * 1024; //設定最大上傳容量
var imgName; //紀錄檔案名稱(不含副檔名)
var imgType; //記錄檔案副檔名
var buf; //將檔案名稱做base64編碼
var isRender = true; //判斷頁面是否有回傳過

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/userImg/replyImg');
    },
    filename: function (req, file, cb) {
        imgName = file.originalname.substring(0, file.originalname.lastIndexOf("."));
        imgType = file.originalname.substring(file.originalname.lastIndexOf("."));
        buf = Buffer.from(imgName, 'ascii');
        buf = buf.toString('base64');
        //檔名非法字元\/:*?<>|"
        buf = buf.replace('\\', '');
        buf = buf.replace('/', '');
        buf = buf.replace(':', '');
        buf = buf.replace('*', '');
        buf = buf.replace('?', '');
        buf = buf.replace('<', '');
        buf = buf.replace('>', '');
        buf = buf.replace('|', '');
        buf = buf.replace('\"', '');
        buf += imgType;
        imgName = Date.now() + "--" + buf;
        //設定檔案名稱並儲存
        cb(null, imgName);
    }
})
var upload = multer({
    storage: storage
})


//post請求
router.post('/', upload.array('userImg', 20), function (req, res, next) {
    var memID = req.session.memID;
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
    
    var postDateTime = moment(Date().now).format("YYYY-MM-DD hh:mm:ss");
    var imgData = [];
    //將所有換行符號替代成<br> 
    replyCont = replyCont.replace(/\n/g, "<br>");

    for (var i in req.files) {
        imgData.push(req.files[i].filename);
    }
    // tag
    if (memID == undefined || memID == null) {
        if (req.body.userImg != 'undefined') {
            for (var i = 0; i < imgData.length; i++) {
                fs.unlinkSync('public/userImg/replyImg/' + imgData[i]); //刪除檔案
            }
        }
        res.send("請進行登入");
    } else {
        if (typeof (req.file) != 'undefined') {
            //如果檔案超過限制大小
            if (req.file.size > maxSize) {
                isRender = false;
                for (var i = 0; i < imgData.length; i++) {
                    fs.unlinkSync('public/userImg/replyImg/' + imgData[i]); //刪除檔案
                }
                res.send("圖片過大，僅接受1M以下的圖片");
            }
            //如果檔案類型不符合規定
            if ((imgType != '.png' && imgType != '.jpg' && imgType != '.jpeg' && imgType != '.jfif') && isRender) {
                isRender = false;
                for (var i = 0; i < imgData.length; i++) {
                    fs.unlinkSync('public/userImg/replyImg/' + imgData[i]); //刪除檔案
                }
                res.send("只能上傳.jpg , .png , .jpeg , .jfif 類型的檔案");
            }
        }
        if (isRender) {
            if (req.body.userImg == 'undefined') {
                for (var i = 0; i < imgData.length; i++) {
                    fs.unlinkSync('public/userImg/replyImg/' + imgData[i]); //刪除檔案
                }
            }
            if (editReply) {
                member.editReply(artiNum, memID, replyCont, postDateTime, imgData, analyzeScore, positiveWords, negativeWords, swearWords, req.body.artiMessNum, req.body.remainImg).then(data => {
                    if (data == 1) {
                        res.send("編輯留言成功");
                    } else {
                        for (var i = 0; i < imgData.length; i++) {
                            fs.unlinkSync('public/userImg/replyImg/' + imgData[i]); //刪除檔案
                        }
                        res.send("編輯留言失敗");
                    }
                })
            } else {
                member.replyPost(artiNum, memID, replyCont, postDateTime, imgData, analyzeScore, positiveWords, negativeWords, swearWords).then(data => {
                    if (data == 0) {
                        res.send("留言成功");
                    } else {
                        for (var i = 0; i < imgData.length; i++) {
                            fs.unlinkSync('public/userImg/replyImg/' + imgData[i]); //刪除檔案
                        }
                        res.send("留言失敗");
                    }
                })
            }
        } else {
            for (var i = 0; i < imgData.length; i++) {
                fs.unlinkSync('public/userImg/replyImg/' + imgData[i]); //刪除檔案
            }
            res.send("留言失敗");
        }
    }

});


module.exports = router;