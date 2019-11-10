//----------------------------------------
// 載入必要的模組
//----------------------------------------
// const fetch = require("node-fetch");
// const cheerio = require('cheerio');
const bodyParser = require('body-parser');
var linebot = require('linebot');
var express = require('express');
const request = require('request');
// var rp = require('request-promise');

const app = express();
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const LinePush = require('./utility/LinePush');

//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1653312089',
    channelSecret: 'f582b751649f1b57f33910c0238113eb',
    channelAccessToken: 'QRKiyeWZcixMaO55Yf35KXjZTkrDD70ZAP2gyt8W55aeLgtA75mOVIkOZpruRurKgUgq6ow1+V85huiGRDEBas0Uq57+o4nNREgClY6s+gSg28gC1HNAbELCV7JxGEDlA2bkF8SuWeFNULCG1Z/lwgdB04t89/1O/w1cDnyilFU='
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
    let allUserLineID = [];
    LinePush.AllMember().then(data => { 
        data.forEach(item => {
            if(item.lineID != ''){
                allUserLineID.push(item.lineID);
                console.log('allUserLineID',allUserLineID)
            }
        });

        var p = allUserLineID.map(item => {
            console.log('item!!', item)
            
        LinePush.getIndexData(item).then(data =>{
            // linePushPhoto();
            // console.log('data[0]',data[0])
            // console.log('artiNum@@@@@@@@@@',data[0].artiNum)
            // console.log('recomNum@@@@@@@@@@',data[0].recomNum)
            let pushClass = [];
            let pushNum = [];
            let pushHead = [];
            let pushCont = [];
            let pushImg = [] ;
            
            //data為文章
            if(data[0].recomHead == undefined){
                data[0].artiCont = data[0].artiCont.replace(/\n/g,' ').replace(/\r/g,' ').replace(/<br>/g,' ').replace(/\\:imgLocation/g, ' ');
                data[0].artiCont = data[0].artiCont.length>50 ? `${data[0].artiCont.substr(0,51)}...` : data[0].artiCont

                pushClass.push('article')
                pushNum.push(data[0].artiNum)
                pushHead.push(data[0].artiHead)
                pushCont.push(data[0].artiCont)

                if(data[0].imgName){
                    if(data[0].imgName.match('data:image/jpeg;base64,') != null){
                        var img = data[0].imgName.replace('data:image/jpeg;base64,', '');
                        LinePush.Imgur(img).then(imgurData => { 
                            pushImg.push(imgurData);
                        });
                    }else{
                        pushImg.push(data[0].imgName);
                    }
                }else{
                    pushImg.push('https://i.imgur.com/oNykVvA.jpg');
                }   

                linePushPhoto();

                //有圖片
                // if (data[0].artiCont.match("\\:imgLocation") != null){
                //     console.log('文章～有進來圖片這區')
                //     // var pushImg = [];
                //     LinePush.artiImg(data[0].artiNum).then(secondData =>{
                //         var img = secondData[0].imgName.replace('data:image/jpeg;base64,', '');
                       
                //             LinePush.Imgur(img).then(thirdData => {  
                //                 pushImg = thirdData;
                //                 console.log('pushImg',pushImg)             
                //                 // linePushPhoto(pushImg[0]);
                //                 linePushPhoto();
                                
                //             }).catch((err)=> {
                //                 console.log(err)
                //             });
                //     }); 
                
                // }else{
                    
                //     linePush();
                // }
            //data為推薦
            }else{
                data[0].recomCont = data[0].recomCont.replace(/\n/g,' ').replace(/\r/g,' ').replace(/<br>/g,' ').replace(/\\:imgLocation/g, ' ');
                data[0].recomCont = data[0].recomCont.length>50 ? `${data[0].recomCont.substr(0,51)}...` : data[0].recomCont

                pushClass.push('oneRecommend')
                pushNum.push(data[0].recomNum)
                pushHead.push(data[0].recomHead)
                pushCont.push(data[0].recomCont)

                if(data[0].imgName){
                    if(data[0].imgName.match('data:image/jpeg;base64,') != null){
                        var img = data[0].imgName.replace('data:image/jpeg;base64,', '');
                        LinePush.Imgur(img).then(imgurData => { 
                            pushImg.push(imgurData);
                        });
                    }else{
                        pushImg.push(data[0].imgName);
                    }
                }else{
                    pushImg.push('https://i.imgur.com/oNykVvA.jpg');
                }  

                linePushPhoto();
                
                //有圖片
                // if (data[0].recomCont.match("\\:imgLocation") != null){
                //     // var pushImg = [];

                //     // pushContent.push(recommendCont.replace(/\\:imgLocation/ig, ' ')); 
                //     LinePush.recomImg(data[0].recomNum).then(secondData =>{
                //         console.log('推薦～有進來圖片這區')
                        
                //         var img = secondData[0].imgName.replace('data:image/jpeg;base64,', '');
                        
                //             LinePush.Imgur(img).then(thirdData => {  
                //                 pushImg = thirdData;
                //                 console.log('pushImg',pushImg)                     
                //                 // linePushPhoto(pushImg[0]);
                //                 linePushPhoto();
                                
                //             }).catch((err)=> {
                //                 console.log(err)
                //             });
                      
                //     }); 
                    
                    
                // //沒圖片    
                // }else{
                    
                //     linePush();
                // }
            }
             
            console.log(pushContent)
            //文章、推薦內容無圖片的推播樣式
            function linePush (){
                request.post({
                    headers: {
                        'content-type' : 'application/json',
                        //Authorization為Channel access token 
                        // ----------測試line
                        // 'Authorization': 'Bearer QRKiyeWZcixMaO55Yf35KXjZTkrDD70ZAP2gyt8W55aeLgtA75mOVIkOZpruRurKgUgq6ow1+V85huiGRDEBas0Uq57+o4nNREgClY6s+gSg28gC1HNAbELCV7JxGEDlA2bkF8SuWeFNULCG1Z/lwgdB04t89/1O/w1cDnyilFU='
                        // ----------測試line02
                        'Authorization': 'Bearer R8lcHnPCuZUl1bN572jcpz1z17xTC0nmXBuGBzDbBpsvPXd8uLhbJxsYw0xKzlqJuEOUmPkMg4R50tsO/HS3xer18+xRNAK27JyiS1Maj+v2MefUSMQpz1hxfyFMBCKdk5bAmsRhBbM3nEVtsJjCxgdB04t89/1O/w1cDnyilFU='
                         // ----------測試line03
                        //  'Authorization': 'Bearer sNG39VZmWkxEenq69AMr9p5efUTvBgarZEAbZrwLBeYH9n9U/23n9F9NCHdgjig/n/bnvrJXzfg/gDJ+9S53WbREjrSak4stPMhPJsXnqIN0Q3AwM5+dsQgz9ApIyNWC90QTjDvvn64eI00q/bdkoQdB04t89/1O/w1cDnyilFU='
                        // ----------正式line
                        // 'Authorization': 'Bearer xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
                    },
                    // url: 'https://api.line.me/v2/bot/message/multicast',
                    url: 'https://api.line.me/v2/bot/message/push',
                    body: JSON.stringify({
                        //to給資料庫有的使用者
                        // to: allUserLineID,
                        // to: item,
                        to:'U2251202deb66b8a73da26e53c8399a13',
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
                                          "uri": `https://project108405.herokuapp.com/${pushContent[0]}/${pushContent[1]}`
                                        }
                                      ]
                                    }
                                },
                                {
                                    type: "template",
                                    altText: "相信你會喜歡😎",
                                    template: {
                                        type: "confirm",
                                        text: `🔸標題：${pushContent[2]}\n🔹內容：${pushContent[3]}`,
                                        actions: [
                                            {  
                                                "type":"postback",
                                                "label":"我喜歡",
                                                "data":`${pushContent[0]}`+`${pushContent[1]}`
                                            },
                                            {  
                                                "type":"postback",
                                                "label":"我不喜歡",
                                                "data":'dislike'
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
                // console.log(url)
                request.post({
                    headers: {
                        'content-type' : 'application/json',
                        //Authorization為Channel access token 
                        // ----------測試line02
                        'Authorization': 'Bearer R8lcHnPCuZUl1bN572jcpz1z17xTC0nmXBuGBzDbBpsvPXd8uLhbJxsYw0xKzlqJuEOUmPkMg4R50tsO/HS3xer18+xRNAK27JyiS1Maj+v2MefUSMQpz1hxfyFMBCKdk5bAmsRhBbM3nEVtsJjCxgdB04t89/1O/w1cDnyilFU='
                        // ----------測試line03
                        // 'Authorization': 'Bearer sNG39VZmWkxEenq69AMr9p5efUTvBgarZEAbZrwLBeYH9n9U/23n9F9NCHdgjig/n/bnvrJXzfg/gDJ+9S53WbREjrSak4stPMhPJsXnqIN0Q3AwM5+dsQgz9ApIyNWC90QTjDvvn64eI00q/bdkoQdB04t89/1O/w1cDnyilFU='
                        // ----------正式line
                        // 'Authorization': 'Bearer xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
                    },
                    // url: 'https://api.line.me/v2/bot/message/multicast',
                    url: 'https://api.line.me/v2/bot/message/push',
                    body: JSON.stringify({
                        //to給資料庫有的使用者
                        // to: allUserLineID,
                        // to: item,
                        to:'U2251202deb66b8a73da26e53c8399a13',
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
                                          "uri": `https://project108405.herokuapp.com/${pushContent[0]}/${pushContent[1]}`
                                        }
                                      ]
                                    }
                                },
                                {
                                    type: "template",
                                    altText: "相信你會喜歡😎",
                                    template: {
                                        type: "buttons",
                                        thumbnailImageUrl: `${pushImg}`,
                                        imageAspectRatio: "rectangle",
                                        imageSize: "cover",
                                        imageBackgroundColor: "#FFFFFF",
                                        title: `${pushContent[2]}`,
                                        text: `${pushContent[3]}`,
                                        defaultAction: {
                                            "type": "uri",
                                            "label": "View detail",
                                            "uri": "http://example.com/page/123"
                                        },
                                        actions: [
                                            {  
                                                "type":"postback",
                                                "label":"我喜歡",
                                                "data":`${pushContent[0]}`+`${pushContent[1]}`
                                            },
                                            {  
                                                "type":"postback",
                                                "label":"我不喜歡",
                                                "data":'dislike'
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
   
        });
        //---------------
        })
        
    });
});
