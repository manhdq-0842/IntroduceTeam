$(document).ready(function () {
    var $myColor = $('.my-color.hidden');
    var myColor = $myColor.attr('color');
    $('.my-color').css('color', myColor);
    var $envelope = $('.envelope');
    $('.collect-envelope.left').css('left', 46 - $envelope.width());
    $('.collect-envelope.right').css('right', 46 - $envelope.width());
    $envelope.removeClass('begin');
});