const sql = require('./utility/asyncDB');
var express = require('express');
var router = express.Router();
const member = require('./utility/member');

router.get('/', function(req, res, next) {
    console.log("成功了",req.session.memID);
    
    member.checkAuthority(req.session.memID).then(data => {
        var memberData = [req.session.memID,data];
        res.send(memberData);
    })
});


module.exports = router;
