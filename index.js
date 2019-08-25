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
//------------ 本週推薦 ------------
bot.on('message',async function (event) {    

    //使用者傳來的文字
    const text = event.message.text;
    //存放本週推薦類別
    let msgs = ['電影','音樂','書籍','展覽'];
    let recommendData = [];
    // let recommendData = [];
    //呼叫API取得本週推薦
    if (text == "本週推薦") {
        
        msgs.map( (msg,index) => {
            console.log(index)
            console.log(msg)
            recommend.getRecomClassList().then(data => { 
                console.log('==========================>')
                // console.log('data!!!!!!!',data[0][0])
                recommendData.push(data);
                console.log('recommendData',recommendData)
                // console.log('recommendData=============>',recommendData)
            }); 
        })

        console.log('recommendDataOutside',recommendData)
        // console.log(data[0][0].recomClass);
        // console.log(data[0][0].recomHead);
        // console.log(data[0][0].recomCont);
        // console.log("1",data[0][0].recomClass)
        event.reply([
            // {'type':'text', 'text':`${recommendData[0].recomClass}${recommendData[0].recomHead}${recommendData[0].recomCont}`},
            // {'type':'text', 'text':`${recommendData[1].recomClass}${recommendData[1].recomHead}${recommendData[1].recomCont}`},
            // {'type':'text', 'text':`${recommendData[2].recomClass}${recommendData[2].recomHead}${recommendData[2].recomCont}`},
            // {'type':'text', 'text':`${recommendData[3].recomClass}${recommendData[3].recomHead}${recommendData[3].recomCont}`}   
        ]);
        // event.reply([
        //     {'type':'text', 'text':data[0][0].recomClass+data[0][0].recomHead+data[0][0].recomCont}          
        // ]);   
          
    }      
});

function _pushRecommendData() {
    for(let i = 0;i<msg.length;i++){
        console.log('B');
        recommend.getRecomClassList(msg[i]).then(data => { 
            console.log('==========================>')
            // console.log('data!!!!!!!',data[0][0])
            this.recommendData.push(data[0][0]);
            console.log('recommendData來瞜~~~',this.recommendData)
            // console.log('recommendData=============>',recommendData)
        });     
    }
}
//--------------------------------




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
