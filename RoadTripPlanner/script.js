let map;
let directionsService;
let directionsRenderer;

function initializeMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById("mapContainer"), {
        center: { lat: 17.4065, lng: 78.4772 }, // Default: San Francisco
        zoom: 7,
    });

    // Initialize Directions services
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);
}

function calculateTrip() {
    const start = document.getElementById("start").value;
    const destination = document.getElementById("destination").value;
    const fuelEfficiency = parseFloat(document.getElementById("fuel-efficiency").value);
    const fuelPrice = parseFloat(document.getElementById("fuel-price").value);
    const distanceOutput = document.getElementById("distanceOutput");
    const costOutput = document.getElementById("costOutput");

    if (!start || !destination) {
        distanceOutput.textContent = "Please enter both starting point and destination.";
        costOutput.textContent = "";
        return;
    }

    // Calculate route and distance
    const request = {
        origin: start,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            const distanceInMeters = result.routes[0].legs[0].distance.value;
            const distanceInKm = distanceInMeters / 1000;
            const fuelNeeded = distanceInKm / fuelEfficiency;
            const tripCost = fuelNeeded * fuelPrice;

            distanceOutput.textContent = `Distance: ${distanceInKm.toFixed(2)} km`;
            costOutput.textContent = `Estimated Fuel Cost: $${tripCost.toFixed(2)}`;

            directionsRenderer.setDirections(result);
        } else {
            distanceOutput.textContent = "Could not calculate distance. Please try again.";
            costOutput.textContent = "";
        }
    });
}

// Event listener for calculate button
document.getElementById("calculateTrip").addEventListener("click", calculateTrip);

// Initialize map on window load
window.onload = initializeMap;
