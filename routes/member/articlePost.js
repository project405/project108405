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
        cb(null, 'public/userImg');
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
        imgName = moment(Date.now()).format("YYYY-MM-DD_hh-mm-ss") + "--" + buf;
        //設定檔案名稱並儲存
        cb(null, imgName);
    }
})
var upload = multer({
    storage: storage
})


//post請求
router.post('/', upload.single('userImg'), function (req, res, next) {
    var memID = req.session.memID;
    var artiHead = req.body.artiHead;
    var artiCont = req.body.artiCont;
    var artiClass = req.body.artiClass;
    var postDateTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    var picture = imgName;
    // console.log("typeof", typeof req.file);
    if (memID == undefined || memID == null) {
        res.render('logIn');
    } else {
        console.log(req.file,imgType);
        if (typeof (req.file) != 'undefined') {
            //如果檔案超過限制大小
            if (req.file.size > maxSize) { 
                isRender = false;
                picture = null ;
                fs.unlinkSync('public/userImg/' + imgName); //刪除檔案
                res.write('<head><meta charset="utf-8"/></head>');
                res.end('<script> alert("圖片過大，僅接受1M以下的圖片"); history.back();</script>');
            }
             //如果檔案類型不符合規定
            if ((imgType != '.png' && imgType != '.jpg' && imgType != '.jpeg' && imgType !='.jfif') && isRender) {
                isRender = false;
                picture = null ;
                fs.unlinkSync('public/userImg/' + imgName);
                res.write('<head><meta charset="utf-8"/></head>');
                res.end('<script> alert("只能上傳.jpg , .png , .jpeg , .jfif 類型的檔案"); history.back();</script>');
            }
        }
        if (isRender) {
            member.articlePost(memID, artiHead, artiCont, artiClass, postDateTime, picture).then(data => {
                if (data == 0) {
                    res.redirect('/articleList');
                } else {
                    res.render('error');  //導向錯誤頁面
                }

            })
        }
    }

});


module.exports = router;
