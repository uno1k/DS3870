var arrEmployees;
$.getJSON("https://swollenhippo.com/getStaffByAPIKey.php?APIKey=DuffManSays,Phrasing!", function(result){
    console.log(result);
    arrEmployees = result;
    buildEmployeeCard();

})

function buildEmployeeCard(){
    $.each(arrEmployees,function(i,person){
            let strHTML = '<div class="card col-3 mt-5 ml-3">';
            strHTML += '<img src="images/profile.png" alt="Profile Image" style="margin:auto; max-width:100%;">';
            strHTML += '<h3 class="text-center">' + person.FirstName + ' ' + person.LastName + '</a></h3>';
            strHTML += '<h4 class="text-center">' + person.Title +'</h4>';
            strHTML += '<h5 class="mt-3">Contact Details</h5>';
            strHTML += '<p> Telephone: <a href="tel:' + person.HomePhone + '">' + person.HomePhone + '</a></p>';
            strHTML += '<p> Email: <a href="mailto:' + person.Email + '">' + person.Email + '</a></p>';
            strHTML += '<h5 class="mt-3">Address</h5>';
            strHTML += '<p>Address: ' + person.StreetAddress1 + ', ' + person.City + ' ' + person.State + '</p>';
            strHTML += '<h4 class="mt-3">Pay Details</h4>';
            strHTML += '<p class="txtHourlyWage" data-rate="' + person.HourlyWage + '">Hourly Wage: ' + person.HourlyWage + '</p>';
            strHTML += '<p class="txtTaxRate" data-rate="' + person.TaxRate + '">Tax Rate: ' + person.TaxRate + '</p>';
            strHTML += '<p class="txtHours" data-rate="' + person.Hours + '">Hours: ' + person.Hours + '</p>';
            strHTML += '<div class="form-group mb-0">';
            strHTML += '<label class="mr-2">Goal Pay</label>';
            strHTML += '<input class="txtGoalPay">';
            strHTML += '</div>';
            strHTML += '<button class="btn btn-primary btn-block btnCalculatePay mb-3 mt-3">Calculate Required Hours</button>'
            strHTML += '</div>';
            strHTML += '</div>';
            $('#divEmployeeCards').append(strHTML);
            $('#tblEmployees tbody').append('<tr><td>' + person.FirstName + '</td><td>' + person.LastName + '</td><td>' + person.Title + '</td><td>' + person.HourlyWage + '</td></tr>');
        
        // placeholder image, Name, Position/Title, Contact Details, and Pay Details
        //            strHTML += '<p class="txtHourlyRate" data-rate="' + person.HourlyRate + '">Hourly Rate: ' + person.HourlyRate + '</p>';
        // input that types target pay, calculate buisness rules then return value of hours that must be worked to attain desired pay
        

    });
    $('#tblEmployees').DataTable();
}
$(document).on('click','.btnCalculatePay',function() {
    let decGoalPay = $(this).closest('.card').find('.txtGoalPay').val();
    let decHourlyWage = $(this).closest('.card').find('.txtHourlyWage').val().split(': ')[1];
    let decTaxRate = $(this).closest('.card').find('.txtTaxRate').val().split(': ')[1];
    $(this).closest('.card').find('.txtHours').val(decGoalPay / (decHourlyWage -(decHourlyWage * decTaxRate)));




});