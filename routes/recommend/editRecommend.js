var express = require('express');
var router = express.Router();

const recommend = require('../utility/recommend');

//接收GET請求 
router.get('/:recomNum', async function (req, res, next) {
    var recomNum = req.params.recomNum;   //取出參數
    var memID ;

    //判斷是使用哪種方式登入
	if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
    } else {
        res.write('<head><meta charset="utf-8"/></head>');
            res.end('<script> alert("您沒有編輯該推薦的權限"); history.back();</script>');
        return;           
    }

    recommend.getOneRecommend(recomNum, memID).then(data => {
        if (!data || data[7] != 'boss') {
            res.write('<head><meta charset="utf-8"/></head>');
            res.end('<script> alert("您沒有編輯該推薦的權限"); history.back();</script>');
            return;           
        }
        // 將字串替換成圖片
        for (var i = 0; i < data[0].length; i++) {
            if (data[0][i].recomCont.match("\\:imgLocation") != null) {
                for (var j = 0; j < data[3].length; j++) {
                    data[0][i].recomCont = data[0][i].recomCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top original'><img src='/imgs/recommend/" + data[3][j].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.1em; ' ></div>");
                }
            }
        }

        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            console.log('data',data)
            res.render('editRecommend', { items: data });
        }
    })

});

module.exports = router;
