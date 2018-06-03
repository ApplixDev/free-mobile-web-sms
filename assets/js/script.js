$(document).ready(function() {
    //use cors proxy for cross domain requests
    $.ajaxPrefilter(function(options) {
        if ($.support.cors && options.crossDomain) {
            options.url = (window.location.protocol === 'http:' ? 'http:' : 'https:') + '//cors.io/?' + options.url;
        }
    });

    //check if the input has any value
    $('.form__input').blur(function() {
        if ($(this).val()) {
            $(this).closest('.form__wrapper').addClass('form--filled');
        } else {
            $(this).closest('.form__wrapper').removeClass('form--filled');
        }
    });

    $('.form').validate({
        rules: {
            user: {
                required: true,
                minlength: 8,
                maxlength: 8
            },
            pass: {
                required: true
            },
            msg: {
                required: true,
                maxlength: 480
            }
        }
    });

    /*$('.form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url : 'https://smsapi.free-mobile.fr/sendmsg?',
            type: "GET",
            data: $(this).serialize(),
            success: function (data) {
                // Clear the form
                $(':input', '.form')
                .not(':button, :submit, :reset, :hidden')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected');
            },
            error: function() {
              alert('Erreur, votre message n\'a pas été envoyé.');
            }
        });
    });*/

    $('.form').on('submit', function(e) {
        
        $('.form').validate({
            submitHandler: function(form) {
		e.preventDefault();
                $.ajax({
                    url: 'https://smsapi.free-mobile.fr/sendmsg?',
                    type: "GET",
                    data: $(this).serialize(),
                    success: function(data) {
                        // Clear the form
                        $(':input', '.form')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .removeAttr('checked')
                            .removeAttr('selected');
                        return false;
                    },
                    error: function() {
                        alert('Erreur, votre message n\'a pas été envoyé.');
                    }
                });
                return false;
            }
        });
    });

});