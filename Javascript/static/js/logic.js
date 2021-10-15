// Sleep function to allow all the data to load without crashing or displaying incorrectly
// Admittedly found this on Stack Overflow https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};

// This is the creation of our alien icon
var alienIcon = L.icon({
    iconUrl: 'alien_icon.png',
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon where it meets the amp
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// This function creates our map and markers
function createMap(ufoData, startingYear, endingYear) {
    // This creates the basic map in the map div
    var myMap = L.map("map", {
        center: [30.0902, -95.7129],
        zoom: 3.4
    });

    // The DARK MAP for our tile layer
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>&copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(myMap)

    // Pass in our checkyears function
    let years = checkYears(startingYear, endingYear)
    // Set our starting year value
    var start = years[0]
    // Set our ending year value
    var end = years[1]

    // This function creates the markers
    async function createMarkers(data){
        // For each line in our data
        for (var i = 0; i < data.length; i++) {
            // Set the "sighting" variable equal to our data
            var sighting = data[i];
            // If The sighting's year is greater than or equal to our starting year, and less than or equal to our ending year it makes the marker
            if (sighting["year"] >= start && sighting["year"] <= end) {
                console.log(sighting[i])
                // Some of the data is a string and not a number so we convert anything we find to a float
                var latitude = parseFloat(sighting["latitude"])
                var longitude = parseFloat(sighting["longitude "])
                // Some are nulls as well so we check if any of the data is null. If it is we move on.
                if (latitude != NaN && longitude != NaN) {
                    // Set our location
                    var location = [latitude, longitude]    
                    console.log(location)
                    // Create our marker
                    L.marker(location, {icon: alienIcon})
                    // Add a marker popup to our marker
                    .bindPopup(`<h1>City: ${sighting.city}</h1> <hr> <h3>Shape: ${sighting.shape}</h3> <hr> <h3>Comments: ${sighting.comments}</h3>`)
                    // Add the marker and popup to our map
                    .addTo(myMap);
                    }
                    // Use the sleep function so everything doesn't load at once and crash the system
                    await sleep(100)
                }}
    };
    // Theen run the create markers function
    createMarkers(ufoData)
};

// Set a default starting year and default ending year to equal our entire data set
defaultStartingYear = 1949
defaultEndingYear = 2014

// This function is used to check for issues with our user input, when we add that.
function checkYears(startYear, endYear){
    // If the starting year is less than or equal to our ending year we set our years to those years
    if (startYear <= endYear){
        let start = startYear
        let end = endYear
        return [start, end]
    }
    // Otherwise we set them to our default year
    else {
        let start = defaultStartingYear
        let end = defaultEndingYear
        return [start, end]
    }
};

// Finally load the map!
createMap(ufo_sightings, defaultStartingYear, defaultEndingYear)