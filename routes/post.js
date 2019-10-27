var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	//判斷是使用哪種方式登入
	if (req.session.memID == undefined && req.session.passport == undefined) {
		res.render('login');
	}else {
		res.render("post");
	}
});


module.exports = router;
