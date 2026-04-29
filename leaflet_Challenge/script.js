(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([38.533958, -121.744560], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Adding a marker to my davis apartment
    var marker = L.marker([38.542669, -121.735959]).addTo(map);
    
    var circle = L.circle([38.542669, -121.735959], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    marker.bindPopup("<b>Hello Professor!</b><br>I am a popup.").openPopup();
    // .bindPopup means it only pops up when clicked
    circle.bindPopup("I am a RED circle!");
    var popup = L.popup().setLatLng([38.677490, -121.774719]).setContent("I am a standalone popup.")
    .openOn(map);

    // function onMapClick(e) {
    //     alert("You clicked the map at " + e.latlng);
    // }
    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);

}());