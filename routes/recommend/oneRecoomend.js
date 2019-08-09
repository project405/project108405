var express = require('express');
var router = express.Router();

const recommend = require('../utility/recommend');

router.get('/:recomNum', async function (req, res, next) {
    var recomNum = req.params.recomNum;   //取出參數
    var memID = req.session.memID;
    recommend.getOneRecommend(recomNum, memID).then(data => {
        // 測試data
        for (var i = 0; i < data[0].length; i++) {
            if (data[0][i].recomCont.match("\\:imgLocation") != null) {
                console.log("近來囉");
                for (var j = 0; j < data[11][0].length; j++) {
                    // artiCont = artiCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top' style='background-image: url(/userImg/" + req.files[i].filename + "'); border-radius:8px; '></div>");
                    data[0][i].recomCont = data[0][i].recomCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='/userImg/" + data[11][0][j].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.35em; ' ></div>");
                    // console.log("data[", 11, "][", j, "]=", data[11][0][j]);
                }
            }
        }

        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            res.render('oneRecommend', { items: data });
        }
    })


});

module.exports = router;