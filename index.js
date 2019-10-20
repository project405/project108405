//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
//增加引用函式
// const collection = require('./utility/collection');
const index = require('./routes/utility/index');
const login = require('./routes/utility/login');
const collection = require('./routes/utility/collection');
const recommend = require('./routes/utility/recommend');
const mood = require('./routes/utility/mood');
const linePush = require('./routes/utility/linePush');



//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1594135622',
    channelSecret: 'c503bd8ed4d7b8e183333309ddd135fd',
    channelAccessToken: 'xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
});


//========================================
// 機器人接受回覆的處理
//========================================
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
            var myLineTemplate={
                type: 'template',
                altText: '很抱歉您未綁定line',
                template: {
                    type: 'buttons',
                    text: 'LINE用戶請至文藝富心登入\n登入後能：\n1.在LINE收藏你喜歡的事物\n2.不定時收到文藝相關資訊',
                    actions: [{
                        type:"uri",
                        label:" 👣 至文藝富心官網登入",
                        // uri:"line://app/1594135622-705e8pDP"   
                        uri: "line://app/1594135622-82v9mEZq"

                    }]
                }
            };
            
            
            if (data == 'movie' ||data == 'music' ||data == 'book' || data =='exhibition'){
               
                //---------------進到四大推薦---------------
                recommend.getFourRecomClassList().then(d =>{
                    d[0][0].recomCont = d[0][0].recomCont.length>75 ? `${d[0][0].recomCont.substr(0,75)}...` : d[0][0].recomCont
                    d[1][0].recomCont = d[1][0].recomCont.length>75 ? `${d[1][0].recomCont.substr(0,75)}...` : d[1][0].recomCont
                    d[2][0].recomCont = d[2][0].recomCont.length>75 ? `${d[2][0].recomCont.substr(0,75)}...` : d[2][0].recomCont
                    d[3][0].recomCont = d[3][0].recomCont.length>75 ? `${d[3][0].recomCont.substr(0,75)}...` : d[3][0].recomCont
                    if (data == 'movie'){
                        return event.reply([
                            {
                                "type": "template",
                                "altText": "精選電影",
                                "template": {
                                  "type": "buttons",
                                  "text": d[0][0].recomCont,
                                  "actions": [
                                    {
                                      "type": "uri",
                                      "label": " 👀 至文藝富心官網觀看",
                                      "uri": `https://project108405.herokuapp.com/oneRecommend/${d[0][0].recomNum}`
                                    }
                                  ]
                                }
                            }
                        ]);		
                    }else if(data == 'music'){
                        return event.reply([
                            {
                                "type": "template",
                                "altText": "精選音樂",
                                "template": {
                                  "type": "buttons",
                                  "text": d[1][0].recomCont,
                                  "actions": [
                                    {
                                      "type": "uri",
                                      "label": " 👀 至文藝富心官網觀看",
                                      "uri": `https://project108405.herokuapp.com/oneRecommend/${d[1][0].recomNum}`
                                    }
                                  ]
                                }
                            }
                        ]);		
                    }else if(data == 'book'){
                        return event.reply([
                            {
                                "type": "template",
                                "altText": "精選書籍",
                                "template": {
                                  "type": "buttons",
                                  "text": d[2][0].recomCont,
                                  "actions": [
                                    {
                                      "type": "uri",
                                      "label": " 👀 至文藝富心官網觀看",
                                      "uri": `https://project108405.herokuapp.com/oneRecommend/${d[2][0].recomNum}`
                                    }
                                  ]
                                }
                            }
                        ]);		
                    }else if(data == 'exhibition'){
                        return event.reply([
                            {
                                "type": "template",
                                "altText": "精選展覽",
                                "template": {
                                  "type": "buttons",
                                  "text": d[3][0].recomCont,
                                  "actions": [
                                    {
                                      "type": "uri",
                                      "label": " 👀 至文藝富心官網觀看",
                                      "uri": `https://project108405.herokuapp.com/oneRecommend/${d[3][0].recomNum}`
                                    }
                                  ]
                                }
                            }
                        ]);		
                    }    
                });
            }else if (data.match("article") || data.match("recommend")){
                console.log('＠＠＠＠＠＠＠＠＠＠＠進入推播喜愛')
                if(data.match("article")){
                    var spliceData = data.replace('article','')
                    console.log('切割後的data!!!!!!!!',spliceData)
                    linePush.AddArticleLike(userId,spliceData).then(data =>{
                        console.log(data)

                    })

                }else{
                    var spliceData = data.replace('recommend','')
                    console.log('切割後的data!!!!!!!!',spliceData)
                    linePush.AddRecommendLike(userId,spliceData).then(data =>{
                        console.log(data)

                    })
                }
                
            }else{
                login.userJudgeBind(userId).then(d =>{
                    if(d.length !== 0){                         
                        if(d[0].lineID == userId){
                            collection.addLineColleRecommend(d[0].memID, parseInt(data)).then(b =>{
                                console.log(b)
                                if(b == 0){
                                    event.reply({
                                        "type": "template",
                                        "altText": "已重複收藏 ❌ ",
                                        "template": {
                                          "type": "buttons",
                                          "text": '          '+userName+' 已重複收藏 ❌ ',
                                          "actions": [
                                            {
                                              "type": "uri",
                                              "label": " 👀 查看所有收藏",
                                              "uri": `https://project108405.herokuapp.com/collection/recommend`
                                            }
                                          ]
                                        }
                                    })
                                }else{
                                    event.reply({
                                        "type": "template",
                                        "altText": "已收藏成功 😍",
                                        "template": {
                                          "type": "buttons",
                                          "text": '          '+userName+' 已收藏成功 😍 ',
                                          "actions": [
                                            {
                                              "type": "uri",
                                              "label": " 👀 查看所有收藏",
                                              "uri": `https://project108405.herokuapp.com/collection/recommend`
                                            }
                                          ]
                                        }
                                    })
                                    
                                }
                            })                            
                        }
                        
                    }else{
                        event.reply(myLineTemplate)
                    }
                })  
            }         
    });    
});



//----------------成功
//網址需連到heroku、圖片也是
bot.on('message', function(event) {
    event.source.profile().then(
        function (profile) {
            
            const userName = profile.displayName;
            const userId = profile.userId;
            
    //使用者傳來的文字
    const text = event.message.text;
    
    //存放本週推薦類別
    let msgs = ['電影','音樂','書籍','展覽'];
   //------------------------------------------------
   //------------------顯示熱門文章--------------------
   //------------------------------------------------
   
    if (text == "熱門文章") {
        index.getIndexData().then(data => {
            data[1][0].artiCont = data[1][0].artiCont.length>25 ? `${data[1][0].artiCont.substr(0,20)}...` : data[1][0].artiCont
            data[1][1].artiCont = data[1][1].artiCont.length>25 ? `${data[1][1].artiCont.substr(0,25)}...` : data[1][1].artiCont
            data[1][2].artiCont = data[1][2].artiCont.length>25 ? `${data[1][2].artiCont.substr(0,25)}...` : data[1][2].artiCont
            event.reply({
                "type": "template",
                "altText": "熱門文章",
                "template": {
                    "type": "carousel",
                    "columns": [
                        {
                            "title": "【" + data[1][0].artiHead + "】" ,
                            "text":'時間：' + data[1][0].artiDateTime  + '\n' + data[1][0].artiCont ,
                            "actions": [
                                
                                {
                                    "type": "uri",
                                    "label": " 👀 至文藝富心官網觀看",
                                    "uri": `https://project108405.herokuapp.com/article/${data[1][0].artiNum}`
                                }
                            ]
                        },
                        {
                            "title": "【" + data[1][1].artiHead + "】" ,
                            "text":'時間：' + data[1][1].artiDateTime  + '\n'+  data[1][1].artiCont,
                            "actions": [
                                
                                {
                                    "type": "uri",
                                    "label": " 👀 至文藝富心官網觀看",
                                    "uri": `https://project108405.herokuapp.com/article/${data[1][1].artiNum}`
                                }
                            ]
                        },
                        {
                            "title": "【" + data[1][2].artiHead + "】" ,
                            "text":'時間：' + data[1][2].artiDateTime  + '\n'+ data[1][2].artiCont,
                            "actions": [
                                
                                {
                                    "type": "uri",
                                    "label": " 👀 至文藝富心官網觀看",
                                    "uri": `https://project108405.herokuapp.com/article/${data[1][2].artiNum}`
                                }
                            ]
                        }      
                    ]
                    // ,
                    // "imageAspectRatio": "rectangle",
                    // "imageSize": "cover"
                }
            });
           

        })
    };
    
    function DateTimeFormat (time){
        
        var dt = new Date(time);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        var date = dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
        var formatData = date.split(' ')[0]
        return formatData;
    }

    //-----------本週推薦-----------
	if(text == '本週推薦'){
        recommend.getFourRecomClassList().then(data =>{
            
            
           
            console.log('@@@@@@@@@@@@',typeof(data[0][0].recomDateTime))
            console.log('@@@@@@@@@@@@',data[0][0].recomDateTime)

            var movieNum = data[0][0].recomNum;
            var musicNum = data[1][0].recomNum;
            var bookNum = data[2][0].recomNum;
            var exhibitionNum = data[3][0].recomNum;

            // console.log(movieNum);
            // console.log(musicNum);
            // console.log(bookNum);
            // console.log(exhibitionNum);

            event.reply({
                "type": "template",
                "altText": " 👋 本週新推薦",
                "template": {
                    "type": "carousel",
                    "columns": [
                        {
                          "thumbnailImageUrl": "https://project108405.herokuapp.com/imgs/recommend/movie1.jpg",
                          "title": "【" + msgs[0] + "】" + data[0][0].recomHead,
                          "text": DateTimeFormat(data[0][0].recomDateTime),
                          "defaultAction": {
                              "type": "uri",
                              "label": "知道更多",
                              "uri": `https://project108405.herokuapp.com/oneRecommend/${data[0][0].recomNum}`
                          },
                          "actions": [
                              {
                                  "type": "postback",
                                  "label": "劇情概要",
                                  "data": 'movie'
                              },
                              {
                                
                                  "type": "postback",
                                  "label": "新增至我的收藏",
                                  "data": movieNum
                              }
                          ]
                        },
                        {
                          "thumbnailImageUrl": "https://project108405.herokuapp.com/imgs/recommend/music1.jpg",
                          "title":"【" + msgs[1] + "】" + data[1][0].recomHead,
                          "text": DateTimeFormat(data[1][0].recomDateTime),
                          "defaultAction": {
                              "type": "uri",
                              "label": "詳細資料",
                              "uri": `https://project108405.herokuapp.com/oneRecommend/${data[1][0].recomNum}`
                          },
                          "actions": [
                                {
                                    "type": "postback",
                                    "label": "音樂資訊",
                                    "data": 'music'
                                },
                                {
                               
                                    "type": "postback",
                                    "label": "新增至我的收藏",
                                    "data": musicNum
                                }
                            ]   
                        },
                        {
                            "thumbnailImageUrl": "https://project108405.herokuapp.com/imgs/recommend/book1.jpg",
                            "title":"【" + msgs[2] + "】" + data[2][0].recomHead,
                            "text": DateTimeFormat(data[2][0].recomDateTime),
                            "defaultAction": {
                                "type": "uri",
                                "label": "詳細資料",
                                "uri": `https://project108405.herokuapp.com/oneRecommend/${data[2][0].recomNum}`
                            },
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "書籍資訊",
                                    "data": 'book'
                                },
                                {
                                  
                                    "type": "postback",
                                    "label": "新增至我的收藏",
                                    "data": bookNum
                                }
                            ]
                          },
                          {
                            "thumbnailImageUrl": "https://project108405.herokuapp.com/imgs/recommend/exhibition1.jpg",
                            "title":"【" + msgs[3] + "】" + data[3][0].recomHead,
                            "text": DateTimeFormat(data[3][0].recomDateTime),
                            "defaultAction": {
                                "type": "uri",
                                "label": "詳細資料",
                                "uri": `https://project108405.herokuapp.com/oneRecommend/${data[3][0].recomNum}`
                            },
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "展覽內容",
                                    "data": 'exhibition'
                                },
                                {
                                 
                                    "type": "postback",
                                    "label": "新增至我的收藏",
                                    "data": exhibitionNum
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
        // app.get('/', function () {
            // let negative;
            // let positive;
            // let result = [1,2];
            
            // mood.getMood().then(data => { 
            //     console.log('data!!!!!!!!!!!!!!',data)
            //     data.map((item, index) => {
            //         if (item && index <= 1) {
            //             // 負面

            //             if (Object.keys(item[0]).indexOf('recomCont') >= 0) {
            //                 negative = item.recomCont > 75 ? `${item.recomCont.substr(0,75)}...` : item.recomCont
            //             } else {
            //                 negative = item.artiCont > 75 ? `${item.artiCont.substr(0,75)}...` : item.artiCont
            //             } 
            //             result[0] = negative

            //         } else {
            //             // 正面
                        
            //             if (Object.keys(item[0]).indexOf('recomCont') >= 0) {
            //                 positive = item.recomCont > 75 ? `${item.recomCont.substr(0,75)}...` : item.recomCont
            //             } else {
            //                 positive = item.artiCont > 75 ? `${item.artiCont.substr(0,75)}...` : item.artiCont
            //             } 
            //             result[1] = positive
                        
            //         }
            //         console.log('result@@@@@@@@@@@@@',result)
            //     })
            // })

            // console.log('為廷的router@@@@@@@@@@@@@',result)
        // });
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
                            "type":"postback",
                            "label":"article3有",
                            "data":'article3'
                          },
                          {
                            "type":"postback",
                            "label":"recommend14",
                            "data":'recommend14'
                          },
                          {
                            "type":"postback",
                            "label":"article8沒有",
                            "data":'article8'
                          },
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
        
    // }
       
    console.log('使用者傳來的文字',text);
    })
});




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


//接收GET請求

//----------------------------------------
// 監聽3000埠號, 
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function() {
    const port = server.address().port;
    console.log("正在監聽埠號:", port);
});
