

function changesize() {
	var Height = $(window).height();
	var Width = $(window).width();
	$("#infobox").css({
		"left": Width/10,
		"top": Height/10,
		"width": Width*0.8});


}


function confirm_personalinfo() {
	var tsex = $("#sex").val();
	var tage = $("#age").val();
	var theight = $("#height").val();
	var tweight = $("#weight").val();

	var sex;
	if (tsex == "0") {
		sex = false;
	}
	else{
		sex = true;
	}

	var age;
	switch(tage) {
		case "1":
			age = 2;
			break;
		case "2":
			age = 7;
			break;
		case "3":
			age = 12;
			break;
		case "4":
			age = 17;
			break;
		case "5":
			age = 22;
			break;
		case "6":
			age = 27;
			break;
		case "7":
			age = 35;
			break;
		case "8":
			age = 45;
			break;
		case "9":
			age = 55;
			break;
		case "10":
			age = 60;
			break;
	}

	var height;
	switch(theight) {
		case "1":
			height = 119;
			break;
		case "2":
			height = 125;
			break;
		case "3":
			height = 135;
			break;
		case "4":
			height = 145;
			break;
		case "5":
			height = 155;
			break;
		case "6":
			height = 165;
			break;
		case "7":
			height = 175;
			break;
		case "8":
			height = 185;
			break;
		case "9":
			height = 195;
			break;
	}

	var weight;
		switch(tweight) {
		case "1":
			weight = 29;
			break;
		case "2":
			weight = 32;
			break;
		case "3":
			weight = 37;
			break;
		case "4":
			weight = 42;
			break;
		case "5":
			weight = 47;
			break;
		case "6":
			weight = 52;
			break;
		case "7":
			weight = 57;
			break;
		case "8":
			weight = 62;
			break;
		case "9":
			weight = 67;
			break;
		case "10":
			weight = 72;
			break;
		case "11":
			weight = 77;
			break;
		case "12":
			weight = 82;
			break;
		case "13":
			weight = 87;
			break;
		case "14":
			weight = 92;
			break;
		case "15":
			weight = 97;
			break;
		case "16":
			weight = 100;
			break;
	}

	$.get("/changeinfo/", {"openID":openID, "sex":sex, "age":age, "height":height, "weight":weight}, function(ret){
		if(ret == 'success') alert('成功');
	});

}










