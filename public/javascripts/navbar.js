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