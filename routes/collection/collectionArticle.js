'use strict';

var express = require('express');
var router = express.Router();

const collection = require('../utility/collection');
/* GET home page. */
router.get('/:collPage', function (req, res, next) {
	var collPage = req.params.collPage;   //取出參數
	var memID;

	//判斷是使用哪種方式登入
	if (req.session.memID == undefined && req.session.passport == undefined) {
		res.render('login');
	} else if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
	}
	
	collection.getCollArticle(memID, collPage).then(data => {
		console.log('data[5][0].count', data[5][0])
		data[5][0].count = Math.ceil(data[5][0].count / 10) 
		data[5][0].count = data[5][0].count == 0 ? 1 : data[5][0].count

		console.log(data[0])
		for (var i = 0; i < data[0].length; i++) {
			data[0][i].artiCont = data[0][i].artiCont.replace(/\n/g,' ').replace(/\r/g,' ').replace(/<br>/g,' ').replace(/\\:imgLocation/g, " ");
		}
		if (data == null) {
			res.render('error');  //導向錯誤頁面
		} else if (data == -1) {
			res.render('notFound');  //導向找不到頁面                
		} else {
			res.render('collectionArticle', { collData: data });
		}
	})
});

module.exports = router;
