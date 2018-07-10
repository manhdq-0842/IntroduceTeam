odoo.define("introduce_company.homepage", function (require) {
    'use strict';
    var ajax = require('web.ajax');
    require("web.dom_ready");

    var odooHeader = $('#oe_main_menu_navbar').length;
    var menuUl = $('#menu_main_ul');
    var $menuSoluA = $('.menu-solution a');
    var $menuParent = $('#menu-item-parent a');
    var checkOdooHeader = 0;
    var header = $('.header');

    //status header - top
    var offsetHeader = (header.offset().top);
     if(offsetHeader > 70){
         header.addClass('active');
     }

    $('.list-solution a').click(function (e) {
        e.preventDefault();
    });

    if (odooHeader > 0) {
        $('#header').css('margin-top', '34px');
        $('.banner').addClass('banner-head-y');
        checkOdooHeader = 34;
    } else {
        $('.banner').addClass('banner-head-n');
        $('.width_header').css('top', '0');
        $('.menu_main').css('top', '44');
    }

    //check scroll page
    $(window).scroll(function () {
        var height = $(window).scrollTop();
        if (height < 10) {
            header.removeClass('active');
        }

        if (height >= 50) {
            header.addClass('active');
            $('.to-top').removeClass('hidden');
        } else {
            $('.to-top').addClass('hidden');
        }

        if (height >= 800) {
            // 1,2,3... to end
            var $countValue = $(".count-value");
            if (!$countValue.hasClass('check-width')) {
                $('.count').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
            }
            $countValue.addClass('check-width');
        }
    });

    //  Function for scroliing to top
    $('.to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    //turn on modal question
    var $modalQuestion = $('#modal-question');
    $('#contact-btn').click(function () {
        $modalQuestion.modal('toggle');
    });


    //form question
    $('#btn_send').click(function () {
        var name = $('#contact_name').val();
        var phone = $('#contact_phone').val();
        var email = $('#contact_email').val();
        var question = $('#contact_question').val();
        var checkemail = checkEmail(email, "question");
        var checkphone = phonenumber(phone);
        if (checkemail && checkphone) {
            ajax.jsonRpc('/question', 'call', {
                'kwargs': {
                    'name': name,
                    'phone': phone,
                    'email': email,
                    'question': question,
                }
            }).then(function (data) {
                if (data['success']) {
                    // turn off modal question turn on modal success
                    var $modalSuccess = $('#modal-success');
                    $modalQuestion.modal('toggle');
                    $modalSuccess.modal('toggle');
                }
            });
        } else {

        }
    });

    // footer email
    $('#footer_subscribe').click(function (e) {
        e.preventDefault();
        var email = $('#footer_email').val();
        if (checkEmail(email, "footer")) {
            ajax.jsonRpc('/email', 'call', {
                'kwargs': {
                    'email': email
                }
            }).then(function (data) {
                if (data['success']) {
                    $('.done-tick').removeClass('hidden');
                    $('.register').addClass('hidden');
                    $('.register-succuess').removeClass('hidden');
                }
            });
        }

    });

    //show menu mobi-header
    $('.navbar-toggle-custom').click(function () {
        var menuHeader = menuUl.css('display');
        if (menuHeader === "none") {
            menuUl.css('display', 'block');
        } else {
            menuUl.css('display', 'none');
        }

    });

    //sub-menu header desktop
    $('.menu-item-object-parent').hover(function () {
        $(this).find('.sub-menu').css('display', 'block');
    }, function () {
        $(this).find('.sub-menu').css('display', 'none');
    });
    var childSub = $('.menu-item-object-child');
    if (childSub.length === 0) {
        $('.menu-child').addClass('hidden');
    }

    //sub-menu header mobi
    $('.menu-solution').click(function () {
        var subSmall = $(this).find('.sub-small');
        var menuSub = subSmall.css('display');
        if (menuSub === "none") {
            subSmall.css('display', 'block');

        } else {
            subSmall.css('display', 'none');
        }

    });


    //experience and parameter
    $('.count-title').each(function () {
        var testText = $(this).text();
        if ((testText.trim() === "EXPERIENCE")) {
            $(this).parent().find('.exp-value').removeClass('hidden');

        } else if ((testText.trim() === "Kinh Nghiệm")) {
            $(this).parent().find('.exp-value_vn').removeClass('hidden');
        }
        else if ((testText.trim() === "CUSTOMER") || (testText.trim() === "PRODUCT") || (testText.trim() === "Khách Hàng") || (testText.trim() === "Sản Phẩm")) {
            $(this).parent().find('.product-value').removeClass('hidden');
        }
    });

    //homepage is color
    $('#menu-item-parent:nth-child(1)').addClass('active');

    $(document).on("scroll", onScroll1);
    //smoothscroll
    $menuParent.on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $menuParent.each(function () {
            $(this).parent().removeClass('active');
        });
        $(this).parent().addClass('active');

        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 96 - checkOdooHeader
        }, 800, 'swing', function () {
            // window.location.hash = target;
            $(document).on("scroll", onScroll1());
        });
    });

    $(document).on("scroll", onScroll2);
    //smoothscroll
    $menuSoluA.on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $menuSoluA.each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll2);
        });
    });

    //click change my language => click odoo language
    $('.js_change_lang').onclick(function () {
        $('.js_language_selector .js_change_lang').click()
    });

    // Change the interface language
   var lang = getCookie("lang");
   if(lang){
       // cookie language was set to "vi" and URL does not contain "vi"
       if (lang.include("vi") && !(document.URL.includes("vi"))){
           window.location.href = '/vi/';
       } else if (lang.include("en") && !(document.URL.includes("en"))){
           window.location.href = '/en/';
       }

   } else {
       var userLang = navigator.language;
       if (userLang.includes('vi')&&!(document.URL.includes("vi")))
           window.location.href = '/vi/';
   }
});

// functions to help manipulating cookies
function setCookie(cname,cvalue,exdays){
   var d = new Date();
   d.setTime(d.getTime() + (exdays*24*60*60*1000));
   var expires = "expires="+ d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
   var name = cname + "=";
   var decodedCookie = decodeURIComponent(document.cookie);
   var ca = decodedCookie.split(';');
   for (var i = 0; i <ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0)==' '){
           c=c.substring(1);
       }
       if (c.indexOf(name)==0){
           return c.substring(name.length, c.length);
       }
   }
   return "";

}

function checkEmail(inputtxt, type) {
    var filter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    if (filter.test(inputtxt)) {
        if (type === "question") {
            $("#contact_email").removeClass('error-question');
        } else {
            $('#footer_email').removeClass('boder-footer-email');
        }
        return true;
    } else {
        if (type === "question") {
            $("#contact_email").addClass('error-question');
        } else {
            $('#footer_email').addClass('boder-footer-email');
        }
        return false;
    }
}

//check phone-number
function phonenumber(inputtxt) {
    var phoneno = /^([(]?)?([+]?)?([0-9]{1,2})?([)]?)?([0-9]{9,10})$/;
    if (inputtxt.match(phoneno)) {
        $('#contact_phone').removeClass('error-question');
        return true;
    }
    else {
        $('#contact_phone').addClass('error-question');
        return false;
    }
}

function onScroll1() {
    var scrollPos = $(document).scrollTop() + 130;
    var $menuParent = $('#menu-item-parent a');
    $menuParent.each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.outerHeight() > scrollPos) {
            $menuParent.removeClass("active");
            currLink.parent().addClass("active");
        }
        else {
            currLink.parent().removeClass("active");
        }
    });
}

function onScroll2() {
    var scrollPos = $(document).scrollTop();
    var $menuSoluA = $('.menu-solution a');
    $menuSoluA.each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position()) {
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $menuSoluA.removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        }
    });
}

