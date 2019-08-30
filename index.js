//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
//增加引用函式
// const collection = require('./utility/collection');
const index = require('./routes/utility/index');
const recommend = require('./routes/utility/recommend');

//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1594135622',
    channelSecret: 'c503bd8ed4d7b8e183333309ddd135fd',
    channelAccessToken: 'xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
});


//========================================
// 機器人接受訊息的處理
//========================================
//------------測試資料------------
// bot.on('message', function(event) {    
//     event.source.profile().then(
//         function (profile) {
//             //取得使用者資料
//             const userName = profile.displayName;
//             const userId = profile.userId;
	    
//             //使用者傳來的學號
//             const memID = event.message.text;
          
//             //呼叫API取得學生資料
//             collection.getCollRecommend(memID).then(data => {  
//                     console.log(data[0].recomHead);
//                     event.reply([
//                         {'type':'text', 'text':data[0].recomHead},
//                         {'type':'text', 'text':data[0].recomCont},
//                         {'type':'text', 'text':data[0].recomClass},
//                         {'type':'text', 'text':userName},
//                         {'type':'text', 'text':"http://weiting.nctu.me/logIn.html/"+userId}]
//                     );  
                  
//             })  
//         }
//     );
// });

//------------ 熱門文章 ------------
bot.on('message', function(event) {    
    
    //使用者傳來的文字
    const text = event.message.text;
    
    //呼叫indexAPI取得熱門文章
    if (text == "熱門文章"){
        index.getIndexData(text).then(data => {  
            
            // console.log(data[1][0]);
            // console.log(data[1][1]);
            // console.log(data[1][2]);
            
            event.reply([
                {'type':'text', 'text':data[1][0].artiHead},
                {'type':'text', 'text':data[1][1].artiHead},
                {'type':'text', 'text':data[1][2].artiHead}
            ]);   
             
        })  
    }
});
//--------------------------------
//------------ 本週推薦(成功)) ------------
// bot.on('message',async function (event) {    

//     //使用者傳來的文字
//     const text = event.message.text;
//     //存放本週推薦類別
//     let msgs = ['電影','音樂','書籍','展覽'];
    
//     //呼叫API取得本週推薦
//     if (text == "本週推薦") {
//         recommend.getFourRecomClassList().then(data =>{
//                 console.log("data!!!!!!",data[1][0]);
//                 // console.log(msgs[0])
//                 event.reply([{'type':'text','text':msgs[0]+"類："+data[0][0].recomHead},
//                             {'type':'text','text':msgs[1]+"類："+data[1][0].recomHead},
//                             {'type':'text','text':msgs[2]+"類："+data[2][0].recomHead},
//                             {'type':'text','text':msgs[3]+"類："+data[3][0].recomHead}
//                 ]);
//         });
          
//     }      
// });




//========================================
// 機器人接受回覆的處理
//========================================
bot.on('postback', function(event) { 
    const data = event.postback.data;
    const userId = event.source.userId;

    event.source.profile().then(function (profile) {
        const userName = profile.displayName;
		
        return event.reply([
            {
                "type": "text",
                "text": data
            },
            {
                "type": "text",
                "text": userId
            },
            {
                "type": "text",
                "text": userName
            }
        ]);		
    });
});
//========================================
//--------------------------------
// 機器人接受回覆的處理
//--------------------------------
// bot.on('postback', function(event) { 
//     const data = event.postback.data;
//     // const sub = data.split('&');
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
//             // {
//             //     "type": "text",
//             //     "text": "餐點編號:" + sub[0]
//             // },
//             {
//                 "type": "text",
//                 "text": data

//             }            
//         ]);     
//     });
// });

//========================================
// 機器人接受訊息的處理
//========================================
bot.on('message', function(event) {
	if(text == "本週推薦"){
        event.reply({
            "type": "template",
            "altText": "您好！！！這是本週新推薦！",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                      "thumbnailImageUrl": "https://tomlin-app-1.herokuapp.com/imgs/p02.jpg",
                      "imageBackgroundColor": "#FFFFFF",
                      "title": "星夜",
                      "text": "荷蘭後印象派畫家文森特·梵谷於1890年在法國聖雷米的一家精神病院裏創作的一幅著名油畫",
                      "defaultAction": {
                          "type": "uri",
                          "label": "詳細資料",
                          "uri": "https://zh.wikipedia.org/wiki/星夜"
                      },
                      "actions": [
                          {
                              "type": "postback",
                              "label": "買了",
                              "data": "action=buy&itemid=111"
                          },
                          {
                              "type": "postback",
                              "label": "加入購物車",
                              "data": "action=add&itemid=111"
                          },
                          {
                              "type": "uri",
                              "label": "詳細資料",
                              "uri": "https://zh.wikipedia.org/wiki/星夜"
                          }
                      ]
                    },
                    {
                      "thumbnailImageUrl": "https://tomlin-app-1.herokuapp.com/imgs/p02.jpg",
                      "imageBackgroundColor": "#000000",
                      "title": "向日葵",
                      "text": "荷蘭畫家梵谷繪畫的一系列靜物油畫。當中有2幅繪有15朵向日葵，與1幅繪有十四朵向日葵，另有兩幅繪有12朵向日葵。",
                      "defaultAction": {
                          "type": "uri",
                          "label": "詳細資料",
                          "uri": "https://zh.wikipedia.org/wiki/向日葵_(梵高)"
                      },
                      "actions": [
                        {
                            "type": "postback",
                            "label": "買了",
                            "data": "action=buy&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": "加入購物車",
                            "data": "action=add&itemid=222"
                        },
                          {
                              "type": "uri",
                              "label": "詳細資料",
                              "uri": "https://zh.wikipedia.org/wiki/向日葵_(梵高)"
                          }
                      ]
                    }
                ],
                "imageAspectRatio": "rectangle",
                "imageSize": "cover"
            }
        });
    }
});



//--------------------------------
// 機器人接受訊息的處理
//--------------------------------

// });bot.on('message', function(event) {    
//     event.source.profile().then(
//         function (profile) {
//             //取得使用者資料
//             const userName = profile.displayName;
//             const userId = profile.userId;

//             //存所有成員的id
//             let allUsers = [];

//             //呼叫API取得所有成員資料
//             foods.fetchAllMember().then(data => {
//                 if (data == -1){
//                     event.reply('找不到資料');
//                 }else if(data == -9){                    
//                     event.reply('執行錯誤');
//                 }else{
//                     data.forEach(item => {
//                         allUsers.push(item.userid);
//                     });
//                 }
//             });            

//             //呼叫API取得隨選食物資料
//             foods.randomSelectFoods().then(data => {  
//                 if (data == -1){
//                     event.reply('找不到資料');
//                 }else if(data == -9){                    
//                     event.reply('執行錯誤');
//                 }else{
//                     let msg = [];

//                     //準備食物卡片樣式
//                     data.forEach(item => {
//                         msg.push({
//                             "thumbnailImageUrl": "https://tomlin-app-1.herokuapp.com/imgs/" + item.photo,
//                             "imageBackgroundColor": "#FFFFFF",
//                             "title": item.title,
//                             "text": item.description,
//                             "actions": [
//                                 {
//                                     "type": "postback",
//                                     "label": "1顆星",
//                                     "data": item.id + "&1"
//                                 },
//                                 {
//                                   "type": "postback",
//                                   "label": "2顆星",
//                                   "data": item.id + "&2"
//                                 },
//                                 {
//                                   "type": "postback",
//                                   "label": "3顆星",
//                                   "data": item.id + "&3"
//                                 }
//                             ]
//                         });                        
//                     });

//                     //將訊息推給所有使用者
//                     bot.push(
//                         allUsers, {
//                         "type": "template",
//                         "altText": "這是一個輪播樣板",
//                         "template": {
//                             "type": "carousel",
//                             "columns":msg
//                         },
//                         "imageAspectRatio": "rectangle",
//                         "imageSize": "cover"    
//                     });  
//                 }  
//             })  
//         }
//     );





//========================================


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
