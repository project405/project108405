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




// login

$("#login").click(function() {
    alert('登入成功');

});


$("#login1").click(function() {
    window.location("index.html");

});

$("#login2").click(function() {
    window.location.replace("index.html");

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
});