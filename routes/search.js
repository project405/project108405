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
    res.render('search', { items: data });
  })

});

module.exports = router;
