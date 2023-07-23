let map;

const mapOptions = {  
  tilt: 0,
  heading: 0,
  zoom: 14.3,
  center: { lat:  42.537198, lng: 27.495911 },
  mapId: "74860215a9211f87"
};


async function initMap() {
  const mapDiv = document.getElementById("map");

  map = new google.maps.Map(mapDiv, mapOptions);


  // var solarPanelData = [
  //   { lat: 42.512148, lng: 27.565062},
  //   { lat: 42.524374, lng: 27.555062},
  //   { lat: 42.534374, lng: 27.575062} 
  //   // add more panels
  // ];

  

 
  
  // let result = await fetch('https://reqres.in/api/users');
  // let result2 = await result.json() 
  // // let img = result2.data[0]["avatar"]
  
  let lat = 42.537198;
  let lng = 27.528842;
  var totalVoltage = 0;

  
  fetch('https://reqres.in/api/users')
  .then(response => response.json())
  .then(jsonData => {
    // console.log(jsonData["total"])
    jsonData.data.forEach(panel => {
      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng},
        map: map,
        icon: {
            url: "solar-icon.svg",
            scaledSize: new google.maps.Size(50, 50)
        } 
    })

    var infoWindow = new google.maps.InfoWindow({
      content: '<h3>' + panel["id"] + '</h3> <p> Voltage: ' + panel["id"] + 'V<br> Temperature: '+ panel["id"] + '5' + '<br> </p>'  
    });
    lat += 0.002;
    lng += 0.001;
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });

    var destination = { lat: 42.541701, lng: 27.495911 };

  var destinationMarker = new google.maps.Marker({
    position: destination,
    map: map,
    title: 'Destination',
    icon: {
      url: "battery-icon.svg",
      scaledSize: new google.maps.Size(35, 35)
    }
  });

  
  totalVoltage += panel["id"];
  var destinationInfoWindow = new google.maps.InfoWindow({
    content: '<h3>Battery Station</h3> ' + 'Total voltage: ' + totalVoltage
  });

  destinationMarker.addListener('mouseover', function() {
    destinationInfoWindow.open(map, destinationMarker);
  });

  destinationMarker.addListener('mouseout', function() {
    destinationInfoWindow.close();
  });


    // marker flashes in seconds
    setInterval(function() {
      marker.setVisible(!marker.getVisible());
    }, 1000); 

    var path = new google.maps.Polyline({
      path: [marker.getPosition(), destination],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      scale: 4
    });

    path.setMap(map);
    

  })

  

  })

}

// async function fetchData(){

// }
window.initMap = initMap;

