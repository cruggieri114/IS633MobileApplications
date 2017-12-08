var CustHead;
function whichselect (value){
    //function to get the selection in the drop down list
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("aboutsection").style.visibility = "hidden";
    document.getElementById("custorders").style.visibility = "hidden";
    document.getElementById("changeorder").style.visibility = "hidden";
    document.getElementById("addsection").style.visibility = "hidden";
    document.getElementById("deletesection").style.visibility = "hidden";
    document.getElementById("geolocat").style.visibility = "hidden";
    document.getElementById("Input").value = "";
    document.getElementById("accesscamera").style.visibility = "hidden";
    document.getElementById("getcontacts").style.viibility = "hidden";
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    
    obj1.style.display = "none";
    obj2.style.display = "none";
    obj3.style.display = "none";
    
    
    
    switch (value){
        case "ShowAll":
            document.getElementById("section1").style.visibility = "visible";
            document.getElementById("CustHist").innerHTML = "";
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
        case "current":
            document.getElementById("custorders").style.visibility = "visible";
            break;
        case "change":
            document.getElementById("changeorder").style.visibility = "visible";
            break;
        case "add":
            document.getElementById("addsection").style.visibility = "visible";
            break;
        case "delete":
            document.getElementById("deletesection").style.visibility = "visible";
            break;
        case "location":
            document.getElementById("geolocat").style.visibility = "visible";
            break;
        case "camera":
            document.getElementById("accesscamera").style.visibility = "visible";
            break;
        case "contacts":
            document.getElementById("getcontacts").style.visibility = "visible";
            break;
        default:
            alert("Please Select A Valid Option");
    }
}
      
function AllCustomers (){
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    obj1.style.display = "none";
    obj2.style.display = "none";
    obj3.style.display = "none";
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

table = "<table class = 'tablecenter' border = '1'><tr><th> </th><th> Customer ID  </th><th>  Customer Name  </th><th> City </th><th></th></tr>";
//Loop to extract data from the response object
for (count = 1; count <  result.GetAllCustomersResult.length; count++)
{
    
    var custID = result.GetAllCustomersResult[count].CustomerID;
    CustHead = result.GetAllCustomersResult[count].CompanyName;
    var custName = '<a href="javascript:Orders(' + "'" + custID + ", " + CustHead + "');" + '">';
    custName += result.GetAllCustomersResult[count].CompanyName;
    custName += '</a>';
    var custCity = result.GetAllCustomersResult[count].City;
    var button = document.createElement("button");
    var deletebutton = document.createElement("button");
    deletebutton = '<button onclick="DeleteCust(' + "'" + custID + "');" + '">Delete Customer</button>';
    
    button = '<button onclick="getcurrent(' + "'" + custID + "', '" + CustHead + "');" + '">Get Orders</button>';
    
   table += "<tr><td>" + (button) + "</td><td>" + (custID) + "</td><td>" + (custName) + "</td><td>" + (custCity) +
   "</td><td>" + (deletebutton) + "</td></tr>";
}
table += "</table>";

document.getElementById("CustList").innerHTML = table;

}

function Orders(custID){
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    obj1.style.display = "none";
    obj2.style.display = "none";
    obj3.style.display = "none";
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
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    obj1.style.display = "none";
    obj2.style.display = "none";
    obj3.style.display = "none";
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
function CurrentOrder(){
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    obj1.style.display = "none";
    obj2.style.display = "none";
    obj3.style.display = "none";
    var Custid = document.orderlist.List.value;
    var rx = new RegExp ("^[a-zA-Z]+$");
    var listrep = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    if (rx.test(Custid)=== false){
        alert ("Customer ID can only contain letters");
        return;
    } else{
    
    url += Custid;
    listrep.onreadystatechange = function() {
        if (listrep.readyState == 4 && listrep.status == 200) {
        var output = JSON.parse(listrep.responseText);
        GenerateListOutput(output);
         
    }
     };
 
listrep.open("GET", url, true);
listrep.send();
function GenerateListOutput(result) 
//Function that displays results
{
var display = "<table border = 1><tr><th></th><th>OrderID</th><th>Shipping Address</th><th>Shipping City</th><th>Shipping Name</th><th>Shipping Postal Code</th></tr>";
var count = 0;
for(count = 0; count < result.GetOrdersForCustomerResult.length; count ++)
{
    var Ordernumber = result.GetOrdersForCustomerResult[count].OrderID;
    var orderbutton =  '<button onclick="changeorder(' + "'" + Ordernumber + "');" + '">Modify Orders</button>';
    
    
    display += "<tr><td>" + (orderbutton) + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" +
result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td></tr>";
}
display += "</table>";
document.getElementById("listorder").innerHTML = display;
whichselect("current");

}
    }
}
function getcurrent(custID, CustHead){
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    obj1.style.display = "none";
    obj2.style.display = "none";
    obj3.style.display = "none";
    document.getElementById("listorder").innerHTML = custID + " - " + CustHead + " Current Order";
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += custID;
    var listrep = new XMLHttpRequest();
    listrep.onreadystatechange = function() {
        if (listrep.readyState == 4 && listrep.status == 200) {
        var output = JSON.parse(listrep.responseText);
        GenerateListOutput(output);
         
    }
     };
 
listrep.open("GET", url, true);
listrep.send();
function GenerateListOutput(result) 
//Function that displays results
{
var display = "<table border = 1><tr><th></th><th>OrderID</th><th>Shipping Address</th><th>Shipping City</th><th>Shipping Name</th><th>Shipping Postal Code</th></tr>";
var count = 0;


for(count = 0; count < result.GetOrdersForCustomerResult.length; count ++)
{
    var Ordernumber = result.GetOrdersForCustomerResult[count].OrderID;
    var orderbutton =  '<button onclick="changeorder(' + "'" + Ordernumber + "');" + '">Modify Orders</button>';
    display += "<tr><td>" + (orderbutton) + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" +
    result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td></tr>";
}
display += "</table>";
document.getElementById("listorder").innerHTML += "<br>" + display;
whichselect("current");

}
    }
function changeorder(Ordernumber){
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    obj1.style.display = "none";
    obj2.style.display = "none";
    obj3.style.display = "none";
    var listrep = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
    url += Ordernumber;
    listrep.onreadystatechange = function() {
        if (listrep.readyState == 4 && listrep.status == 200) {
        var output = JSON.parse(listrep.responseText);
        GenerateListOutput(output);
         
    }
     };
 
listrep.open("GET", url, true);
listrep.send();
function GenerateListOutput(result) 
//Function that displays results
{
    document.getElementById("changelabel").innerHTML = "Changing Order Number: " + Ordernumber + "<br>";
    var count;
    var display = "<table border = 1><tr><th>OrderID</th><th>Shipping Address</th><th>Shipping City</th><th>Shipping Name</th><th>Shipping Postal Code</th></tr>";
  for (count = 0; count <  result.length; count++)
{   
    
    var address = result[count].ShipAddress;
    var city = result[count].ShipCity;
    var name = result[count].ShipName;
    var zip = result[count].ShipPostcode;
    document.getElementById("orderlabel").innerHTML = Ordernumber;
    document.getElementById("shipaddress").value = address;
    document.getElementById("shipcity").value = city;
    document.getElementById("shipname").value = name;
    document.getElementById("shipcode").value = zip;    
    display += "<tr><td>"  + (Ordernumber) + "</td><td>" + (address) + "</td><td>" + (city) + "</td><td>" +
    (name) + "</td><td>" + (zip) + "</td></tr>";
  }
display += "</table>";
document.getElementById("changelabel").innerHTML += display;
whichselect("change");


}
    }
function ShowConfirm(){
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    obj1.style.display = "block";
    obj2.style.display = "block";
    obj3.style.display = "block";
}
function MakeChanges(){
    
    var addy = document.getElementById("shipaddress").value;
    var changecity = document.getElementById("shipcity").value;
    var changename = document.getElementById("shipname").value;
    var changezip = document.getElementById("shipcode").value;
    var orderid = document.getElementById("orderlabel").innerHTML;
    var rx = new RegExp("^(a-zA-Z0-9\s'&,.~`+-)*[^#$!%^@*()\"\/\:<>?]+$");
    var rx2 = new RegExp("^(a-z|A-Z|0-9)*[^#$%^!\"\@&*\/()'\:\:<>?,.\+]*$");
    if (rx.test(addy)===false){
        alert("The address can only include letters, numbers, spaces, apostrophe, accent, ampersand, comma, period, tilde, plus sign, and hyphen.  Please enter a valid address.");
        return;
    }
    if (rx.test(changecity) === false){
        alert("The city can only include letters, numbers, spaces, apostrophe, accent, ampersand, comma, period, tilde, plus sign, and hyphen.  Please enter a valid city.");
        return;
    }
    if (rx.test(changename) === false){
        alert("The name can only include letters, numbers, spaces, apostrophe, accent, ampersand, comma, period, tilde, plus sign, and hyphen.  Please enter a valid name.");
        return;
    }
    if (rx2.test(changezip) === false){
        alert("The Postal Code can only include letters and numbers.  Please enter a valid Postal Code.");
        return;
    }
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress";
    var updatereq = new XMLHttpRequest();
    var updatestring = '{"OrderID":"' + orderid + '","ShipAddress":"' + addy + '","ShipCity":"' + changecity + '","ShipName":"' + changename + '","ShipPostcode":"' + changezip + '"}';

     updatereq.onreadystatechange = function(){
        
    if (updatereq.readyState == 4 && updatereq.status == 200){
      var result = JSON.parse(updatereq.responseText);
      GenerateupdateResult(result, orderid);
      
      
         }
    };
    updatereq.open("POST", url, true);
    updatereq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    updatereq.send(updatestring);
        
    }
function GenerateupdateResult(success, orderid){
    //Gets POST result and displays wether it was successful
    
      
    switch (success)
{
case 1:
    alert("The operation was successful");
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    var obj4 = document.getElementById("continue");
    var obj5 = document.getElementById("backfromchange");
    obj1.style.display = "none";
    obj2.style.display = "none";
    obj3.style.display = "none";
    obj4.style.display = "block";
    obj5.style.display = "none";
    changeorder(orderid);
    
    break;
case 0:
    alert("The operation was not successful:\ " + exception);
    break;
case -2:
    alert("The operation was not successful because the data string supplied could not be deserialized into the service object.");
    break;
case -3:
    alert("The operation was not successful because a record with the supplied Order ID could not be found");
    break;
default:
    alert("The operation code returned is not identifiable");
}
}
function InputOrderNumber(){
    var obj1 = document.getElementById("confirm");
    var obj2 = document.getElementById("confirmyes");
    var obj3 = document.getElementById("confirmno");
    obj1.style.display = "none";
    obj2.style.display = "none";
    obj3.style.display = "none";
    var ordernumber = document.changeinput.ordernum.value;
    changeorder(ordernumber);
}

function AddCust(){
    var confirmation = confirm("Are You Sure You Want To Add This Customer");
    
    if (confirmation === true){
        var custID = document.getElementById("addID").value;
        var newname = document.getElementById("addname").value;
        var newcity = document.getElementById("addcity").value;
        custID = custID.toUpperCase();
        document.getElementById("addID").value = custID;
        if (custID.length != "5"){
            alert("The Customer ID must be 5 letters");
            return;
        }
        var rx = new RegExp("^(a-zA-Z0-9\s'&,.~`+-)*[^#$!%^@*()\"\/\:<>?]+$");
        var rx2 = new RegExp("^(|A-Z|)*[^0-9#$%^!\"\@&*\/()'\:\:<>?,.\+]*$");
    if (rx.test(newname)===false){
        alert("The Name can only include letters, numbers, spaces, apostrophe, accent, ampersand, comma, period, tilde, plus sign, and hyphen.  Please enter a valid address.");
        return;
    }
    if (rx.test(newcity) === false){
        alert("The City can only include letters, numbers, spaces, apostrophe, accent, ampersand, comma, period, tilde, plus sign, and hyphen.  Please enter a valid city.");
        return;
    }
    if (rx2.test(custID) === false){
        alert("The Customer ID can only include 5 uppercase letters.  Please enter a valid name.");
        return;
    }
    
        var parameters = '{"CustomerID":"' + custID + '","CompanyName":"' + newname + '","City":"' + newcity + '"}';
        var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
        var addreq = new XMLHttpRequest();
        addreq.onreadystatechange = function(){
        
    if (addreq.readyState == 4 && addreq.status == 200){
      var result = JSON.parse(addreq.responseText);
      var output = result.WasSuccessful;
      var Exception = result.Exception;
      GenerateAddResult(output, Exception);
      
      
         }
    };
    addreq.open("POST", url, true);
    addreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    addreq.send(parameters);
        
    }
    else {
        return;
    }
    
    
    }
function GenerateAddResult(success, exception){
    switch (success)
{
    case 1:
        alert("The operation was successful");
        whichselect("ShowAll");
        break;
    case 0:
        alert("The operation was not successful: " + exception);
        break;
    case -2:
        alert("The operation was not successful because the data string supplied could not be deserialized into the service object.");
        break;
    case-3:
        alert("The operation was not successful because a record with the supplied Order ID could not be found");
        break;
    default:
    alert("The operation code returned is not identifiable.");
}
}

function DeleteCust(custID){
    
     var confirmation = confirm("Are You Sure You Want To Delete This Customer");
     if (confirmation === true){
        if (custID === "null"  || custID === "undefined"){
            custID=custID.toUpperCase();
            document.getElementById("delID").value = custID;
        }
        
        var deleteID = custID;
        deleteID = deleteID.toUpperCase();
        document.getElementById("delID").value = deleteID;
        if (deleteID.length != "5"){
            alert("The Customer ID must be 5 letters");
            return;
        }
        var rx2 = new RegExp("^(|A-Z|)*[^0-9#$%^!\"\@&*\/()'\:\:<>?,.\+]*$");
        if (rx2.test(deleteID) === false){
        alert("The Customer ID can only include 5 uppercase letters.  Please enter a valid name.");
        return;
    }
        var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
        url += deleteID;
        var delreq = new XMLHttpRequest();
        delreq.onreadystatechange = function(){
        
    if (delreq.readyState == 4 && delreq.status == 200){
      var result = JSON.parse(delreq.responseText);
      var output = result.DeleteCustomerResult.WasSuccessful;
      var Exception = result.DeleteCustomerResult.Exception;
      GenerateDeleteResult(output, Exception);
      
      
         }
    };
    delreq.open("GET", url, true);
    delreq.send();
        
    }
    else {
        return;
    }
    
    
    }

function GenerateDeleteResult(success, exception){
    switch (success)
{
    case 1:
        alert("The operation was successful");
        whichselect("ShowAll");
        break;
    case 0:
        alert("The operation was not successful: " + exception);
        break;
    case -2:
        alert("The operation was not successful because the data string supplied could not be deserialized into the service object.");
        break;
    case-3:
        alert("The operation was not successful because a record with the supplied Order ID could not be found");
        break;
    default:
    alert("The operation code returned is not identifiable.");
}
}

function GetLocation(){
    var geo = navigator.geolocation;
    
    if (geo){
        geo.getCurrentPosition(showPosition);
    }
    else{
        alert("Geolocation is not supported");
    }
}

function showPosition(position){
    var latt = position.coords.latitude;
    var longi= position.coords.longitude;
    document.getElementById("lattitude").innerHTML = latt;
    document.getElementById("longitude").innerHTML = longi;
    CreateMap(latt,longi);
}
function CreateMap(latt, longi){
    var uluru = {lat: latt, lng: longi};
    var map = new google.maps.Map(document.getElementById("map"),{
        center: new google.maps.LatLng (latt, longi),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    
     var marker = new google.maps.Marker({
        position: uluru,
        map: map
     });
}     
function Photo(source){
    
navigator.camera.getPicture(onSuccess, onFail, { quality: 20, destinationtype: destinationtype.FILE_URI, saveToPhotoAlbum: true, sourceType:source, targetWidth: 550, targetHeight: 550 });

}

function onSuccess(imageURI)
{
var picdisplay = document.getElementById("picturesque");
picdisplay.style.display = 'block';
picdisplay.src =  imageURI; 
}
function onFail(message)
{
alert("Failed because: " + message);
}


function ChooseContact()
{


navigator.contacts.pickContact(function(contact) 
{
var contactinfo = "";
contactinfo += contact.name.givenName + " " + contact.name.familyName + "<br>";
var count = 0;
if (contact.phoneNumbers !== null) 
{
for (count=0; count < contact.phoneNumbers.length; count++) 
{
contactinfo += contact.phoneNumbers[count].type + ": " + 
contact.phoneNumbers[count].value + "<br>";
}
}
if (contact.emails !== null) 
{
for(count=0; count < contact.emails.length; count++) 
{
contactinfo += contact.emails[count].type + ": " + contact.emails[count].value + 
"<br>";
}
}
document.getElementById("contactname").innerHTML = contactinfo;
},
function(err) 
{
alert("Error: " + err);
}
);    
}
function SearchContact(){
   
    var lastname = document.getElementById("contactlast").value;
    var options      = new ContactFindOptions();
    options.filter   = lastname;
    options.multiple = true;
    options.desiredFields = [navigator.contacts.fieldType.givenName, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers];
    options.hasPhoneNumber = true;
    var fields = [navigator.contacts.fieldType.displayName];
    navigator.contacts.find(fields, onSuccess, onError, options);
    
function onSuccess(contacts) {
    alert('Found ' + contacts.length + ' contacts.');
    
    var table = document.createElement ("table");
    table = "<table border = 1><tr><th>Display Name</th><th>Phone Numbers</th/</tr>";
    for (var i = 0; i<contacts.length; i++){
        var phone = "";
        var name = contacts[i].givenName;
        if (contact.phoneNumbers !== null) 
{
for (count=0; count < contact[i].phoneNumbers.length; count++) 
{
phone += count[i].phoneNumbers[count].value + ", ";
}

        
        
    table += "<tr><td>" + (name) + "</td><td>" + (phone) + "</td></tr>";
    
    }
    document.getElementById("contactname").innerHTML = table;
}
}
function onError(contactError) {
    alert('onError!');
}

}
