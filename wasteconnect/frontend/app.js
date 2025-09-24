let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: 20.5937, lng: 78.9629 } // default India
    });
}

initMap();

// Load bins dynamically
document.getElementById("loadBinsBtn").addEventListener("click", async () => {
    const res = await fetch("/api/bins");
    const bins = await res.json();

    const ul = document.getElementById("bins");
    ul.innerHTML = "";

    bins.forEach(bin => {
        const li = document.createElement("li");
        li.textContent = `${bin.name} – ${bin.category} – Fill ${bin.fillLevel}%`;
        ul.appendChild(li);

        // Add bin marker on map
        const marker = new google.maps.Marker({
            position: { lat: bin.lat, lng: bin.lng },
            map: map,
            title: bin.name
        });
        markers.push(marker);
    });
});

// Submit pickup form
document.getElementById("pickupForm").addEventListener("submit", async e => {
    e.preventDefault();
    const address = document.getElementById("address").value;

    // Geocode address
    const geoRes = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyA1RbjGxX7jQMbvE2QnQ4GOB67DKG69K58`);
    const geoData = await geoRes.json();

    if (geoData.status !== "OK") {
        alert("Address not found!");
        return;
    }

    const location = geoData.results[0].geometry.location;

    const formData = {
        userName: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: address,
        lat: location.lat,
        lng: location.lng,
        binType: document.getElementById("binType").value,
        items: document.getElementById("items").value,
        scheduledDate: document.getElementById("date").value
    };

    const res = await fetch("/api/pickups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const data = await res.json();
    document.getElementById("pickupMsg").textContent = data.message;

    // Show marker on map
    new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: "Pickup Location"
    });

    map.setCenter({ lat: location.lat, lng: location.lng });
    map.setZoom(15);

    // Reset form
    document.getElementById("pickupForm").reset();
});
