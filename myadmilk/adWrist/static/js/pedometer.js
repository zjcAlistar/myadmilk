var canvas;
var ctx;
var DoughnutChart;
var goal;
var steps;
var distance;
var cal;
var date;


var Height = $(window).height();
var Width = $(window).width();

function changesize() {

    $("#titlebox").css({
        "width": Width,
        "height": Height*0.1
    });

    $("#titlebox_text1").css("font-size", Height*0.06);
    $("#titlebox_text2").css("font-size", Height*0.07);

    $("#infobox").css({
        "width": Width,
        "height": Height*0.898
    });
    $('#previous').css("font-size", Height*0.9*0.2*0.6*0.2);
    $('#next').css("font-size", Height*0.9*0.2*0.6*0.2);
    $('#date').css("font-size", Height*0.9*0.2*0.6*0.35);
    $('#text').css("font-size", Height*0.9*0.6*0.15*0.35);
    $('#showchart').css("font-size", Height*0.9*0.2*0.4*0.5);
    
    // var Fontsize = $("#confirm").css("height");
    // $("#confirm").css("font-size", parseInt(Fontsize)*0.7);
};

function comRate(){
    if(goal > 0){
        if (steps/goal > 1) return 1;
        else return steps/goal;
    }
    else return 0.00001;
}
window.onload = function(){
    canvas = document.getElementById("DoughnutChart");
    ctx = canvas.getContext("2d");
    goal=0;
    steps=0;
    distance=0;
    cal=0;
    $.get("/getsteps/",{"openID":openID,"type":"init"},function(ret){
        goal = Number(ret.goal);
        steps = Number(ret.steps);
        cal = Number(ret.cal);
        distance = Number(ret.distance);
        date = ret.date;
        var rate = comRate();
        var data = [
            {
                value: rate,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 1-rate,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            }
        ];
        DoughnutChart = new Chart(ctx).Doughnut(data,{animationEasing: "easeOutQuart",animationSteps: 25});
        $("#goal").text("计划: "+goal);
        $("#steps").text("当前步数: "+steps+"步");
        $("#distance").text("当前运动距离: "+distance+"公里");
        $("#cal").text("当前消耗能量: "+cal+"卡路里");
        $("#date").val(date);
     });
}
$(function(){
    $("#next").click(function(){
        $.get("/getsteps/",{"openID":openID,"date":date,"type":"next"},function(ret){
            goal = Number(ret.goal);
            steps = Number(ret.steps);
            cal = Number(ret.cal);
            distance = Number(ret.distance);
            date = ret.date;
            var rate = comRate();
            DoughnutChart.segments[0].value = rate;
            DoughnutChart.segments[1].value = 1-rate;
            DoughnutChart.update();
            $("#goal").text("计划: "+goal);
            $("#steps").text("当前步数: "+steps+"步");
            $("#distance").text("当前运动距离: "+distance+"公里");
            $("#cal").text("当前消耗能量: "+cal+"卡路里");
            $("#date").val(date);
        });
    });
});
$(function(){
    $("#previous").click(function(){
        $.get("/getsteps/",{"openID":openID,"date":date,"type":"previous"},function(ret){
            goal = Number(ret.goal);
            steps = Number(ret.steps);
            cal = Number(ret.cal);
            distance = Number(ret.distance);
            date = ret.date;
            var rate = comRate();
            DoughnutChart.segments[0].value = rate;
            DoughnutChart.segments[1].value = 1-rate;
            DoughnutChart.update();
            $("#goal").text("计划: "+goal);
            $("#steps").text("当前步数: "+steps+"步");
            $("#distance").text("当前运动距离: "+distance+"公里");
            $("#cal").text("当前消耗能量: "+cal+"卡路里");
            $("#date").val(date);
        });
    });
});
$(function(){
    $("#date").blur(function(){
        if ($("#date").val()=="") {
            $("#date").val(date);
        }
        else{
            date = $("#date").val();
            $.get("/getsteps/",{"openID":openID,"date":date,"type":"someday"},function(ret){
                goal = Number(ret.goal);
                steps = Number(ret.steps);
                cal = Number(ret.cal);
                distance = Number(ret.distance);
                var rate = comRate();
                DoughnutChart.segments[0].value = rate;
                DoughnutChart.segments[1].value = 1-rate;
                DoughnutChart.update();
                $("#goal").text("计划: "+goal);
                $("#steps").text("当前步数: "+steps+"步");
                $("#distance").text("当前运动距离: "+distance+"公里");
                $("#cal").text("当前消耗能量: "+cal+"卡路里");
            });
        }
    });
});
window.onbeforeunload = function(){
    delete DoughnutChart;
}
$(function(){
    $("#showchart").click(function(){
        location.href = "/showdetails?openID=" + openID;
    });
});
