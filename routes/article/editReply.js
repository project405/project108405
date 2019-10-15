var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求 
router.get('/:artiMessNum', async function (req, res, next) {
    var artiMessNum = req.params.artiMessNum;   //取出參數
    var memID ;

    //判斷是使用哪種方式登入
	if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
    } else {
        res.write('<head><meta charset="utf-8"/></head>');
            res.end('<script> alert("您沒有編輯該留言的權限"); history.back();</script>');
            res.render('notFound');  //導向找不到頁面     
        return;           
    }

    article.getOneReply(artiMessNum, memID).then(data => {
        if (data[2][0] != data[0][0].memID) {
            res.write('<head><meta charset="utf-8"/></head>');
            res.end('<script> alert("您沒有編輯該留言的權限"); history.back();</script>');
            res.render('notFound');  //導向找不到頁面     
            return;           
        }
        let sumDisplayImg = 0
        if (data[1]) {
            while (data[0][0].artiMessCont.match("\\:imgLocation")) {
                data[0][0].artiMessCont = data[0][0].artiMessCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top original'><img src='/userImg/replyImg/" + data[1][sumDisplayImg].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.1em; ' ></div>");
                sumDisplayImg = sumDisplayImg + 1
            }
        }

        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            res.render('editReply', { items: data });
        }
    })

});

module.exports = router;
