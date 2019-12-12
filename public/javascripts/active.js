$(document).ready(function () {

    //往下滑隱藏navbar
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
    
    if ($(window).width() <= 414) {
        Array.from($('.liContainer').find('li > a')).map((item) => {
            item.innerText = item.innerText.length > 20 ? `${item.innerText.substring(0,20)}...` : item.innerText
        })
        Array.from($('.positive, .negative')).map((item) => {
            item.innerText = item.innerText.length > 150 ? `${item.innerText.substring(0,150)}...` : item.innerText
        })
    }

    Array.from($('.fourRecommend')).map((item) => {
        item.innerText = item.innerText.length > 200 ? `${item.innerText.substr(0,200)}...` : item.innerText
    })

    $(".wrapText").each(function () {

        //取得內容
        var str = $(this).html().trim();

        while (str.match("\\:imgLocation")) {
            str = str.replace("\\:imgLocation",'')
        }
        var subStr = str.substring(0, 40);
        var data = subStr + (str.length > 40 ? '...' : '');
        $(this).html(data);
    });
    $(".limitLine").each(function () {
        var str = $(this).html().trim();
        var subStr = str.substring(0, 75);
        var data = subStr + (str.length > 75 ? '...' : '');
        $(this).html(data);
    });
    $(".wrapBigHotSectionText").each(function () {

        //取得內容
        var str = $(this).html().trim();

        while (str.match("\\:imgLocation")) {
            str = str.replace("\\:imgLocation",'')
        }
        var subStr = str.substring(0, 200);
        var data = subStr + (str.length > 200 ? '...' : '');
        $(this).html(data);
    });
    $(".project-name > .title").each(function () {
        if ($(this).next().hasClass('fourRecommend')) {
            return;
        }
        //取得內容
        var str = $(this).html().trim();
        var subStr = str.substring(0, 11);
        var data = subStr + (str.length > 11 ? '...' : '');
        $(this).html(data);
    });

    /* 按下GoTop按鈕時的事件 */
    $('#gotop').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 'slow'); /* 返回到最上面 */
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