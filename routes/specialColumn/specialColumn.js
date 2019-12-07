var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求
router.get('/:specColNum', function(req, res, next) {
	var specColNum = req.params.specColNum;
	var memID ; 
	//判斷是使用哪種方式登入
	if (req.session.memID == undefined && req.session.passport == undefined) {
	} else if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
	}

	article.getOneSpecialColumn(specColNum, memID).then(data => {
		console.log(data);
		// 將字串替換成圖片
		do{	
			if (data[0][0].specColCont.match("\\:imgLocation") != null) {
                for (var j = 1; j < data[2].length; j++) {
                    data[0][0].specColCont = data[0][0].specColCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='" + data[2][j].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.1em; ' ></div>");
                }
			}
		}while(data[0][0].specColCont.match("\\:imgLocation") == null)
		
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            res.render('specialColumn', { items: data });
        }
    })
	
});

module.exports = router;