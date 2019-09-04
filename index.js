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
// bot.on('message', function(event) {    
    
//     //使用者傳來的文字
//     const text = event.message.text;
    
//     //呼叫indexAPI取得熱門文章
//     if (text == "熱門文章"){
//         index.getIndexData(text).then(data => {  
            
//             // console.log(data[1][0]);
//             // console.log(data[1][1]);
//             // console.log(data[1][2]);
            
//             event.reply([
//                 {'type':'text', 'text':data[1][0].artiHead},
//                 {'type':'text', 'text':data[1][1].artiHead},
//                 {'type':'text', 'text':data[1][2].artiHead}
//             ]);   
             
//         })  
//     }
// });
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
    // let recom_class = ['movie','music','book','exhibition'];
    // const userId = event.source.userId;
    // var recom = recom_class.map(function(item,index){
        // console.log(item)
        // console.log(index)
        //寫一個方法判斷postback回來是電影、音樂等等
        //---------------使用map記得傳入item參數getRecomClassList
        recommend.getFourRecomClassList().then(d =>{
            // console.log(d[index]);
            const data = event.postback.data;
            //存放recommend/movie1.content
            const recommendData = d[0][0].recomCont;
    
            event.source.profile().then(function (profile) {
                const userName = profile.displayName;
                
                return event.reply([
                    {
                        "type": "text",
                        "text": data
                    },
                    {
                        "type": "text",
                        "text": recommendData
                    }
                ]);		
            });
        });
    // });
    
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
// bot.on('message', function(event) {
//     event.source.profile().then(
//         function (profile) {    
//             recommend.getRecomClassList().then(d =>{  
//                 console.log(d);
//                 return event.reply({
//                     "type": "image",
//                     "originalContentUrl": "https://tomlin-app-1.herokuapp.com/imgs/p01.jpg",
//                     "previewImageUrl": "https://tomlin-app-1.herokuapp.com/imgs/p01.jpg"
//                 });	
//             });            
//         }
//     );
// });
//----------------成功
//網址需連到heroku、圖片也是
bot.on('message', function(event) {
    //使用者傳來的文字
    const text = event.message.text;
    //存放本週推薦類別
    let msgs = ['電影','音樂','書籍','展覽'];

    if(text == '熱門文章'){
        index.getIndexData().then(data => {
            var x;
            for(i=0;i<3;i++){
                x=Math.floor(Math.random()*(10-i));
                //測試
                console.log('時間:'+data[1][x].artiDateTime,',標題：'+data[1][x].artiHead);
                event.reply([
                    {'type':'text', 'text':'時間:' + data[1][x].artiDateTime},
                    {'type':'text', 'text':'標題:' + data[1][x].artiHead},
                    {'type':'text', 'text':'連結:' + "https://tomlin-app-1.herokuapp.com/article/${data[1][x].articleNum}"}]  
                );
            }   
        })
    }
    //-----------本週推薦-----------
	if(text == '本週推薦'){
        recommend.getFourRecomClassList().then(data =>{
            event.reply({
                "type": "template",
                "altText": "您好！！！這是本週新推薦！",
                "template": {
                    "type": "carousel",
                    "columns": [
                        {
                          "thumbnailImageUrl": "https://weiting.nctu.me/imgs/recommend/movie1.jpg#",
                          "title": "【" + msgs[0] + "】" + data[0][0].recomHead,
                          "text": "movie1年代、導演、演員",
                          "defaultAction": {
                              "type": "uri",
                              "label": "知道更多",
                              "uri": "https://weiting.nctu.me/recommend.html"
                          },
                          "actions": [
                              {
                                  "type": "postback",
                                  "label": "知道更多",
                                  "data": data[0][0].recomHead
                              },
                              {
                                //-------!需克服收藏資料寫入資料庫的問題
                                  "type": "message",
                                  "label": "新增至我的收藏",
                                  "text": "收藏成功"
                              },
                              {
                                  "type": "uri",
                                  "label": "至文藝富心官網查看",
                                  "uri": "https://weiting.nctu.me/recommend.html"
                              }
                          ]
                        },
                        {
                          "thumbnailImageUrl": "https://weiting.nctu.me/imgs/recommend/music1.jpg#",
                          "title":"【" + msgs[1] + "】" + data[1][0].recomHead,
                          "text": "movie1專輯、歌手",
                          "defaultAction": {
                              "type": "uri",
                              "label": "詳細資料",
                              "uri": "https://weiting.nctu.me/recommend.html"
                          },
                          "actions": [
                            {
                                "type": "postback",
                                "label": "知道更多",
                                "data": data[1][0].recomHead
                            },
                            {
                              //-------!需克服收藏資料寫入資料庫的問題
                                "type": "message",
                                "label": "新增至我的收藏",
                                "text": "收藏成功"
                            },
                            {
                                "type": "uri",
                                "label": "至文藝富心官網查看",
                                "uri": "https://weiting.nctu.me/recommend.html"
                            }
                            ]
                        },
                        {
                            "thumbnailImageUrl": "https://weiting.nctu.me/imgs/recommend/book1.jpg#",
                            "title":"【" + msgs[2] + "】" + data[2][0].recomHead,
                            "text": "book1風格、作者、出版社",
                            "defaultAction": {
                                "type": "uri",
                                "label": "詳細資料",
                                "uri": "https://weiting.nctu.me/recommend.html"
                            },
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "知道更多",
                                    "data": data[2][0].recomHead
                                },
                                {
                                  //-------!需克服收藏資料寫入資料庫的問題
                                    "type": "message",
                                    "label": "新增至我的收藏",
                                    "text": "收藏成功"
                                },
                                {
                                    "type": "uri",
                                    "label": "至文藝富心官網查看",
                                    "uri": "https://weiting.nctu.me/recommend.html"
                                }
                            ]
                          },
                          {
                            "thumbnailImageUrl": "https://weiting.nctu.me/imgs/recommend/exhibition1.jpg#",
                            "title":"【" + msgs[3] + "】" + data[3][0].recomHead,
                            "text": "exhibition1開始日期、創作者、價錢",
                            "defaultAction": {
                                "type": "uri",
                                "label": "詳細資料",
                                "uri": "https://weiting.nctu.me/recommend.html"
                            },
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "知道更多",
                                    "data": data[3][0].recomHead
                                },
                                {
                                  //-------!需克服收藏資料寫入資料庫的問題
                                    "type": "message",
                                    "label": "新增至我的收藏",
                                    "text": "收藏成功"
                                },
                                {
                                    "type": "uri",
                                    "label": "至文藝富心官網查看",
                                    "uri": "https://weiting.nctu.me/recommend.html"
                                }
                            ]
                          }
                    ],
                    "imageAspectRatio": "rectangle",
                    "imageSize": "cover"
                }
            });
        });
    }
    //-----------心情推薦-----------
    if (text == "心情推薦"){
        event.reply({
            "type": "template",
            "altText": "文藝富心",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                      "thumbnailImageUrl": "https://tomlin-app-1.herokuapp.com/imgs/p01.jpg",
                      "imageBackgroundColor": "#FFFFFF",
                      "title": "好心情專區",
                      "text": "適合好心情的語錄",
                      "defaultAction": {
                          "type": "uri",
                          "label": "詳細資料",
                          "uri": "http://weiting.nctu.me/"
                      },
                      "actions": [
                          {
                              "type": "uri",
                              "label": "電影",
                              "uri": "http://weiting.nctu.me/"
                          },
                          {
                              "type": "uri",
                              "label": "音樂",
                              "uri": "http://weiting.nctu.me/"
                          },
                          {
                              "type": "uri",
                              "label": "書籍",
                              "uri": "http://weiting.nctu.me/"
                          }
                      ]
                    },
                    {
                      "thumbnailImageUrl": "https://tomlin-app-1.herokuapp.com/imgs/p02.jpg",
                      "imageBackgroundColor": "#000000",
                      "title": "壞心情專區",
                      "text": "適合壞心情的語錄",
                      "defaultAction": {
                          "type": "uri",
                          "label": "詳細資料",
                          "uri": "http://weiting.nctu.me/"
                      },
                      "actions": [
                        {
                            "type": "uri",
                            "label": "電影",
                            "uri": "http://weiting.nctu.me/"
                        },
                        {
                            "type": "uri",
                            "label": "音樂",
                            "uri": "http://weiting.nctu.me/"
                        },
                          {
                              "type": "uri",
                              "label": "書籍",
                              "uri": "http://weiting.nctu.me/"
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
//-------!註冊機制
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
