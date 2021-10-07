var arrEmployees;
$.getJSON("https://www.swollenhippo.com/getProfileDetailsByAPIKey.php?APIKey=DuffManSays,Phrasing!", function(result){
    arrEmployees = result;
    $.each(result,function(i,person){
        $('#divEmployeeContainer').append(buildEmployeeCard(person));
        $('#divContactContainer').append(buildContactCard(person));

    })
})
var arrEmployees;
$.getJSON("https://www.swollenhippo.com/getPayStubsByAPIKey.php?APIKey=DuffManSays,Phrasing!", function(result){
    arrEmployees = result;
    $.each(result,function(i,person){
        $('#tblPayStubs tbody').append(buildEmployeeTableRow(person));
    })
    $('#tblPayStubs').DataTable();
})

$(document).on('click','#btnContactDetails',function(){
    $('#divContactContainer').slideToggle();
})

$(document).on('click','.btnCalculate',function(){
    let decWage = $(this).closest('.card').find('.spanRate').text();
    let decTax = $(this).closest('.card').find('.spanTax').text();
    let decGoal = $(this).closest('.card').find('.txtGoal').val();
    let decTaxedWage = decWage * (1.00 - decTax);
    let decHours = decGoal/decTaxedWage;
    if(decHours > 40){
        decGoal = decGoal - (40 * (decWage * (1.00 - decTax)));
        decHours = decGoal/((decWage * (1.00 - decTax)*1.5));
        decHours += 40;
    }
    $(this).closest('.card').find('.spanHours').text(Math.round((decHours + Number.EPSILON) * 100) / 100);
})

function calculateTotalPay(decPayRate, decHours, decTaxRate){
    decOverTime = 0.00;
    if(decHours > 40){
        decOvertime = decHours - 40;
        decHours = 40;
    }
    return Math.round(((((decHours * decPayRate) + (decOverTime * decPayRate * 1.5)) * (1- decTaxRate)) + Number.EPSILON) * 100) / 100;
}

function buildEmployeeTableRow(Employee){
    return '<tr><td>' + Employee.Month + '</td><td>' + Employee.Year + '</td><td>' + Employee.Sales + '</td><td>' + Employee.Hours + '</td><td>' + Employee.Rate + '</td><td>' + + Employee.CommissionRate + '</td><td>' +  calculateTotalPay(Employee.HourlyWage,Employee.Hours,Employee.TaxRate) + '</td></tr>';
}

function buildEmployeeCard(Employee){
    strCardHTML = '<div class="card col-6 mt-3 ml-3 mb-3">';
    strCardHTML += '<div class="card-body">';
    strCardHTML += '<img src="./images/archer.jpg"  alt="Profile Pic" style="width:25%; border-radius: 50%;"></img>';
    strCardHTML += '<h2 class="text-center ml-8 mb-0">' + Employee.FirstName + ' ' + Employee.LastName + '</h2>';
    strCardHTML += '<h4 class="text-center text-muted mt-0">Code Name: ' + Employee.CodeName + '</h4>';
    strCardHTML += '<h5 class="mt-5 text-bold">Contact Details</h5>';
    strCardHTML += '<p class="mb-0 ml-3">Billing Agency: ' + Employee.Agency + '</p>';
    strCardHTML += '<p class="mb-0 ml-3">Position: ' + Employee.Job + '</p>';
    strCardHTML += '<p class="mb-0 ml-3">Hire Date: ' + Employee.HireDate + '</p>';
   strCardHTML += '<button class="btn btn-primary btn-block mt-3" id="btnContactDetails">Toggle Contact Details</button>';
    strCardHTML += '</div>';
    strCardHTML += '</div>';
    strCardHTML += '</div>';
    strCardHTML += '</div>';
    return strCardHTML;
}

function buildContactCard(Employee){
    strCardHTML = '<div class="card text-primary bg-secondary col-6 mt-3 ml-3 mb-3">';
    strCardHTML += '<div class="card-body">';
    strCardHTML += '<p class="mb-0 ml-3">Phone:  <a href="tel:' + Employee.Phone + '" class="aPhone">' + Employee.Phone + '</a></p>';
    strCardHTML += '<p class="mt-0 ml-3">Email:  <a href="mailto:' + Employee.Email + '" class="aEmail">' + Employee.Email + '</a></p>';
    strCardHTML += '<h5 class="mt-4 text-bold">Address</h5>';
    strCardHTML += '<p class="pStreetAddress mb-0 ml-3">' + Employee.Street1 + '</p>';
    strCardHTML += '<p class="pCityState mt-0 ml-3">' + Employee.City + ', ' + Employee.State + ', ' + Employee.ZIP + '</p>';
    strCardHTML += '<p class="mb-0 ml-3">Emergency Contact: ' + Employee.EContact + '</p>';
    strCardHTML += '<p class="mb-0 ml-3">Phone:  <a href="tel:' + Employee.EContactNumber + '" class="aPhone">' + Employee.EContactNumber + '</a></p>';
    strCardHTML += '</div>';
    strCardHTML += '</div>';
    strCardHTML += '</div>';
    strCardHTML += '</div>';
    return strCardHTML;
}