
  var geocoder;
  var x;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 

//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
	oFormObject1 = document.forms['geolocation'];
	oFormObject1.elements["latitude"].value = lat;
	oFormObject1.elements["longitude"].value = lng;
	
    codeLatLng(lat, lng);
	var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Your Current Location'
  });
	
}

function errorFunction(){
    alert("Geocoder failed");
}

  function initialize() {
    geocoder = new google.maps.Geocoder();
 
}
  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         //alert(results[0].formatted_address)
		 
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city. I have used locality
                if (results[0].address_components[i].types[b] == "locality") {
                    
					address=results[0].formatted_address;
                    city= results[0].address_components[i];
					pincode=results[0].address_components[i+4];
					state=results[0].address_components[i+2];
					country=results[0].address_components[i+3];
                    break;
                }
            }
        }
        //city data
		a=address;
		x=city.long_name;
		s=state.long_name;
		c=country.long_name;
		p=pincode.long_name;
        
		oFormObject = document.forms['geolocation'];
		
		oFormObject.elements["address"].value = a;
		oFormObject.elements["city"].value = x;
		oFormObject.elements["state"].value = s;
		oFormObject.elements["country"].value = c;
		oFormObject.elements["pincode"].value = p;


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
