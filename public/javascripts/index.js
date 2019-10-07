// navbar
$(document).ready(function() {

    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 150) {
            $('#sentimentSection').fadeIn();
        } else {
            $('#sentimentSection').fadeOut();
        };

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
            $('#positiveButton').css('color','#ea5645')
            $('#negativeButton').css('color','#212529')
            // $('#positiveButton').css('font-weight','bold')
            $('#negativeButton').css('font-weight','normal')

        }
         $('#positiveSection').css('display', 'block')
       }
    )
    $('#negativeButton').click(() => {
        if ($('#positiveSection').has('display')) {
            $('#positiveSection').css('display', 'none')
            $('#negativeButton').css('color','#ea5645')
            $('#positiveButton').css('color','#212529')
            // $('#negativeButton').css('font-weight','bold')
            $('#positiveButton').css('font-weight','normal')

        }
         $('#negativeSection').css('display', 'block')
       }
    )
    $('#sentimentSection').hover(() => {
        $('#sentimentSection').css('width','75px')
        $('#sentimentSection').css('height','75px')
        $('#sentimentSection > img').css('transform','rotate(180deg)')
        $('#sentimentSection > img').css('-ms-transform','rotate(180deg)')
        $('#sentimentSection > img').css('-moz-transform','rotate(180deg)')
        $('#sentimentSection > img').css('-webkit-transform','rotate(180deg)')
        $('#sentimentSection > img').css('-o-transform','rotate(180deg)')
        $('#sentimentSectionHover').css('visibility','visible')
        $('#sentimentSectionHover').css('transition','visibility 0.8s, opacity 0.5s linear')
    })
    $('#sentimentSection').mouseleave(() => {
        $('#sentimentSection').css('width','50px')
        $('#sentimentSection').css('height','50px')
        $('#sentimentSection > img').css('transform','rotate(360deg)')
        $('#sentimentSection > img').css('-ms-transform','rotate(360deg)')
        $('#sentimentSection > img').css('-moz-transform','rotate(360deg)')
        $('#sentimentSection > img').css('-webkit-transform','rotate(360deg)')
        $('#sentimentSection > img').css('-o-transform','rotate(360deg)')
        $('#sentimentSectionHover').css('visibility','hidden')
        $('#sentimentSectionHover').css('transition','visibility 0.2s, opacity 0.5s linear')
    })
});



// AOS animate
AOS.init({
    duration: 2500
});
