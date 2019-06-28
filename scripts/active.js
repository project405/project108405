// 點擊其他地方收navbar
$(function() {
    $(document).click(function(event) {
        $('.navbar-collapse').collapse('hide');
    });
});

// tag div css
$(function() {
    $("input").focus(function() {
        $("div.tag").css("box-shadow", "0 5px 15px rgba(0, 0, 0, 0.3)");
        $("div.tag").css("transition", "0.3s ease-in-out");
    });
    $("input").blur(function() {
        $("div.tag").css("box-shadow", "none");

    });
});

// 隨著留言增加height增加
// jQuery.fn.extend({
//     autoHeight: function() {
//         return this.each(function() {
//             var $this = jQuery(this);
//             if (!$this.attr('_initAdjustHeight')) {
//                 $this.attr('_initAdjustHeight', $this.outerHeight());
//             }
//             _adjustH(this).on('input', function() {
//                 _adjustH(this);
//             });
//         });
//         /**
//          * 重置高度 
//          * @param {Object} elem
//          */
//         function _adjustH(elem) {
//             var $obj = jQuery(elem);
//             return $obj.css({ height: $obj.attr('_initAdjustHeight'), 'overflow-y': 'hidden' })
//                 .height(elem.scrollHeight);
//         }
//     }
// });
// 使用
// $(function() {
//     $('#textarea').autoHeight();
// });


//gotop
$(function() {
    /* 按下GoTop按鈕時的事件 */
    $('#gotop').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow'); /* 返回到最頂上 */
        return false;

    });

    /* 偵測卷軸滑動時，往下滑超過400px就讓GoTop按鈕出現 */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });
});

//bottom

$("#goBottom").click(function() {
    $('html,body').animate({ scrollTop: $('#reply').offset().top }, 1000);

});



//goDown

$('#goDown').click(function() {
    $('html,body').animate({ scrollTop: $('#block').offset().top }, 800);
});


// report

$(document).ready(function() {
    $("#x").click(function() {
        $("#report").hide();
    });
    $("#navReport").click(function() {
        $("#report").show();
        $('.navbar-collapse').collapse('hide');
    });
    $("#postReport").click(function() {
        $("#report").show();
    });

});

//格式化可編輯的div裡的文字
document.querySelector('div[contenteditable="true"]').addEventListener("paste", function(e) {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
});


[].forEach.call(document.querySelectorAll('div[contenteditable="true"]'), function(el) {
    el.addEventListener('paste', function(e) {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
    }, false);
});

$(function() {

    // 選取到檔案後開始動作
    $('#file-selector').change(function(event) {

        /**
         * 宣告fileList來存取檔案(能夠多個)
         * 用window將fileList宣告成全域變數
         * 讓除了file-selector的外元素能夠存取圖片
         */
        window.fileList = event.target.files;

        var formData = new window.FormData(); // 建立formData物件

        // 讀取fileList陣列(上傳多個檔案的話)
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i];
            /**
             * 如果有要POST檔案到後端才會用到這行
             * test將會是POST檔案的名稱
             * 如果是多個檔案可存成formData.append('test'+i,file);
             * formData內的檔案將會變成test0 , test1 ..... testn
             * 後面的php解析檔案的部分會詳細解說
             */
            formData.append('test', file);

            // 解析檔案
            var reader = new FileReader();
            reader.onload = (function(file) {

                return function(event) {
                    var src = event.target.result // 圖片的編碼 , 格式為base64

                    var title = escape(file.name);
                    var img = '<img id="upload-img" src="' + src + '" title="' + title + '" /> ';

                    // 到這邊 , 我們已經能後用js存取圖片並顯示了
                    $('#replyInput').append('<div id="replyInput">' + img + '</div>');
                    $('#postInput').append('<div id="postInput">' + img + '</div>');

                };
            })(file);

            reader.readAsDataURL(file);
        }

        /**
         * 上面的流程就是在client端存取圖片
         * 如果有要傳送到後端
         * 可以接著使用下面的code
         */

        // 新增要POST的變數 , 然後塞入formData內
        // formData.append('action', 'uploadImg');

        // $.ajax({
        //     url: 'upload.php',
        //     data: formData,
        //     cache: false,
        //     contentType: false,
        //     processData: false,
        //     type: 'POST',
        //     success: function(data) {
        //         console.log(data);
        //     },
        //     error: function(err) {
        //         console.log(err);
        //     }
        // });
    });
});