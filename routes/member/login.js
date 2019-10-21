var express = require('express');
var router = express.Router();
const member = require('../utility/member');

/* GET home page. */
router.get('/', function(req, res, next) {
  member.getMood().then((data) => {
    console.log('loginData', data)
  }) 
  res.render('login');
});

module.exports = router;
