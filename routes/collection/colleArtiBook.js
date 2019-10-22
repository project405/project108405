var express = require('express');
var router = express.Router();

const collection = require('../utility/collection');
//接收GET請求
router.get('/', function (req, res, next) {
    var memID;

	//判斷是使用哪種方式登入
	if (req.session.memID == undefined && req.session.passport == undefined) {
        res.render('/login');
	} else if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
	}

    collection.getCollArtiClassList(memID,'book').then(data => {
        data[0].map((item) => {
            item.artiCont = item.artiCont.replace(/\n/g,' ').replace(/\r/g,' ').replace(/<br>/g,' ').replace(/\\:imgLocation/g, " ");
        })
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            res.render('colleArtiClass', { items: data });  //將資料傳給顯示頁面
        }
    })
  
});


module.exports = router;