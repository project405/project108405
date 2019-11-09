function getOriginalSize(imgData) {
    return new Promise(function(resolve, reject) {
        var template = new Image();
        template.src = imgData
        template.onload = function() {
            while(this.width >= 750 ||　this.height >= 600) {
                if (this.width >= 750 || this.height >= 600) {
                    this.width = this.width * 0.85
                    this.height = this.height * 0.85
                }
            } 
            var size = {
                originWidth: this.width,
                originHeight: this.height
            }
            resolve(size)
        }
    })
}
function drawToCanvas(imgData, originWidth, originHeight) {
    return new Promise(function(resolve, reject) {
        var canvas = document.createElement("canvas"); 
        canvas.width= originWidth;
        canvas.height= originHeight;
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.src = imgData;
        img.onload = function(){ //必須onload之後再畫
            ctx.drawImage(img, 0, 0, originWidth, originHeight);
            strDataURI = canvas.toDataURL('image/jpeg', 0.5);//獲取canvas base64資料
            resolve(strDataURI)
        }
    })
}