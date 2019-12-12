var express = require('express');
var router = express.Router();

const moment = require('moment');
const multer = require('multer');
const member = require('../utility/member');

var isRender = true; //判斷頁面是否有回傳過

var upload = multer({
    storage: undefined
})

//接收GET請求
router.post('/', upload.array('userImg', 100), function(req, res, next) {
	var memID = undefined;
	console.log( req.body.specColHead , req.body.specColCont, req.body.specColNum);
	var specColHead = req.body.specColHead;
	var specColCont = req.body.specColCont;
	var specColNum =  req.body.specColNum;
	var base64Index = req.body.base64Index;
	var postDateTime = moment(Date().now).format("YYYY-MM-DD HH:mm:ss");
	console.log(req.body.delSpecialColumn)
	//將所有換行符號替代成<br> 
	specColCont = specColCont.replace(/\n/g, "<br>");
	
	// console.log(specColHead,specColCont,specColNum,base64Index,postDateTime);
	//判斷是使用哪種方式登入
	if (req.session.memID == undefined && req.session.passport == undefined) {
		res.render('login');
	} else if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
    }
	console.log(memID);
	//如果沒登入
	if (memID == undefined) {
		res.send("請進行登入");
	} else { //如果有登入 
		console.log(1);
		if (isRender) {
			if (specColHead == 'undefined' || specColCont == '') {
				res.send("標題及內容不可為空，請重新輸入");
			} else {
				if (specColNum) {
					console.log("QQQ")
					member.editSpecialColumn(memID, specColHead, specColCont, postDateTime, base64Index, specColNum).then(data => {
						if (data == 1) {
							res.send("編輯成功");
						} else {
							res.send("編輯失敗");
						}
					})
				} else {
					console.log("@@@@@");
					member.specialColumnPost(memID, specColHead, specColCont, postDateTime, base64Index).then(data => {
						if (data == 0) {
							res.send("發文成功");
						} else {
							res.send("發文失敗");
						}
					})
				}
			}
		} else {
			res.send("發文失敗");
		}
	}	
});

module.exports = router;