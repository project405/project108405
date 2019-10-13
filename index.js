//----------------------------------------
// 載入必要的模組
//----------------------------------------

var linebot = require('linebot');
var express = require('express');
const app = express();
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())



//增加引用函式
const LinePush = require('./utility/LinePush');
const article = require('./utility/article');

//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1653312089',
    channelSecret: 'f582b751649f1b57f33910c0238113eb',
    channelAccessToken: 'QRKiyeWZcixMaO55Yf35KXjZTkrDD70ZAP2gyt8W55aeLgtA75mOVIkOZpruRurKgUgq6ow1+V85huiGRDEBas0Uq57+o4nNREgClY6s+gSg28gC1HNAbELCV7JxGEDlA2bkF8SuWeFNULCG1Z/lwgdB04t89/1O/w1cDnyilFU='
});

//--------------------------------
// 使用者加入群組或解除封鎖
//--------------------------------
// bot.on('follow', function (event){
//     event.source.profile().then(
//         function (profile) {
//             //取得使用者資料
//             const userName = profile.displayName;
//             const userId = profile.userId;    
           
//             //呼叫API, 將使用者資料寫入資料庫
//             LinePush.addMember(userId, userName).then(data => {  
//                 if (data == -9){
//                     event.reply('執行錯誤');
//                 }else{                   
//                     event.reply('已加入會員');
//                 }
//             })  
//         }
//     );
// });

//--------------------------------
// 使用者封鎖群組
//--------------------------------
// bot.on('unfollow', function (event) {
//     //取得使用者資料
//     const userId = event.source.userId;

//     //呼叫API, 將使用者資料刪除
//     LinePush.deleteMember(userId).then(data => {  
//         if (data == -9){
//             event.reply('執行錯誤');    //會員已封鎖群組, 本訊息無法送達
//         }else{                   
//             event.reply('已退出會員');  //會員已封鎖群組, 本訊息無法送達
//         }
//     });  
// });

//--------------------------------
// 機器人接受回覆的處理
//--------------------------------
// bot.on('postback', function(event) { 
//     const data = event.postback.data;
//     const sub = data.split('&');
//     const userId = event.source.userId;

//     event.source.profile().then(function (profile) {
//         const userName = profile.displayName;    
//         return event.reply([
//             {
//                 "type": "text",
//                 "text": "使用者編號:" + userId
//             },
//             {
//                 "type": "text",
//                 "text": "姓名:" + userName
//             },
//             {
//                 "type": "text",
//                 "text": "餐點編號:" + sub[0]
//             },
//             {
//                 "type": "text",
//                 "text": "星:" + sub[1]
//             }            
//         ]);     
//     });
// });

//--------------------------------
// 機器人接受訊息的處理
//--------------------------------
bot.on('message', function(event) {    
    event.source.profile().then(
        function (profile) {
            //取得使用者資料
            const userName = profile.displayName;
            const userId = profile.userId;

            event.reply("哈囉",userName)         

        })  
});


//----------------------------------------
// 建立一個網站應用程式app
// 如果連接根目錄, 交給機器人處理
//----------------------------------------
const linebotParser = bot.parser();
// app.post('/', linebotParser);

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

app.post('/',cors(corsOptions), function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    console.log('reqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreq', req)
        console.log('req.body!!!!!!!!!!!!!!!!!!!!!!' , req.body.msg);
        let reply_token = req.body.events[0].replyToken
        let msg = req.body.events[0].message.text
        console.log('reply_token = ' + reply_token);
        console.log('msgObj = ' , req.body.events[0]);
        // console.log('req.body' , req.body);

        reply(reply_token, msg)

        res.sendStatus(200)
        next();

});
    


function reply(reply_token, msg) {
    let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
    replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
    url: 'https://api.line.me/v2/bot/message/push',
    headers: headers,
    body: body
    }, (err, res, body) => {
    console.log('status = ' + res.statusCode);
    });
}
