var theArray = [];

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
		if (pMax!=7) {
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
		if (numb!=7) {
			$("#gambar"+(parseInt(numb)+1)).fadeOut(250, function() {
				$(this).hide();
			})
		}
	}
	
}

function totalFloorKeyup() {
	
	//listen every change on total floor input
	$('#totalfloor').remove();
	totalFloorInput(document.getElementById("totflor").value);
	
}

function totalFloorInput(count) {
	
	//when the input is empty
	if (count == "") {
		$("#troom").fadeOut(250, function() {
			$(this).hide();
		})
	//when the input is not valid
	} else if (count>99 || count<1 || count%1!=0) {
		$("#troom").fadeOut(250, function() {
			$(this).hide();
		})
	//when the input is valid
	} else {
		//creates container for the room input per floor
		var inputBoxContainer = document.createElement("div");
		inputBoxContainer.id = "totalfloor";
		document.getElementById("troomchild").appendChild(inputBoxContainer);
		document.getElementById("totroom").innerHTML = 0;
		theArray.length = 0;
		//creates room input per floor
		for(i=1; i<=count; i++) {
			var inputBox = document.createElement("input");
			inputBox.id = "rminflr"+i;
			inputBox.className = "form-control";
			inputBox.type = "number";
			inputBox.min = "0";
			inputBox.max = "99";
			inputBox.placeholder = "Floor "+i;
			inputBox.required = "true"; 
			document.getElementById("totalfloor").appendChild(inputBox);
		}
		$("#troom").fadeIn(250, function() {
			$(this).removeClass("hide");
		})
	}
	
}

function removeOptions(selectbox) {
	
    //clear select options
    for(i=selectbox.options.length-1; i>=1; i--) {
        selectbox.remove(i);
    }
	
}
 
function totalRoom(e) {
	
	//listen every change in every floor at number of rooms
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.value;
		if (clickedItem == ""){
			clickedItem = 0;
		}
		var broker = e.target.id.split("");
		if (broker[8] == undefined) {
			var itemID = broker[7];
		} else {
			var itemID = broker[7]+broker[8];
		}
		theArray[itemID-1] = clickedItem;
		document.getElementById("totroom").innerHTML = totalRoomCount();
    }
    e.stopPropagation();
	
}

function totalRoomCount() {
	
	//calculate total room
	var mixmax = 0;
	for (i=0; i<theArray.length; i++) {
		var currentNumber = theArray[i];
		if (currentNumber == undefined) {
			currentNumber = 0;
		}
		mixmax = mixmax + parseInt(currentNumber);
	}
	return mixmax;
	
}

function resetForm() {
	
	//reset progress bar
	for(i=1; i<=7; i++) {
		$("#progBar"+i).css("width","0%");
	}
	//unlock form
	$("input").prop('disabled', false);
	$("select").prop('disabled', false);
	$("#adcity").prop('disabled', true);
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
	//reset total floor
	var count = document.getElementById("totflor").value;
	$("#troom").hide();
	for(i=1; i<=count; i++) {
		document.getElementById("rminflr"+i).remove();
	}
	$("#totroom").html(0);
	//reset dropdown city
	document.getElementById("adcity").disabled = true;
	//reset threshold
	$("#thresholdCounter").val(0);
	//scroll back to top
	$('html, body').animate({
		scrollTop: 0
	}, 500);
	
}

function lockForm() {
	
	//reset progress bar
	for(i=1; i<=7; i++) {
		$("#progBar"+i).css("width","0%");
	}
	//lock submit buttons
	$("#bfinish").prop('disabled', true);
	$("#breset").prop('disabled', true);
	//lock inputs
	$("input").prop('disabled', true);
	$("select").prop('disabled', true);
	//lock photos
	var pMax = $("#maxPic").val();
	for(i=1; i<=pMax; i++) {
		$("#jump"+i).removeAttr("href");
		$("#jump"+i).removeAttr("onclick");
		$("#removep"+i).hide();
		$("#progBared"+i).removeClass("hidden");
	}
	for(i = parseInt(pMax)+1; i<=7; i++) {
		$("#prepiew"+i).hide();
	}
	
}

function unlockForm() {
	
	//unlock submit buttons
	$("#bfinish").prop('disabled', false);
	$("#breset").prop('disabled', false);
	//unlock inputs
	$("input").prop('disabled', false);
	$("select").prop('disabled', false);
	//unlock photos
	var pMax = $("#maxPic").val();
	for(i=1; i<=pMax; i++) {
		$("#jump"+i).attr("href","javascript:void(0);");
		$("#jump"+i).attr("onclick","getFileName("+i+")");
		$("#removep"+i).show();
		$("#progBared"+i).addClass("hidden");
	}
	for(i = parseInt(pMax)+1; i<=7; i++) {
		$("#prepiew"+i).show();
	}
	
}

function uploadDB() {
	
	//start loading icon
	$("#loadingUpload").fadeIn(250, function() {
		$(this).removeClass("hide");
	})
	lockForm();
	var buildType = "residential";
	if (buildType == "residential") {
		var buildType2 = "1";
	} else {
		var buildType2 = "2";
	}
	var buildNo = $("#buildno").val();
	for(i=1; i<=9; i++) {
		if (buildNo == String(i)) {
			buildNo = "0"+String(i);
		}
	}
	//check building if exist
	const checkBuild = firebase.database().ref("property/"+buildType+"/"+"building_no:"+buildNo);
	checkBuild.once('value', function(snapshot) {
		//doesn't exist
		if (snapshot.child("address_city").val() == null) {
			//listen value to reach threshold
			$("#thresholdCounter").change(function() {
				if ($(this).val() == "7") {
					//stop threshold listener
					$("#thresholdCounter").off();
					//read data from input
					var ad_strt = $("#adstreet").val();
					var ad_rt = $("#adrt").val();
					var ad_rw = $("#adrw").val();
					var ad_kel = $("#adkel").val();
					var ad_kec = $("#adkec").val();
					var ad_nwst = ad_strt+" RT "+ad_rt+" RW "+ad_rw+", "+ad_kel+", "+ad_kec;
					var ad_city = $("#adcity").val();
					var ad_prov = $("#adprov").val();
					var ad_zipc = $("#adzip").val();
					var coord_lat = $("#latitude").val();
					var coord_long = $("#longitude").val();
					var filename1 = buildType2+buildNo+"_1.jpg";
					if ($("#fileName1").val() == "") {
						filename1 = "empty";
					}
					var filename2 = buildType2+buildNo+"_2.jpg";
					if ($("#fileName2").val() == "") {
						filename2 = "empty";
					}
					var filename3 = buildType2+buildNo+"_3.jpg";
					if ($("#fileName3").val() == "") {
						filename3 = "empty";
					}
					var filename4 = buildType2+buildNo+"_4.jpg";
					if ($("#fileName4").val() == "") {
						filename4 = "empty";
					}
					var filename5 = buildType2+buildNo+"_5.jpg";
					if ($("#fileName5").val() == "") {
						filename5 = "empty";
					}
					var filename6 = buildType2+buildNo+"_6.jpg";
					if ($("#fileName6").val() == "") {
						filename6 = "empty";
					}
					var filename7 = buildType2+buildNo+"_7.jpg";
					if ($("#fileName7").val() == "") {
						filename7 = "empty";
					}
					var fac_bed = $("#bed").prop("checked");
					var fac_wardrb = $("#wardrb").prop("checked");
					var fac_table = $("#table").prop("checked");
					var fac_bthins = $("#bthins").prop("checked");
					var fac_wifi = $("#wifi").prop("checked");
					var fac_ctv = $("#ctv").prop("checked");
					var fac_hwater = $("#hwater").prop("checked");
					var fac_parker = $("#parker").prop("checked");
					var fac_laundy = $("#laundy").prop("checked");
					var fac_pwrtkn = $("#pwrtkn").prop("checked");
					var fac_ac = $("#ac").prop("checked");
					var fac_bedcvr = $("#bedcvr").prop("checked");
					var fac_secury = $("#secury").prop("checked");
					var fac_kitchn = $("#kitchn").prop("checked");
					//upload data to database
					const dbRefBuild = firebase.database().ref().child("property/"+buildType+"/"+"building_no:"+buildNo);
					dbRefBuild.set({
						address_street : ad_nwst,
						address_city : ad_city,
						address_province : ad_prov,
						address_zipcode : ad_zipc,
						coord_latitude : coord_lat,
						coord_longitude : coord_long,
						photos: {
							photo1 : filename1,
							photo2 : filename2,
							photo3 : filename3,
							photo4 : filename4,
							photo5 : filename5,
							photo6 : filename6,
							photo7 : filename7
						},
						facilities: {
							bed : fac_bed,
							wardrb : fac_wardrb,
							table : fac_table,
							bthins : fac_bthins,
							wifi : fac_wifi,
							ctv : fac_ctv,
							hwater : fac_hwater,
							parker : fac_parker,
							laundy : fac_laundy,
							pwrtkn : fac_pwrtkn,
							ac : fac_ac,
							bedcvr : fac_bedcvr,
							secury : fac_secury,
							kitchn : fac_kitchn
						}
					}).then(function onSuccess(res) {
						//create empty room
						var totflor = $("#totflor").val();
						for(i=1; i<=totflor; i++) {
							var floorNo = i;
							for(j=1; j<=9; j++) {
								if (floorNo==String(j)) {
									floorNo="0"+String(j);
								}
							}
							var rmInFlr = $("#rminflr"+parseInt(floorNo)).val();
							for(k=1; k<=parseInt(rmInFlr); k++) {
								var roomNo = k;
								for(j=1; j<=9; j++) {
									if (roomNo==String(j)) {
										roomNo="0"+String(j);
									}
								}
								var idRoom = buildType2+buildNo+floorNo+roomNo;
								var dbRefRoom = firebase.database().ref().child("property/"+buildType+"/"+"building_no:"+buildNo+"/"+"floor:"+floorNo+"/"+"ID:"+idRoom);
								dbRefRoom.set({
									availdate : "empty",
									roomsize : "empty",
									yearprice : "empty",
									photos : {
										photo1 : "empty",
										photo2 : "empty",
										photo3 : "empty",
										photo4 : "empty",
										photo5 : "empty"
									},
									facilities: {
										bed : fac_bed,
										wardrb : fac_wardrb,
										table : fac_table,
										bthins : fac_bthins,
										wifi : fac_wifi,
										ctv : fac_ctv,
										hwater : fac_hwater,
										parker : fac_parker,
										laundy : fac_laundy,
										pwrtkn : fac_pwrtkn,
										ac : fac_ac,
										bedcvr : fac_bedcvr,
										secury : fac_secury,
										kitchn : fac_kitchn
									}
								}).catch(function onError(err) {
									//error notification
									$.gritter.add({
										title: 'Error',
										text: err.code+" : "+err.message,
										image: './img/bell.png',
										sticky: false,
										time: 3500,
										class_name: 'gritter-custom'
									})
									unlockForm();
									//stop loading icon
									$("#loadingUpload").fadeOut(250, function() {
										$(this).hide();
									})
								})
								var dbRefSK = firebase.database().ref().child("codesystem/IDs:"+idRoom);
								dbRefSK.set({
									ID : idRoom+"00",
									building_type : buildType,
									building_no : buildNo,
									floor_no : floorNo,
									room_no : roomNo,
									tenant_no : "00"
								}).catch(function onError(err) {
									//error notification
									$.gritter.add({
										title: 'Error',
										text: err.code+" : "+err.message,
										image: './img/bell.png',
										sticky: false,
										time: 3500,
										class_name: 'gritter-custom'
									})
									unlockForm();
									//stop loading icon
									$("#loadingUpload").fadeOut(250, function() {
										$(this).hide();
									})
								})
							}
						}
						//success notification
						$.gritter.add({
							title: 'Building Uploaded',
							text: 'Building was successfully uploaded to the database.',
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
					}).catch(function onError(err) {
						//error notification
						$.gritter.add({
							title: 'Error',
							text: err.code+" : "+err.message,
							image: './img/bell.png',
							sticky: false,
							time: 3500,
							class_name: 'gritter-custom'
						})
						unlockForm();
						//stop loading icon
						$("#loadingUpload").fadeOut(250, function() {
							$(this).hide();
						})
					})
				}
			})
			//photo 1
			if ($("#fileName1").val() != "") {
				var photo1 = $("#prepiew1").attr("src");
				var filename1 = buildType2+buildNo+"_1.jpg";
				var storageRef1 = firebase.storage().ref('images/building/'+filename1);
				var task1 = storageRef1.putString(photo1, 'data_url');
				task1.on('state_changed',
					//progressbar animation
					function progress(snapshot) {
						var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
						$("#progBar1").css("width",percentage+"%");
					},
					function error(err) {
						break;
						//error notification
						$.gritter.add({
							title: 'Error',
							text: err.code+" : "+err.message,
							image: './img/bell.png',
							sticky: false,
							time: 3500,
							class_name: 'gritter-custom'
						})
						unlockForm();
						//stop loading icon
						$("#loadingUpload").fadeOut(250, function() {
							$(this).hide();
						})
					},
					function complete() {
						$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
						$("#thresholdCounter").trigger("change");
					}
				)
			} else {
				$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
				$("#thresholdCounter").trigger("change");
			}
			//photo 2
			if ($("#fileName2").val() != "") {
				var photo2 = $("#prepiew2").attr("src");
				var filename2 = buildType2+buildNo+"_2.jpg";
				var storageRef2 = firebase.storage().ref('images/building/'+filename2);
				var task2 = storageRef2.putString(photo2, 'data_url');
				task2.on('state_changed',
					//progressbar animation
					function progress(snapshot) {
						var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
						$("#progBar2").css("width",percentage+"%");
					},
					function error(err) {
						break;
						//error notification
						$.gritter.add({
							title: 'Error',
							text: err.code+" : "+err.message,
							image: './img/bell.png',
							sticky: false,
							time: 3500,
							class_name: 'gritter-custom'
						})
						unlockForm();
						//stop loading icon
						$("#loadingUpload").fadeOut(250, function() {
							$(this).hide();
						})
					},
					function complete() {
						$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
						$("#thresholdCounter").trigger("change");
					}
				)
			} else {
				$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
				$("#thresholdCounter").trigger("change");
			}
			//photo 3
			if ($("#fileName3").val() != "") {
				var photo3 = $("#prepiew3").attr("src");
				var filename3 = buildType2+buildNo+"_3.jpg";
				var storageRef3 = firebase.storage().ref('images/building/'+filename3);
				var task3 = storageRef3.putString(photo3, 'data_url');
				task3.on('state_changed',
					//progressbar animation
					function progress(snapshot) {
						var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
						$("#progBar3").css("width",percentage+"%");
					},
					function error(err) {
						break;
						//error notification
						$.gritter.add({
							title: 'Error',
							text: err.code+" : "+err.message,
							image: './img/bell.png',
							sticky: false,
							time: 3500,
							class_name: 'gritter-custom'
						})
						unlockForm();
						//stop loading icon
						$("#loadingUpload").fadeOut(250, function() {
							$(this).hide();
						})
					},
					function complete() {
						$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
						$("#thresholdCounter").trigger("change");
					}
				)
			} else {
				$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
				$("#thresholdCounter").trigger("change");
			}
			//photo 4
			if ($("#fileName4").val() != "") {
				var photo4 = $("#prepiew4").attr("src");
				var filename4 = buildType2+buildNo+"_4.jpg";
				var storageRef4 = firebase.storage().ref('images/building/'+filename4);
				var task4 = storageRef4.putString(photo4, 'data_url');
				task4.on('state_changed',
					//progressbar animation
					function progress(snapshot) {
						var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
						$("#progBar4").css("width",percentage+"%");
					},
					function error(err) {
						break;
						//error notification
						$.gritter.add({
							title: 'Error',
							text: err.code+" : "+err.message,
							image: './img/bell.png',
							sticky: false,
							time: 3500,
							class_name: 'gritter-custom'
						})
						unlockForm();
						//stop loading icon
						$("#loadingUpload").fadeOut(250, function() {
							$(this).hide();
						})
					},
					function complete() {
						$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
						$("#thresholdCounter").trigger("change");
					}
				)
			} else {
				$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
				$("#thresholdCounter").trigger("change");
			}
			//photo 5
			if ($("#fileName5").val() != "") {
				var photo5 = $("#prepiew5").attr("src");
				var filename5 = buildType2+buildNo+"_5.jpg";
				var storageRef5 = firebase.storage().ref('images/building/'+filename5);
				var task5 = storageRef5.putString(photo5, 'data_url');
				task5.on('state_changed',
					//progressbar animation
					function progress(snapshot) {
						var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
						$("#progBar5").css("width",percentage+"%");
					},
					function error(err) {
						break;
						//error notification
						$.gritter.add({
							title: 'Error',
							text: err.code+" : "+err.message,
							image: './img/bell.png',
							sticky: false,
							time: 3500,
							class_name: 'gritter-custom'
						})
						unlockForm();
						//stop loading icon
						$("#loadingUpload").fadeOut(250, function() {
							$(this).hide();
						})
					},
					function complete() {
						$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
						$("#thresholdCounter").trigger("change");
					}
				)
			} else {
				$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
				$("#thresholdCounter").trigger("change");
			}
			//photo 6
			if ($("#fileName6").val() != "") {
				var photo6 = $("#prepiew6").attr("src");
				var filename6 = buildType2+buildNo+"_6.jpg";
				var storageRef6 = firebase.storage().ref('images/building/'+filename6);
				var task6 = storageRef6.putString(photo6, 'data_url');
				task6.on('state_changed',
					//progressbar animation
					function progress(snapshot) {
						var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
						$("#progBar6").css("width",percentage+"%");
					},
					function error(err) {
						break;
						//error notification
						$.gritter.add({
							title: 'Error',
							text: err.code+" : "+err.message,
							image: './img/bell.png',
							sticky: false,
							time: 3500,
							class_name: 'gritter-custom'
						})
						unlockForm();
						//stop loading icon
						$("#loadingUpload").fadeOut(250, function() {
							$(this).hide();
						})
					},
					function complete() {
						$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
						$("#thresholdCounter").trigger("change");
					}
				)
			} else {
				$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
				$("#thresholdCounter").trigger("change");
			}
			//photo 7
			if ($("#fileName7").val() != "") {
				var photo7 = $("#prepiew7").attr("src");
				var filename7 = buildType2+buildNo+"_7.jpg";
				var storageRef7 = firebase.storage().ref('images/building/'+filename7);
				var task7 = storageRef7.putString(photo7, 'data_url');
				task7.on('state_changed',
					//progressbar animation
					function progress(snapshot) {
						var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
						$("#progBar7").css("width",percentage+"%");
					},
					function error(err) {
						break;
						//error notification
						$.gritter.add({
							title: 'Error',
							text: err.code+" : "+err.message,
							image: './img/bell.png',
							sticky: false,
							time: 3500,
							class_name: 'gritter-custom'
						})
						unlockForm();
						//stop loading icon
						$("#loadingUpload").fadeOut(250, function() {
							$(this).hide();
						})
					},
					function complete() {
						$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
						$("#thresholdCounter").trigger("change");
					}
				)
			} else {
				$("#thresholdCounter").val(parseInt($("#thresholdCounter").val())+1);
				$("#thresholdCounter").trigger("change");
			}
		//exist
		} else {
			//error notification
			$.gritter.add({
				title: 'Error',
				text: 'Building number already in use.',
				image: './img/bell.png',
				sticky: false,
				time: 3500,
				class_name: 'gritter-custom'
			})
			unlockForm();
			//stop loading icon
			$("#loadingUpload").fadeOut(250, function() {
				$(this).hide();
			})
		}
	})
	
}

$(document).ready(function() {
	
	//building number auto suggest
	const dbRef = firebase.database().ref("property/residential").limitToLast(1);
	dbRef.once('child_added', function(snapshot) {
		var lastBuildNumber = parseInt(snapshot.key.split(":")[1]);
		var suggestBuildNumber  = lastBuildNumber+1;
		$("#buildno").val(suggestBuildNumber);
		$("#buildno").prop('readonly',false);
		//stop loading icon
		$("#cover-spin").fadeOut(250, function() {
			$(this).hide();
		})
	})
	//province dropdown listener
	$('#adprov').on('change', function () {
		//array list of cities in each province
		var prov_Banten = ["Cilegon", "Lebak", "Pandeglang", "Serang", "Kab. Serang", "Tangerang", "Kab. Tangerang", "Tangerang Selatan"];
		var prov_DKIJ = ["Jakarta Barat", "Jakarta Pusat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Utara", "Kepulauan Seribu"]; 
		var prov_DIY = ["Bantul", "Gunung Kidul", "Kulon Progo", "Sleman", "Yogyakarta"];
		var prov_JaBar = ["Bandung", "Kab. Bandung", "Bandung Barat", "Banjar", "Bekasi", "Kab. Bekasi", "Bogor", "Kab. Bogor", "Ciamis", "Cianjur", "Cimahi", "Cirebon", "Kab. Cirebon", "Depok", "Garut", "Indramayu", "Karawang", "Kuningan", "Majalengka", "Pangandaran", "Purwakarta", "Subang", "Sukabumi", "Kab. Sukabumi", "Sumedang", "Tasikmalaya", "Kab. Tasikmalaya"];
		var prov_JaTeng = ["Banjarnegara", "Banyumas", "Batang", "Blora", "Boyolali", "Brebes", "Cilacap", "Demak", "Grobogan", "Jepara", "Karanganyar", "Kebumen", "Kendal", "Klaten", "Kudus", "Magelang", "Kab. Magelang", "Pati", "Pekalongan", "Kab. Pekalongan", "Pemalang", "Purbalingga", "Purworejo", "Rembang", "Salatiga", "Semarang", "Kab. Semarang", "Sragen", "Solo", "Sukoharjo", "Tegal", "Kab. Tegal", "Temanggung", "Wonogiri", "Wonosobo"];
		var prov_JaTim = ["Bangkalan", "Banyuwangi", "Batu", "Blitar", "Kab. Blitar", "Bojonegoro", "Bondowoso", "Gresik", "Jember", "Jombang", "Kediri", "Kab. Kediri", "Lamongan", "Lumajang", "Madiun", "Kab. Madiun", "Magetan", "Malang", "Kab. Malang", "Mojokerto", "Kab. Mojokerto", "Nganjuk", "Ngawi", "Pacitan", "Pamekasan", "Pasuruan", "Kab. Pasuruan", "Ponorogo", "Probolinggo", "Kab. Probolinggo", "Sampang", "Sidoarjo", "Situbondo", "Sumenep", "Surabaya", "Trenggalek", "Tuban", "Tulungagung"];
		//select null
		if ($(this).find("option:selected").attr('value') == "") {
			removeOptions(document.getElementById("adcity"));
			document.getElementById("adcity").value = "";
			document.getElementById("adcity").disabled = true;
		}
		//select banten
		if ($(this).find("option:selected").attr('value') == "Banten") {
			removeOptions(document.getElementById("adcity"));
			for (i=0; i<prov_Banten.length; i++) { 
				var optionElement = document.createElement("option");
				optionElement.value = prov_Banten[i];
				optionElement.innerHTML = prov_Banten[i];
				document.getElementById("adcity").appendChild(optionElement);
			}
			document.getElementById("adcity").disabled = false;
		}
		//select dki jakarta
		if ($(this).find("option:selected").attr('value') == "DKI Jakarta") {
			removeOptions(document.getElementById("adcity"));
			for (i=0; i<prov_DKIJ.length; i++) { 
				var optionElement = document.createElement("option");
				optionElement.value = prov_DKIJ[i];
				optionElement.innerHTML = prov_DKIJ[i];
				document.getElementById("adcity").appendChild(optionElement);
			}
			document.getElementById("adcity").disabled = false;
		}
		//select diy
		if ($(this).find("option:selected").attr('value') == "Daerah Istimewa Yogyakarta") {
			removeOptions(document.getElementById("adcity"));
			for (i=0; i<prov_DIY.length; i++) { 
				var optionElement = document.createElement("option");
				optionElement.value = prov_DIY[i];
				optionElement.innerHTML = prov_DIY[i];
				document.getElementById("adcity").appendChild(optionElement);
			}
			document.getElementById("adcity").disabled = false;
		}
		//select jabar
		if ($(this).find("option:selected").attr('value') == "Jawa Barat") {
			removeOptions(document.getElementById("adcity"));
			for (i=0; i<prov_JaBar.length; i++) { 
				var optionElement = document.createElement("option");
				optionElement.value = prov_JaBar[i];
				optionElement.innerHTML = prov_JaBar[i];
				document.getElementById("adcity").appendChild(optionElement);
			}
			document.getElementById("adcity").disabled = false;
		}
		//select jateng
		if ($(this).find("option:selected").attr('value') == "Jawa Tengah") {
			removeOptions(document.getElementById("adcity"));
			for (i=0; i<prov_JaTeng.length; i++) { 
				var optionElement = document.createElement("option");
				optionElement.value = prov_JaTeng[i];
				optionElement.innerHTML = prov_JaTeng[i];
				document.getElementById("adcity").appendChild(optionElement);
			}
			document.getElementById("adcity").disabled = false;
		}
		//select jatim
		if ($(this).find("option:selected").attr('value') == "Jawa Timur") {
			removeOptions(document.getElementById("adcity"));
			for (i=0; i<prov_JaTim.length; i++) { 
				var optionElement = document.createElement("option");
				optionElement.value = prov_JaTim[i];
				optionElement.innerHTML = prov_JaTim[i];
				document.getElementById("adcity").appendChild(optionElement);
			}
			document.getElementById("adcity").disabled = false;
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
			$("#removep5,#gambar6").fadeIn(250, function() {
				$(this).removeClass("hide");
				$("#fileButton").val("");
			})
		}
	})
	$('#prepiew6').on('load', function () {
		if ($(this).attr('src') != "img/empty-photo.jpg") {
			$("#removep6,#gambar7").fadeIn(250, function() {
				$(this).removeClass("hide");
				$("#fileButton").val("");
			})
		}
	})
	$('#prepiew7').on('load', function () {
		if ($(this).attr('src') != "img/empty-photo.jpg") {
			$("#removep7").fadeIn(250, function() {
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
	//number of rooms listener
	var theParent = document.querySelector("#troomchild");
	theParent.addEventListener("click", totalRoom, false);
	theParent.addEventListener("keyup", totalRoom, false);
	//modal confirmation listener
	$("#confirmYes").on('click', function () {
		uploadDB();
	})

})
//jquery form validation
$().ready(function() {

	$("#inpBuild").validate({
		submitHandler: function() {
			//trigger modal popup
			$("#modalConfirm").modal();
		},
		rules: {
			buildno: {
				required: true,
				digits: true,
				min: 1,
				max: 99
			},
			adstreet: "required",
			adrt: {
				required: true,
				digits: true,
				min: 1,
				max: 999
			},
			adrw: {
				required: true,
				digits: true,
				min: 1,
				max: 999
			},
			adkel: "required",
			adkec: "required",
			adcity: "required",
			adprov: "required",
			adzip: {
				required: true,
				digits: true,
				min: 0,
				max: 99999
			},
			latitude: {
				required: true,
				min: -90,
				max: 90
			},
			longitude: {
				required: true,
				min: -180,
				max: 180
			},
			totflor: {
				required: true,
				digits: true,
				min: 1,
				max: 99
			}
		}
	});

});