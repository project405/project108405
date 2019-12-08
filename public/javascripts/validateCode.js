$(document).ready(function() {
    liff.init(
        data => {
            // Now you can call LIFF API
            const userId = data.context.userId;
            const accessToken = liff.getAccessToken();
            console.log('getThis',$(this).find('#lineID').val(userId));
        },
        err => {
            // LIFF initialization failed
            console.error(err)
        }
        );
})

var code; //在全局定義驗證碼
//產生驗證碼
window.onload = function() {    
    createCode();
}

function createCode() {    
    code = "";    
    var codeLength = 5; //驗證碼的長度
    var checkCode = document.getElementById("checkCode");    
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',         'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //隨機數
        
    for (var i = 0; i < codeLength; i++) { //循環操作
             
        var charIndex = Math.floor(Math.random() * 36); //取得隨機數的索引     
        code += random[charIndex]; //根據索引取得隨機數加到code上
            
    }    
    checkCode.value = code; //把code值賦給驗證碼
}
//校驗驗證碼
function validateCode() {    
    var inputCode = document.getElementById("input").value.toUpperCase(); //取得輸入的驗證碼並轉化為大寫
    if (inputCode.length <= 0) { //若輸入的驗證碼長度為0
                 alert("請輸入驗證碼！"); //則彈出請輸入驗證碼
             } else if (inputCode != code) { //若輸入的驗證碼與產生的驗證碼不一致時
                
        alert("驗證碼輸入錯誤！"); //則彈出驗證碼輸入錯誤    
        createCode(); //刷新驗證碼
        return false;
            
    } else { //輸入正確時   
        document.getElementById("login").submit();
        return check = true;    

    }
}