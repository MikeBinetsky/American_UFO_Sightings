function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};

function createMap(ufoData) {
    var myMap = L.map("map", {
        center: [37.0902, -95.7129],
        zoom: 5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap)
    
    async function createMarkers(data){
        for (var i = 0; i < data.length; i++) {
        var sighting = data[i];
        console.log(sighting)
        var latitude = parseFloat(sighting["latitude"])
        var longitude = parseFloat(sighting["longitude "])
        if (latitude != NaN && longitude != NaN) {
            var location = [latitude, longitude]
            console.log(location)
            L.marker(location)
            .bindPopup(`<h1>City: ${sighting.city}</h1> <hr> <h3>Shape: ${sighting.shape}</h3> <hr> <h3>Comments${sighting.comments}</h3>`)
            .addTo(myMap);
            }
            await sleep(2000)
        }
    };
    
    createMarkers(ufoData);

    return myMap
};


createMap(ufo_sightings);