odoo.define('source_lead_website.contact', function (require) {
    'use strict';
    var ajax = require('web.ajax');
    require("web.dom_ready");
    var $formControl = $('#form_contact');
    $('.contact-header').click(function () {
        if ($formControl.hasClass('collect')) {
            $formControl.removeClass('collect');
        } else {
            $formControl.addClass('collect');
        }
    });

    var $envelope = $('.envelope');
    $envelope.hover(function () {
        if ($envelope.hasClass('collect-envelope')) {
            $envelope.removeClass('collect-envelope');
        } else {
            $envelope.addClass('collect-envelope');
        }
    });

    var $modalForm = $('#modal-form');
    $envelope.click(function () {
        $modalForm.modal('toggle');
    });
    $('#close_modal').click(function () {
        $modalForm.modal('toggle');
    });

    //form question ajax
    $('.contact-footer #btn_send').click(function () {
        var name = $('.contact-body #contact_name').val();
        var phone = $('.contact-body #contact_phone').val();
        var address = $('.contact-body #contact_address').val();
        var email = $('.contact-body #contact_email').val();
        var question = $('.contact-body #contact_question').val();
        var checkemail = checkEmail(email);
        var checkphone = phonenumber(phone);
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
                   $(".contact-body #contact_email").addClass('error-question');
                }else {
                    $(".contact-body #contact_email").removeClass('error-question');
                }
                if(data['phoneerror']){
                    $('.contact-body #contact_phone').addClass('error-question');
                }else {
                    $(".contact-body #contact_phone").removeClass('error-question');
                }
                if(data['success']){
                    // turn off modal question turn on modal success
                    var $modalSuccess = $('#form_vertical').find('#modal-success');
                    $modalForm.modal('toggle');
                    $modalSuccess.modal('toggle');
                }
            }
        });
    });
});

//check email
function checkEmail(inputtxt) {
    var filter = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
    return !!filter.test(inputtxt);
}

//check phone-number
function phonenumber(inputtxt) {
    var phonenu = /^([(]?)?([+]?)?([0-9]{1,2})?([)]?)?([0-9]{9,10})$/;
    return !!inputtxt.match(phonenu);
}

