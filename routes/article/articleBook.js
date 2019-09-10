var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求
router.get('/', function (req, res, next) {
    var memID ;

    //判斷是使用哪種方式登入
	if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
    }
    
    article.getArticleClassList('book', memID).then(data => {
        // 將圖片字串取代成空字串
        for (var i = 0; i < data[0].length; i++) {
            if (data[0][i].artiCont.match("\\:imgLocation") != null) {
                data[0][i].artiCont = data[0][i].artiCont.replace(/\\:imgLocation/g, "");
            }
        }

        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            console.log(data)
            res.render('articleClass', { items: data });  //將資料傳給顯示頁面
        }
    })
});


module.exports = router;