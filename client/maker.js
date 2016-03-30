"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#domoMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeDomoSubmit").on("click", function(e) {
        e.preventDefault();
        $("#domoMessage").animate({width:'hide'},350);
    
        if($("#domoName").val() == '' || $("#domoAge").val() == ''|| $("#domoLevel").val() == '') {
            handleError("RAWR! All fields are required");
            return false;
        }

        sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());
        
        return false;
    });
	 $(".doDomoDelete").on("click", function(e) {
		e.preventDefault();
		$("#domoMessage").animate({width:'hide'},350);
    
        if($("#domoDelName").val() == '' || $("#domoDelAge").val() == ''|| $("#domoDelLevel").val() == '') {
            handleError("RAWR! All fields are required");
            return false;
        }
        sendAjax($("#domoDelForm").attr("action"), $("#domoDelForm").serialize());
        
        return false;
    });
    $('.domo').click(function() {
        $(this).find('.content').slideToggle();
    });
	

});
>>>>>>> 27cea990726388f0bcadcf30481e54444bf6c8e5
