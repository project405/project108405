var express = require('express');
var router = express.Router();

const member = require('../utility/member');

//接收GET請求
router.get('/:artiPage', function (req, res, next) {
    var artiPage = req.params.artiPage;   //取出參數
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID == undefined && req.session.passport == undefined) {
        res.render('login');
    } else if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }
    
    member.getMyArticleClassList('music', memID, artiPage).then(data => {
        data[6][0].count = Math.ceil(data[6][0].count / 10) 
        data[6][0].count = data[6][0].count == 0 ? 1 : data[6][0].count

        data[0].map((item) => {
            item.artiCont = item.artiCont.replace(/\n/g,' ').replace(/\r/g,' ').replace(/<br>/g,' ').replace(/\\:imgLocation/g, " ");
            switch(item.artiClass) {
                case 'book':
                    item.artiClass = '書籍'
                    break;
                case 'movie':
                    item.artiClass = '電影'
                    break;
                case 'music':
                    item.artiClass = '音樂'
                    break;
                case 'exhibition':
                    item.artiClass = '展覽'
                    break;
            }
        })

        if (data == null) {
            res.render('error');
        } else if (data.length > 0) {
            res.render('myArtiClassManage', { myArtiClass: data });
        } else {
            res.render('notFound');
        }

    })
});

module.exports = router;
