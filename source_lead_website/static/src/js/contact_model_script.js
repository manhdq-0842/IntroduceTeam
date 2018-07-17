$(document).ready(function () {

    // set color
    var $container = $('.input-color');
    $container.each(function () {
        var code = $(this).val();
        $(this).parent().find('div.color-background').css('background-color', code)
    });
    $(document).mouseup(function (e) {           // mouse out
        $container.each(function () {
            var code = $(this).val();
            if ($(this).length > 0 && !$(this).is(e.target) && $(this).has(e.target).length === 0) {
                $(this).parent().find('div.color-background').css('background-color', code)
            }
        })
    });

    //set position
    var $menuli = $('.menu-position li');
    var position = $('.position .select').val();
    $menuli.each(function () {
        $(this).removeClass('active');
        if ($(this).attr('name') === position.substring(1, position.length - 1)) {
            $(this).addClass("active")
        }
    });
    $menuli.on('click', function (e) {
        e.preventDefault();
        $menuli.each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        var value = '"' + $(this).attr('name') + '"';
        $('.position .select').val(value).change();
    });

});