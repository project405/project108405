$(document).ready(function () {
    // $(document).click(function(event) {
    //     $('.navbar-collapse').collapse('hide');
    // });
    // $('.navbar-collapse').click(function(event) {
    //     event.stopPropagation();
    // });
    var c, currentScrollTop = 0,
    navbar = $('#header');

    $(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = navbar.height();
    currentScrollTop = a;
    
    if (c < currentScrollTop && a > b + b) {
        navbar.addClass("scrollDown");
    } else if (c > currentScrollTop && !(a <= b)) {
        navbar.removeClass("scrollDown");
    }
    c = currentScrollTop;
    });

    

    $("#tagInput").focus(function () {
        $("div.tag").css("box-shadow", "0 5px 15px rgba(0, 0, 0, 0.3)");
        $("div.tag").css("transition", "0.3s ease-in-out");
        $("#tagInput").css("box-shadow", "none");
    });
    $("#tagInput").blur(function () {
        $("div.tag").css("box-shadow", "none");
    });

    $(".wrapText").each(function () {

        //取得內容
        var str = $(this).html();

        while (str.match("\\:imgLocation")) {
            str = str.replace("\\:imgLocation",'')
        }
        //截取内容75字
        var subStr = str.substring(0, 75);
        //如果長度大於75就添加省略號否則就填空
        var data = subStr + (str.length > 75 ? '...' : '');
        $(this).html(data);
    });
    $(".wrapBigHotSectionText").each(function () {

        //取得內容
        var str = $(this).html();

        while (str.match("\\:imgLocation")) {
            str = str.replace("\\:imgLocation",'')
        }
        //截取内容75字
        var subStr = str.substring(0, 200);
        //如果長度大於75就添加省略號否則就填空
        var data = subStr + (str.length > 200 ? '...' : '');
        $(this).html(data);
    });

    /* 按下GoTop按鈕時的事件 */
    $('#gotop').click(function () {
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
    $("#goBottom").click(function () {
        $('html,body').animate({ scrollTop: $('#reply').offset().top }, 1000);
    });



    //goDown

    $('#goDown').click(function () {
        $('html,body').animate({ scrollTop: $('#block').offset().top }, 800);
    });
});