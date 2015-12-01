var Height = $(window).height();
var Width = $(window).width();
var edit_state = false;

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

window.onload = function(){
    $.get("/changeplan/",{"openID":openID},function(ret){
        var defaultStep = Number(ret.step_goal);
        var defaultDist = Number(ret.dist_goal);
        var defaultCal = Number(ret.cal_goal);
        var advice = ret.advice;
        exercise_advice_text.innerHTML = advice;
        $("#plan_step").val(defaultStep);
        $("#plan_distance").val(defaultDist);
        $("#plan_calories").val(defaultCal);
    });
}

$(function(){
    $("#plan_step").blur(function(){
        var plan_step = Number($("#plan_step").val());
        if(plan_step != ""){
            $("#plan_step").val(parseInt(plan_step));
        }
    });
});

$(function(){
    $("#plan_distance").blur(function(){
        var plan_distance = Number($("#plan_distance").val());
        if(plan_distance != ""){
            $("#plan_distance").val(parseInt(plan_distance));
        }
    });
});

$(function(){
    $("#plan_calories").blur(function(){
        var plan_calories = Number($("#plan_calories").val());
        if(plan_calories != ""){
            $("#plan_calories").val(parseInt(plan_calories));
        }  
    });
});

$(function(){
    $("#confirm").click(function(){
        if(edit_state == false) {
            edit_state = true;
            $("#plan_step").removeAttr("disabled");
            $("#plan_distance").removeAttr("disabled");
            $("#plan_calories").removeAttr("disabled");
            $("#confirm").val("确认");
        } else if (edit_state == true) {
            var step = $("#plan_step").val();
            var dist = $("#plan_distance").val();
            var cal = $("#plan_calories").val();
            if (step != "" && dist != "" && cal != "") {
                $.post("/changeplan/",{"openID": openID, "daily_step": step, "daily_dist": dist, "daily_cal": cal},function(ret){
                    $("#confirm").val("修改");
                    $("#plan_step").attr("disabled", "true");
                    $("#plan_distance").attr("disabled", "true");
                    $("#plan_calories").attr("disabled", "true");
                    edit_state = false;
                    alert(ret);
                });        
            }
            else{
                alert("请填完整的计划");
            }
        }
    });
});

window.onorientationchange  = function(){
    alert("本页面不支持横屏显示");
    $("body").css("display","none");
}
