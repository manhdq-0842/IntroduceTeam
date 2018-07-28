$(document).ready(function () {
    var $myColor = $('.my-color.hidden');
    var myColor = $myColor.attr('color');
    $('.my-color').css('color', myColor);
    var $envelope = $('.envelope');
    $('.collect-envelope.left').css('left', 46 - $envelope.width());
    $('.collect-envelope.right').css('right', 46 - $envelope.width());
    $envelope.removeClass('begin');

    //submit by enter
    $('.contact-body textarea').bind('keypress', function (event) {
        if (event.which === 13) {
            $('.contact-footer #btn_send').click();
        }
    });

    //close by enter
    $('body').bind('keypress', function (event) {
        if (event.which === 13) {
            if ($('.modal-success.contact-modal').css('display') === 'block') {
                $('.modal').click();
                $('.modal-backdrop').click();
            }
        }
    });
});