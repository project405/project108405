$(window).load(function() {
    styleselect();
})

function styleselect() {
    if (document.getElementById('globalstyleselect').value == "3") {
        $("#stylediv").html('<b>Boca Style</b>');
    }
    if (document.getElementById('globalstyleselect').value == "2") {
        $("#stylediv").html('<b>Bella Style</b>');
    }
}
if (document.getElementById('globalstyleselect').value == "1") {
    $("#stylediv").html('<b>Terra Style</b>');
}