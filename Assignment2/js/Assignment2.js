var CustHead;

function whichselect (value){
    //function to get the selection in the drop down list
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("aboutsection").style.visibility = "hidden";
    document.getElementById("Input").value = "";
    
    
    
    switch (value){
        case "ShowAll":
            document.getElementById("section1").style.visibility = "visible";
            document.getElementById("CustHist").innerHTML = "";
            document.getElementById("CustHeader").innerHTML = "Order History";
            AllCustomers();
            break;
        case "InputCustomer":
            document.getElementById("section2").style.visibility = "visible";
            break;
        case "Pleaseselect":
            break;
        case "about":
            document.getElementById("aboutsection").style.visibility = "visible";
            break;
        default:
            alert("Please Select A Valid Option");
    }
}
      
function AllCustomers (){
    //Gets the Store ID, Name and City and sends the result to populate the table
    var allcustreq = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
        
    allcustreq.onreadystatechange = function(){
        
    if (allcustreq.readyState == 4 && allcustreq.status == 200){
      var output = JSON.parse(allcustreq.responseText);
      GenerateASOutput(output);
         }
    };

allcustreq.open("GET", url, true);
allcustreq.send();
}
    
function GenerateASOutput(result){
    //populates the table 
var count = 0;
var table = document.createElement('table');

table = "<table class = 'tablecenter' id 'ListTable' border = '1'><tr><th> Customer ID  </th><th>  Customer Name  </th><th> City </th></tr>";
//Loop to extract data from the response object
for (count = 0; count <  result.GetAllCustomersResult.length; count++)
{
    
    var custID = result.GetAllCustomersResult[count].CustomerID;
    CustHead = result.GetAllCustomersResult[count].CompanyName;
    var CustName = '<a href="javascript:Orders(' + "'" + custID + ", " + CustHead + "'); " + ' " > ' ;
    CustName += result.GetAllCustomersResult[count].CompanyName; 
    CustName += '</a>';
    
    var custCity = result.GetAllCustomersResult[count].City;
    
   table += "<tr><td>" + (custID) + "</td><td>" + (CustName) + "</td><td>" + (custCity) + "</td></tr>";
}
table += "</table>";

document.getElementById("CustList").innerHTML = table;


}

function Orders(custID){
     
    document.getElementById("CustHeader").innerHTML = custID + " Order History";
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += custID;
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var output = JSON.parse(xmlhttp.responseText);
        GenerateOutput(output);
    }
 };
xmlhttp.open("GET", url, true);
xmlhttp.send();

function GenerateOutput(result) 
//Function that displays results
{
var display = "<table border = 1><tr><th>Product Name</th><th>Total Ordered</th></tr>";
var count = 0;
for(count = 0; count < result.length; count ++)
{
display += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
}
display += "</table>";
document.getElementById("CustHist").innerHTML = display;
whichselect("InputCustomer");

}
}

function StoreInput (){
    var CustID = document.input.Input.value;
    CustID = CustID.toUpperCase();
    document.input.Input.value = CustID;
    var rx = new RegExp ("^[a-zA-Z]+$");
    var inputrep = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    if (rx.test(CustID)=== false){
        alert ("Customer ID can only contain letters");
        return;
    } else{
    
    url += CustID;
    inputrep.onreadystatechange = function() {
        if (inputrep.readyState == 4 && inputrep.status == 200) {
        var output = JSON.parse(inputrep.responseText);
        GenerateOutput(output);
         
    }
     };
 
inputrep.open("GET", url, true);
inputrep.send();

function GenerateOutput(result) 
//Function that displays results
{
var display = "<table border = 1><tr><th>Product Name</th><th>Total Ordered</th></tr>";
var count = 0;
for(count = 0; count < result.length; count ++)
{
display += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
}
display += "</table>";
document.getElementById("CustHist").innerHTML = display;
whichselect("InputCustomer");

}
    }

    
}