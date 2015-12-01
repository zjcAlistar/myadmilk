var Height = $(window).height();
var Width = $(window).width();

function changesize() {

    $("#titlebox").css({
        "width": Width,
        "height": Height*0.1,
        "font-family": "verdana",
        "lineHeight": Height*0.1+"px"
    });

    $("#titlebox_text1").css("font-size", Height*0.06);
    $("#titlebox_text2").css("font-size", Height*0.07);

    $("#infobox").css({
        "width": Width,
        "height": Height*0.898
    });

    $("#slogan").css({
        "font-size": Height*0.025,
        "lineHeight": Height*0.05+"px"
    });

    $("#username_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#username").css({
         "font-size": Width*0.35/0.188*0.107*0.5
    });

    $("#password_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#password").css({
         "font-size": Width*0.35/0.188*0.107*0.5
    });

    $("#confirm_password_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#confirm_password").css({
         "font-size": Width*0.35/0.188*0.107*0.5
    });

    var Fontsize = $("#confirm").css("height");
    $("#confirm").css({
        "font-size": parseInt(Fontsize)*2.5,
        "width": Width*0.2,
        "height": Width* 0.2,
        "left": Width*0.4  
    });
};

function valid_password() {
    var password1 =  $("#password").val();
    var password2 =  $("#confirm_password").val();
    if ((password1 == password2) && (password1.length > 5)) {
        return 1;
    }
    else if (password1 == password2){
        return 2;
    }
    else {
        return 3;
    };
};