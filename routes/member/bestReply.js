var express = require('express');
var router = express.Router();

const member = require('../utility/member');
const moment = require('moment');

//接收POST請求
router.post('/', function (req, res, next) {
    var month = moment(Date().now).format("MM");
 
    member.getBestReply(parseInt(month-1)).then(data => {
        res.send(data);

    })


})

module.exports = router;