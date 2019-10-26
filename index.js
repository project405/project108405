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
// var corsOptions = {
//     origin: 'http://localhost:3000/',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const LinePush = require('./utility/LinePush');
// const byClassData = require('./utility/index');

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
            allUserLineID.push(item.lineID);
            console.log('allUserLineID',allUserLineID)
        });

        var p = allUserLineID.map(item => {
            console.log('item!!', item)
            // console.log('item!!!',item)
            //---------------
        LinePush.getIndexData(item).then(data =>{
            console.log('artiNum@@@@@@@@@@',data[0].artiNum)
            console.log('recomNum@@@@@@@@@@',data[0].recomNum)
            var pushContent = [];
            var pushImg = [];
            //data為文章
            if(data[0].recomHead == undefined){
                pushContent.push('article')
                pushContent.push(data[0].artiNum)
                pushContent.push(data[0].artiHead)
                //處理文章內容
                let articleCont = data[0].artiCont.replace(/<br>/ig, '') 
                
                //有圖片
                if (articleCont.match("\\:imgLocation") != null){
                    var a ;
                    // pushContent.push(articleCont.replace(/\\:imgLocation/ig, ' '));
                    a = articleCont.replace(/\\:imgLocation/ig, ' ');
                    if (a.length >= 50){
                        pushContent.push(a.slice(0,51)+'...')
                    }else{
                        pushContent.push(a)
                    }
                    
                    LinePush.artiImg(data[0].artiNum).then(secondData =>{
                        var img = secondData[0].imgName.replace('data:image/jpeg;base64,', '');
                        
                        LinePush.Imgur(img).then(thirdData => {  
                            pushImg.push(thirdData);
                            console.log('pushIMG!!!!!!!!',pushImg)
                            linePushPhoto(pushImg);
                        }).catch((err)=> {
                            console.log(err)
                        });
                    });   
                }else{
                    pushContent.push(articleCont); 
                    if (articleCont.length >= 60){
                        pushContent.pop()
                        pushContent.push(articleCont.slice(0,61)+'...')
                    }
                    linePush();
                }
            //data為推薦
            }else{
                
                pushContent.push('oneRecommend')
                pushContent.push(data[0].recomNum)
                pushContent.push(data[0].recomHead)
                let recommendCont = data[0].recomCont.replace(/<br>/ig, '') 
                //有圖片
                if (recommendCont.match("\\:imgLocation") != null){
                    var a ;
                    // pushContent.push(articleCont.replace(/\\:imgLocation/ig, ' '));
                    a = recommendCont.replace(/\\:imgLocation/ig, ' ');
                    if (a.length >= 50){
                        pushContent.push(a.slice(0,51)+'...')
                        LinePush.recomImg(data[0].recomNum).then(secondData =>{
                            // if (recommendCont.length >= 60){
                            //     pushContent.pop()
                            //     pushContent.push(recommendCont.slice(0,61)+'...')
                            // }
                            var img = secondData[0].imgName.replace('data:image/jpeg;base64,', '');
                            LinePush.Imgur(img).then(thirdData => {  
                                pushImg.push(thirdData);
                                console.log('pushIMG!!!!!!!!',pushImg)                            
                                linePushPhoto(pushImg);
                            }).catch((err)=> {
                                console.log(err)
                            });
                        }); 
                    }else{
                        pushContent.push(a)
                        LinePush.recomImg(data[0].recomNum).then(secondData =>{
                            // if (recommendCont.length >= 60){
                            //     pushContent.pop()
                            //     pushContent.push(recommendCont.slice(0,61)+'...')
                            // }
                            var img = secondData[0].imgName.replace('data:image/jpeg;base64,', '');
                            LinePush.Imgur(img).then(thirdData => {  
                                pushImg.push(thirdData);
                                console.log('pushIMG!!!!!!!!',pushImg)                            
                                linePushPhoto(pushImg);
                            }).catch((err)=> {
                                console.log(err)
                            });
                        }); 
                    }
                    // pushContent.push(recommendCont.replace(/\\:imgLocation/ig, ' ')); 
                    // LinePush.recomImg(data[0].recomNum).then(secondData =>{
                    //     // if (recommendCont.length >= 60){
                    //     //     pushContent.pop()
                    //     //     pushContent.push(recommendCont.slice(0,61)+'...')
                    //     // }
                    //     var img = secondData[0].imgName.replace('data:image/jpeg;base64,', '');
                    //     LinePush.Imgur(img).then(thirdData => {  
                    //         pushImg.push(thirdData);
                    //         console.log('pushIMG!!!!!!!!',pushImg)                            
                    //         linePushPhoto(pushImg);
                    //     }).catch((err)=> {
                    //         console.log(err)
                    //     });
                    // }); 
                //沒圖片    
                }else{
                    pushContent.push(recommendCont); 
                    if (recommendCont.length >= 60){
                        pushContent.pop()
                        pushContent.push(recommendCont.slice(0,61)+'...')
                    }
                    linePush();
                }
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
                        'Authorization': 'Bearer lG12s3k4ax8boXiwacHC5PHcO4tMpoiSLBPMsaB33DQDJLh5CPPsvlLd1SW/livzu30EnoB0RnZT5G1amnocW4gyZu/xUA4i+4Uer8pR7gswY4mhWG/KWcT2HM2RqS6Ozubx08NFXShqaxf0CqQc7QdB04t89/1O/w1cDnyilFU='
                        
                        // ----------正式line
                        // 'Authorization': 'Bearer xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
                    },
                    // url: 'https://api.line.me/v2/bot/message/multicast',
                    url: 'https://api.line.me/v2/bot/message/push',
                    body: JSON.stringify({
                        //to給資料庫有的使用者
                        // to: allUserLineID,
                        to: item,
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
            function linePushPhoto(pushImg){
                request.post({
                    headers: {
                        'content-type' : 'application/json',
                        //Authorization為Channel access token 
                        // ----------測試line
                        // 'Authorization': 'Bearer QRKiyeWZcixMaO55Yf35KXjZTkrDD70ZAP2gyt8W55aeLgtA75mOVIkOZpruRurKgUgq6ow1+V85huiGRDEBas0Uq57+o4nNREgClY6s+gSg28gC1HNAbELCV7JxGEDlA2bkF8SuWeFNULCG1Z/lwgdB04t89/1O/w1cDnyilFU='
                        // ----------測試line02
                        'Authorization': 'Bearer Z4vMgts4631BG4tdMbxpal4bt8o6ccm03m6jQ6vtlMkpoETTqJYziSEXEchdA3HagjcIvsfkbtkAXCFhi2FcleGZeN5SGna82KtnfHA0dT4gALHq64UV1BPuoJ7Mwua2AkzbdPDUl9Md8ndoxbHcfwdB04t89/1O/w1cDnyilFU='
                        
                        // ----------正式line
                        // 'Authorization': 'Bearer xQw+g1O20RWNkcAoq8UXnPeucNdgBaXKgSv26TQxIUouB1Ld3Y8KpS6vtjWtEldqWl5jRU1Xdp5m0nUUbaKQ7FE+YNVtTQbdGH3D+12qfXFCgk+uXwbgHSbGdmPThSJFvPMqNctqd5jUePtJLTdBggdB04t89/1O/w1cDnyilFU='
                    },
                    // url: 'https://api.line.me/v2/bot/message/multicast',
                    url: 'https://api.line.me/v2/bot/message/push',
                    body: JSON.stringify({
                        //to給資料庫有的使用者
                        // to: allUserLineID,
                        to: item,
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
                                        thumbnailImageUrl: `${pushImg[0]}`,
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
