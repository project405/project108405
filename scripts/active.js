// navbar
$(document).ready(function() {
    $(window).on("scroll", function() {

        var wn = $(window).scrollTop();

        if (wn > 20) {
            $(".navbar").css("background", "#c8d6ca");
        } else {
            $(".navbar").css("background", "");
        }
    });
});

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
    $('textarea').autoHeight();
});


//gotop
$(function() {
    /* 按下GoTop按鈕時的事件 */
    $('#gotop').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow'); /* 返回到最頂上 */
        return false;
        2
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
    var scrollHeight = $('html,body').prop("scrollHeight");
    $('html,body').animate({ scrollTop: scrollHeight }, 'slow');
});