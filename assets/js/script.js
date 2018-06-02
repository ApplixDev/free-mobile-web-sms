$(document).ready(function() {
    /**
     * check if the input has any value (if we've typed into it)
     */
    $('.form__input').blur(function() {
        if ($(this).val()) {
            $(this).closest('.form__wrapper').addClass('form--filled');
        } else {
            $(this).closest('.form__wrapper').removeClass('form--filled');
        }
    });

    $('.form').validate({
        rules: {
            identifier: {
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

    $('.form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url : 'https://smsapi.free-mobile.fr/sendmsg',
            type: "GET",
            data: $(this).serialize(),
            success: function (data) {
                $(".form").html(data);
            },
            error: function (jXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });
});