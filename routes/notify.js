var express = require('express');
var router = express.Router();

const notify = require('./utility/notify');
const moment = require('moment');
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

	notify.getNotifyList(memID).then(data => {
		if (data == null) {
			res.render('error');  //導向錯誤頁面
		} else {
			res.render('notify', { items: data });
		}
	})
});

router.post('/', function(req, res, next){
	var alertMessage = [] ;
	var dateTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"); 
	var recomHead = JSON.parse(req.body.recom);
	var memID = JSON.parse(req.body.member);
	var month = parseInt(moment(Date.now()).format("MM"))-1; 
	
	req.body.recom.replace = req.body.recom.replace("\"","") ;
	req.body.recom.replace = req.body.recom.replace("]","") ;
	req.body.recom.replace = req.body.recom.replace("[","") ;

	for(var i = 0 ; i < recomHead.length ; i++){
		alertMessage.push("恭喜您" + month + "月在官方推薦【" + recomHead[i] + "】文章底下的留言，受到大家的喜愛，我們將寄送精美的小禮物給您");
	} 

	notify.insertMessage(memID, alertMessage, dateTime ).then(data => {
		if (data == 0) {
			res.redirect('error');  //導向錯誤頁面
		} else {
			res.send("寄出通知成功");
		}
	})
})

module.exports = router;
