var express = require('express');
var router = express.Router();

const recommend = require('../utility/recommend');

router.get('/:recomNum', async function (req, res, next) {
    var recomNum = req.params.recomNum;   //取出參數
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }

    recommend.getOneRecommend(recomNum, memID).then(data => {
        console.log("data=",data);
        // 將圖片字串替代成圖片
        for (var i = 0; i < data[0].length; i++) {
            if (data[0][i].recomCont.match("\\:imgLocation") != null) {
                for (var j = 0; j < data[3].length; j++) {
                    data[0][i].recomCont = data[0][i].recomCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='/imgs/recommend/" + data[3][j].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.1em; ' ></div>");
                }
            }
        }
        let sumDisplayImg = 0
        if (data[9]) {
            console.log(data[9])
            data[1].forEach((item, index) => {
                console.log('item', item)
                console.log('data.recomMessCont', item.recomMessCont)
                while (item.recomMessCont.match("\\:imgLocation")) {
                    console.log('data[9][sumDisplayImg].imgName', data[9][sumDisplayImg].imgName)
                    item.recomMessCont = item.recomMessCont.replace("\\:imgLocation", "<div class='wrapperCard card-img-top'><img src='/imgs/recommend/replyImg/" + data[9][sumDisplayImg].imgName + "' style='max-height: 450px; max-width: 70%; cursor: pointer; border-radius: 12px; padding: 0.1em; ' ></div>");
                    sumDisplayImg = sumDisplayImg + 1
                    console.log('sumDisplayImg', sumDisplayImg)
                }
            })
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