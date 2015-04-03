function initialize() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(-33.9, 151.2),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var bounds = new google.maps.LatLngBounds();
  var infowindow = new google.maps.InfoWindow();
  var paths = [];

  var pins = [
    [37.5305671691894, -119.447326660156],
    [37.53271484375,   -119.443367004395],
    [37.5384254455566, -119.440811157227],
    [37.5728492736816, -119.420310974121],
    [37.5717735290527, -119.41251373291 ],
    [37.5696678161621, -119.414138793945],
    [37.578441619873,  -119.425743103027],
    [37.5837783813477, -119.422966003418],
    [37.5989036560059, -119.42227935791 ],
    [37.5821800231934, -119.391761779785],
    [37.577465057373,  -119.394012451172],
    [37.5693626403809, -119.390182495117],
    [37.5868835449219, -119.385139465332],
    [37.5879287719727, -119.389114379883],
    [37.5761604309082, -119.396621704102],
    [37.5705528259277, -119.395889282227],
    [37.5675735473633, -119.398406982422],
    [37.5675735473633, -119.398406982422],
    [37.5680999755859, -119.387130737305],
    [37.5746803283691, -119.380798339844],
    [37.5728492736816, -119.420310974121]
  ];

  for (i = 0; i < pins.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(pins[i][0], pins[i][1]),
      map: map,
      zIndex: -i
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        console.log(i);
        infowindow.setContent(String(i + 1));
        infowindow.open(map, marker);
      }
    })(marker, i));

    paths.push(new google.maps.LatLng(pins[i][0], pins[i][1]));
    bounds.extend(paths[i]);
  }

  closeInfoWindow = function() {
    infowindow.close();
  };

  google.maps.event.addListener(map, 'click', closeInfoWindow);

  var path = new google.maps.Polyline({
    path: paths,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  path.setMap(map);
  map.fitBounds(bounds);
}

google.maps.event.addDomListener(window, 'load', initialize);
