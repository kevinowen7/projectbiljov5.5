function editBuild(buildNo) {
	
	for(i=1; i<=9; i++) {
		if (buildNo==String(i)) {
			buildNo = "0"+String(i);
		}
	}
	window.location = "building_edit.html?id=1"+buildNo;
	
}

function removeBuild(buildNo) {
	
	//trigger modal popup
	$("#modalConfirm").modal();
	//modal confirmation listener
	$("#confirmYes").on('click', function () {
		//stop modal confirmation listener
		$("#confirmYes").off();
		//success notification
		$.gritter.add({
			title: 'Building Removed',
			text: 'Building was successfully removed from the database.',
			image: './img/bell.png',
			sticky: false,
			time: 3500,
			class_name: 'gritter-custom'
		})
	})
	
}

function expense(x){
	//trigger modal popup
	$("#modalExpense").modal();	
	//modal confirmation listener
	$("#confirmExpense").on('click', function () {
		//stop modal confirmation listener
		$("#confirmExpense").off();
		//success notification
		$.gritter.add({
			title: 'Expense Added',
			text: 'Expense was successfully added',
			image: './img/bell.png',
			sticky: false,
			time: 3500,
			class_name: 'gritter-custom'
		})
		setTimeout(function(){
			window.location='accounting_building.html?id='+x;
		},1500);
	})
	
}

$(document).ready(function() {
	
	//check other expense
	$("#detailsex").on('change', function() {
		if ($(this).find("option:selected").attr("value") == "other") {
			$("#optex").fadeIn(250, function() {
				$(this).removeClass("hide");
			})
		} else {
			$("#optex").fadeOut(250, function() {
				$(this).addClass("hide")
			});
		}
	})
	//select table to work with jquery datatables
	var table = $('#data-table').DataTable({
		"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "iDisplayLength": -1,
		"sPaginationType": "full_numbers",
		"order": [[ 0, "asc" ]],
		"columnDefs": [
		{
			targets: 0,
			width: "15%"
		},
		{ 
			targets: -1,
			width: "17%",
			orderable: false
		}]
	})
	//input data from database to table
	var dbRef = firebase.database().ref().child("property/residential");
	dbRef.on('value', function(snapshot) {
		if (!snapshot.hasChildren()) { //no building exist in database
			//stop loading icon
			$("#cover-spin").fadeOut(250, function() {
				$(this).hide();
			});
		} else {
			dbRef.on('child_added', function(snapshot) {
				var builder = snapshot.key.split(":");
				var address1 = snapshot.child("address_street").val();
				var address2 = snapshot.child("address_city").val();
				var address3 = snapshot.child("address_province").val();
				var address4 = snapshot.child("address_zipcode").val();
				table.row.add(["<a href='room_list.html?id="+builder[1]+"'>"+builder[1]+"</a>",address1,address2,address3,address4,"<button id='summary' class='btn btn-xs btn-success' title='Summary Building' onClick=window.location='room_list.html?id="+builder[1]+"#tenanti'><i class='fa fa-bar-chart'></i></button>  <button id='expense' class='btn btn-xs btn-primary' title='Add Expense' onClick='expense("+builder[1]+")'><i class='fa fa-money'></i></button> <button id='addRoom' class='btn btn-xs btn-success' title='Add Room' onClick=window.location='room_add.html?id=1"+builder[1]+"'><i class='fa fa-plus'></i></button> <button id='editbutt' class='btn btn-xs btn-warning' title='Edit Building' onclick='editBuild("+builder[1]+")'><i class='fa fa-pencil'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Remove Building' onclick='removeBuild("+builder[1]+")'><i class='fa fa-times'></i></button>"]).node().id = 'build'+builder[1];
				table.draw();
				//stop loading icon
				$("#cover-spin").fadeOut(250, function() {
					$(this).hide();
				});
			});
			//replace data when a change is detected
			dbRef.on('child_changed', function(snapshot) {
				var builder = snapshot.key.split(":");
				var address1 = snapshot.child("address_street").val();
				var address2 = snapshot.child("address_city").val();
				var address3 = snapshot.child("address_province").val();
				var address4 = snapshot.child("address_zipcode").val();
				table.row.add(["<a href='room_list.html?id="+builder[1]+"'>"+builder[1]+"</a>",address1,address2,address3,address4,"<button id='summary' class='btn btn-xs btn-success' title='Summary Building' onClick=window.location='room_list.html?id="+builder[1]+"#tenanti'><i class='fa fa-bar-chart'></i></button> <button id='expense' class='btn btn-xs btn-primary' title='Add Expense' onClick='expense("+builder[1]+")'><i class='fa fa-money'></i></button> <button id='addRoom' class='btn btn-xs btn-success' title='Add Room' onClick=window.location='room_add.html?id=1"+builder[1]+"'><i class='fa fa-plus'></i></button> <button id='editbutt' class='btn btn-xs btn-warning' title='Edit Building' onclick='editBuild("+builder[1]+")'><i class='fa fa-pencil'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Remove Building' onclick='removeBuild("+builder[1]+")'><i class='fa fa-times'></i></button>"]).node().id = 'build'+builder[1];
				table.draw();
			});
			//remove row when deleted
			dbRef.on('child_removed', function(snapshot) {
				var builder = snapshot.key.split(":");
				var row = table.row('#build'+builder[1]);
				row.remove();
				table.draw();
			});
		}
	});
})