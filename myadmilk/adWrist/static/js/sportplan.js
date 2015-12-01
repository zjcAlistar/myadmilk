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

    $("#exercise_advice_title").css({
        "font-size": Height*0.023,
        "lineHeight": Height*0.04+"px"
    });
    $("#exercise_advice_text").css({
        "font-size": Height*0.025,
        "overflow": "auto"
    });

    $("#slogan").css({
        "font-size": Height*0.025,
        "lineHeight": Height*0.05+"px"
    });

    $("#plan_step_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#plan_step").css({
         "font-size": Width*0.35/0.188*0.107*0.5
    });

    $("#plan_distance_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#plan_distance").css({
         "font-size": Width*0.35/0.188*0.107*0.5
    });

    $("#plan_calories_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#plan_calories").css({
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