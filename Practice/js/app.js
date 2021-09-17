var arrEmployees;
$.getJSON("https://www.swollenhippo.com/getEmployeesByAPIKey.php?APIKey=Mickey2021!", function(result){
    console.log(result);
    arrEmployees = result;
    buildEmployeeCard();
    $.each(result,function(i,person){
        console.log(person.FirstName);
        console.log(person.FirstName + ' ' + person.LastName);
        console.log(person.HireDate);
        $('#txtEmail').val(person.Email);
    })
})
function buildEmployeeCard(){
    $.each(arrEmployees,function(i,person){
            let strHTML = '<div class="card col-3 offset-5 mt-3">';
            strHTML += '<h3 class="text-center"><a href="mailto:' + person.Email + '">' + person.FirstName + ' ' + person.LastName + '</a></h3>';
            strHTML += '<h4 class="text-center">' + person.Postion +'</h4>';
            strHTML += '<h4 class="mt-3">Profile Details</h4>';
            strHTML += '<p>Hire Date: ' + person.HireDate + ' </p>';
            strHTML += '<p>Hourly Rate: ' + person.HourlyRate + '</p>';
            strHTML += '<div class="form-group">';
            strHTML += '<label class="txtHoursWorked">Hours Worked</label>';
            strHTML += '<input class="txtHoursWorked">';
            strHTML += '</div>';
            strHTML += '<label class="txtTotalPay">Total Pay</label>';
            strHTML += '<input class="txtTotalPay">';
            strHTML += '<button id="btnCalculate" type="button" class="btn btn-warning">Calculate Pay</button>'
            strHTML += '</div>';
            strHTML += '</div>';
            $('#divEmployeeCards').append(strHTML);
            $('#tblEmployees tbody').append('<tr><td>' + person.FirstName + '</td><td>' +person.LastName + '</td><td>');
    });
    $('#tblEmployees').DataTable();
}


