$(document).ready(function () {
    var $myColor = $('.my-color.hidden');
    var myColor = $myColor.attr('color');
    $('.my-color').css('color', myColor);
});