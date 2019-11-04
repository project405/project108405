var express = require('express');
var router = express.Router();

const article = require('../utility/article');

//接收GET請求
router.get('/:artiListNum', function (req, res, next) {
    var artiListNum = req.params.artiListNum;   //取出參數
    var memID;

    //判斷是使用哪種方式登入
    if (req.session.memID != undefined && req.session.passport == undefined) {
        memID = req.session.memID;
    } else if (req.session.memID == undefined && req.session.passport != undefined) {
        memID = req.session.passport.user.id;
    }

    article.getArticleListPagination(memID, artiListNum).then(data => {
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
            res.render('error');  //導向錯誤頁面
        } else if (data.length > 0) {
            res.render('articleList', { items: data });  //將資料傳給顯示頁面
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});

module.exports = router;