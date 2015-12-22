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


    $("#exercise_advice_title").css({
        "font-size": Height*0.023,
        "lineHeight": Height*0.04+"px"
    });
    $("#exercise_advice_text").css({
        "font-size": Height*0.025,
        "overflow": "auto"
    });
    var Fontsize = $("#confirm").css("height");
        $("#confirm").css({
        "font-size": parseInt(Fontsize),
        "width": Width*0.2,
        "height": Width* 0.2,
        "left": Width*0.4  
    });
};
window.onload=function(){
    $.get("/weekreport/",{"openID":openID},function(ret){
        var competitionTable = $("#table");
        // var  ret ={ "stepArray":[{"date":"2015-11-11","steps":"20"},
        //     {"date":"2015-11-12","steps":"30"},
        //     {"date":"2015-11-13","steps":"50"},
        //     {"date":"2015-11-14","steps":"50"},
        //     {"date":"2015-11-15","steps":"50"},
        //     {"date":"2015-11-16","steps":"50"},
        //     {"date":"2015-11-17","steps":"50"}],
        //     "total":{
        //         "totalStep":"5000",
        //         "totalDistance":"20",
        //         "totalCal":"20000"
        //     },
        //     "competitionArray":[
        //     {"name":"213A跑步比赛","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"},
        //     {"name":"一周马拉松","rank":"1"}
        //     ]
        // };
        $("#totalStep").html(ret.total.totalStep+"步");
        $("#totalDistance").html(ret.total.totalDistance+"公里");
        $("#totalCal").html(ret.total.totalCal+"cal");
        var stepArray = new Array();
        for(var i = 0;i<7;i++){
            stepArray.push([ret.stepArray[i].date,Number(ret.stepArray[i].steps)]);  
        };
        for(var i = 0;i<ret.competitionArray.length;i++){
            var newline = $("<tr/>");
            newline.append($("<td/>").html(ret.competitionArray[i].name));
            newline.append($("<td/>").html(ret.competitionArray[i].rank));
            competitionTable.append(newline);
        };
        $("#lineChart").highcharts({
            chart:{
                type:'line',
                borderRadius:"10px",
                backgroundColor:"rgba(255,255,255,0.8)"
            },
            title:{
                text:"运动量折线图",
                style:{
                    "font-family":"STXihei",
                    "fontSize":"24px"
                }
            },
            tooltip:{
                style:{
                    "fontSize":"18px"
                }
            },
            legend:{
                itemStyle:{
                    "font-family":"STXihei",
                    "fontSize":"18px"
                }
            },
            credits: {
                enabled: false
            },
            xAxis:{
             type: 'category',
             lables:{
                 style:{
                     fontSize:"24px"
                 }
             }
            },
            yAxis:{
                min:0,
                title: {
                    text: 'steps'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            plotOptions:{
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            },
            series:[{
                name: '步数',
                data: stepArray
            }]
        });
    });
}
