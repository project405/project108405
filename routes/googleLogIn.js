var express = require('express');
var router = express.Router();
//---------------------------------------------
// 使用passport-google-oauth2套件進行認證
//---------------------------------------------
var passport = require('passport');

//接收請求
router.get('/', function (req, res, next) {
    passport.authenticate('google', { scope: ['email', 'profile'] }),
    function(req,res){
        console.log("1111");  
    }   //進行google第三方認證
});

module.exports = router;