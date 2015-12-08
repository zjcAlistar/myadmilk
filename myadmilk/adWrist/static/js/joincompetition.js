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

    $("#currentnumber").css({
        "font-size": Height*0.025,
        "lineHeight": Height*0.05+"px"
    });
    

     $("#competitionname_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#competitionname").css({
         "font-size": Width*0.35/0.188*0.107*0.35
    });

    $("#competitioncreater_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#competitioncreater").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });

    $("#competitiontype_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#competitiontype").css({
         "font-size": Width*0.35/0.188*0.107*0.35
    });

    $(".comp_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $(".date_start").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });
    $(".time_start").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });
    $(".date_end").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });
    $(".time_end").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });
    $("#goal_step").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });


    var Fontsize = $("#confirm").css("height");
    $("#confirm").css({
        "font-size": parseInt(Fontsize)*2.5,
        "width": Width*0.2,
        "height": Width* 0.2,
        "left": Width*0.4  
    });
    
};

window.onload = function(){
	var competitiontype;
    var start_time;
    var end_time;
    var goal_step;
	$.get("/joincompetition/",{"openID":openID,"competitionID":competitionID},function(ret){
        competitiontype = ret.competitiontype;
        start_time = ret.start_time;
        end_time = ret.end_time;
        if (competitiontype == "comp_distance"){
        	$("#competitiontype").val(competitiontype);
        	$("#d_date_start").val(start_time);
        	$("#d_date_end").val(end_time);
        	$("#comp_distance_box").css("display", "block");
        	$("#comp_time_box").css("display", "none");
        }
        else if (competitiontype == "comp_time"){
            goal_step = ret.goal_step;
            $("#competitiontype").val(competitiontype);
        	$("#t_date_start").val(start_time);
        	$("#t_date_end").val(end_time);
        	$("#goal_step").val(goal_step);
            $("#comp_distance_box").css("display", "none");
            $("#comp_time_box").css("display", "block");
        }
	})
}