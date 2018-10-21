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

function init() {
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  getMyLocation();
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
    

  //var image = "C:\Users\Colby\Desktop\mbta\tstop.jpg"
var img = new Image();
img.src = "https://cdn.pixabay.com/photo/2015/10/31/12/28/t-1015548_1280.jpg"


 marker2 = new google.maps.Marker({
    position: {lat: 42.320685, lng: -71},
    icon: img
    map:  map
    title : "yooo"
});
  marker.setMap(map);

  // Open info window on click of marker
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(marker.title);
    infowindow.open(map, marker);
  });



        var South_Station.stop_lat = 42.352271
        South_Station.stop_lon = -71.05524200000001

        var Andrew.stop_lat = 42.330154 
        Andrew.stop_lon = -71.057655

        var Porter_Square.stop_lat = 42.3884
        Parter_Square.stop_lon = -71.11914899999999

        var Harvard_Square.stop_lat = 42.373362
        Harvard_Square.stop_lon = -71.118956

        var JFK_UMass.stop_lat = 42.320685
        JFK_UMass.stop_lon = -71.052391

        var Salvin_Hill.stop_lat = 42.31129
        Salvin_Hill.stop_lon = -71.053331

        var Park_Street.stop_lat = 42.35639457
        Park_Street.stop_lon = -71.0624242

        var Broadway.stop_lat = 42.342622
        Broadway.stop_lon = -71.056967

        var Davis.stop_lat = 42.39674
        Davis.stop_lon = -71.121815

        var Alewife.stop_lat = 42.395428
        Alewife.stop_lon = -71.142483

        var Kendall_MIT.stop_lat = 42.36249079
        Kendall_MIT.stop_lon = -71.08617653

        var Charles_MGH.stop_lat = 42.361166
        Charles_MGH.stop_lon = -71.070628

        var Downtown_Crossing.stop_lat = 42.355518
        Downtown_Crossing.stop_lon = -71.060225 

        var Quincy_Center.stop_lat = 42.251809
        Quincy_Center.stop_lon = -71.005409 

        var Ashmont.stop_lat = 42.284652
        Ashmont.stop_lon = -71.06448899999999

        var Wollaston.stop_lat = 42.2665139
        Wollaston.stop_lon = -71.0203369 

        var Fields_Corner.stop_lat = 42.300093
        Fields_Corner.stop_lon = -71.061667

        var Central_Square.stop_lat = 42.365486 
        Central_Square.stop_lon = -71.103802

        var Braintree.stop_lat = 42.2078543
        Braintree.stop_lon = -71.0011385

}