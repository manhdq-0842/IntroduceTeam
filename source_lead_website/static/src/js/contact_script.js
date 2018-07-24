odoo.define('source_lead_website.contact_xml', function (require) {
    'use strict';
    var ajax = require('web.ajax');
    require("web.dom_ready");

    //click collect form
    $('body').off('click').on('click', '.contact-header', function () {
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
    $('body').on('mouseenter', '.envelope', function () {
        $envelope = $('.envelope');
        $envelope.removeClass('collect-envelope');
        $modalForm = $('#modal-form');
    });
    $('body').on('mouseleave', '.envelope', function () {
        $envelope.addClass('collect-envelope');
    });


    $('body').on('click', '.envelope', function () {
        console.log("click");
        $modalForm.modal('toggle');
        $('.dark-screen').removeClass('hidden');
    });
    $('body').on('click', '#close_modal', function () {
        $modalForm.modal('toggle');
        $('.dark-screen').addClass('hidden');
    });

    //form question ajax
    $('body').on('click', '.contact-footer #btn_send', function () {
        var name = $('.contact-body #contact_name').val();
        var phone = $('.contact-body #contact_phone').val();
        var address = $('.contact-body #contact_address').val();
        var email = $('.contact-body #contact_email').val();
        var question = $('.contact-body #contact_question').val();
        var checkemail = checkEmailSource(email);
        var checkphone = phonenumberSource(phone);
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
                } else {
                    $(".contact-body #contact_email").removeClass('error-question');
                }
                if (data['phoneerror']) {
                    $('.contact-body #contact_phone').addClass('error-question');
                } else {
                    $(".contact-body #contact_phone").removeClass('error-question');
                }
                if (data['success']) {
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
function checkEmailSource(inputtxt) {
    var filter = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
    return !!filter.test(inputtxt);
}

//check phone-number
function phonenumberSource(inputtxt) {
    var phonenu = /^([(]?)?([+]?)?([0-9]{1,2})?([)]?)?([0-9]{9,10})$/;
    return !!inputtxt.match(phonenu);
}

