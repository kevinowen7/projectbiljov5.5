//Booking list
var table1 = $('#booking-list').DataTable({
	"aLengthMenu": [[3, 6, -1], [3, 6, "All"]],
	"iDisplayLength": 3,
	"sPaginationType": "full_numbers",
	"order": [[ 0, "asc" ]],
	"columnDefs": [
	{
		targets: 0,
		width: "11%"
	}]
})	

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

function addInvoice() {
	
	setTimeout(function(){
		//stop loading icon
		$("#cover-spin").fadeOut(250, function() {
			$(this).hide();
		})
		//reset invoice form
		$('#addInvoiceForm').trigger("reset");
		$("#invoiceDetailsOtherBlock").hide();
		$("#invoiceRecurrentBlock").show();
		removeOptions(document.getElementById("invoiceDetails"));
		var optionElement1 = document.createElement("option");
		var optionElement2 = document.createElement("option");
		var optionElement3 = document.createElement("option");
		optionElement1.value = "rentdue";
		optionElement1.innerHTML = "Rental Due";
		optionElement2.value = "finedue";
		optionElement2.innerHTML = "Fine Due";
		optionElement3.value = "otherdue";
		optionElement3.innerHTML = "Other Due";
		document.getElementById("invoiceDetails").appendChild(optionElement1);
		document.getElementById("invoiceDetails").appendChild(optionElement2);
		document.getElementById("invoiceDetails").appendChild(optionElement3);
		//success notification
		$.gritter.add({
			title: 'Invoice Added',
			text: 'Invoice was successfully added to the database.',
			image: './img/bell.png',
			sticky: false,
			time: 3500,
			class_name: 'gritter-custom'
		})
	}, 1000);
	
}

function addPayment() {
	
	setTimeout(function(){
		//stop loading icon
		$("#cover-spin").fadeOut(250, function() {
			$(this).hide();
		})
		//reset payment form
		$('#addPaymentForm').trigger("reset");
		$("#paymentDetailsOtherBlock").hide();
		removeOptions(document.getElementById("paymentDetails"));
		var optionElement1 = document.createElement("option");
		var optionElement2 = document.createElement("option");
		var optionElement3 = document.createElement("option");
		var optionElement4 = document.createElement("option");
		optionElement1.value = "rentpay";
		optionElement1.innerHTML = "Rental Payment";
		optionElement2.value = "finepay";
		optionElement2.innerHTML = "Fine Payment";
		optionElement3.value = "bondpay";
		optionElement3.innerHTML = "Bond Money Payment";
		optionElement4.value = "otherpay";
		optionElement4.innerHTML = "Other Payment";
		document.getElementById("paymentDetails").appendChild(optionElement1);
		document.getElementById("paymentDetails").appendChild(optionElement2);
		document.getElementById("paymentDetails").appendChild(optionElement3);
		document.getElementById("paymentDetails").appendChild(optionElement4);
		//success notification
		$.gritter.add({
			title: 'Payment Added',
			text: 'Payment was successfully added to the database.',
			image: './img/bell.png',
			sticky: false,
			time: 3500,
			class_name: 'gritter-custom'
		})
	}, 1000);
	
}

//approve booking in table
function approveBooking(idBook){
	$('#approve_'+idBook).css("background-color","#c8bca6");
	$('#approve_'+idBook).prop('disabled', true);
}

//delete booking in table
function deleteBooking(idBook){
	var row = table1.row('#'+idBook);
	row.remove();
	table1.draw(false);
}
$(document).ready(function() {
	
	//Booking list
	table1.row.add(["0001","Jeremia Raymond","09/07/2018","Jl. Dipatiukur","<button id='approve_booking1' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking1')><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking1')><i class='fa fa-times'></i></button>"]).node().id = 'booking1';
	table1.row.add(["0002","Kevin Owen","12/17/2018","Jl. Dipatiukur1","<button id='approve_booking2' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking2')><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking2')><i class='fa fa-times'></i></button>"]).node().id = 'booking2';
	table1.row.add(["0006","Wendy Wendy","10/09/2018","Jl. Dipatiukur2","<button id='approve_booking3' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking3')><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking3')><i class='fa fa-times'></i></button>"]).node().id = 'booking3';
	table1.row.add(["0008","Wendy 1","10/09/2018","Jl. Dipatiukur2","<button id='approve_booking4' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking4')><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking4')><i class='fa fa-times'></i></button>"]).node().id = 'booking4';
	table1.row.add(["0009","Wendy 2","10/09/2018","Jl. Dipatiukur2","<button id='approve_booking5' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking5')><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking5')><i class='fa fa-times'></i></button>"]).node().id = 'booking5';
	table1.row.add(["0010","Wendy 3","10/09/2018","Jl. Dipatiukur2","<button id='approve_booking6' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking6')><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking6')><i class='fa fa-times'></i></button>"]).node().id = 'booking6';
	table1.row.add(["0012","Wendy 5","10/09/2018","Jl. Dipatiukur2","<button id='approve_booking7' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking7')><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking7')><i class='fa fa-times'></i></button>"]).node().id = 'booking7';
	
	table1.draw();
	
	//key list
	var table6 = $('#keyC-list').DataTable({
		"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "iDisplayLength": -1,
		"sPaginationType": "full_numbers",
		"order": [[ 0, "asc" ]],
		"columnDefs": [
		{
			targets: 0,
			width: "20%"
		},
		{
			targets: -1,
			width: "20%"
		},
		]
	})
	
	table6.row.add(["<a href='javaScript:void(0)'>Aleksandra Hyde</a>","101 010 500","12/10/2018","20/09/2018","<button id='key_1' class='btn btn-xs btn-success' title='Mail Tenant' onclick=mailTenant('key1')><i class='fa fa-envelope'></i></button> <button id='collectbutt' class='btn btn-xs btn-primary' title='Collect' onclick=collectedKey('key1')><i class='fa fa-check'></i></button>"]).node().id = 'key1';
	table6.row.add(["<a href='javaScript:void(0)'>Amari O'Reilly</a>","101 020 100","10/09/2018","10/08/2018","<button id='key_1' class='btn btn-xs btn-success' title='Mail Tenant' onclick=mailTenant('key2')><i class='fa fa-envelope'></i></button> <button id='collectbutt' class='btn btn-xs btn-primary' title='Collect' onclick=collectedKey('key2')><i class='fa fa-check'></i></button>"]).node().id = 'key2';
	table6.draw();
	
	
	//overdue
	var table2 = $('#overdue-list').DataTable({
		"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "iDisplayLength": -1,
		"sPaginationType": "full_numbers",
		"order": [[ 0, "asc" ]],
		"columnDefs": [
		{
			targets: 0,
			width: "30%"
		},
		]
	})
	
	table2.row.add(["<a href='javaScript:void(0)'>Aleksandra Hyde</a>","101 010 500","12/17/2018"]).node().id = 'over1';
	table2.row.add(["<a href='javaScript:void(0)'>Amari O'Reilly</a>","101 020 100","10/09/2018"]).node().id = 'over2';
	table2.draw();
	
	//almost expired
	var table3 = $('#aexpired-list').DataTable({
		"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "iDisplayLength": -1,
		"sPaginationType": "full_numbers",
		"order": [[ 0, "asc" ]],
		"columnDefs": [
		{
			targets: 0,
			width: "30%"
		},
		]
	})
	
	table3.row.add(["<a href='javaScript:void(0)'>Bea Curran</a>","101 010 100","9/20/2018"]).node().id = 'almost1';
	table3.row.add(["<a href='javaScript:void(0)'>Briana Holloway</a>","101 010 200","9/28/2018"]).node().id = 'almost2';
	table3.draw();
	
	//imcomplete tenant
	var table4 = $('#incomplete-list').DataTable({
		"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "iDisplayLength": -1,
		"sPaginationType": "full_numbers",
		"order": [[ 0, "asc" ]],
		"columnDefs": [
		{
			targets: 0,
			width: "30%"
		},
		]
	})
	
	table4.row.add(["<a href='javaScript:void(0)'>Aleksandra Hyde</a>","101 010 500","Photo ID"]).node().id = 'incomplete1';
	table4.row.add(["<a href='javaScript:void(0)'>Bea Curran</a>","101 010 100","Photo KK"]).node().id = 'incmplete2';
	table4.draw();
	
	//array for autocomplete tenant
	var tenantNames = [
		{
			label: "Bea Curran (101 010 100)",
			tenantid: "t_1",
			refnumber: "101010100"
		},
		{
			label: "Kevin Owen (101 010 300)",
			tenantid: "t_2",
			refnumber: "101010300"
		},
		{
			label: "Briana Holloway (101 010 200)",
			tenantid: "t_3",
			refnumber: "101010200"
		},
		{
			label: "Zakary Neville (101 010 400)",
			tenantid: "t_4",
			refnumber: "101010400"
		},
		{
			label: "Aleksandra Hyde (101 010 500)",
			tenantid: "t_5",
			refnumber: "101010500"
		},
		{
			label: "Amari O'Reilly (101 020 100)",
			tenantid: "t_6",
			refnumber: "101020100"
		},
		{
			label: "Jan Garrison (101 020 300)",
			tenantid: "t_7",
			refnumber: "101020300"
		},
		{
			label: "Kevin Owen (102 010 200)",
			tenantid: "t_8",
			refnumber: "102010200"
		},
		{
			label: "Pamela Daugherty (102 010 100)",
			tenantid: "t_9",
			refnumber: "102010100"
		},
		{
			label: "Vernon Kirkland (101 010 101)",
			tenantid: "t_10",
			refnumber: "101010101"
		},
		{
			label: "Jacob Connolly (102 020 100)",
			tenantid: "t_11",
			refnumber: "102020100"
		}
	];
	//sort array ascending based on name
	tenantNames.sort(function(a, b){
		var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase();
		if (nameA < nameB) //sort string ascending
			return -1;
		if (nameA > nameB)
			return 1;
		return 0; //default return value (no sorting)
	});
	//start invoice tenant autocomplete
	$("#invoiceTenantName").autocomplete({
		source: function(request, response) {
			var results = $.ui.autocomplete.filter(tenantNames, request.term);
			response(results.slice(0, 10));
		},
		select: function(event, ui) {
			$("#invoiceTenantName").val(ui.item.label.split("(")[0].slice(0,-1));
			$("#invoiceTenantID").val(ui.item.tenantid);
			return false;
		}
	});
	//start payment tenant autocomplete
	$("#paymentTenantName").autocomplete({
		source: function(request, response) {
			var results = $.ui.autocomplete.filter(tenantNames, request.term);
			response(results.slice(0, 10));
		},
		select: function(event, ui) {
			$("#paymentTenantName").val(ui.item.label.split("(")[0].slice(0,-1));
			$("#paymentTenantID").val(ui.item.tenantid);
			return false;
		}
	});
	//start invoice datepicker
	$('#invoiceDatePicker').datepicker({
		format: "dd-M-yy"
	})
	//start payment datepicker
	$('#paymentDatePicker').datepicker({
		format: "dd-M-yy"
	})
	//invoice add button listener
	$("#invoiceb").on('click', function() {
		$("#addInvoiceModal").modal();
	})
	//invoice amount listener
	$("#invoiceAmount").on('keyup change', function() {
		$("#invoiceAmount").val(get_moneydot($("#invoiceAmount").val()));
	})
	//invoice modal details listener
	$("#invoiceDetails").on('change', function() {
		if ($(this).find("option:selected").attr("value") == "otherdue") {
			$("#invoiceDetailsOtherBlock").fadeIn(250, function() {
				$(this).show();
			})
		} else {
			$("#invoiceDetailsOtherBlock").fadeOut(250, function() {
				$(this).hide();
			})
		}
	})
	//invoice modal add listener
	$("#addInvoiceButton").click(function() {
		$("#addInvoiceForm").submit();
	})
	//invoice add form validation
	$("#addInvoiceForm").validate({
		submitHandler: function() {
			$('#addInvoiceModal').modal('hide');
			$("#cover-spin").fadeIn(250, function() {
				$(this).show();
			})
			addInvoice();
		}
	})
	//payment add button listener
	$("#paymentb").on('click', function() {
		$("#addPaymentModal").modal();
	})
	//payment bond checkbox listener
	$("input[type=checkbox][name=paymentBond]").on('change', function() {
		if (this.checked) {
			$("#paymentDetailsOtherBlock").fadeOut(250, function() {
				$(this).hide();
			})
			removeOptions(document.getElementById("paymentDetails"));
			var optionElement1 = document.createElement("option");
			var optionElement2 = document.createElement("option");
			var optionElement3 = document.createElement("option");
			optionElement1.value = "transfer";
			optionElement1.innerHTML = "Bond Money Transfer";
			optionElement2.value = "refund";
			optionElement2.innerHTML = "Bond Money Refund";
			optionElement3.value = "bondpay";
			optionElement3.innerHTML = "Bond Money Payment";
			document.getElementById("paymentDetails").appendChild(optionElement1);
			document.getElementById("paymentDetails").appendChild(optionElement2);
			document.getElementById("paymentDetails").appendChild(optionElement3);
		} else {
			$("#paymentDetailsOtherBlock").fadeOut(250, function() {
				$(this).hide();
			})
			removeOptions(document.getElementById("paymentDetails"));
			var optionElement1 = document.createElement("option");
			var optionElement2 = document.createElement("option");
			var optionElement3 = document.createElement("option");
			var optionElement4 = document.createElement("option");
			optionElement1.value = "rentpay";
			optionElement1.innerHTML = "Rental Payment";
			optionElement2.value = "finepay";
			optionElement2.innerHTML = "Fine Payment";
			optionElement3.value = "bondpay";
			optionElement3.innerHTML = "Bond Money Payment";
			optionElement4.value = "otherpay";
			optionElement4.innerHTML = "Other Payment";
			document.getElementById("paymentDetails").appendChild(optionElement1);
			document.getElementById("paymentDetails").appendChild(optionElement2);
			document.getElementById("paymentDetails").appendChild(optionElement3);
			document.getElementById("paymentDetails").appendChild(optionElement4);
		}
	})
	//payment amount listener
	$("#paymentAmount").on('keyup change', function() {
		$("#paymentAmount").val(get_moneydot($("#paymentAmount").val()));
	})
	//payment modal details listener
	$("#paymentDetails").on('change', function() {
		if ($(this).find("option:selected").attr("value") == "otherpay") {
			$("#paymentDetailsOtherBlock").fadeIn(250, function() {
				$(this).show();
			})
		} else {
			$("#paymentDetailsOtherBlock").fadeOut(250, function() {
				$(this).hide();
			})
		}
	})
	//payment modal add listener
	$("#addPaymentButton").click(function() {
		$("#addPaymentForm").submit();
	})
	//payment add form validation
	$("#addPaymentForm").validate({
		submitHandler: function() {
			$('#addPaymentModal').modal('hide');
			$("#cover-spin").fadeIn(250, function() {
				$(this).show();
			})
			addPayment();
		}
	})
	//stop loading icon
	setTimeout(function(){
		$("#cover-spin").fadeOut(250, function() {
			$(this).hide();
		})
	}, 1000);
	
})