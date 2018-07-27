$(document).ready(function () {
    // set color
    var $inputColor = $('input.input-color');
    var $choseColor = $('input.chose-color-spectrum');
    $.ajax({
        url: '/contact-ajax',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'jsonrpc': "2.0",
            'method': "call",
            "params": {}
        }),
        success: function (data) {
            var content = data['result'];
            $('#preview-screen').append(content);
        },
        error: function (e) {
            alert('error');
            console.log(e.message);
        }
    });

    $('.sp-palette-buttons-disabled').remove();

    var checkIC = 0;
    var txtDes = 0;
    $inputColor.click(function () {
        checkIC = 1;
    });
    $('#txtDescription').click(function () {
        txtDes = 1;
    });

    var val = {
        showInput: true,
        className: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        maxSelectionSize: 10,
        preferredFormat: "hex",
        localStorageKey: "spectrum.demo",
        palette: [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
        ]
    };

    $choseColor.spectrum(val);

    $inputColor.each(function () {
        val.color = $(this).val();
        $(this).parent().find($choseColor).spectrum(val);
    });

    $(document).mouseup(function (e) {
        if (checkIC) {
            $inputColor.each(function () {
                val.color = $(this).val();
                if ($(this).length > 0 && !$(this).is(e.target) && $(this).has(e.target).length === 0) {
                    $(this).parent().find($choseColor).spectrum(val);
                }
                checkIC = 0;
            });
        }
    });

    $choseColor.change(function () {
        var varcode = $(this).val();
        $(this).parent().find($inputColor).val(varcode).change();
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
        $('.dark-screen').addClass('hidden');
        $('.btn .btn-apply').click();
        var chose = $(this).attr('name');
        $.ajax({
            url: '/contact-ajax',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                'jsonrpc': "2.0",
                'method': "call",
                "params": {
                    'position': chose
                }
            }),
            success: function (data) {
                var content = data['result'];
                $('.container-form').remove();
                $('#form_vertical').remove();
                $('#preview-screen').append(content);
                $('.sheet-container').change()
            },
            error: function (e) {
                alert('error');
                console.log(e.message);
            }
        });
    });

    $('.sp-container').addClass('hidden');

    //change live color
    $('.sheet-container').change(function () {
        var $btnSend = $('#btn_send');
        $('.contact-header p').text($('.txtHeader').val());
        $('.envelope .txtInform').text($('.txtInform').val());
        $('.success-label .txtSuccessTitle').text($('.txtSuccessTitle').val());
        $('.success-label .txtSuccess').text($('.txtSuccess').val());
        $('.my-color').css('color', $('.textColor').val());
        var backgroundColor = $('.backgroundColor').val();
        $('#form_contact').css('background-color', backgroundColor);
        $('.envelope').css('background-color', backgroundColor);
        $('.modal-dialog').css('background-color', backgroundColor);
        $btnSend.find('span').text($('.txtBtn').val());
        $btnSend.css('background-color', $('.btnColor').val());
        $btnSend.find('span').css('color', $('.txtBtnColor').val());
    });
    //change live display content
    $('body').on('click', '.tabShow input[type=checkbox]', function () {
        var name = $(this).parent().attr('name');
        var $isShow = $('.contact-body').find('.' + name);
        if ($isShow.css('display') === 'none') {
            $isShow.css('display', 'block');
        } else {
            $isShow.css('display', 'none');
        }
    });
    // txtDescription change live
    $(document).mouseup(function (e) {
        if (txtDes) {
            var container = $("#txtDescription");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                var tex = $('#txtDescription .note-editable').html();
                $('.contact-body .isShowDescription span p').remove();
                $('.contact-body .isShowDescription span').append(tex);
            }
            txtDes = 0;
        }
    });

});


