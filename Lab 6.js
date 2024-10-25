async function createMap() {
    var map = L.map('map').setView([38.7946, -106.5348], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let markerList = []
    for (let i = 1; i <= 3; i++) {
        let lat = getRandomInRange(30, 35, 3);
        let long = getRandomInRange(-90, -100, 3);
        markerList.push([lat, long])
        
        document.getElementById(`lat${i}`).innerText = `Latitude: ${lat},`
        document.getElementById(`long${i}`).innerText = `Longitude: ${long}`

        const coordinates = L.marker([lat, long]).addTo(map)

        let locality = await getLocalityCoordinate(lat, long);
        document.getElementById(`loc${i}`).innerText = `Locality: ${locality}`
    }
    console.log("Marker List: ", markerList)
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

async function getLocalityCoordinate(latitude, longitude) {
    const apiData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then((res) => res.json())
    console.log("API Data: ", apiData)
    return apiData.locality
}

window.onload = createMap;