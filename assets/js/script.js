﻿$(document).ready(function() {
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

    $(".form").validate({

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
        },

        submitHandler: function(form) {

            var form = $(".form");
            var submitButton = $("#submit");


            $.ajax({
                url: 'https://smsapi.free-mobile.fr/sendmsg?',
                type: 'GET',
                data: form.serialize(),
                beforeSend: function() {
                    submitButton.html('Envoi en cours....');
                },
                success: function(data) {
                    form.trigger('reset');
                    submitButton.val('Envoyer');
                },
                error: function(e) {
                    submitButton.val('Envoyer');
                    alert('Erreur, votre message n\'a pas été envoyé.');
                }
            });


        } // end submit handler


    }); //end validate

    /*$('.form').on('submit', function(e) {
        e.preventDefault();
	if ($(this).validate({})) {
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
	}
    });*/

});