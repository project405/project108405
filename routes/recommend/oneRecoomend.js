var express = require('express');
var router = express.Router();

const recommend = require('../utility/recommend');

router.get('/:recomNum', async function (req, res, next) {
    var recomNum = req.params.recomNum;   //取出參數
    var memID = req.session.memID;
    recommend.getOneRecommend(recomNum, memID).then(data => {
        data[7] = [memID];
        // 測試data
        // for(let i = 0 ; i<data.length ; i++){
        //     for (let j = 0 ; j < data[i].length; j++){
        //         console.log("data[" , i ,"][",j,"]=" ,data[i][j]);
        //     }
        // }
        console.log(data[4]);

        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            res.render('oneRecommend', { items: data });
        }
    })


});

module.exports = router;