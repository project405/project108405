var express = require('express');
var router = express.Router();

const index = require('./utility/index');

router.get('/:searchParam', function (req, res, next) {
  var memID;

  //判斷是使用哪種方式登入
  if (req.session.memID != undefined && req.session.passport == undefined) {
    memID = req.session.memID;
  } else if (req.session.memID == undefined && req.session.passport != undefined) {
    memID = req.session.passport.user.id;
  }

  index.getWebSearch(req.params.searchParam, memID).then(data => {
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
    res.render('search', { items: data });
  })

});

module.exports = router;
