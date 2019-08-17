var express = require('express');
var router = express.Router();
const member = require('./utility/member');

router.get('/', function(req, res, next) {
    member.checkAuthority(req.session.memID).then(data => {
        var memberData = [req.session.memID,data];
        res.send(memberData);
    })
});


module.exports = router;
