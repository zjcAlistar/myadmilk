var Height = $(window).height();
var Width = $(window).width();
var edit_state = false;
var valid_comfirm = true;

function changesize() {

	$("#titlebox").css({
		"width": Width,
		"height": Height*0.1,
		"font-family": "verdana",
		"lineHeight": Height*0.1+"px"
	});

	//document.getElementById("titlebox").style.lineHeight="100px";

	$("#titlebox_text1").css("font-size", Height*0.06);
	$("#titlebox_text2").css("font-size", Height*0.07);

	$("#infobox").css({
		"width": Width,
		"height": Height*0.898
	});



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

var defaultAge;
var defaultSex = 0;
var defaultWeight;
var defaultHeight;

window.onload = function(){

	$.get("/changeinfo/",{"openID":openID,"type":"init"},function(ret){
		defaultAge = Number(ret.age);
		defaultSex = Number(ret.sex);
		defaultHeight = Number(ret.height);
		defaultWeight = Number(ret.weight);
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
	})
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
					$.get("/changeinfo/",{"openID":openID,"age":age,"sex":defaultSex,"height":height,"weight":weight,"type":"confirm"},function(ret){
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

window.onorientationchange  = function(){
	alert("本页面不支持横屏显示");
	$("body").css("display","none");
}












