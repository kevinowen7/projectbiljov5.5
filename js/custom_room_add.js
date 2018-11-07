function getFileName(numb) {
	
	//trigger file browser when picture is clicked
	$("#fileButton").trigger("click");
	document.getElementById("picCount").value = numb;
	document.getElementById("fileButton").value = "";
	maxPhoto(numb);
	return false;
	
}

function maxPhoto(numb) {
	
	//counts the amount of photo sumbitted
	var pMax = document.getElementById("maxPic").value;
	if (numb>pMax) {
		document.getElementById("maxPic").value = numb;
	}
	
}

function removePhoto(numb) {
	
	var pMax = document.getElementById("maxPic").value;
	//deleted photo is not the last photo
	if (numb<pMax) {
		for(i=numb; i<pMax; i++) {
			document.getElementById("prepiew"+i).src = document.getElementById("prepiew"+(i+1)).src;
			document.getElementById("fileName"+i).value = document.getElementById("fileName"+(i+1)).value;
		}
		document.getElementById("prepiew"+pMax).src = "img/empty-photo.jpg";
		document.getElementById("fileName"+pMax).value = "";
		$("#removep"+pMax).hide();
		document.getElementById("fileButton").value = "";
		document.getElementById("maxPic").value = (document.getElementById("maxPic").value)-1;
		if (pMax!=5) {
			$("#gambar"+(parseInt(pMax)+1)).fadeOut(250, function() {
				$(this).hide();
			})
		}
	//deleted photo is the last photo
	} else {
		document.getElementById("prepiew"+numb).src = "img/empty-photo.jpg";
		document.getElementById("fileName"+numb).value = "";
		$("#removep"+numb).hide();
		document.getElementById("fileButton").value = "";
		document.getElementById("maxPic").value = (document.getElementById("maxPic").value)-1;
		if (numb!=5) {
			$("#gambar"+(parseInt(numb)+1)).fadeOut(250, function() {
				$(this).hide();
			})
		}
	}
	
}

function get_fmoney(money) {
	
	var rev     = parseInt(money, 10).toString().split('').reverse().join('');
	var rev2    = '';
	for(var i = 0; i < rev.length; i++){
		rev2  += rev[i];
		if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
			rev2 += '.';
		}
	}
	return ("Rp. "+rev2.split('').reverse().join('') + ',-')
	
}

function pembulatan(input) {
	
	return (Math.round((parseInt(input)/100)))*100;
	
}

function removeOptions(selectbox) {
	
    //clear select options
    for(i=selectbox.options.length-1; i>=1; i--) {
        selectbox.remove(i);
    }
	
}

function rem_moneydot(money) {
	
	return parseInt(money.split(".").join(""));
	
}

function get_moneydot(money) {
	
	if (isNaN(parseInt(money))) {
		var convertmoney = "";
	} else {
		money = rem_moneydot(money);
		var convertmoney = money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	}
	return convertmoney;
	
}

function resetForm() {
	
	//start loading icon
	$("#cover-spin").fadeIn(250, function() {
		$(this).show();
	})
	//reset facilities
	var id = window.location.href.split('=').pop();
	var broke = id.split("");
	var buildType0 = broke[0];
	if (buildType0=="1"){
		var buildType = "residential";
	} 
	var buildNo = broke[1]+broke[2];
	const check = firebase.database().ref().child("property/"+buildType+"/"+"building_no:"+buildNo);
	check.once('value', function(snapshot) {
		$("#bed").prop("checked",snapshot.child("facilities/bed").val());
		$("#wardrb").prop("checked",snapshot.child("facilities/wardrb").val());
		$("#table").prop("checked",snapshot.child("facilities/table").val());
		$("#bthins").prop("checked",snapshot.child("facilities/bthins").val());
		$("#wifi").prop("checked",snapshot.child("facilities/wifi").val());
		$("#ctv").prop("checked",snapshot.child("facilities/ctv").val());
		$("#hwater").prop("checked",snapshot.child("facilities/hwater").val());
		$("#parker").prop("checked",snapshot.child("facilities/parker").val());
		$("#laundy").prop("checked",snapshot.child("facilities/laundy").val());
		$("#pwrtkn").prop("checked",snapshot.child("facilities/pwrtkn").val());
		$("#ac").prop("checked",snapshot.child("facilities/ac").val());
		$("#bedcvr").prop("checked",snapshot.child("facilities/bedcvr").val());
		$("#secury").prop("checked",snapshot.child("facilities/secury").val());
		$("#kitchn").prop("checked",snapshot.child("facilities/kitchn").val());
		//stop loading icon
		$("#cover-spin").fadeOut(250, function() {
			$(this).hide();
		})
	})
	//reset progress bar
	for(i=1; i<=7; i++) {
		$("#progBar"+i).css("width","0%");
	}
	//unlock form
	$("input").prop('disabled', false);
	//clear every photo submitted
	var pMax = document.getElementById("maxPic").value;
	for(i=1; i<=pMax; i++) {
		document.getElementById("prepiew"+i).src = "img/empty-photo.jpg";
		document.getElementById("fileName"+i).value = "";
		$("#removep"+i).hide();
		if (i!=1) {
			$("#gambar"+i).hide();
		}
		if (pMax!=7) {
			$("#gambar"+(parseInt(pMax)+1)).hide();
		}
	}
	document.getElementById("fileButton").value = "";
	document.getElementById("picCount").value = "";
	document.getElementById("maxPic").value = "0";
	//reset threshold
	$("#thresholdCounter").val(0);
	//reset price table
	$("#pyearval").val("");
	$("#pyear").html("-");
	$("#byear").html("-");
	$("#psix").html("-");
	$("#bsix").html("-");
	$("#pmonth").html("-");
	$("#bmonth").html("-");
	//scroll back to top
	$('html, body').animate({
		scrollTop: 0
	}, 500);
	
}

function lockForm() {
	
	//reset progress bar
	for(i=1; i<=5; i++) {
		$("#progBar"+i).css("width","0%");
	}
	//lock submit buttons
	$("#bfinish").prop('disabled', true);
	//lock inputs
	$("input").prop('disabled', true);
	//lock photos
	var pMax = $("#maxPic").val();
	for(i=1; i<=pMax; i++) {
		$("#jump"+i).removeAttr("href");
		$("#jump"+i).removeAttr("onclick");
		$("#removep"+i).hide();
		$("#progBared"+i).removeClass("hidden");
	}
	for(i = parseInt(pMax)+1; i<=5; i++) {
		$("#prepiew"+i).hide();
	}
	
}

function unlockForm() {
	
	//unlock submit buttons
	$("#bfinish").prop('disabled', false);
	//unlock inputs
	$("input").prop('disabled', false);
	//unlock photos
	var pMax = $("#maxPic").val();
	for(i=1; i<=pMax; i++) {
		$("#jump"+i).attr("href","javascript:void(0);");
		$("#jump"+i).attr("onclick","getFileName("+i+")");
		$("#removep"+i).show();
		$("#progBared"+i).addClass("hidden");
	}
	for(i = parseInt(pMax)+1; i<=5; i++) {
		$("#prepiew"+i).show();
	}
	
}

function uploadDB() {
	
	//start loading icon
	$("#loadingUpload").fadeIn(250, function() {
		$(this).removeClass("hide");
	})
	lockForm();
	var pMax = $("#maxPic").val();
	for(i=1; i<=pMax; i++) {
		$("#progBar"+i).css("width","100%");
	}
	setTimeout(function() {
		//success notification
		$.gritter.add({
			title: 'Room Uploaded',
			text: 'Room was successfully uploaded to the database.',
			image: './img/bell.png',
			sticky: false,
			time: 3500,
			class_name: 'gritter-custom'
		})
		unlockForm();
		$("#breset").trigger("click");
		//scroll back to top
		$('html, body').animate({
			scrollTop: 0
		}, 500);
		//stop loading icon
		$("#loadingUpload").fadeOut(250, function() {
			$(this).hide();
		})
	}, 2000)
	
}

$(document).ready(function() {
	
	//collect id from link
	var id = window.location.href.split('=').pop();
	var broke = id.split("");
	//split id into different categories
	var buildType0 = broke[0];
	if (buildType0=="1"){
		var buildType = "residential";
	} 
	var buildNo = broke[1]+broke[2];
	//set building number in form
	$("#buildno").html(buildNo);
	const check = firebase.database().ref().child("property/"+buildType+"/"+"building_no:"+buildNo);
	//check if building exist
	check.once('value', function(snapshot) {
		var address = snapshot.child("address_street").val();
		//building exist
		if (address != null) {
			//set facilities input fields in form
			$("#bed").prop("checked",snapshot.child("facilities/bed").val());
			$("#wardrb").prop("checked",snapshot.child("facilities/wardrb").val());
			$("#table").prop("checked",snapshot.child("facilities/table").val());
			$("#bthins").prop("checked",snapshot.child("facilities/bthins").val());
			$("#wifi").prop("checked",snapshot.child("facilities/wifi").val());
			$("#ctv").prop("checked",snapshot.child("facilities/ctv").val());
			$("#hwater").prop("checked",snapshot.child("facilities/hwater").val());
			$("#parker").prop("checked",snapshot.child("facilities/parker").val());
			$("#laundy").prop("checked",snapshot.child("facilities/laundy").val());
			$("#pwrtkn").prop("checked",snapshot.child("facilities/pwrtkn").val());
			$("#ac").prop("checked",snapshot.child("facilities/ac").val());
			$("#bedcvr").prop("checked",snapshot.child("facilities/bedcvr").val());
			$("#secury").prop("checked",snapshot.child("facilities/secury").val());
			$("#kitchn").prop("checked",snapshot.child("facilities/kitchn").val());
			//stop loading icon
			$("#cover-spin").fadeOut(250, function() {
				$(this).hide();
			})
		//building does not exist
		} else {
			window.alert("Building does not exist");
			window.location = "room_list.html";
		}
	})
	//check floors
	var floorList = [];
	check.on('child_added', function(snapshot) {
		removeOptions(document.getElementById("rflor"));
		if (snapshot.key.split(":")[0] == "floor") {
			floorList.push(snapshot.key.split(":")[1]);
		}
		for (i=0; i<floorList.length; i++) { 
			var optionElement = document.createElement("option");
			optionElement.value = floorList[i];
			optionElement.innerHTML = floorList[i];
			document.getElementById("rflor").appendChild(optionElement);
		}
	})
	//floor listener
	$('#rflor').on('change', function () {
		//stop loading icon
		$("#cover-spin").fadeIn(250, function() {
			$(this).show();
		})
		var floorNo = $(this).val();
		if (floorNo == "") {
			$("#roomno")
				.prop("readonly",true)
				.val("");
			//stop loading icon
			$("#cover-spin").fadeOut(250, function() {
				$(this).hide();
			})
		} else {
			const dbRef = firebase.database().ref("property/residential/building_no:"+buildNo+"/floor:"+floorNo).limitToLast(1);
			dbRef.on('child_added', function(snapshot) {
				var lastRoomID = snapshot.key.split(":")[1];
				var lastRoomNumber = parseInt(lastRoomID.substring(5,7));
				var suggestRoomNumber  = lastRoomNumber+1;
				$("#roomno")
					.val(suggestRoomNumber)
					.prop('readonly',false);
				//stop loading icon
				$("#cover-spin").fadeOut(250, function() {
					$(this).hide();
				})
			})
		}
	})
	//picture listener
	$('#prepiew1').on('load', function () {
		if ($(this).attr('src') != "img/empty-photo.jpg") {
			$("#removep1,#gambar2").fadeIn(250, function() {
				$(this).removeClass("hide");
				$("#fileButton").val("");
			})
		}
	})
	$('#prepiew2').on('load', function () {
		if ($(this).attr('src') != "img/empty-photo.jpg") {
			$("#removep2,#gambar3").fadeIn(250, function() {
				$(this).removeClass("hide");
				$("#fileButton").val("");
			})
		}
	})
	$('#prepiew3').on('load', function () {
		if ($(this).attr('src') != "img/empty-photo.jpg") {
			$("#removep3,#gambar4").fadeIn(250, function() {
				$(this).removeClass("hide");
				$("#fileButton").val("");
			})
		}
	})
	$('#prepiew4').on('load', function () {
		if ($(this).attr('src') != "img/empty-photo.jpg") {
			$("#removep4,#gambar5").fadeIn(250, function() {
				$(this).removeClass("hide");
				$("#fileButton").val("");
			})
		}
	})
	$('#prepiew5').on('load', function () {
		if ($(this).attr('src') != "img/empty-photo.jpg") {
			$("#removep5").fadeIn(250, function() {
				$(this).removeClass("hide");
				$("#fileButton").val("");
			})
		}
	})
	//file input listener
	$("#fileButton").change(function() {
		var counter = document.getElementById("picCount").value;
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#prepiew'+counter).attr('src', e.target.result);
			}
			reader.readAsDataURL(this.files[0]);
			document.getElementById("fileName"+counter).value = this.files[0].name;
		}
	})
	//price listener
	$("#pyear").on('keyup change', function() {
		$("#pyear").val(get_moneydot($("#pyear").val()));
		var yearPr = pembulatan(rem_moneydot($("#pyear").val()));
		if (isNaN(yearPr)) {
			$("#byear").html("-");
			$("#psix").html("-");
			$("#bsix").html("-");
			$("#pmonth").html("-");
			$("#bmonth").html("-");
		} else {
			var sixPr = pembulatan((((parseInt(yearPr)/2)*1.1)+25000).toFixed(2));
			var monthPr = pembulatan((((parseInt(yearPr)/12)*1.2)+25000).toFixed(2));
			var yearBo = pembulatan((parseInt(yearPr)/12).toFixed(2));
			var sixBo = pembulatan(monthPr);
			var monthBo = pembulatan((sixPr/6).toFixed(2));
			$("#byear").html(get_fmoney(yearBo));
			$("#psix").html(get_fmoney(sixPr));
			$("#bsix").html(get_fmoney(sixBo));
			$("#pmonth").html(get_fmoney(monthPr));
			$("#bmonth").html(get_fmoney(monthBo));
		}
	})
	/* $('#pyear').on('change', function () {
		var yearPr = $("#pyearval").val();
		if (yearPr == ""){
			$("#byear").html("");
			$("#psix").html("");
			$("#bsix").html("");
			$("#pmonth").html("");
			$("#bmonth").html("");
		} else {
			var sixPr = pembulatan((((parseInt(yearPr)/2)*1.1)+25000).toFixed(2));
			var monthPr = pembulatan((((parseInt(yearPr)/12)*1.2)+25000).toFixed(2));
			var yearBo = pembulatan((parseInt(yearPr)/12).toFixed(2));
			var sixBo = pembulatan(monthPr);
			var monthBo = pembulatan((sixPr/6).toFixed(2));
			$("#byear").html(get_fmoney(yearBo));
			$("#psix").html(get_fmoney(sixPr));
			$("#bsix").html(get_fmoney(sixBo));
			$("#pmonth").html(get_fmoney(monthPr));
			$("#bmonth").html(get_fmoney(monthBo));
		}
	})
	$('#pyear').on('dblclick', function () {
		//prompt to insert value
		var prompter = prompt("Change value (Rp.)", $("#pyearval").val());
		//when prompt is ok
		if (prompter != null) {
			$("#pyearval").val(pembulatan(parseInt(prompter)));
			$("#pyear").html(get_fmoney($("#pyearval").val()));
			$("#pyear").trigger("change");
		}
	}) */
	//modal confirmation listener
	$("#confirmYes").on('click', function () {
		uploadDB();
	})
	
})

//jquery form validation
$().ready(function() {

	$("#inpRoom").validate({
		submitHandler: function() {
			if ($("#pyearval").val() != "" && $("#pyearval").val() != "NaN") {
				//trigger modal popup
				$("#modalConfirm").modal();
			} else {
				//scroll back to top
				$('html, body').animate({
					scrollTop: 0
				}, 500);
				//error notification
				$.gritter.add({
					title: 'Error',
					text: 'Annual price cannot be empty.',
					image: './img/bell.png',
					sticky: false,
					time: 3500,
					class_name: 'gritter-custom'
				})
			}
		},
		rules: {
			rflor: {
				required: true,
				digits: true,
				min: 1,
				max: 99
			},
			roomno: {
				required: true,
				digits: true,
				min: 1,
				max: 99
			},
			pyear: "required",
			rmsize: "required",
			adate: "required"
		},
		messages: {
			rflor: {
				required: "Please enter room floor.",
				digits: "Please enter a valid number.",
				min: "Room floor must be greater than or equal to 1.",
				max: "Room floor must be less than or equal to 99."
			},
			roomno: {
				required: "Please enter room number.",
				digits: "Please enter a valid number.",
				min: "Room number must be greater than or equal to 1.",
				max: "Room number must be less than or equal to 99."
			},
			pyear: "Please enter yearly price",
			rmsize: "Please enter room size",
			adate: "Please enter available date"
		}
	});

});