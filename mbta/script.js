var myLat = 0;
var myLng = 0;
var closestStopLat = 0;
var closestStopLng = 0;
var myMarker = new google.maps.LatLng(myLat, myLng);
var myOptions = {
  zoom: 13, // The larger the zoom number, the bigger the zoom
  center: {lat: 42.352271, lng: -71.05524200000001},
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var tStops = [
  ['Alewife', 42.395428, -71.142483],
  ['Davis', 42.39674, -71.121815],
  ['Porter Square', 42.3884, -71.11914899999999],
  ['Harvard Square', 42.373362, -71.118956],
  ['Central Square', 42.365486 , -71.103802],
  ['Kendall/MIT', 42.36249079, -71.08617653],
  ['Charles/MGH', 42.361166, -71.070628],
  ['Park Street', 42.35639457, -71.0624242],
  ['Downtown Crossing', 42.355518, -71.060225],
  ['South Station', 42.352271, -71.05524200000001],  
  ['Broadway', 42.342622, -71.056967],
  ['Andrew', 42.330154 , -71.057655],
  ['JFK/UMass', 42.320685, -71.052391],
  ['Salvin Hill', 42.31129, -71.053331],
  ['Fields Corner', 42.300093, -71.061667],
  ['Ashmont', 42.284652, -71.06448899999999],
  ['Wollaston', 42.2665139, -71.0203369 ],
  ['Quincy Center', 42.251809, -71.005409 ],
  ['Braintree', 42.2078543, -71.0011385]
];
var image = {
  url: 'https://pbs.twimg.com/profile_images/479253963217186816/gh7IsaeA_400x400.jpeg',
  scaledSize: new google.maps.Size(25, 25)
};

function init() {
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
    navigator.geolocation.getCurrentPosition(function(position) {
      myLat = position.coords.latitude;
      myLng = position.coords.longitude;
      me = new google.maps.LatLng(myLat, myLng);
      map.panTo(me);   
      renderMap();
    },   function() { noGeoLocationError(true);
    });
  } else {
      noGeoLocationError(false);
  }
}

function noGeoLocationError(status){
  if (status == true) {
    alert("Geolocation is not supported by your web browser.  What a shame!");
  }
}

function renderMap() {
  drawLine();
  makeTStopTitles();
  linetoNearestStop(findClosestStop());
}

function drawLine() {  
  var tStopPath = [];
  for (var i = 0; i < 16; i++) {
    var position =  {lat: tStops[i][1], lng: tStops[i][2]};
    tStopPath.push(position);
  }

  var flightPath = new google.maps.Polyline({
    path: tStopPath,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
     strokeWeight: 5
  });
  flightPath.setMap(map);

  var tStopPath2 = [];
  position =  {lat: tStops[12][1], lng: tStops[12][2]};
  tStopPath2.push(position);
  position =  {lat: tStops[16][1], lng: tStops[16][2]};
  tStopPath2.push(position);
  position =  {lat: tStops[17][1], lng: tStops[17][2]};
  tStopPath2.push(position);
  position =  {lat: tStops[18][1], lng: tStops[18][2]};
  tStopPath2.push(position);

  flightPath2 = new google.maps.Polyline({
    path: tStopPath2,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
     strokeWeight: 5
  });
  flightPath2.setMap(map);
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

function findClosestStop(){
  distanceArray = [];
  for (var i=0; i < tStops.length; i++){
    var distanceToStop = distBetween(myLat, myLng, tStops[i][1], tStops[i][2])
    distanceArray.push(distanceToStop)
  }

  var minDistance = distanceArray[0];
  var minDistanceStopIndex = 0;
  for (var i=1; i < tStops.length; i++){
    if (distanceArray[i] < minDistance) {
        minDistanceStopIndex = i-1; 
        minDistance = distanceArray[i-1];
    }
  }
  
  me = new google.maps.Marker({
        position: me,
        title: "Current Location. The closest T Stop to you is: " + tStops[minDistanceStopIndex][0] + ". It is: " + minDistance + " miles away from you right now.",
        map: map
  });
  clickTitle(me);
  return minDistanceStopIndex; 
}

function distBetween(lat1, lon1, lat2, lon2) {
  //Haversine formula: https://www.movable-type.co.uk/scripts/latlong.html
  var R = 6378137; 
  var φ1 = toRadians(lat1);
  var φ2 = toRadians(lat2);
  var Δφ = toRadians((lat2-lat1));
  var Δλ = toRadians((lon2-lon1));
  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return metersToMiles(d);
}

function toRadians(x){
  return x * Math.PI / 180;
}

function metersToMiles(x){
  return x * 0.000621371;
}

function linetoNearestStop(stopIndex){
  var lineArray = [];
  position =  {lat: myLat, lng: myLng};
  lineArray.push(position);
  position =  {lat: tStops[stopIndex][1], lng: tStops[stopIndex][2]};
  lineArray.push(position);

  nearestStop = new google.maps.Polyline({
    path: lineArray,
    geodesic: true,
    strokeColor: '#006400',
    strokeOpacity: 3.0,
     strokeWeight: 5
  });
  nearestStop.setMap(map);
}