const ourCoords = {
    latitude: 48.94321,
    longitude: 24.73380
};

let watchId = null;
//ind task 
let map = null;
let marker = null;
let destMarker = null;
let destCoords = null;

document.addEventListener('DOMContentLoaded', getMyLocation)

function getMyLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation, displayError) // { timeout: 1 }
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, no geolocation support")
    }
}

function displayLocation (position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let div = document.getElementById("location")
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`
    div.innerHTML += `(with ${position.coords.accuracy} meters accuracy)`
    let km = computeDistance(position.coords, ourCoords)
    let distance = document.getElementById("distance")
    distance.innerHTML = `You are ${km} km from the College`

    showOnMap(latitude, longitude, position.timestamp);
    
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371; //вказаний радіус землі у км

    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    let radians = (degrees * Math.PI)/180;
    return radians;
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}
function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

//ind task
function showOnMap(latitude, longitude, timestamp) {
    if (!map) {
        map = L.map("map").setView([latitude, longitude], 15);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        L.marker([ourCoords.latitude, ourCoords.longitude])
            .addTo(map)
            .bindPopup(coordsPopup("College", ourCoords.latitude, ourCoords.longitude));
    }

    // new pin if user change place
    const time = new Date(timestamp).toLocaleTimeString("uk-UA");
    L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(coordsPopup("Ви були тут", latitude, longitude, `<br>Час: ${time}`));

    map.setView([latitude, longitude]);
}

function coordsPopup(title, lat, lng, extra = "") {
    return `<b>${title}</b><br>
          Широта: ${lat.toFixed(5)}<br>
          Довгота: ${lng.toFixed(5)}${extra}`;
}

document.getElementById("destForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let lat = parseFloat(document.getElementById("destLat").value);
    let lng = parseFloat(document.getElementById("destLng").value);
   
    if (!map) {
        alert("Карта ще завантажується, зачекайте");
        return;
    }

    if (destMarker) {// delete old pin(if it was be)
        map.removeLayer(destMarker);
    }

    destMarker = L.marker([lat, lng]).addTo(map); // new pin with message
    destMarker.bindPopup(coordsPopup("Пункт призначення", lat, lng));

    map.flyTo([lat, lng], 15);
});