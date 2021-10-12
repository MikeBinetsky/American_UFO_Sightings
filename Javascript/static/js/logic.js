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

function createMap(ufoData, startingYear, endingYear) {

    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    let years = checkYears(startingYear, endingYear)
    var start = years[0]
    var end = years[1]

    var baseMaps = {
        Street: street,
        Topography: topo
      };

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
                    L.marker(location)
                    .bindPopup(`<h1>City: ${sighting.city}</h1> <hr> <h3>Shape: ${sighting.shape}</h3> <hr> <h3>Comments${sighting.comments}</h3>`)
                    .addTo(myMap);
                    }
                    await sleep(100)
                }}
    };

    var myMap = L.map("map", {
        center: [30.0902, -95.7129],
        zoom: 3.4,
        layers: [street, topo]
    });

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