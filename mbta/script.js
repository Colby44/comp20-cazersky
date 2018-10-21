var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
  zoom: 13, // The larger the zoom number, the bigger the zoom
  center: me,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var tStops = [
  ['South Station', 42.352271, -71.05524200000001],  
  ['Andrew', 42.330154 , -71.057655],
  ['Porter Square', 42.3884, -71.11914899999999],
  ['Harvard Square', 42.373362, -71.118956],
  ['JFK/UMass', 42.320685, -71.052391],
  ['Salvin Hill', 42.31129, -71.053331],
  ['Park Street', 42.35639457, -71.0624242],
  ['Broadway', 42.342622, -71.056967],
  ['Davis', 42.39674, -71.121815],
  ['Alewife', 42.395428, -71.142483],
  ['Kendall/MIT', 42.36249079, -71.08617653],
  ['Charles/MGH', 42.361166, -71.070628],
  ['Downtown Crossing', 42.355518, -71.060225],
  ['Quincy Center', 42.251809, -71.005409 ],
  ['Ashmont', 42.284652, -71.06448899999999],
  ['Wollaston', 42.2665139, -71.0203369 ],
  ['Fields Corner', 42.300093, -71.061667],
  ['Central Square', 42.365486 , -71.103802],
  ['Braintree', 42.2078543, -71.0011385]
];
var image = {
  url: 'https://pbs.twimg.com/profile_images/479253963217186816/gh7IsaeA_400x400.jpeg',
  scaledSize: new google.maps.Size(30, 30)
};


function init() {
  console.log("aa");
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    getMyLocation();
        // Update map and go there...
    me = new google.maps.LatLng(myLat, myLng);
    map.panTo(me);
        
    // Create a me marker
    marker = new google.maps.Marker({
      position: me,
      title: "Here I Am!",
      map: map
    });
    clickTitle(marker)
}

function getMyLocation() {
  if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
    navigator.geolocation.getCurrentPosition(function(position) {
      myLat = position.coords.latitude;
      myLng = position.coords.longitude;
      renderMap();
    });
  }
  else {
    alert("Geolocation is not supported by your web browser.  What a shame!");
  }
}

function renderMap() {
  me = new google.maps.LatLng(myLat, myLng);

  // Update map and go there...
  map.panTo(me);
  
  // Create a marker
  marker = new google.maps.Marker({
    position: me,
    title: "Here I Am!"
  });
  marker.setMap(map);
    
  // Open info window on click of marker
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(marker.title);
    infowindow.open(map, marker);
  });

  drawLine();
}

function drawLine() {  var tStopPath = [];
  for (var i = 0; i < tStops.length; i++) {
    var position =  {lat: tStop[i][1], lng: tStop[i][2]};
    tStopPath.push(position);
  }

  var flightPath = new google.maps.Polyline({
    path: tStopPath,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
     strokeWeight: 2
  });
  flightPath.setMap(map);
}

function clickTitle(marker){
    marker.addListener('click', function() {
    infowindow.setPosition(marker.getPosition());
    infowindow.setContent(marker.title);
    infowindow.open(map, marker);
    map.setCenter(marker.getPosition());
    });
}

function makeTStopTitles(){
  for (var i = 0; i < tStops.length; i++) {
    var tStop = tStops[i];
    marker = new google.maps.Marker({
      position: {lat: tStop[1], lng: tStop[2]},
      map: map,
      icon: image,
      title: tStop[0],
    });
    clickTitle(marker);
  }
}