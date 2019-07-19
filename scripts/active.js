$(document).ready(function() {
    // $(document).click(function(event) {
    //     $('.navbar-collapse').collapse('hide');
    // });
    // $('.navbar-collapse').click(function(event) {
    //     event.stopPropagation();
    // });

    $("input").focus(function() {
        $("div.tag").css("box-shadow", "0 5px 15px rgba(0, 0, 0, 0.3)");
        $("div.tag").css("transition", "0.3s ease-in-out");
    });
    $("input").blur(function() {
        $("div.tag").css("box-shadow", "none");
    });

    $(".wrapText").each(function() {

        //取得內容
        var str = $(this).html();

        //截取内容75字
        var subStr = str.substring(0, 100);

        //如果長度大於75就添加省略號否則就填空
        var data = subStr + (str.length > 75 ? '...' : '');
        $(this).html(data);
    });
    $(".wrapBigHotSectionText").each(function() {

        //取得內容
        var str = $(this).html();

        //截取内容75字
        var subStr = str.substring(0, 200);

        //如果長度大於75就添加省略號否則就填空
        var data = subStr + (str.length > 200 ? '...' : '');
        $(this).html(data);
    });

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
        };
    });

    //bottom
    $("#goBottom").click(function() {
        $('html,body').animate({ scrollTop: $('#reply').offset().top }, 1000);
    });



    //goDown

    $('#goDown').click(function() {
        $('html,body').animate({ scrollTop: $('#block').offset().top }, 800);
    });
});