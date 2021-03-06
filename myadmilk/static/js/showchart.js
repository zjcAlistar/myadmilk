var stepArray;
var finishArray;
function positive(Num){
    if (Num>0)
        return Num;
    else
        return 0;
}
function changesize(){
    var Height = $(window).height();
    var Width = $(window).width();
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
    $('#previous').css("font-size", Height*0.9*0.2*0.6*0.5);
    $('#next').css("font-size", Height*0.9*0.2*0.6*0.5);
    $('#date').css("font-size", Height*0.9*0.2*0.6*0.35);
    $('#text').css("font-size", Height*0.9*0.6*0.15*0.35);
    $('#pedometer').css("font-size", Height*0.9*0.2*0.4*0.5);
    
    // var Fontsize = $("#confirm").css("height");
    // $("#confirm").css("font-size", parseInt(Fontsize)*0.7);
};
window.onload = function() {
    Highcharts.Pointer.prototype.onContainerMouseDown = function (e) {
        e = this.normalize(e);
        this.dragStart(e);
    };

    $.get("/getweekdata/", {"openID": openID, "type": "init7", "nums": 7}, function (ret) {
        //var  ret = [{"date":"2015-11-11","steps":"200","goal":"30"},{"date":"2015-11-12","steps":"30","goal":"40"},{"date":"2015-11-13","steps":"50","goal":"30"},{"date":"2015-11-12","steps":"30","goal":"40"},{"date":"2015-11-12","steps":"30","goal":"40"},{"date":"2015-11-12","steps":"30","goal":"40"},{"date":"2015-11-12","steps":"30","goal":"40"}];
        stepArray = new Array();
        finishArray = new Array();
        for (var i = 0; i < ret.length; i++) {
            stepArray.push([ret[i].date.slice(5),Number(ret[i].steps)]);
            finishArray.push([ret[i].date.slice(5),positive(Number(ret[i].goal)- Number(ret[i].steps))]);
        }
        console.log(stepArray);
        $("#barChart").highcharts({
            chart: {
                type: 'column',
                background: "rgba(0,0,0,0)"
            },
            title: {
                text: "一周步数统计",
                style: {
                    "fontSize": "60px"
                }
            },
            tooltip: {
                style: {
                    "fontSize": "36px"
                }
            },
            legend: {
                itemStyle: {
                    "fontSize": "24px"
                }
            },
            credits: {
                enabled: false
            },

            xAxis: {
                labels: {
                    style:{
                        fontSize:"24px"
                    }
                },
                type: 'category'
                
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        fontSize: "28px"
                    }
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: [{
                name: '未完成',
                data: finishArray,
                dataLabels:{
                    enabled: true,
                    style: {
                        fontSize: "24px",
                        fontWeight: 'bold'
                    }
                }
            }, {
                name: '步数',
                data: stepArray,
                dataLabels:{
                    enabled: true,
                    style: {
                        fontSize: "24px",
                        fontWeight: 'bold'
                    }
                }
            }]
        });
        $("#date").val(ret[ret.length - 1].date);
    });

}
    

//click next to check next day
$(function(){
    $("#next").click(function(){
    
    var barChart = $("#barChart").highcharts();
    var date = $("#date").val();
    $.get("/getweekdata/",{"openID":openID, "type":"next","date":date,"nums": 1},function(ret){
    //var ret = {"date":"2015-11-14","steps":"500","goal":"600"};
        stepArray.shift();
        stepArray.push([ret.date.slice(5),Number(ret.steps)]);
        finishArray.shift();
        finishArray.push([ret.date.slice(5),positive(Number(ret.goal)-Number(ret.steps))]);
        barChart.series[0].update({data:finishArray});
        barChart.series[1].update({data:stepArray});
        $("#date").val(ret.date);
    });
    
});
})

//click previous to check previous day
$(function(){
    $("#previous").click(function(){
    var barChart = $("#barChart").highcharts();
    var date = $("#date").val();
    $.get("/getweekdata/",{"openID":openID,"type":"previous","date":date,"nums":1},function(ret){
        stepArray.pop();
        stepArray.unshift([ret.date.slice(5),Number(ret.steps)]);
        finishArray.pop();
        finishArray.unshift([ret.date.slice(5),positive(Number(ret.goal)-Number(ret.steps))]);
        barChart.series[0].update({data:finishArray});
        barChart.series[1].update({data:stepArray});
        $("#date").val(ret.date);
    })
});

})

//set date to check the exact day
$(function(){
    $("#date").blur(function(){
    var barChart = $("#barChart").highcharts();
    if ($("#date").val()=="") {
        $("#date").val(date);
    }
    else{
        date = $("#date").val();
        $.get("/getweekdata/",{"openID":openID,"date":date,"type":"get7","nums":7},function(ret){
         //var  ret = [{"date":"2015-11-12","steps":"40","goal":"50"},{"date":"2015-11-13","steps":"200","goal":"400"},{"date":"2015-11-14","steps":"50","goal":"30"}];
            stepArray = [];
            finishArray = [];
            for(var i = 0;i<ret.length;i++){
                stepArray.push([ret[i].date.slice(5),Number(ret[i].steps)]);
                finishArray.push([ret[i].date.slice(5),positive(Number(ret[i].goal)- Number(ret[i].steps))]);
            };
            barChart.series[0].update({data:finishArray});
            barChart.series[1].update({data:stepArray});
        });
    }
})
})
$(function(){
    $("#pedometer").click(function(){
        location.href = "/gobackchart?openID=" + openID;
    });
})
