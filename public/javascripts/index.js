// navbar
$(document).ready(function() {
    $(window).on("scroll", function() {

        var wn = $(window).scrollTop();

        if (wn > 120) {
            $(".navbar").css("background", "#2D4F41");
            $(".navbar").css("opacity", "0.85");
            $(".navbar").css("transition", "0.5s ease-in-out");
            $(".navbar").css("box-shadow", " 0 5px 15px rgba(0,0,0,0.3)");
            $("input.navSearch").css("background-color", " rgb(21, 48, 36)");


        } else {
            $(".navbar").css("background", "");
            $(".navbar").css("box-shadow", "none");
            $("input.navSearch").css("background-color", "white");
            $("button.navSearch").css("background-color", "none");


        }
    });
        $('#positiveButton').click(() => {
        if ($('#negativeSection').has('display')) {
            $('#negativeSection').css('display', 'none')
        }
            $('#positiveSection').css('display', 'block')
        }
    )
    $('#negativeButton').click(() => {
        if ($('#positiveSection').has('display')) {
            $('#positiveSection').css('display', 'none')
        }
            $('#negativeSection').css('display', 'block')
        }
    )
});



//  animation

// AOS animate

AOS.init({
    duration: 2500
});
