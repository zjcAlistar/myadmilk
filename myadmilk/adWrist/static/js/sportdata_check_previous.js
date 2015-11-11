

function changesize() {
	var Height = $(window).height();
	var Width = $(window).width();
	$("#infobox").css({
		"left": Width*0.1,
		"top": Height*0.1,
		"width": Width*0.8,
		"height": Height*0.8
	});

	var Fontsize = $(".front_items").css("height");
	$(".front_items").css("font-size", parseInt(Fontsize)*0.7);
	$("#date").css("font-size", parseInt(Fontsize)*0.7);
	$("#confirm").css("font-size", parseInt(Fontsize)*0.7);

	var infoboxHeight = Height*0.8;
	var infoboxWidth = Width*0.8;
	$("#databox").css({
		"left": infoboxWidth*0.1,
		"top": infoboxHeight*0.5,
		"width": infoboxWidth*0.8,
		"height": infoboxHeight*0.45,
		"display": "none"
	});

	var databoxFontsize = $(".data_items").css("height");
	$(".data_items").css("font-size", parseInt(databoxFontsize)*4.5);
	$(".data").css("font-size", parseInt(databoxFontsize)*4.5);
}


function check_previous() {
	var str = $('#date').val();
	if(str == '') {
		alert("查询日期格式有误！");
	} else {
		var year = str.split('-')[0];
		var month = str.split('-')[1];
		var day = str.split('-')[2];
		$.get('/checkprevious/',{'openID':openID, 'year':year, 'month':month, 'day':day}, function(ret) {
			if (ret.flag == 'success'){
				$("#sporttype").attr("value", ret.sporttype);
				$("#quantity").attr("value", ret.quantity);
				$("#calorie").attr("value", ret.calorie);
				$("#databox").css("display", "block");
			}
			else{
				alert(ret.flag);
			}
		});
	}
}








