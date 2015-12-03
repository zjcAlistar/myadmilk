function changesize() {
    var Height = $(window).height();
    var Width = $(window).width();
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

    $("#next").css({
        "width": Width*0.17,
        "height": Width*0.17
    });

    $("#previous").css({
        "width": Width*0.17,
        "height": Width*0.17
    });

    $('#previous').css("font-size", Height*0.9*0.2*0.6*0.2);
    $('#next').css("font-size", Height*0.9*0.2*0.6*0.2);
    $('#date').css("font-size", Height*0.9*0.2*0.6*0.35);
    $('#text').css("font-size", Height*0.9*0.6*0.15*0.35);
    $('#text2').css("font-size", Height*0.9*0.6*0.15*0.35);
    $('#showchart').css("font-size", Height*0.9*0.2*0.4*0.5);
    
    // var Fontsize = $("#confirm").css("height");
    // $("#confirm").css("font-size", parseInt(Fontsize)*0.7);
};

function positive(Num){
    if (Num>0)
        return Num;
    else
        return 0;
}

window.onload = function(){
    goal=0;
    steps=0;
    distance=0;
    cal=0;
    $.get("/getsteps/",{"openID":openID,"type":"init"},function(ret){
        stepGoal = Number(ret.stepGoal);
        calGoal = Number(ret.calGoal);
        distanceGoal = Number(ret.distanceGoal);
        steps = Number(ret.steps);
        cal = Number(ret.cal);
        distance = Number(ret.distance);
        date = ret.date;
        $(function(){
            $('#DoughnutChart').highcharts({
            chart: {
                type: 'pie'
            },
            title: {
                text: '健身完成度'
            },
            plotOptions: {
                series:{
                        states:{
                            hover:{
                                halo:false
                            }
                        }
                },
                pie: {
                    shadow: true,
                    center: ['50%', '50%'],
                    showInLegend: true,
                    dataLabels: {
                    enabled: false
                    },
                    point:{
                        events:{
                                legendItemClick:function(){
                                return false;
                            }
                        }
                    },
                }
            },
            credits: {
            enabled: false
            },
            series: [{
                name: '卡路里',
                data: [['消耗卡路里',cal],['未完成',positive(calGoal-cal)]],
                size: '40%',
                innerSize: '20%',
            }, {
                name: '距离',
                data: [['运动距离',distance],['未完成',positive(distanceGoal-distance)]],
                size: '70%',
                innerSize: '40%',
            }, {
                name: '步数',
                data: [['步数',steps],['未完成',positive(stepGoal-steps)]],
                size: '80%',
                innerSize: '70%',
            }]
            });
        });
        $("#goal").text("计划: "+stepGoal);
        $("#steps").text("当前步数: "+steps+"步");
        $("#distance").text("当前运动距离: "+distance+"公里");
        $("#cal").text("当前消耗能量: "+cal+"卡路里");
        $("#date").val(date);
    });
}

$(function(){
    $("#next").click(function(){
        var DoughnutChart = $("#DoughnutChart").highcharts();
        $.get("/getsteps/",{"openID":openID,"date":date,"type":"next"},function(ret){
            stepGoal = Number(ret.stepGoal);
            calGoal = Number(ret.calGoal);
            distanceGoal = Number(ret.distanceGoal);
            steps = Number(ret.steps);
            cal = Number(ret.cal);
            distance = Number(ret.distance);
            date = ret.date;
            DoughnutChart.series[0].update({data:[['消耗卡路里',cal],['未完成',positive(calGoal-cal)]]});
            DoughnutChart.series[1].update({data:[['运动距离',distance],['未完成',positive(distanceGoal-distance)]]});
            DoughnutChart.series[2].update({data:[['步数',steps],['未完成',positive(stepGoal-steps)]]});
            $("#goal").text("当日计划: "+stepGoal+"步");
            $("#steps").text("当前步数: "+steps+"步");
            $("#distance").text("当前运动距离: "+distance+"公里");
            $("#cal").text("当前消耗能量: "+cal+"卡路里");
            $("#date").val(date);
        });
    });
});

$(function(){
    $("#previous").click(function(){
        var DoughnutChart = $("#DoughnutChart").highcharts();
        $.get("/getsteps/",{"openID":openID,"date":date,"type":"previous"},function(ret){
            stepGoal = Number(ret.stepGoal);
            calGoal = Number(ret.calGoal);
            distanceGoal = Number(ret.distanceGoal);
            steps = Number(ret.steps);
            cal = Number(ret.cal);
            distance = Number(ret.distance);
            date = ret.date;
            DoughnutChart.series[0].update({data:[['消耗卡路里',cal],['未完成',positive(calGoal-cal)]]});
            DoughnutChart.series[1].update({data:[['运动距离',distance],['未完成',positive(distanceGoal-distance)]]});
            DoughnutChart.series[2].update({data:[['步数',steps],['未完成',positive(stepGoal-steps)]]});
            $("#goal").text("当日计划: "+stepGoal+"步");
            $("#steps").text("当前步数: "+steps+"步");
            $("#distance").text("当前运动距离: "+distance+"公里");
            $("#cal").text("当前消耗能量: "+cal+"卡路里");
            $("#date").val(date);
        });
    });
});

$(function(){
    $("#date").blur(function(){
        var DoughnutChart = $("#DoughnutChart").highcharts();
        if ($("#date").val()=="") {
            $("#date").val(date);
        }
        else{
            date = $("#date").val();
            $.get("/getsteps/",{"openID":openID,"date":date,"type":"someday"},function(ret){
                stepGoal = Number(ret.stepGoal);
                calGoal = Number(ret.calGoal);
                distanceGoal = Number(ret.distanceGoal);
                steps = Number(ret.steps);
                cal = Number(ret.cal);
                distance = Number(ret.distance);
                date = ret.date;
                DoughnutChart.series[0].update({data:[['消耗卡路里',cal],['未完成',positive(calGoal-cal)]]});
                DoughnutChart.series[1].update({data:[['运动距离',distance],['未完成',positive(distanceGoal-distance)]]});
                DoughnutChart.series[2].update({data:[['步数',steps],['未完成',positive(stepGoal-steps)]]});
                $("#goal").text("计划: "+stepGoal);
                $("#steps").text("当前步数: "+steps+"步");
                $("#distance").text("当前运动距离: "+distance+"公里");
                $("#cal").text("当前消耗能量: "+cal+"卡路里");
            });
        }
    });
});

$(function(){
    $("#showchart").click(function(){
        location.href = "/showdetails?openID=" + openID;
    });
});

