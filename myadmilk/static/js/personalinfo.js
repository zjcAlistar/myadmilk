var Height = $(window).height();
var Width = $(window).width();
var edit_state = false;
var valid_comfirm = true;

function changesize() {

	// $("#titlebox").css({
	// 	"width": Width,
	// 	"height": Height*0.1,
	// 	"font-family": "verdana",
	// 	"lineHeight": Height*0.1+"px"
	// });

	//document.getElementById("titlebox").style.lineHeight="100px";
	$("#all").css({
		"position":"absolute",
		"top":"0",
		"left":"0",
		"height": Height,
		"width": Width
	});
	$("#titlebox_text1").css("font-size", Height*0.06);
	$("#titlebox_text2").css("font-size", Height*0.07);

	var avator_height = $("#avatar").height();
	$("#username").css({
		"left": Width*0.17+avator_height,
		"font-size": 0.37*avator_height
	});
	var userinfo_height = $("#userinfo").height();
	$("#userscore").css({
		"top": userinfo_height*0.3+0.4*avator_height,
		"left": Width*0.17+avator_height,
		"font-size": 0.2*avator_height
	});

	// $("#infobox").css({
	// 	"width": Width,
	// 	"height": Height*0.898
	// });



	$("#sex_text").css({
		"font-size": Width*0.35/0.188*0.107*0.13,
		"font-family": "SimHei"
	});

	$("#age_text").css({
		"font-size": Width*0.35/0.188*0.107*0.13,
		"font-family": "SimHei"
	});
	$("#age").css({
		 "font-size": Width*0.35/0.188*0.107*0.5
	});

	$("#weight").css({
		"font-size": Width*0.35/0.188*0.107*0.5
	});
	$("#weight_text").css({
		"font-size": Width*0.35/0.188*0.107*0.13,
		"font-family": "SimHei"
	});

	$("#height").css({
		"font-size": Width*0.35/0.188*0.107*0.5
	});
	$("#height_text").css({
		"font-size": Width*0.35/0.188*0.107*0.13,
		"font-family": "SimHei"
	});


	$("#exercise_advice_title").css({
		"font-size": $("#exercise_advice_title").height()*0.65,
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

	var switch_height = $("#switch").height();
	$("#switch").css({
		// "lineHeight":3,
		"font-size":0.35*switch_height
	});

	// $("#competition_players").css("font-size", 0.7*$("#competition_players").height());
	// $("#competition_state").css("font-size", 0.6*$("#competition_state").height());
	
};

var defaultAge;
var defaultSex = 0;
var defaultWeight;
var defaultHeight;

window.onload = function(){

	//ret test
	// var ret={"age":"12","weight":"45","height":"123","sex":"2","advice":"","id":"Alistar","score":"1998","avatar":"http://img0.bdstatic.com/img/image/shitulogo-r.png"};
	$.get("/changeinfo/",{"openID":openID,"type":"init"},function(ret){
		defaultScore = ret.score;
		defaultAge = Number(ret.age);
		defaultSex = Number(ret.sex);
		defaultHeight = Number(ret.height);
		defaultWeight = Number(ret.weight);
		$("#avatar").attr("src",ret.avatar);
		$("#username").append(ret.id);
		$("#userscore").append("积分:"+ret.score);
		var advice = ret.advice;
		exercise_advice_text.innerHTML = advice;
		if (defaultAge != -1) {
			$("#age").val(defaultAge);
		} else {
			defaultAge = "";
		};
		if (defaultWeight != -1) {
			$("#weight").val(defaultWeight);
		} else {
			defaultWeight = "";
		};
		if (defaultHeight != -1) {
			$("#height").val(defaultHeight);
		} else {
			defaultHeight = "";
		};
		if (defaultSex == 1) {
			$('#sex_man').css("visibility", "visible");
			$('#sex').css("visibility", "hidden");
			$('#sex_woman').css("visibility", "hidden");
		} else if(defaultSex == 2) {
			$('#sex_man').css("visibility", "hidden");
			$('#sex').css("visibility", "hidden");
			$('#sex_woman').css("visibility", "visible");
		}
		//sex
	});
}

$(function(){
	$('.sex').click(function(event){
		if(edit_state == true){
			var objLeft = $("#sex").offset().left;//对象y位置
			var objWidth = $("#sex").width();//对象宽度
			var mouseX = event.clientX + document.body.scrollLeft;//鼠标x位置
			//计算点击的相对位置
			var objX = mouseX - parseInt(objLeft);
			if(objX < parseInt(objWidth) / 2) {
				$('#sex_man').css("visibility", "visible");
				$('#sex').css("visibility", "hidden");
				$('#sex_woman').css("visibility", "hidden");
				defaultSex = 1;
			} else {
				$('#sex_man').css("visibility", "hidden");
				$('#sex').css("visibility", "hidden");
				$('#sex_woman').css("visibility", "visible");
				defaultSex = 2;
			}
		}
	});
});

$(function(){
	$("#age").blur(function(){
		var age = Number($("#age").val());
		if(age == ""){
			defaultAge = "";
		} else if(isNaN(age)){
			alert("请填写数字");
			valid_comfirm = false;
			$("#age").val(defaultAge);
		} else if (age < 0 || age > 150) {
			alert("请填写真实年龄");
			valid_comfirm = false;
			$("#age").val(defaultAge);
		} else {
			$("#age").val(parseInt(age));
			defaultAge = parseInt(age);
		}
		setTimeout("valid_comfirm = true;", 100);
	});
});

$(function(){
	$("#weight").blur(function(){
		var weight =  Number($("#weight").val());
		if(weight == ""){
			defaultWeight = "";
		} else if(isNaN(weight)){
			alert("请填写数字");
			valid_comfirm = false;
			$("#weight").val(defaultWeight);
		} else if (weight>300||weight<0) {
			alert("请填写真实体重");
			valid_comfirm = false;
			$("#weight").val(defaultWeight);
		} else {
			$("#weight").val(parseInt(weight));
			defaultWeight = parseInt(weight);
		}
		setTimeout("valid_comfirm = true;", 100);
	});
});

$(function(){
	$("#height").blur(function(){
		var height =  Number($("#height").val());
		if(height == ""){
			defaultHeight = "";
		} else if(isNaN(height)){
			alert("请填写数字");
			valid_comfirm = false;
			$("#height").val(defaultHeight);
		} else if (height < 0 || height > 250) {
			alert("请填写真实身高");
			valid_comfirm = false;
			$("#height").val(defaultHeight);
		} else {
			$("#height").val(parseInt(height));
			defaultHeight = parseInt(height);
		}
		setTimeout("valid_comfirm = true;", 100);
	})
});

$(function(){
	$("#confirm").click(function(){
		if (valid_comfirm == true) {
			if(edit_state == false) {
				edit_state = true;
				$("#age").removeAttr("disabled");
				$("#weight").removeAttr("disabled");
				$("#height").removeAttr("disabled");
				$("#confirm").val("确认");
			} else if (edit_state == true) {
				var age = parseInt($("#age").val());
				var height = parseInt($("#height").val());
				var weight = parseInt($("#weight").val());
				if (defaultSex != 0 && !isNaN(age)&&!isNaN(height)&&!isNaN(weight)) {
					$.post("/changeinfo/",{"openID":openID,"age":age,"sex":defaultSex,"height":height,"weight":weight,"type":"confirm"},function(ret){
						edit_state = false;
						$("#age").attr("disabled", "true");
						$("#weight").attr("disabled", "true");
						$("#height").attr("disabled", "true");
						$("#confirm").val("修改");
						var advice = ret.advice;
						exercise_advice_text.innerHTML = advice;
					})
				}
				else{
					alert("请填完整的信息");
				}
			}
		};

	})
});

$(function(){
	$("#personalinfo").click(function(){
		$("#infobox").css("display","block");
		$("#personalinfo").css("color","rgb(23,140,250)");
		$("#competitionbox").css("display","none");
		$("#competition").css("color","rgb(120,160,190)");
		$("#competitions").children("li").remove();
	});
});

$(function(){
	$("#competition").click(function(){
		if(edit_state == true) {
			alert("请先确认修改");
		} else {
			$("#competitions").children("li").remove();
			$("#infobox").css("display","none");
			$("#personalinfo").css("color","rgb(120,160,190)");
			$("#competitionbox").css("display","block");
			$("#competition").css("color","rgb(23,140,250)");
			$.get("/getmatches/",{"openID":openID},function(ret){
				var num_match = ret.length;
				for(var i = 0;i < num_match;i++){
					var match = $('<li>');
					(function(k){match.click(function(){
						location.href = k;
					});})( ret[i].matchurl);
					match.attr({
						"class": "single_competition",
						"id":"competition_"+i
					});
					match.css("top",(2+22*i)+"%");
					match.appendTo('#competitions');

					var match_players = $('<div>');
					match_players.attr("id", "competition_players");
					match_players.append(ret[i].matchplayers);
					match_players.appendTo("#competition_"+i);
					
					var match_state = $('<div>');	
					match_state.attr("id", "competition_state");
					if(Number(ret[i].matchstate) == 1) {
						match_state.append("即将开始");
					} else if(Number(ret[i].matchstate) == 2) {
						match_state.append("进行中");
					} else if(Number(ret[i].matchstate) == 3) {
						match_state.append("已结束");
					} else {
						alert("比赛状态有误");
					}
					match_state.appendTo("#competition_"+i);

					var match_title = $('<div>');
					match_title.attr("id", "competition_title");
					match_title.append(ret[i].matchtitle);
					match_title.appendTo("#competition_"+i);

					var match_author = $('<div>');
					match_author.attr("id","competition_author");
					match_author.appendTo("#competition_"+i);

					var match_author_icon = $('<i>');
					match_author_icon.attr("id","icon_author");
					match_author_icon.appendTo("#competition_"+i+" #competition_author");
					
					var match_author_name = $('<p>');
					match_author_name.attr("id", "author_name");
					match_author_name.append(ret[i].matchoriginator);
					match_author_name.appendTo("#competition_"+i+" #competition_author");
					
					var match_starttime = $('<div>');
					match_starttime.attr("id", "competition_starttime");
					match_starttime.append("S:"+ret[i].matchstarttime);
					match_starttime.appendTo("#competition_"+i);
					
					var match_endtime = $('<div>');
					match_endtime.attr("id", "competition_endtime");
					match_endtime.append("E:"+ret[i].matchendtime);
					match_endtime.appendTo("#competition_"+i);
				}
		    });
		}
	});
});

window.onorientationchange  = function(){
	showmessagebox("本页面不支持横屏显示");
	$("body").css("display","none");
}









