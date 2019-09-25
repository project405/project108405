'use strict';

var express = require('express');
var router = express.Router();

const collection = require('../utility/collection');

/* GET home page. */
router.get('/', function (req, res, next) {
	var memID;

	//判斷是使用哪種方式登入
	if (req.session.memID == undefined && req.session.passport == undefined) {
		res.render('login');
	} else if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
	}
console.log(memID);
	//取得推薦文章
	collection.getCollRecommend(memID).then(data => {
		if (data == null) {
			res.render('error');  //導向錯誤頁面
		} else if (data == -1) {
			res.render('notFound');  //導向找不到頁面                
		} else {
			// console.log(data);
			res.render('collectionRecommend', { collData: data });
		}
	})
});

module.exports = router;
