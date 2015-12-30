var Height = $(window).height();
var Width = $(window).width();

function changesize() {
    $("#all").css({
        "position":"absolute",
        "top":"0",
        "left":"0",
        "height": Height,
        "width": Width
    });
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
        "font-size": parseInt(Fontsize),
        "width": Width*0.16,
        "height": Width* 0.16,
        "left": Width*0.42  
    });
    
};

window.onload = function(){
    $("#comp_time_box").css("display", "block");
	var competitiontype;
    var competitionname;
    var start_time;
    var start_date;
    var end_time;
    var end_date;
    var goal_step;
    var currentnumber;
    var originator;
	$.get("/joinmatch/",{"openID":openID,"competitionID":competitionID},function(ret){
        if(Number(ret.error) == 1){
            alert(ret.errormsg);
            return;
        }
        competitionname = ret.competitionname;
        document.title=competitionname;
        competitiontype = ret.competitiontype;
        originator = ret.originator;
        start_date = ret.start_date;
        start_time = ret.start_time;
        end_date = ret.end_date;
        end_time = ret.end_time;
        currentnumber = ret.currentnumber;

        $("#competitionname").val(competitionname);
        $("#competitioncreater").val(originator);
        
        if (competitiontype == "comp_distance"){
        	$("#competitiontype").val("距离最长");
        	$("#d_date_start").val(start_date);
            $("#d_time_start").val(start_time);
        	$("#d_date_end").val(end_date);
            $("#d_time_end").val(end_time);
            $("#currentnumber").val("当前参加人数："+currentnumber);
        	$("#comp_distance_box").css("display", "block");
        	$("#comp_time_box").css("display", "none");
        }
        else if (competitiontype == "comp_time"){
            goal_step = ret.goal_step;
            $("#competitiontype").val("时间最短");
        	$("#t_date_start").val(start_date);
            $("#t_time_start").val(start_time);
            $("#t_date_end").val(end_date);
            $("#t_time_end").val(end_time);
        	$("#goal_step").val(goal_step);
            $("#currentnumber").val("当前参加人数："+currentnumber);
            $("#comp_distance_box").css("display", "none");
            $("#comp_time_box").css("display", "block");
        }
	})
}

function showmessagebox (str) {
    var shadow = document.createElement("div");
    shadow.setAttribute("id", "shadow");
    shadow.style.cssText = "width:100%; height:100%; top:0; left:0; position:absolute; background:#222222;Opacity:0.95;";
    document.body.appendChild(shadow);

    var messagebox = document.createElement("div");
    messagebox.setAttribute("id", "messagebox");
    messagebox.style.cssText = "top:40%;left:20%;height:20%;width:60%;position:absolute;background:white;border-radius:10px;Opacity:1.0;font-family:SimHei;font-size:20px; text-align:center;line-height:33px;";
    // messagebox.innerHTML = "提示";
    document.body.appendChild(messagebox);

    var message = document.createElement("div");
    message.setAttribute("id", "message");
    message.style.cssText = "top:20%;left:5%;height:60%;width:90%;position:absolute;font-family:SimHei;font-size:20px; text-align:center;line-height:20px;"
    message.innerHTML = str;
    messagebox.appendChild(message);

    var btn_return = document.createElement("div");
    btn_return.setAttribute("id", "btn_return");
    btn_return.style.cssText = "top:65%;left:"+Width*0.4+"px;;height:"+Width*0.2+"px;width:"+Width*0.2+"px;position:absolute;background:white;border-radius:100%;font-family:SimHei;font-size:20px; text-align:center;line-height:"+Width*0.2+"px;";
    btn_return.innerHTML = "确认";
    document.body.appendChild(btn_return);

    btn_return.onclick = function () {
        $("#shadow").fadeOut(500);
        $("#messagebox").fadeOut(500);
        $("#btn_return").fadeOut(500);
        shadow.parentNode.removeChild(shadow);
        messagebox.parentNode.removeChild(messagebox);
        btn_return.parentNode.removeChild(btn_return);
    }
}





