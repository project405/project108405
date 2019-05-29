var express = require('express');
var router = express.Router();

const member = require('./utility/member');
const moment = require('moment');

//post請求
router.post('/', function (req, res, next) {
    var memID = req.session.memID;
    var artiHead = req.body.artiHead;
    var artiCont = req.body.artiCont;
    var artiClass = 'movie';
    var postDateTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    // console.log(moment(new Date()).format("YYYY-MM-DD hh:mm:ss"));
    if (memID == undefined || memID == null) {
        res.render('logIn');
    } else {
        member.articlePost(memID, artiHead, artiCont, artiClass, postDateTime).then(data =>{
            if (data == 0) {
                res.redirect('/articleList');
            } else {
                res.render('error');  //導向錯誤頁面
            }

        })
    }

});


module.exports = router;
