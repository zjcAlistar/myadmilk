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

	$(".sex").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107
	});
	$("#sex").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107
	});
	$("#sex_man").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107
	});
	$("#sex_woman").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107
	});
	$("#sex_text").css({
		"left": 0,
		"top": Width*0.35/0.188*0.107*0.8,
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107*0.2,
		 //"line-height": Width*0.35/0.188*0.107*0.5,
		 // "font-size": Width*0.35/0.188*0.107*0.5
		"font-size": Width*0.35/0.188*0.107*0.13,
		"font-family": "SimHei"
	});
	$(".age").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107
	});
	$("#age_text").css({
		"left": 0,
		"top": Width*0.35/0.188*0.107*0.8,
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107*0.2,
		 //"line-height": Width*0.35/0.188*0.107*0.5,
		 // "font-size": Width*0.35/0.188*0.107*0.5
		"font-size": Width*0.35/0.188*0.107*0.13,
		"font-family": "SimHei"
	});
	$("#age").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107*0.7,
		 //"line-height": Width*0.35/0.188*0.107*0.5,
		 "font-size": Width*0.35/0.188*0.107*0.5
	});
	$(".weight").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107
	});
	$("#weight").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107*0.7,
		//"line-height": Width*0.35/0.188*0.107*0.5,
		"font-size": Width*0.35/0.188*0.107*0.5
	});
	$("#weight_text").css({
		"left": 0,
		"top": Width*0.35/0.188*0.107*0.8,
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107*0.2,
		 //"line-height": Width*0.35/0.188*0.107*0.5,
		 // "font-size": Width*0.35/0.188*0.107*0.5
		"font-size": Width*0.35/0.188*0.107*0.13,
		"font-family": "SimHei"
	});
	$(".height").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107
	});
	$("#height").css({
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107*0.7,
		//"line-height": Width*0.35/0.188*0.107*0.5,
		"font-size": Width*0.35/0.188*0.107*0.5
	});
	$("#height_text").css({
		"left": 0,
		"top": Width*0.35/0.188*0.107*0.8,
		"width": Width*0.35,
		"height": Width*0.35/0.188*0.107*0.2,
		 //"line-height": Width*0.35/0.188*0.107*0.5,
		 // "font-size": Width*0.35/0.188*0.107*0.5
		"font-size": Width*0.35/0.188*0.107*0.13,
		"font-family": "SimHei"
	});
	var Fontsize = $("#confirm").css("height");
	$("#confirm").css("font-size", parseInt(Fontsize)*0.7);
};

var defaultAge;
var defaultSex;
var defaultWeight;
var defaultHeight;

var sex;

window.onload = function(){

	$.get("/changeinfo/",{"openID":openID,"type":"init"},function(ret){
		defaultAge = ret.age;
		defaultSex = ret.sex;
		defaultHeight = ret.height;
		defaultWeight = ret.weight;
		if (defaultAge != -1) {
			$("#age").val(defaultAge);
		};
		if (defaultWeight != -1) {
			$("#weight").val(defaultWeight);
		};
		if (defaultHeight != -1) {
			$("#height").val(defaultHeight);
		};
		if(defaultSex) {
			$('#sex_man').css("visibility", "visible");
			$('#sex').css("visibility", "hidden");
			$('#sex_woman').css("visibility", "hidden");
		}
		else {
			$('#sex_man').css("visibility", "hidden");
			$('#sex').css("visibility", "hidden");
			$('#sex_woman').css("visibility", "visible");
		}
		//sex
	});
}

	$(function(){
		$('.sex').click(function(event){
			var objLeft = $("#sex").offset().left;//对象x位置
			var objWidth = $("#sex").width();//对象宽度
			var mouseX = event.clientX + document.body.scrollLeft;//鼠标x位置
			//计算点击的相对位置
			var objX = mouseX - parseInt(objLeft);
			if(objX < parseInt(objWidth) / 2) {
				$('#sex_man').css("visibility", "visible");
				$('#sex').css("visibility", "hidden");
				$('#sex_woman').css("visibility", "hidden");
				sex = true;
			} else {
				$('#sex_man').css("visibility", "hidden");
				$('#sex').css("visibility", "hidden");
				$('#sex_woman').css("visibility", "visible");
				sex = false;
			}
		});
	});

$(function(){
	$("#age").blur(function(){
		var age = Number($("#age").val());
		if(age=="" || !isNaN(age)&&age>0&&age<150){
			$("#age_data").innerHTML = 'age';
			$("#age").css("visibility", "visible");
			
		}
		else{
			alert("格式错误");
			console.info(typeof(age));
			$("#age").val("");
		}
	});
});

$(function(){
	$("#weight").blur(function(){
		var weight =  Number($("#weight").val());
		if(weight=="" || !isNaN(weight)&&weight>0&&weight<300){

		}
		else{
			alert("格式错误");
			$("#weight").val("");
		}
	});
});

$(function(){
	$("#height").blur(function(){
		var height =  Number($("#height").val());
		if(height=="" || !isNaN(height)&&height>0&&height<250){

		}
		else{
			alert("格式错误");
			$("#height").val("");
		}
	});
});

$(function(){
	$("#confirm").click(function(){
		var age = Number($("#age").val());
		var height = Number($("#height").val());
		var weight = Number($("#weight").val());
		if (age!=""&&weight!=""&&height!="") {
			$.get("/changeinfo/",{"openID":openID,"type":"confirm","age":age,"sex":sex,"height":height,"weight":weight},function(ret){
				if(ret == 'success'){
					alert("修改成功");
				}
				else{
					alert("修改失败");
				}
			})
		}
		else{
			alert("请填完整的信息");
		}
	});
});












