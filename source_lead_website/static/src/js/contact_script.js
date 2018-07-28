odoo.define('source_lead_website.contact_xml', function (require) {
    'use strict';
    var ajax = require('web.ajax');
    require("web.dom_ready");
    var $body = $('body');

    //click collect form
    $body.off('click').on('click', '.contact-header', function () {
        var $formControl = $('#form_contact');
        var $close = $('.contact-close .fa');
        if ($formControl.hasClass('collect')) {
            $formControl.removeClass('collect');
            $formControl.css('bottom', $formControl.height() - 32);
            $close.addClass('fa-angle-down');
            $close.removeClass('fa-angle-up');

        } else {
            $formControl.addClass('collect');
            $close.addClass('fa-angle-up');
            $close.removeClass('fa-angle-down');
            $formControl.css('bottom', 0);
        }
    });

    var $envelope;
    var $modalForm;
    $body.on('mouseenter', '.envelope', function () {
        $envelope = $('.envelope');
        $('.envelope.left').css('left', 0);
        $('.envelope.right').css('right', 0);
        $envelope.removeClass('collect-envelope');
        $modalForm = $('#modal_form');
    });
    $body.on('mouseleave', '.envelope', function () {
        $envelope.addClass('collect-envelope');
        $('.collect-envelope.left').css('left', 46 - $envelope.width());
        $('.collect-envelope.right').css('right', 46 - $envelope.width());
    });

    //click show form and focus input
    $body.on('click', '.envelope', function () {
        $modalForm.modal('toggle');
        $('.dark-screen').removeClass('hidden');
        var isFirstInput = true;
        $('.modal-form.contact-form').find('input').each(function () {
            $(this).removeAttr('autofocus');
            if ($(this).parent().css('display') === 'block' && isFirstInput) {
                isFirstInput = false;
                $(this).attr('autofocus','autofocus');
            }
        });
    });
    $body.on('click', '#close_modal', function () {
        $modalForm.modal('toggle');
        $('.dark-screen').addClass('hidden');
    });
    $body.on('click', '.modal', function () {
        $('.dark-screen').addClass('hidden');
    });
    $body.on('click', '.modal-dialog', function (e) {
        e.stopPropagation();
    });


    //form question ajax
    $body.on('click', '.contact-footer #btn_send', function () {
        var name = null, phone = 0, address = null, email = null, question = null;
        var $name = $('.contact-body #contact_name');
        var $phone = $('.contact-body #contact_phone');
        var $email = $('.contact-body #contact_email');
        var $address = $('.contact-body #contact_address');
        var $question = $('.contact-body #contact_question');
        if ($name.val()) {
            name = $name.val();
        }
        if ($phone.val()) {
            phone = $phone.val();
        }
        if ($address.val()) {
            address = $address.val();
        }
        if ($email.val()) {
            email = $email.val();
        }
        if ($question.val()) {
            question = $question.val();
        }
        var checkemail = checkEmailSource(email);
        var checkphone = phoneNumberSource(phone);
        $email.removeClass('error-question');
        $phone.removeClass('error-question');
        ajax.jsonRpc('/handling-form', 'call', {
            'kwargs': {
                'name': name,
                'phone': phone,
                'address': address,
                'email': email,
                'question': question,
                'checkemail': checkemail,
                'checkphone': checkphone
            }
        }).then(function (data) {
            if (data) {
                if (data['emailerror']) {
                    $email.addClass('error-question');
                } else {
                    $email.removeClass('error-question');
                }
                if (data['phoneerror']) {
                    $phone.addClass('error-question');
                } else {
                    $phone.removeClass('error-question');
                }
                if (data['success']) {
                    $('#form_contact .row-form').addClass('hidden');
                    $('#form_contact .contact-footer').addClass('hidden');
                    $('.submit-success').removeClass('hidden');
                    $('#form_contact').css('bottom', '275px');
                    // turn off modal question turn on modal success
                    if ($('#form_vertical').length > 0) {
                        $('#form_vertical').find('#modal_success').modal('toggle');
                        $modalForm.modal('toggle');
                    }
                }
            }
        });
    });

});

//check email
function checkEmailSource(inputtxt) {
    var filter = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
    return !!filter.test(inputtxt);
}

//check phone-number
function phoneNumberSource(inputtxt) {
    var phonenu = /^([(]?)?([+]?)?([0-9]{1,2})?([)]?)?([0-9]{9,10})$/;
    return !!phonenu.test(inputtxt);
}


