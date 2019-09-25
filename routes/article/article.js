var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求 
router.get('/:artiNum', async function (req, res, next) {
    var artiNum = req.params.artiNum;   //取出參數
    var memID = req.session.memID;
    article.getOneArticle(artiNum, memID).then(data => {
        // 將字串替換成圖片
        console.log('data!!!',data)
        for (var i = 0; i < data[0].length; i++) {
            if (data[0][i].artiCont.match("\\:imgLocation") != null) {
                for (var j = 0; j < data[6].length; j++) {
                    data[0][i].artiCont = data[0][i].artiCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='/userImg/" + data[6][j].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.35em; ' ></div>");
                }
            }
        }
        console.log(' data[1]',data[1])
        console.log('data[6]',data[6])

        for (var j = 0; j < data[1].length; j++) {
            console.log('data[1][j].artiMessCont',data[1][j].artiMessCont)
            if (data[1][j].artiMessCont.match("\\:imgLocation")) {
                for (var k = 0; k < data[6].length; k++) {
                    data[1][j].artiMessCont = data[1][j].artiMessCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='/userImg/replyImg/" + data[6][k].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.35em; ' ></div>");
                }
            }
        }

        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            res.render('article', { items: data });
        }
    })

});

module.exports = router;
