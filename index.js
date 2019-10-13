//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');

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

            //存所有成員的id
            let allUsers = [];

            //呼叫API取得所有成員資料
            // LinePush.fetchAllMember().then(data => {
            //     if (data == -1){
            //         event.reply('找不到資料');
            //     }else if(data == -9){                    
            //         event.reply('執行錯誤');
            //     }else{
            //         data.forEach(item => {
            //             allUsers.push(item.userid);
            //         });
            //     }
            // });            

            //呼叫API取得隨選食物資料
            article.getArticleList().then(data => {  
                if (data == -1){
                    event.reply('找不到資料');
                }else if(data == -9){                    
                    event.reply('執行錯誤');
                }else{
                    let msg = [];

                    //準備食物卡片樣式
                    data.forEach(item => {
                        msg.push({
                            "thumbnailImageUrl": "https://tomlin-app-1.herokuapp.com/imgs/" + item.artiNum,
                            "imageBackgroundColor": "#FFFFFF",
                            "title": item.artiHead,
                            "text": item.artiCont,
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "1顆星",
                                    "data": item.artiNum + "&1"
                                },
                                {
                                  "type": "postback",
                                  "label": "2顆星",
                                  "data": item.artiNum + "&2"
                                },
                                {
                                  "type": "postback",
                                  "label": "3顆星",
                                  "data": item.iartiNumd + "&3"
                                }
                            ]
                        });                        
                    });

                    //將訊息推給所有使用者
                    bot.push(
                    // allUsers, 
                    'U2251202deb66b8a73da26e53c8399a13',{
                        "type": "template",
                        "altText": "這是一個輪播樣板",
                        "template": {
                            "type": "carousel",
                            "columns":msg
                        },
                        "imageAspectRatio": "rectangle",
                        "imageSize": "cover"    
                        }
                    );  
                }  
            })  
        }
    );
});

//----------------------------------------
// 建立一個網站應用程式app
// 如果連接根目錄, 交給機器人處理
//----------------------------------------
const app = express();
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
