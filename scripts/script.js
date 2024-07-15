$(document).ready(function () {
    $('#burger').on('click', function () {
        $('#menu').addClass('open')
    });
    $('#menu').on('click', '*', function () {
        $('#menu').removeClass('open')
    });

    $('.first-block-btn').on('click', function () {
        $('html, body').animate({
            scrollTop: $('.programs-cards').offset().top
        }, 1000)
    });
    $('.btn-card').on('click', function () {
        $('html, body').animate({
            scrollTop: $('.order-form').offset().top
        }, 1000)
    });
    $('.lightbox').magnificPopup({
        type: 'image',
        delegate: 'a',
    });

    $('.schedule-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        dots: true,
        responsive: [
            {
                breakpoint: 901,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 401,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: true
                }
            },
            {
                breakpoint: 321,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });
    $('.photo-items').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
    });
    $('.photo-items-small').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
    })
    $('.feedback-items').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        responsive: [
            {
                breakpoint: 501,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('.read-more').on('click', function () {
        $(this).closest('.card-item-text').find('.more').slideToggle(300, function () {
            if ($(this).is(':hidden')) {
                $(this).closest('.card-item-text').find('.read-more-text').html('Читать далее');
                $('.card-item').css('height', 'auto')
                $('.dots').css('display', 'inline');
            } else {
                $(this).closest('.card-item-text').find('.read-more-text').html('Скрыть текст');
                $('.dots').css('display', 'none');
            }
        });
    });

    let namePopup = $('#name-popup');
    let phonePopup = $('#phone-popup');
    phonePopup.inputmask({
        "mask": "+7 (999) 999-999"
    });
    let formPopup = $('#form-popup');

    $('.phone-btn').on('click', function () {
        $('#thank-you-message-popup').hide();
        $('#popup-container').show()
        $('#popUp').css('display', 'flex')
    });
    $('.popUp-close').on('click', function () {
        $('#popup-container').hide()
        formPopup.trigger('reset')
        namePopup.add(phonePopup)
            .next().hide().end()
            .css('border', 'none');
    });


    // Валидация popup формы
    function validatePopupForm() {
        let hasError = false;

        if (!namePopup.val()) {
            namePopup.next().show();
            namePopup.css('border', '2px solid red');
            hasError = true;
        } else {
            namePopup.css('border', 'none')
        }
        if (!phonePopup.val()) {
            phonePopup.next().show();
            phonePopup.css('border', '2px solid red')
            hasError = true;
        } else {
            phonePopup.css('border', 'none')
        }

        return hasError;
    }
    $('.btn-popup').on('click', function () {
        if (!validatePopupForm()) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: namePopup.val(), phone: phonePopup.val()}
            })
                .done(function (msg) {
                    if (msg.success) {
                        $('#popUp').hide();
                        console.log(msg);
                        $('#thank-you-message-popup').show();
                    } else {
                        console.log(msg)
                        alert('Возникла ошибка при оформлении заявки, позвоните нам и оформите ваш тур');
                        formPopup.trigger('reset');
                        $('.popup-container').hide();
                    }
                });
        }
    });


    // Основная форма
    $('#thank-you-message').hide();
    let name = $('.input-name');
    let phone = $('.input-phone');
    let form = $('.form')
    phone.inputmask({
        "mask": "+7 (999) 999-999"
    });
    function validateForm() {
        let hasError = false;

        $('.error-input').hide();

        if (!name.val()) {
            name.next().show();
            name.css('border', '2px solid red');
            hasError = true;
        } else {
            name.css('border', 'none')
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('border', '2px solid red')
            hasError = true;

        } else {
            phone.css('border', 'none')
        }

        return hasError;
    }
    $('.btn-form').on('click', function () {
        if (!validateForm()) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    if (msg.success) {
                        form.hide()
                        console.log(msg)
                        $('#thank-you-message').show();
                    } else {
                        console.log(msg)
                        alert('Возникла ошибка при оформлении заявки, позвоните нам и оформите ваш тур');
                        form.trigger('reset');
                    }
                });
        }
    })










    // if (!email.val()) {
    //     email.css('border', '2px solid red')
    //     hasError = true
    // } else  {
    //     email.css('border', '1px solid rgba(245, 161, 6, 0.64);')
    // }


});


