// navbar
$(document).ready(function() {
    $(window).on("scroll", function() {

        var wn = $(window).scrollTop();

        if (wn > 120) {
            $(".navbar").css("background", "#2D4F41");
            $(".navbar").css("opacity", "0.85");

        } else {
            $(".navbar").css("background", "");
        }
    });
});


//  animation

// AOS animate

AOS.init({
    duration: 2500
});