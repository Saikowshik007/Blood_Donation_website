var myIndex = 0;

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 5000);    
}


function ha(elm)
{
  var valueg=elm.value;
window.location = "find_blood.html?bloodgroup="+valueg;
}


window.onscroll = function() {myFunction()};

function myFunction() {
	var y=document.getElementById("nav");
    if (document.body.scrollTop > 150||document.documentElement.scrollTop > 150) {
    y.style.position="fixed";
	y.style.top=0;
	y.style.left=0;
	y.style.backgroundColor="rgba(82, 127, 99,1.0)";
    }else{
	y.style.position="absolute";
	y.style.top="150px";
	y.style.left=0;
	y.style.backgroundColor="rgba(82, 127, 99,0.5)";
    }
}


function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(17.781617, 83.376854),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}


