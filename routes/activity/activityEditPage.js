var express = require('express');
var router = express.Router();

const article = require('../utility/article');
const moment = require('moment');

//接收GET請求
router.get('/:artiNum', function (req, res, next) {
    var artiNum = req.params.artiNum;   //取出參數
    var memID;
    //判斷是使用哪種方式登入
    if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }
    
    article.getOneActivity(artiNum, memID).then(data => {
        if (!data || data[4] != 'SYSOP') {
            res.write('<head><meta charset="utf-8"/></head>');
            res.end('<script> alert("您沒有編輯該活動的權限"); history.back();</script>');
            return;   
        }
        data[0][0].deadline = moment(data[0][0].deadline).format("YYYY-MM-DD HH:mm:ss");
        console.log(data[0][0].deadline)
        // 將字串替換成圖片
        if (data[0][0].artiCont.match("\\:imgLocation") != null) {
            for (var j = 1; j < data[2].length; j++) {
                data[0][0].artiCont = data[0][0].artiCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='" + data[2][j].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.1em; ' ></div>");
            }
        }

        //TODO
        if(data[3].length > 0 ){
            console.log("fq");
            for(var i = 0 ; i < data[1].length ; i++){
                if (data[1][i].artiMessCont.match("\\:imgLocation") != null) {
                    for (var j = 0; j < data[3].length; j++) {
                        data[1][i].artiMessCont = data[1][i].artiMessCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='" + data[3][j].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.1em; ' ></div>");
                    }
                }
            }
        }
        
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {

            res.render('editActivity', { items: data });
        }
    })
});

module.exports = router;