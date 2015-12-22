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

    $("#competitionname_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#competitionname").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });

    $("#competitiontype_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $("#competitiontype").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });

    $(".comp_text").css({
        "font-size": Width*0.35/0.188*0.107*0.2,
        "font-family": "SimHei",
        "lineHeight": Height*0.989*0.5*0.25*0.3+"px"
    });
    $(".date_start").css({
         "font-size": Width*0.35/0.188*0.107*0.25
    });
    $(".time_start").css({
         "font-size": Width*0.35/0.188*0.107*0.25
    });
    $(".date_end").css({
         "font-size": Width*0.35/0.188*0.107*0.25
    });
    $(".time_end").css({
         "font-size": Width*0.35/0.188*0.107*0.25
    });
    $("#goal_step").css({
         "font-size": Width*0.35/0.188*0.107*0.4
    });


    var Fontsize = $("#confirm").css("height");
    $("#confirm").css({
        "font-size": parseInt(Fontsize),
        "width": Width*0.2,
        "height": Width* 0.2,
        "left": Width*0.4  
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

function cmpdate(DateOne,DateTwo)  
{   
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
  
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
  
    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
    return cha;  
} 

function cmptime(TimeOne,TimeTwo)  
{   
    var OneHour = Number(TimeOne.substr(0,2));
    var OneMinute = Number(TimeOne.substring(3));
    
    var TwoHour = Number(TimeTwo.substr(0,2));
    var TwoMinute = Number(TimeTwo.substring(3));
    return Number((OneHour-TwoHour)*60+(OneMinute-TwoMinute));  
} 