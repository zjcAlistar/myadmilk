        var canvas;
        var ctx;
        var barChart;
        var date;
        var data;
        function changesize() {
            var Height = $(window).height();
            var Width = $(window).width();
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
            $('#previous').css("font-size", Height*0.9*0.2*0.6*0.25);
            $('#next').css("font-size", Height*0.9*0.2*0.6*0.25);
            $('#date').css("font-size", Height*0.9*0.2*0.6*0.35);
            $('#text').css("font-size", Height*0.9*0.6*0.15*0.35);
            $('#pedometer').css("font-size", Height*0.9*0.2*0.4*0.5);
            
            var Fontsize = $("#pedometer").css("height");
            $("#pedometer").css({
            "font-size": parseInt(Fontsize)*0.5,
            "width": Width*0.2,
            "height": Width* 0.2,
            "left": Width*0.4  
    });
        };
        window.onload = function(){
            canvas = document.getElementById("barChart");
            ctx = canvas.getContext("2d");
            $.get("/getweekdata/",{"openID":openID,"type":"init7","nums":7},function(ret){
                data = new Object;
                data.labels = new Array(7);
                data.datasets = new Array();
                data.datasets[0] = {
                    fillColor: "rgba(0,0,0,0.5)",
                    strokeColor: "rgba(0,0,0,0.5)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)"
                };
                data.datasets[0].data = new Array();
                for (var i = 0; i < 7; i++) {
                    data.labels[i] = ret[i].date;
                    data.datasets[0].data[i] = Number(ret[i].steps);
                };
                $("#date").val(ret[6].date);
                barChart = new Chart(ctx).Bar(data);
            })
            
        };

        //click next to check next day
        $("#next").click(function(){
            $.get("/getweekdata/",{"openID":openID, "type":"next","date":data.labels[6],"nums": 1},function(ret){
                data.labels.shift();
                data.labels.push(ret.date);
                data.datasets[0].data.shift();
                data.datasets[0].data.push(Number(ret.steps));
                $("#date").val(ret.date);
                barChart.destroy();
                barChart = new Chart(ctx).Bar(data);
            })
            
        });
        //click previous to check previous day
        $("#previous").click(function(){
            $.get("/getweekdata/",{"openID":openID,"type":"previous","date":data.labels[0],"nums":1},function(ret){
                data.labels.pop();
                data.datasets[0].data.pop();
                data.labels.unshift(ret.date);
                data.datasets[0].data.unshift(Number(ret.steps));
                $("#date").val(ret.date);
                barChart.destroy();
                barChart = new Chart(ctx).Bar(data);
            })
        });
        //set date to check the exact day
        $("#date").blur(function(){
            if ($("#date").val()=="") {
                $("#date").val(date);
            }
            else{
                date = $("#date").val();
                $.get("/getweekdata/",{"openID":openID,"date":date,"type":"get7","nums":7},function(ret){
                    for (var i = 0; i < 7; i++) {
                    data.labels[i] = ret[i].date;
                    data.datasets[0].data[i] = Number(ret[i].steps);
                    };
                    barChart.destroy();
                    barChart = new Chart(ctx).Bar(data);
                });
                
            }
        })
        $("#pedometer").click(function(){
            location.href = "/gobackchart?openID=" + openID
        })