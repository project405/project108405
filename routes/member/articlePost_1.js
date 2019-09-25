var express = require('express');
var router = express.Router();

const fs = require('fs');
var http = require('http');
const moment = require('moment');
const member = require('../utility/member');

//post請求
router.post('/', function (req, res, next) {
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID == undefined && req.session.passport == undefined) {
        res.render('login');
    } else if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }
    
    var artiHead = req.body.artiHead;
    var artiCont = req.body.artiCont;
    var artiClass = req.body.artiClass;
    // console.log(req.body);
    console.log(req.body);
    // console.log(artiClass) ; 
    var postDateTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    var picture = req.body.file;
    var imgName = picture.substring(0, picture.lastIndexOf("."));
    var imgType = picture.substring(picture.lastIndexOf("."));

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
    imgName = postDateTime + "--" + buf;

    console.log(imgName);
    console.log(req.body.url);
    fs.writeFile('./public/userImg/' + imgName , imgName, function (err) {
        if (err) {
            console.error(err);
        }
        console.log('file ' + imgName + ' saved.')
    });

    if (memID == undefined || memID == null) {
        res.render('login');
    } else {
        // console.log(req.file,imgType);
        if (typeof (req.file) != 'undefined') {
            //如果檔案超過限制大小
            if (req.file.size > maxSize) {
                isRender = false;
                picture = null;
                fs.unlinkSync('public/userImg/' + imgName); //刪除檔案
                res.write('<head><meta charset="utf-8"/></head>');
                res.end('<script> alert("圖片過大，僅接受1M以下的圖片"); history.back();</script>');
            }
            //如果檔案類型不符合規定
            if ((imgType != '.png' && imgType != '.jpg' && imgType != '.jpeg' && imgType != '.jfif') && isRender) {
                isRender = false;
                picture = null;
                fs.unlinkSync('public/userImg/' + imgName);
                res.write('<head><meta charset="utf-8"/></head>');
                res.end('<script> alert("只能上傳.jpg , .png , .jpeg , .jfif 類型的檔案"); history.back();</script>');
            }
        }
        if (isRender) {
            member.articlePost(memID, artiHead, artiCont, artiClass, postDateTime, picture).then(data => {
                if (data == 0) {
                    console.log("發文成功");
                    res.redirect('/articleList');
                } else {
                    res.render('error');  //導向錯誤頁面
                }

            })
        }
    }

});


module.exports = router;
