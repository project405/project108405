//----------------------------------------
// 載入必要的模組
//----------------------------------------

var linebot = require('linebot');
var express = require('express');
const request = require('request');
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
// const LinePush = require('./utility/LinePush');
// const article = require('./utility/article');
const article = require('./utility/article');
const member = require('./utility/member');




//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1653312089',
    channelSecret: 'f582b751649f1b57f33910c0238113eb',
    channelAccessToken: 'QRKiyeWZcixMaO55Yf35KXjZTkrDD70ZAP2gyt8W55aeLgtA75mOVIkOZpruRurKgUgq6ow1+V85huiGRDEBas0Uq57+o4nNREgClY6s+gSg28gC1HNAbELCV7JxGEDlA2bkF8SuWeFNULCG1Z/lwgdB04t89/1O/w1cDnyilFU='
});




//--------------------------------
// 機器人接受訊息的處理
//--------------------------------
// bot.on('message', function(event) {    
//     event.source.profile().then(
//         function (profile) {
//             //取得使用者資料
//             console.log(profile);
//             const userName = profile.displayName;
            // const userId = profile.userId;
            
            
            
               
//         })  
// });


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

// app.post('/webhook',cors(corsOptions), function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     console.log('reqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreq', req)
       

//         let reply_token = req.body.replyToken
//         let msg = req.body.messages
//         reply(reply_token, msg)

//         res.sendStatus(200)
//         next();

// });
member.AllMember().then(data => {  
    let allUser = [];
    allUser = data;
    console.log('allUser@@@@@@@@@@',allUser);
})   
app.post('/webhook', function (req, res) {
    request.post({
    headers: {
        'content-type' : 'application/json',
        //Authorization為Channel access token 
        'Authorization': 'Bearer xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
    },
    url: 'https://api.line.me/v2/bot/message/push',
    body: JSON.stringify({
        //to給資料庫有的使用者
        to: allUser,
            messages: [
                {
                type: 'text',
                text: "Hello,Ting~這是Line Bot API測試訊息"
                }
            ]
        })
    }, function(error, response, body){
   
    res.end(body);
   
    });
});
