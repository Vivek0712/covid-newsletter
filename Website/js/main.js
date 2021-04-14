
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/

    



    $('.contact1-form-btn').on('click',function(){
        var check = true;

        var email = $('#susemail');
        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }
        
        if (check == true) {
            $.ajax
			({ 
				url: 'https://<?>.azurewebsites.net/api/HttpTrigger?action=subscribe&email='+$(email).val(),
				type: 'get',
				success: function(result)
				{
					$('#susmessage').text(result)
				}
			});

        }



        return check;
    });

    $('.contact2-form-btn').on('click',function(){
        var check = true;

        var email = $('#unsusemail');
        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }
        if (check == true) {
            $.ajax
			({ 
				url: 'https://<?>.azurewebsites.net/api/HttpTrigger?action=unsubscribe&email='+$(email).val(),
				type: 'get',
				success: function(result)
				{
					$('#unsusmessage').text(result)
				}
			});

        }

        return check;
    });

    


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);
