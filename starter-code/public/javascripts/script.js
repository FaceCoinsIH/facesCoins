function initMap() {


  var coordinates = {lat:40.416775, lng: -3.703790};
    
  ltd = document.getElementById('ltd').value;
  lng = document.getElementById('lng').value;


  if(lng !=="" && ltd !==""){
    coordinates.lat = parseFloat(ltd);
    coordinates.lng = parseFloat(lng);
  }

  

  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 8, center: coordinates});

  var marker = new google.maps.Marker({position: coordinates, map: map,animation: google.maps.Animation.DROP});
}

initMap();

