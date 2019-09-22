
{
    type: 'template',
    altText: '🔥 熱門文章',
    template: {
        type: 'buttons',
        text: '時間：' + data[1][0].artiDateTime  + '\n'+ '標題：' + data[1][0].artiHead,
        actions: [{
            type:"uri",
            label:" 👀 至文藝富心官網觀看",
            uri:`https://project108405.herokuapp.com/article/${data[1][0].artiNum}`   
        }]
    }
}
if(text == '熱門文章'){
    recommend.getFourRecomClassList().then(data =>{
        
        event.reply({
            "type": "template",
            "altText": "熱門文章",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        // "title": "【" + msgs[0] + "】" + data[0][0].recomHead,
                        "text":'時間：' + data[1][0].artiDateTime  + '\n'+ '標題：' + data[1][0].artiHead,
                        "actions": [
                            
                            {
                                "type": "uri",
                                "label": " 👀 至文藝富心官網觀看",
                                "uri": `https://project108405.herokuapp.com/article/${data[1][0].artiNum}`
                            }
                        ]
                    },
                    {
                        // "title": "【" + msgs[0] + "】" + data[0][0].recomHead,
                        "text":'時間：' + data[1][0].artiDateTime  + '\n'+ '標題：' + data[1][0].artiHead,
                        "actions": [
                            
                            {
                                "type": "uri",
                                "label": " 👀 至文藝富心官網觀看",
                                "uri": `https://project108405.herokuapp.com/article/${data[1][0].artiNum}`
                            }
                        ]
                    }    
                ]
                // ,
                // "imageAspectRatio": "rectangle",
                // "imageSize": "cover"
            }
        });
    });
}
   