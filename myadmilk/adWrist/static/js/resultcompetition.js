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

    $("#competitioncreater_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#competitioncreater").css({
         "font-size": Width*0.35/0.188*0.107*0.3
    });

    $("#competitionname_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#competitionname").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });

    $("#currentnumber_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#currentnumber").css({
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
    $("#rank_title").css({
         "font-size": Width*0.35/0.188*0.107*0.4*0.65
    });
    
};


function is_valid_name () {
    var name = $("#competitionname").val();
    if (name.length > 9) {
        alert("比赛名称过长,请重新输入！");
        $("#competitionname").val("");
        return false;
    }
    else if (name.length == 0) {
        alert("比赛名称不能为空！");
        return false;
    }
    else {
        return true;
    }
}


function loaddatetime () {
    var today = new Date();   

    var day = today.getDate(); 
    day = Number(day)>9?day:("0"+ day);  
    var month = today.getMonth() + 1;
    month = Number(month)>9?month:("0"+month);   
    var year = today.getFullYear();    
    var mytime=today.toLocaleTimeString(); 
    var date = year + "-" + month + "-" + day;


    var hour = today.getHours();
    hour = Number(hour)>9?hour:("0"+hour);
    var minute = today.getMinutes();
    minute = Number(minute)>9?minute:("0"+minute);
    var time = hour + ":" + minute;


    $(".date_start").attr("value", date);
    $(".time_start").attr("value", time);

    $(".date_end").attr("value", date);
    $(".time_end").attr("value", time);

};


function show_competitiontype () {
    if ($("#competitiontype").val() == "comp_distance") {
        $("#comp_distance_box").css("display", "block");
        $("#comp_time_box").css("display", "none");   
    }
    else if($("#competitiontype").val() == "comp_time") {
        $("#comp_distance_box").css("display", "none");
        $("#comp_time_box").css("display", "block");   
    }
};

window.onload = function(){
   //ret={"rank":[{"name":"无","score":"10","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"},{"name":"无","score":"1000","scorethistime":"10"}],"user_rank":"1","user_scorethistime":"12","user_score":"123"};
	$.get("/getmatchresult/",{"openID": openID, "competitionID": competitionID},function(ret){
		
        competitionname = ret.competitionname;
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
            $("#currentnumber").val(currentnumber);
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
            $("#currentnumber").val(currentnumber);
            $("#comp_distance_box").css("display", "none");
            $("#comp_time_box").css("display", "block");
        }

        var length = ret.rank.length;
        for(var i = 0;i<length;i++) {
            if(i>=10){
                break;
            }
            var singlerank = $('<li>');
            singlerank.attr({
                "id":"rank"+(i+1),
                "class":"rank_class"
            });
            singlerank.append(ret.rank[i].name);
            singlerank.appendTo("#rank");
            var singlerankscore = $('<li>');
            singlerankscore.attr({
                "id":"rank"+(i+1),
                "class":"rank_score_class"
            });
            singlerankscore.append(ret.rank[i].score+"(+"+ret.rank[i].scorethistime+")");
            singlerankscore.appendTo("#rank_score");
        }
		// if (length > 10) {
		// 	for(var i = 0;i<10;i++) {
		// 		var singlerank = $('<li>');
		// 		singlerank.attr({
		// 			"id":"rank"+(i+1),
		// 			"class":"rank_class"
		// 		});
		// 		singlerank.append(ret.rank[i].name);
		// 		singlerank.appendTo("#rank");
		// 	}
		// } else {
		// 	for(var i = 0;i < length;i++) {
		// 		var singlerank = $('<li>');
		// 		singlerank.attr({
		// 			"id":"rank"+(i+1),
		// 			"class":"rank_class"
		// 		});
		// 		singlerank.append(ret.rank[i].name);
		// 		singlerank.appendTo("#rank");
		// 	}
		// }
		$("#user_rank").empty();
		$("#user_rank").append("本次比赛您的排名："+ret.user_rank+"<br/>本次获得积分："+ret.user_scorethistime+"<br/>您的当前积分为："+ret.user_score+"<br/>请继续努力！");
		$(".rank_class").css({
	       "font-size": Width*0.35/0.188*0.107*0.4*0.6,
           "line-height": Width*0.35/0.188*0.107*0.4*0.8+"px"
	    });
        $(".rank_score_class").css({
           "font-size": Width*0.35/0.188*0.107*0.4*0.5,
           "line-height": Width*0.35/0.188*0.107*0.4*0.8+"px"
        });
	    $("#user_rank").css({
	         "font-size": Width*0.35/0.188*0.107*0.4*0.5
	    });
	});
}
