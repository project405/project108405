//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
//增加引用函式
// const collection = require('./utility/collection');
const index = require('./routes/utility/index');
// const recommend = require('./utility/recommend');

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

// bot.on('message', function(event) {    
//     event.source.profile().then(
//         function (profile) {
//             //取得使用者資料
//             const userName = profile.displayName;
//             const userId = profile.userId;
	    
//             //使用者傳來的學號
//             const text = event.message.text;
          
//             //呼叫API取得熱門文章
//             // if (text == "熱門"){
//                 index.getIndexData().then(data => {  
//                     // console.log(data);
//                     console.log(data[0].weekRecommend);
//                     // event.reply([
//                     //     {'type':'text', 'text':data[0].recomHead},
//                     //     {'type':'text', 'text':data[0].recomCont},
//                     //     {'type':'text', 'text':data[0].recomClass},
//                     //     {'type':'text', 'text':userName},
//                     //     {'type':'text', 'text':"http://weiting.nctu.me/logIn.html/"+userId}]
//                     // );  
                  
//                 }) 
//             // }
             
//         }
//     );
// });
//------------本週推薦------------
// bot.on('message', function(event) {    
//     event.source.profile().then(
//         function (profile) {
//             //取得使用者資料
//             const userName = profile.displayName;
//             const userId = profile.userId;
	    
//             //使用者傳來的按鈕文字
//             const text = event.message.text;
//             //存放本週推薦資料
//             let msg = [];
//             //呼叫API取得本週推薦
//             if (text == "本週推薦"){
            
//                 recommend.getRecomMovie(text).then(data => { 
//                     msg.push({'type':'text', 'text':data[0].recomClass},
//                             {'type':'text', 'text':data[0].recomHead},
//                             {'type':'text', 'text':data[0].recomCont}) 
//                     event.reply(msg); 
//                 })
                
//                 recommend.getRecomMusic(text).then(data => {     
//                     msg.push({'type':'text', 'text':data[0].recomClass},
//                             {'type':'text', 'text':data[0].recomHead},
//                             {'type':'text', 'text':data[0].recomCont}) 
//                     event.reply(msg);         
//                 })

//                 recommend.getRecomBook(text).then(data => {      
//                     msg.push({'type':'text', 'text':data[0].recomClass},
//                             {'type':'text', 'text':data[0].recomHead},
//                             {'type':'text', 'text':data[0].recomCont}) 
//                     event.reply(msg); 
//                 })

//                 recommend.getRecomExhibition(text).then(data => {  
//                     msg.push({'type':'text', 'text':data[0].recomClass},
//                             {'type':'text', 'text':data[0].recomHead},
//                             {'type':'text', 'text':data[0].recomCont}) 
//                     console.log(msg);  
//                     event.reply(msg);                                  
//                 })
                        
//             }
             
//         }
//     );
// });

bot.on('message', function(event) {    
    event.source.profile().then(
        function (profile) {
            //取得使用者資料
            const userName = profile.displayName;
            const userId = profile.userId;
	    
            //使用者傳來的學號
            const no = event.message.text;
          
            //呼叫API取得學生資料
            index.getIndexData(no).then(data => {  
                if (data == -1){
                    event.reply('找不到資料');
                }else if(data == -9){                    
                    event.reply('執行錯誤');
                }else{
                    event.reply([
                        {'type':'text', 'text':data.stuno},
                        {'type':'text', 'text':data.stuname},
                        {'type':'text', 'text':data.gender}]
                    );  
                }  
            })  
        }
    );
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


//----------------------------------------
// 監聽3000埠號, 
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function() {
    const port = server.address().port;
    console.log("正在監聽埠號:", port);
});
