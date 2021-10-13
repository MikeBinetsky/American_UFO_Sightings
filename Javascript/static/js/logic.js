// Admittedly found this on Stack Overflow
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};

// // This is for customization options to be added
// d3.selectAll("button").on("click", function(){
//     resetMap()
//     var firstYear = document.getElementById("startingYear").value;
//     var lastYear = document.getElementById("endingYear").value;
//     var ufo = ufo_sightings;
//     createMap(ufo, firstYear, lastYear)
//     }
// )

var alienIcon = L.icon({
    iconUrl: 'alien_icon.png',
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
function createMap(ufoData, startingYear, endingYear) {
    var myMap = L.map("map", {
        center: [30.0902, -95.7129],
        zoom: 3.4
    });

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>&copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(myMap)


    let years = checkYears(startingYear, endingYear)
    var start = years[0]
    var end = years[1]

    async function createMarkers(data){
        for (var i = 0; i < data.length; i++) {
            var sighting = data[i];
            if (sighting["year"] >= start && sighting["year"] <= end) {
                console.log(sighting[i])
                var latitude = parseFloat(sighting["latitude"])
                var longitude = parseFloat(sighting["longitude "])
                if (latitude != NaN && longitude != NaN) {
                    var location = [latitude, longitude]    
                    console.log(location)
                    L.marker(location, {icon: alienIcon})
                    .bindPopup(`<h1>City: ${sighting.city}</h1> <hr> <h3>Shape: ${sighting.shape}</h3> <hr> <h3>Comments: ${sighting.comments}</h3>`)
                    .addTo(myMap);
                    }
                    await sleep(100)
                }}
    };

    createMarkers(ufoData)
};

defaultStartingYear = 1949
defaultEndingYear = 2014

function checkYears(startYear, endYear){
    if (startYear < endYear){
        let start = startYear
        let end = endYear
        return [start, end]
    }
    else {
        let start = defaultStartingYear
        let end = defaultEndingYear
        return [start, end]
    }
};

createMap(ufo_sightings, defaultStartingYear, defaultEndingYear)