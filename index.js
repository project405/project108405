//----------------------------------------
// 載入必要的模組
//----------------------------------------
const bodyParser = require('body-parser');
var linebot = require('linebot');
var express = require('express');
const request = require('request');
const app = express();
var cors = require('cors')
// var corsOptions = {
//     origin: 'http://localhost:3000/',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

const article = require('./utility/article');
// const member = require('./utility/member');
const member = require('./utility/LinePush');
const byClassData = require('./utility/index');



//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1653312089',
    channelSecret: 'f582b751649f1b57f33910c0238113eb',
    channelAccessToken: 'QRKiyeWZcixMaO55Yf35KXjZTkrDD70ZAP2gyt8W55aeLgtA75mOVIkOZpruRurKgUgq6ow1+V85huiGRDEBas0Uq57+o4nNREgClY6s+gSg28gC1HNAbELCV7JxGEDlA2bkF8SuWeFNULCG1Z/lwgdB04t89/1O/w1cDnyilFU='
});

bot.on('postback', function(event) { 
    event.source.profile().then(
        function (profile) {
            
            const userName = profile.displayName;
            const userId = profile.userId;
            const data = event.postback.data;
            console.log("postback 資料",data)
            //------------------------------------------------
            //----------------未綁定Line_id用戶-----------------
            //------------------------------------------------
            // var myLineTemplate={
            //     type: 'template',
            //     altText: '很抱歉您未綁定line',
            //     template: {
            //         type: 'buttons',
            //         text: 'LINE用戶請至文藝富心登入\n登入後能：\n1.在LINE收藏你喜歡的事物\n2.不定時收到文藝相關資訊',
            //         actions: [{
            //             type:"uri",
            //             label:" 👣 至文藝富心官網登入",
            //             // uri:"line://app/1594135622-705e8pDP"   
            //             uri: "line://app/1594135622-82v9mEZq"

            //         }]
            //     }
            // };
    });    
});
//----------------------------------------
// 建立一個網站應用程式app
// 如果連接根目錄, 交給機器人處理
//----------------------------------------
const linebotParser = bot.parser();
app.post('/', linebotParser);

//----------------------------------------
// 可直接取用檔案的資料夾
//----------------------------------------
app.use(express.static('public'));

//----------------------------------------
// 監聽3000埠號, 
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function() {
    const port = server.address().port;
    console.log("正在監聽埠號:", port);
});

app.post('/webhook',  function (req, res) {
    let allUser = [];
    member.AllMember().then(data => {  
        data.forEach(item => {
            allUser.push(item.lineID);
            console.log(allUser)
        });
        byClassData.getIndexData().then(data =>{
            var pushContent = []
            //data為文章
            if(data[10][0].recomHead == undefined){
                pushContent.push(data[10][0].artiHead)
                //有圖片
                if (data[10][0].artiCont.match("\:imgLocation") != null){
                    // pushContent.push(data[10][0].artiCont.replace(/\:imgLocation/ig, "img")); 
                    pushContent.push(data[10][0].artiCont); 
                    if (data[10][0].artiCont.length >= 70){
                        pushContent.pop()
                        pushContent.push(data[10][0].artiCont.slice(0,71)+'...')
                    }
                    linePushPhoto();
                }else{
                    pushContent.push(data[10][0].artiCont); 
                    if (data[10][0].artiCont.length >= 70){
                        pushContent.pop()
                        pushContent.push(data[10][0].artiCont.slice(0,71)+'...')
                    }
                    linePush()
                }
            //data為推薦
            }else{
                pushContent.push(data[10][0].recomHead)
                //有圖片
                if (data[10][0].recomCont.match("\:imgLocation") != null){
                    pushContent.push(data[10][0].recomCont); 
                    if (data[10][0].recomCont.length >= 70){
                        pushContent.pop()
                        pushContent.push(data[10][0].recomCont.slice(0,71)+'...')
                    }
                    linePushPhoto();
                //沒圖片    
                }else{
                    pushContent.push(data[10][0].recomCont); 
                    if (data[10][0].recomCont.length >= 70){
                        pushContent.pop()
                        pushContent.push(data[10][0].recomCont.slice(0,71)+'...')
                    }
                    linePush()
                }
            }
             

            console.log('pushContent@@@@@@@',pushContent)
            console.log('pushContent.length[1]@@@@@@@',pushContent[1].length)
            console.log('pushContent.length@@@@@@@',pushContent.length)

            
            //文章、推薦內容無圖片的推播樣式
            function linePush (){
                request.post({
                    headers: {
                        'content-type' : 'application/json',
                        //Authorization為Channel access token 
                        // ----------測試line
                        'Authorization': 'Bearer QRKiyeWZcixMaO55Yf35KXjZTkrDD70ZAP2gyt8W55aeLgtA75mOVIkOZpruRurKgUgq6ow1+V85huiGRDEBas0Uq57+o4nNREgClY6s+gSg28gC1HNAbELCV7JxGEDlA2bkF8SuWeFNULCG1Z/lwgdB04t89/1O/w1cDnyilFU='
                        // ----------正式line
                        // 'Authorization': 'Bearer xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
                    },
                    // url: 'https://api.line.me/v2/bot/message/multicast',
                    url: 'https://api.line.me/v2/bot/message/push',
                    body: JSON.stringify({
                        //to給資料庫有的使用者
                        // to: allUser,
                        to: 'U2251202deb66b8a73da26e53c8399a13',
                            messages: [
                                {
                                    "type": "template",
                                    "altText": "精選電影",
                                    "template": {
                                      "type": "buttons",
                                      "text": "【文藝富心】小驚喜 🎉\n對於以下推薦有興趣可至文藝富心官網看更多\n立即點選「喜歡」或「不喜歡」讓我們更了解你💞",
                                      "actions": [
                                        {
                                          "type": "uri",
                                          "label": "▶️ 想看更多",
                                          "uri": "http://123.com",
                                        //   "uri": `https://project108405.herokuapp.com/oneRecommend/${d[0][0].recomNum}`
                                        
                                        }
                                      ]
                                    }
                                },
                                {
                                    type: "template",
                                    altText: "相信你會喜歡😎",
                                    template: {
                                        type: "confirm",
                                        text: `🔸標題：${pushContent[0]}\n🔹內容：${pushContent[1]}`,
                                        actions: [
                                            {
                                                "type": "postback",
                                                "label": "喜歡",
                                                // "data": "like"
                                                "data": JSON.stringify("like")
                                            },
                                            {
                                                "type": "postback",
                                                "label": "不喜歡",
                                                "data": "dislike"
                                            }
                                        ]
                                    }
                                }               
                            ]
                            
                        })
                }, function(error, response, body){
                
                    res.end(body);
                
                });
            }
            //文章、推薦內容有圖片的推播樣式 
            function linePushPhoto(){
                request.post({
                    headers: {
                        'content-type' : 'application/json',
                        //Authorization為Channel access token 
                        // ----------測試line
                        'Authorization': 'Bearer QRKiyeWZcixMaO55Yf35KXjZTkrDD70ZAP2gyt8W55aeLgtA75mOVIkOZpruRurKgUgq6ow1+V85huiGRDEBas0Uq57+o4nNREgClY6s+gSg28gC1HNAbELCV7JxGEDlA2bkF8SuWeFNULCG1Z/lwgdB04t89/1O/w1cDnyilFU='
                        // ----------正式line
                        // 'Authorization': 'Bearer xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
                    },
                    // url: 'https://api.line.me/v2/bot/message/multicast',
                    url: 'https://api.line.me/v2/bot/message/push',
                    body: JSON.stringify({
                        //to給資料庫有的使用者
                        // to: allUser,
                        to: 'U2251202deb66b8a73da26e53c8399a13',
                            messages: [
                                {
                                    "type": "template",
                                    "altText": "相信你會喜歡😎",
                                    "template": {
                                      "type": "buttons",
                                      "text": "【文藝富心】小驚喜 🎉\n對於以下推薦有興趣可至文藝富心官網看更多\n立即點選「喜歡」或「不喜歡」讓我們更了解你💞",
                                      "actions": [
                                        {
                                          "type": "uri",
                                          "label": "▶️ 想看更多",
                                          "uri": "https://123.com"
                                        //   "uri": `https://project108405.herokuapp.com/oneRecommend/${d[0][0].recomNum}`
                                        }
                                      ]
                                    }
                                },
                                {
                                    type: "template",
                                    altText: "相信你會喜歡😎",
                                    template: {
                                        type: "buttons",
                                        thumbnailImageUrl: "https://i.imgur.com/z3ErJYW.jpg",
                                        imageAspectRatio: "rectangle",
                                        imageSize: "cover",
                                        imageBackgroundColor: "#FFFFFF",
                                        title: `${pushContent[0]}`,
                                        text: `${pushContent[1]}`,
                                        defaultAction: {
                                            "type": "uri",
                                            "label": "View detail",
                                            "uri": "http://example.com/page/123"
                                        },
                                        actions: [
                                            {
                                                "type": "postback",
                                                "label": "喜歡",
                                                // "data": "like"
                                                "data": req.write(JSON.stringify({"data":"like"}))

                                            },
                                            {
                                                "type": "postback",
                                                "label": "不喜歡",
                                                "data": "dislike"
                                            }
                                        ]
                                    }
                                }           
                            ]
                        })
                }, function(error, response, body){
                
                    res.end(body);
                
                });
            }
            
        })    
    })      
});
