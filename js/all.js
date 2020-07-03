const firebaseConfig = {
apiKey: "AIzaSyDOAZkncv4hMlz_8lFjt6K-Q_F6ILtQbs0",
    authDomain: "bloodbank-9ed97.firebaseapp.com",
    databaseURL: "https://bloodbank-9ed97.firebaseio.com",
    projectId: "bloodbank-9ed97",
    storageBucket: "bloodbank-9ed97.appspot.com",
    messagingSenderId: "792527960463",
    appId: "1:792527960463:web:8349e9d6eed1dbca35f3fa",
    measurementId: "G-K1QVRV281P"
  };
  firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();
  const db=firebase.firestore();
var fcity="";
function signUpUser(){
	var email = document.getElementById("emailf");
		var password = document.getElementById("passwordf");
auth.createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
}).then(function(){if(auth.currentUser.uid!=null){addData();}});
}

auth.onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    if(user != null){

      var email_id = user.email;
window.location.replace('index.html');

    }

  } else {

	document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
auth.signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });



}

function reset(){
var emailAddress = document.getElementById("email_field").value;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  window.alert("Password reset email sent!!");
}).catch(function(error) {
 window.alert("cannot send email due to:"+error);
});}

function logout(){
  auth.signOut().then(function(){
  	window.alert('logged out successfully');
window.location.replace('login.html');})

}
function addData(){
	var email=document.getElementById("emailf").value;
	var name=document.getElementById("namefield").value;
	var group=document.getElementById("groupf").options[document.getElementById("groupf").selectedIndex].value;
	var age=document.getElementById("dobf").value;
	var lastdonated=document.getElementById("ldf").value;
	var phone=document.getElementById("phonef").value;
	var userid=auth.currentUser.uid;

	if(validate_data(email,name,age,phone,userid)){
db.collection("Users").add({
    name: name,
    email: email,
    age: age,
    availability:"1",
    location: fcity,
    phone: phone,
    date: lastdonated,
    group: group,
    userId: userid

}).catch(function(error){alert(error);}).then(function(){alert(" User data added");}).then(function(){window.location.replace("index.html");});
}
}
function validate(){
	auth.onAuthStateChanged(function(user) {
if(!user) {
window.location.replace('login.html')

  }
});

}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
	 var geocoder;
	 var latitude=position.coords.latitude;
	 var longitude=position.coords.longitude;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  value=add.split(",");

                    count=value.length;
                    country=value[count-1];
                    state=value[count-2];
                    city=value[count-3];
                    fcity=city;
                    alert("city name is: " + city);
                  auth.onAuthStateChanged(function(user) {

  if (user) {}
else {
signUpUser();
  }
});
                }
                else  {
                   alert("address not found");
                }
            }
            else {
                alert("Geocoder failed due to: " + status);
            }
        }
    );
}
function validate_data(email, name,age,phone,userid){
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
	{
		if(/^\d{10}$/.test(phone)){
			if(age>18&&age<100)
				{
					if(name.length==0){
						alert("name cannot be empty");
						return false;
						}
						else{return true;}
}
		else{alert("Invalid age");return false;}
		}else{alert("Phone badly formatted");return false;}}
		else{alert("email badly formatted");return false;}	
	
}
function setData(){
	db.collection('Users').get().then((snapshot)=>{
		const list1=document.getElementById('table');
		list1.innerHTML="";
		var header = list1.createTHead();
  var row = header.insertRow(0);
  row.style.backgroundColor="rgb(168, 28, 6)";
    var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  cell1.innerHTML = "<b>NAME</b>";
  cell2.innerHTML = "<b>AGE</b>";
  cell3.innerHTML = "<b>GROUP</b>";
  cell4.innerHTML = "<b>LOCATION</b>";
  cell5.innerHTML = "<b>PHONE</b>";
  cell6.innerHTML = "<b>EMAIL</b>";
  cell1.style.color="white";
  cell2.style.color="white";
  cell3.style.color="white";
  cell4.style.color="white";
  cell5.style.color="white";
  cell6.style.color="white";
		snapshot.docs.forEach(doc =>{
var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  cell1.innerHTML = doc.data().name;
  cell2.innerHTML = doc.data().age;
  cell3.innerHTML = doc.data().group;
  cell4.innerHTML = doc.data().location;
  cell5.innerHTML = doc.data().phone;
  cell6.innerHTML = doc.data().email;
});
	});

}
function search(){
	var input, filter, table, tr, td, i, txtValue;
  input =document.getElementById("sel").options[document.getElementById("sel").selectedIndex].value;
  filter = input;
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if(filter!=""){
      if (!txtValue.toString().localeCompare(filter)) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
  }else{setData();}
    }       
  }

}
function getCurrentUser(){
	var name,phone,email,age,lastdonated,group,location;
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	var id=auth.currentUser.uid.toString();
	db.collection('Users').get().then((snapshot)=>{
		snapshot.docs.forEach(doc =>{
			if(id==doc.data().userId){
				name=doc.data().name;
				age=doc.data().age;
				phone=doc.data().phone;
				group=doc.data().group;
				lastdonated=doc.data().date;
				email=doc.data().email;
				location=doc.data().location;
				document.getElementById("emailf").value=email;
	document.getElementById("namefield").value=name;
	document.getElementById("groupf").options[document.getElementById("groupf").selectedIndex].value=group;
	document.getElementById("dobf").value=age;
	document.getElementById("ldf").value=lastdonated;
document.getElementById("phonef").value=phone;
document.getElementById("loc").value=location;

}});
	});
}
});
}
function updatedata(){
	var name,phone,email,age,lastdonated,group,location,docid;
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	var id=auth.currentUser.uid.toString();
	db.collection('Users').get().then((snapshot)=>{
		snapshot.docs.forEach(doc =>{
			if(id==doc.data().userId){
				docid=doc.id;
				name=document.getElementById("namefield").value;
				age=document.getElementById("dobf").value;
				phone=document.getElementById("phonef").value;
				group=document.getElementById("groupf").options[document.getElementById("groupf").selectedIndex].value;
				lastdonated=document.getElementById("ldf").value;
				email=document.getElementById("emailf").value;
				location=document.getElementById("loc").value;
}});
	}).then(function(){
		if(validate_data(email, name,age,phone,location)){
	db.collection('Users').doc(docid).update({
	name: name,
    email: email,
    age: age,
    availability:"1",
    location: fcity,
    phone: phone,
    date: lastdonated,
    group: group,
    location:location
	}).then(function(){alert("data updated successfully");});
}
});
}
});
	

}
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCPYMI9P4d29sp8AGl_4z9py1ZEt8YXmcI&callback=myMap";
script.async = true;
document.head.appendChild(script);
