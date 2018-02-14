toastr.options = {
  "positionClass": "toast-bottom-right"
};

var priceData = "";

//get the dataset
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://api.fairplayground.info/rawdata/faircoin_prices.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});
function csvToArray(csv) {
  var a1 = csv.split("\n");
  var r = [];
  for(var i=0; i<a1.length; i++) {
    var a2 = a1[i].split(",");
    r.push(a2);
  }
  return(r);
}
function processData(data) {
  priceData = csvToArray(data);
};

function calculateEuros() {
  document.getElementById("result").innerHTML="";
  var faircoins = document.getElementById("inputFaircoin").value;
  var date = document.getElementById("inputDate").value;
  if(!faircoins){
    toastr.warning("please, fill the faircoin input box");
    return;
  }
  if(!date){
    toastr.warning("no date");
    return;
  }
  //let's find the date in the priceData
  var selectedPriceData = []
  for(var i=0; i<priceData.length; i++) {
    if(priceData[i][0]==date) {
      selectedPriceData = priceData[i];
    }
  }
  if(selectedPriceData.length<1) {
    toastr.warning("selected date not found in the dataset");
    return;
  }
  console.log(selectedPriceData);

  var euros = faircoins * selectedPriceData[3];
  document.getElementById("inputEuro").value= euros;
  document.getElementById("result").innerHTML = faircoins + "FC, are " + euros + "€";
  toastr.success(faircoins + "FC, are " + euros + "€");
}
function calculateFaircoins() {
  document.getElementById("result").innerHTML="";
  var euros = document.getElementById("inputEuro").value;
  var date = document.getElementById("inputDate").value;
  if(!euros){
    toastr.warning("please, fill the euro input box");
    return;
  }
  if(!date){
    toastr.warning("no date");
    return;
  }
  //let's find the date in the priceData
  var selectedPriceData = []
  for(var i=0; i<priceData.length; i++) {
    if(priceData[i][0]==date) {
      selectedPriceData = priceData[i];
    }
  }
  if(selectedPriceData.length<1) {
    toastr.warning("selected date not found in the dataset");
    return;
  }
  console.log(selectedPriceData);

  var faircoins = euros / selectedPriceData[3];
  document.getElementById("inputFaircoin").value= faircoins;
  document.getElementById("result").innerHTML = euros + "€, are " + faircoins + "FC";
  toastr.success(euros + "€, are " + faircoins + "FC");
}
