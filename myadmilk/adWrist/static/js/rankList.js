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
};

window.onload=function(){
    
    var rankList = $("#table");
    $.get("/getranklist/",{"openID":openID,"type":"init"},function(ret){
        page = 1;
        // ret = {
        //     "userRank":"20",
        //     "userScore":"2000",
        //     "rankArray":[
        //     {
        //         "rank":"1",
        //         "name":"a",
        //         "score":"2000000"
        //     },
        //     {
        //         "rank":"2",
        //         "name":"a",
        //         "score":"2000000"
        //     },
        //     {
        //         "rank":"3",
        //         "name":"a",
        //         "score":"2000000"
        //     },
        //     {
        //         "rank":"4",
        //         "name":"a",
        //         "score":"2000000"
        //     },
        //     {
        //         "rank":"5",
        //         "name":"a",
        //         "score":"2000000"
        //     },
        //     {
        //         "rank":"6",
        //         "name":"a",
        //         "score":"2000000"
        //     }
        //     ]
        // };
        $("#userRank").html(ret.userRank);
        $("#userScore").html(ret.userScore);
        for(var i = 0;i<ret.rankArray.length;i++){
            var newline = $("<tr/>");
            newline.append($("<td/>").html(ret.rankArray[i].rank));
            newline.append($("<td/>").html(ret.rankArray[i].name));
            newline.append($("<td/>").html(ret.rankArray[i].score));
            rankList.append(newline);
        };
    });
}
$(function(){
    $("#next").click(function(){
        var rankList = $("#table");
        $.get("/getranklist/",{"openID":openID,"type":"next","page":page},function(ret){
            // ret={"rankArray":[
            // {
            //     "rank":"7",
            //     "name":"a",
            //     "score":"2000000"
            // },
            // {
            //     "rank":"8",
            //     "name":"a",
            //     "score":"2000000"
            // },
            // {
            //     "rank":"9",
            //     "name":"a",
            //     "score":"2000000"
            // },
            // {
            //     "rank":"10",
            //     "name":"a",
            //     "score":"2000000"
            // },
            // {
            //     "rank":"11",
            //     "name":"a",
            //     "score":"2000000"
            // },
            // {
            //     "rank":"12",
            //     "name":"a",
            //     "score":"2000000"
            // }
            // ]};
            if (ret.rankArray.length==0) {
                alert("没有了");
            }
            else{
                page = page + 1;
                $("#table  tr:not(:first)").html("");
                for(var i = 0;i<ret.rankArray.length;i++){
                    var newline = $("<tr/>");
                    newline.append($("<td/>").html(ret.rankArray[i].rank));
                    newline.append($("<td/>").html(ret.rankArray[i].name));
                    newline.append($("<td/>").html(ret.rankArray[i].score));
                    rankList.append(newline);
                };
            };
        });
    })
})
$(function(){
    $("#previous").click(function(){
        var rankList = $("#table");
        if (page == 1) {
            alert("没有了");
            return;
        };
        $.get("/getranklist/",{"openID":openID,"type":"previous","page":page},function(ret){

            if (ret.rankArray.length == 0) {
                alert("没有了");
            }
            else{
                page = page - 1;
                $("#table  tr:not(:first)").html("");
                for(var i = 0;i<ret.rankArray.length;i++){
                    var newline = $("<tr/>");
                    newline.append($("<td/>").html(ret.rankArray[i].rank));
                    newline.append($("<td/>").html(ret.rankArray[i].name));
                    newline.append($("<td/>").html(ret.rankArray[i].score));
                    rankList.append(newline);
                };
            };
            
        });
    })
})
$(function(){
    $("#around").click(function(){
        var rankList = $("#table");
        $.get("/getranklist/",{"openID":openID,"type":"around"},function(ret){
            page = ret.page;
            $("#table  tr:not(:first)").html("");
            for(var i = 0;i<ret.rankArray.length;i++){
                var newline = $("<tr/>");
                newline.append($("<td/>").html(ret.rankArray[i].rank));
                newline.append($("<td/>").html(ret.rankArray[i].name));
                newline.append($("<td/>").html(ret.rankArray[i].score));
                rankList.append(newline);
            };   
        });
    })
})