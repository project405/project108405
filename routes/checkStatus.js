var express = require('express');
var router = express.Router();
const member = require('./utility/member');

router.get('/', function(req, res, next) {
    member.checkAuthority(req.session.memID).then(data => {
        var memberData = [];
        console.log(req.session.passport);
        //判斷是使用哪種方式登入
        if(req.session.memID == undefined && req.session.passport != undefined){
            memberData.push(req.session.passport.user.id);
            memberData.push(data);
        }else if (req.session.memID != undefined && req.session.passport == undefined){
            memberData.push(req.session.memID);
            memberData.push(data);
        }else{
            memberData.push(undefined);
            memberData.push(undefined);
        }

        res.send(memberData);
    })
});


module.exports = router;
