// 隨著留言增加height增加

jQuery.fn.extend({
    autoHeight: function() {
        return this.each(function() {
            var $this = jQuery(this);
            if (!$this.attr('_initAdjustHeight')) {
                $this.attr('_initAdjustHeight', $this.outerHeight());
            }
            _adjustH(this).on('input', function() {
                _adjustH(this);
            });
        });
        /**
         * 重置高度 
         * @param {Object} elem
         */
        function _adjustH(elem) {
            var $obj = jQuery(elem);
            return $obj.css({ height: $obj.attr('_initAdjustHeight'), 'overflow-y': 'hidden' })
                .height(elem.scrollHeight);
        }
    }
});
// 使用
$(function() {
    $('#textarea').autoHeight();
});


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

// (function($) {
//     $.fn.extend({
//         "insert": function(value) {
//             //預設引數 
//             value = $.extend({
//                 "text": "123"
//             }, value);
//             var dthis = $(this)[0]; //將jQuery物件轉換為DOM元素 
//             //IE下 
//             if (document.selection) {
//                 $(dthis).focus(); //輸入元素textara獲取焦點 
//                 var fus = document.selection.createRange(); //獲取游標位置 
//                 fus.text = value.text; //在游標位置插入值 
//                 $(dthis).focus(); ///輸入元素textara獲取焦點 
//             }
//             //火狐下標準 
//             else if (dthis.selectionStart || dthis.selectionStart == '0') {
//                 var start = dthis.selectionStart; //獲取焦點前座標 
//                 var end = dthis.selectionEnd; //獲取焦點後坐標 
//                 //以下這句,應該是在焦點之前,和焦點之後的位置,中間插入我們傳入的值 .然後把這個得到的新值,賦給文字框 
//                 dthis.value = dthis.value.substring(0, start) + value.text + dthis.value.substring(end, dthis.value.length);
//             }
//             //在輸入元素textara沒有定位游標的情況 
//             else {
//                 this.value += value.text;
//                 this.focus();
//             };
//             return $(this);
//         }
//     })
// })(jQuery)